import { createClient } from "npm:@supabase/supabase-js";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-e4305fae/health", (c) => {
  return c.json({ status: "ok" });
});

// --- Auth ---

app.post("/make-server-e4305fae/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Supabase createUser error:", error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// --- Chat History & Threads ---

// Helper to get user ID or default to anonymous
async function getUserId(c: any): Promise<string> {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    console.log("No Auth header, using anon");
    return "anon";
  }
  
  const token = authHeader.replace('Bearer ', '').trim();
  
  // Strict check for anon key
  if (token === Deno.env.get('SUPABASE_ANON_KEY')) {
    // console.log("Anon key detected");
    return "anon";
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      console.log("Auth error or no user, falling back to anon:", error?.message);
      return "anon"; // Fallback to anon if token is invalid but not anon key
    }
    
    return user.id;
  } catch (e) {
    console.error("getUserId exception:", e);
    return "anon";
  }
}

// 1. Get all threads
app.get("/make-server-e4305fae/threads", async (c) => {
  try {
    const userId = await getUserId(c);
    console.log(`Fetching threads for user: ${userId}`);
    const threads = await kv.get(`threads_${userId}`);
    return c.json(threads || []);
  } catch (error) {
    console.error("Error fetching threads:", error);
    return c.json({ error: "Failed to fetch threads" }, 500);
  }
});

// 2. Get messages for a specific thread
app.get("/make-server-e4305fae/threads/:id", async (c) => {
  try {
    const threadId = c.req.param('id');
    const messages = await kv.get(`thread_messages_${threadId}`);
    return c.json(messages || []);
  } catch (error) {
    console.error("Error fetching thread messages:", error);
    return c.json({ error: "Failed to fetch messages" }, 500);
  }
});

// 3. Create/Update a thread (save messages and update metadata)
app.post("/make-server-e4305fae/threads/:id", async (c) => {
  try {
    const userId = await getUserId(c);
    const threadId = c.req.param('id');
    const { messages, title } = await c.req.json();
    
    // Save messages
    await kv.set(`thread_messages_${threadId}`, messages);
    
    // Update thread list
    const threads = (await kv.get(`threads_${userId}`)) || [];
    const existingIndex = threads.findIndex((t: any) => t.id === threadId);
    
    const threadMeta = {
      id: threadId,
      title: title || messages[0]?.content?.slice(0, 30) || "New Chat",
      lastMessage: messages[messages.length - 1]?.content || "",
      timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      threads[existingIndex] = { ...threads[existingIndex], ...threadMeta };
    } else {
      threads.unshift(threadMeta);
    }
    
    await kv.set(`threads_${userId}`, threads);
    return c.json({ success: true, thread: threadMeta });
  } catch (error) {
    console.error("Error saving thread:", error);
    return c.json({ error: "Failed to save thread" }, 500);
  }
});

// 4. Delete a thread
app.delete("/make-server-e4305fae/threads/:id", async (c) => {
  try {
    const userId = await getUserId(c);
    const threadId = c.req.param('id');
    
    // Remove messages
    await kv.del(`thread_messages_${threadId}`);
    
    // Remove from list
    const threads = (await kv.get(`threads_${userId}`)) || [];
    const newThreads = threads.filter((t: any) => t.id !== threadId);
    await kv.set(`threads_${userId}`, newThreads);
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting thread:", error);
    return c.json({ error: "Failed to delete thread" }, 500);
  }
});

// --- Legacy Chat History (Backward Compatibility) ---
// Redirects to a default thread "current"
app.get("/make-server-e4305fae/chat/history", async (c) => {
    return c.redirect("/make-server-e4305fae/threads/current");
});
app.post("/make-server-e4305fae/chat/history", async (c) => {
    const messages = await c.req.json();
    // We forward to the new logic but we need to construct the request manually or just call the logic
    // For simplicity in this environment, let's just duplicate the logic for 'current'
    const userId = await getUserId(c);
    const threadId = "current";
    await kv.set(`thread_messages_${threadId}`, messages);
    // Update thread list implicitly? No, legacy didn't have list.
    // Let's just save the messages so the old frontend works if not updated yet.
    return c.json({ success: true });
});


// --- Debug/Seeding ---
app.post("/make-server-e4305fae/debug/seed", async (c) => {
  try {
    const userId = await getUserId(c); // Seeds for the current user (or anon)
    
    const mockThreads = [
      { id: "t1", title: "Trip to Riyadh Boulevard", lastMessage: "Great, I'll add that to your calendar.", timestamp: new Date(Date.now() - 86400000 * 1).toISOString() },
      { id: "t2", title: "Finding Vegan Sushi", lastMessage: "Here are the top rated vegan sushi spots.", timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: "t3", title: "Weekend Itinerary", lastMessage: "Your itinerary for Al Ula is ready.", timestamp: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "t4", title: "Gift for Mom's Birthday", lastMessage: "How about a spa package?", timestamp: new Date(Date.now() - 86400000 * 5).toISOString() },
      { id: "t5", title: "Traffic on King Fahd Rd", lastMessage: "Traffic is currently heavy.", timestamp: new Date(Date.now() - 86400000 * 6).toISOString() },
      // New Seeds
      { id: "t6", title: "Remote Work Spots", lastMessage: "I've sent the directions to Brew Crew.", timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString() },
      { id: "t7", title: "Home Cleaning", lastMessage: "Cleaner confirmed for Saturday.", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
      { id: "t8", title: "New Sneaker Drop", lastMessage: "Order #SNK-992 confirmed.", timestamp: new Date(Date.now() - 86400000 * 2.5).toISOString() },
      { id: "t9", title: "Tennis Coach", lastMessage: "Session booked with Coach Sarah.", timestamp: new Date(Date.now() - 86400000 * 3.5).toISOString() },
      { id: "t10", title: "Art District Tour", lastMessage: "Here is your digital pass.", timestamp: new Date(Date.now() - 86400000 * 4.5).toISOString() },
      { id: "t11", title: "Meal Prep Plan", lastMessage: "Here is your nutritional breakdown.", timestamp: new Date(Date.now() - 86400000 * 7).toISOString() },
      { id: "t12", title: "WiFi Troubleshooting", lastMessage: "Technician dispatched.", timestamp: new Date(Date.now() - 86400000 * 8).toISOString() }
    ];

    // Save metadata
    await kv.set(`threads_${userId}`, mockThreads);

    // Save individual message histories (mock content)
    // 1. Trip to Riyadh Boulevard
    await kv.set(`thread_messages_t1`, [
        { 
          id: '1', role: 'user', content: 'I want to go to Riyadh Boulevard tonight.', 
          timestamp: new Date(Date.now() - 86400000 * 1 - 7200000).toISOString() 
        },
        { 
          id: '2', role: 'assistant', content: 'There are several exciting zones and events happening tonight. Here are some popular options:', 
          timestamp: new Date(Date.now() - 86400000 * 1 - 7100000).toISOString(),
          artifacts: [
            {
              type: 'poi-carousel',
              data: [
                { id: 'p1', name: 'Boulevard World', category: 'Entertainment', image: 'https://images.unsplash.com/photo-1576482302304-399a0319234b?auto=format&fit=crop&q=80&w=2940', rating: 4.8, distance: '5.2 km', vibe: ['Global', 'Culture'], priceRange: '$$$', openNow: true },
                { id: 'p2', name: 'Boulevard City', category: 'Hub', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=2938', rating: 4.9, distance: '5.0 km', vibe: ['Lively', 'Dining'], priceRange: '$$', openNow: true },
                { id: 'p3', name: 'Music Zone', category: 'Live Events', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2940', rating: 4.7, distance: '5.5 km', vibe: ['Concerts', 'Loud'], priceRange: '$$$$', openNow: false }
              ]
            }
          ]
        },
        { 
          id: '3', role: 'user', content: "What's happening at the Music Zone?", 
          timestamp: new Date(Date.now() - 86400000 * 1 - 7000000).toISOString() 
        },
        { 
          id: '4', role: 'assistant', content: "There's a live concert by Amr Diab starting at 9 PM. Tickets are selling fast.", 
          timestamp: new Date(Date.now() - 86400000 * 1 - 6900000).toISOString(),
          artifacts: [
            {
              type: 'event-carousel',
              data: [
                { id: 'e1', name: 'Amr Diab Live', date: 'Tonight', time: '9:00 PM', location: 'Music Arena', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2940', category: 'Concert', attendees: 15000, price: '350 SAR' }
              ]
            }
          ]
        },
        { 
          id: '5', role: 'user', content: 'Book two tickets for me.', 
          timestamp: new Date(Date.now() - 86400000 * 1 - 6000000).toISOString() 
        },
        { 
          id: '6', role: 'assistant', content: "Confirmed! I've booked two tickets for the Amr Diab concert tonight.", 
          timestamp: new Date(Date.now() - 86400000 * 1 - 5900000).toISOString(),
          artifacts: [
            {
              type: 'ticket-pass',
              data: { id: 'tk1', eventName: 'Amr Diab Live', date: 'Tonight', time: '21:00', seat: 'Section A, Row 4', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Ticket123', image: 'https://images.unsplash.com/photo-1459749411177-287ce35e863f?auto=format&fit=crop&q=80&w=250', location: 'Music Arena' }
            }
          ]
        },
        { 
          id: '7', role: 'user', content: 'How do I get there?', 
          timestamp: new Date(Date.now() - 86400000 * 1 - 3000000).toISOString() 
        },
        { 
          id: '8', role: 'assistant', content: "I've arranged a Careem ride for 8:15 PM. Here's your route.", 
          timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
          artifacts: [
            {
              type: 'map-view',
              data: { title: 'Route to Boulevard', markers: [{ lat: 24.774265, lng: 46.738586, label: 'Boulevard City' }] }
            }
          ]
        }
    ]);

    // 2. Finding Vegan Sushi
    await kv.set(`thread_messages_t2`, [
        { 
          id: '1', role: 'user', content: "I'm craving sushi, but I need vegan options.", 
          timestamp: new Date(Date.now() - 86400000 * 2 - 3600000).toISOString() 
        },
        { 
          id: '2', role: 'assistant', content: "Riyadh has a growing vegan scene! Here are the top-rated sushi spots with dedicated vegan menus:", 
          timestamp: new Date(Date.now() - 86400000 * 2 - 3500000).toISOString(),
          artifacts: [
            {
              type: 'poi-carousel',
              data: [
                { id: 'v1', name: 'Tokyo Restaurant', category: 'Japanese', image: 'https://images.unsplash.com/photo-1617196019294-dc44dfac01d2?auto=format&fit=crop&q=80&w=2940', rating: 4.9, distance: '3.2 km', vibe: ['Elegant', 'Quiet'], priceRange: '$$$', openNow: true },
                { id: 'v2', name: 'Kampai', category: 'Fusion', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=2825', rating: 4.7, distance: '4.1 km', vibe: ['Modern', 'Trendy'], priceRange: '$$', openNow: true },
                { id: 'v3', name: 'Shogun Lounge', category: 'Lounge', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&q=80&w=2787', rating: 4.6, distance: '6.0 km', vibe: ['Music', 'Social'], priceRange: '$$$$', openNow: true }
              ]
            }
          ]
        },
        { 
          id: '3', role: 'user', content: 'Does Tokyo have a reservation available for 7:30 PM?', 
          timestamp: new Date(Date.now() - 86400000 * 2 - 3000000).toISOString() 
        },
        { 
          id: '4', role: 'assistant', content: 'Yes, they have a table for two. Would you like me to book it?', 
          timestamp: new Date(Date.now() - 86400000 * 2 - 2900000).toISOString(),
          artifacts: [
            {
              type: 'confirmation-card',
              data: { id: 'c1', title: 'Confirm Reservation', description: 'Table for 2 at Tokyo Restaurant, 7:30 PM Today.', impact: 'Reserves your spot.', riskLevel: 'low', action: 'Book Now' }
            }
          ]
        },
        { 
          id: '5', role: 'user', content: 'Yes, please confirm.', 
          timestamp: new Date(Date.now() - 86400000 * 2 - 100000).toISOString() 
        },
        { 
          id: '6', role: 'assistant', content: 'Your table at Tokyo is confirmed for 7:30 PM. Enjoy your meal!', 
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          artifacts: [
             {
               type: 'order-tracker',
               data: { id: 'o1', orderNumber: 'RES-8821', status: 'confirmed', items: ['Table for 2', 'Vegan Menu Requested'], total: '0.00 SAR', estimatedTime: '19:30' }
             }
          ]
        }
    ]);

    // 3. Weekend Itinerary
    await kv.set(`thread_messages_t3`, [
        { 
          id: '1', role: 'user', content: 'Plan a weekend trip to Al Ula for me and my partner. We want a mix of adventure and relaxation.', 
          timestamp: new Date(Date.now() - 86400000 * 3 - 86400000).toISOString() 
        },
        { 
          id: '2', role: 'assistant', content: "Al Ula is perfect for that. I've drafted a 2-day itinerary balancing the Hegra tour with some downtime at Habitas.", 
          timestamp: new Date(Date.now() - 86400000 * 3 - 86000000).toISOString(),
          artifacts: [
            {
              type: 'itinerary-timeline',
              data: {
                days: [
                  { date: 'Day 1', blocks: [
                    { id: 'b1', time: '09:00', title: 'Arrival & Check-in', location: 'Habitas Al Ula', duration: '1h', type: 'rest' },
                    { id: 'b2', time: '11:00', title: 'Hegra Tour', location: 'Hegra Heritage Site', duration: '3h', type: 'experience' },
                    { id: 'b3', time: '19:00', title: 'Dinner at Tama', location: 'Habitas', duration: '2h', type: 'meal' }
                  ]},
                  { date: 'Day 2', blocks: [
                    { id: 'b4', time: '08:00', title: 'Morning Hike', location: 'Oasis Trail', duration: '2h', type: 'experience' },
                    { id: 'b5', time: '14:00', title: 'Spa Treatment', location: 'Wellness Center', duration: '90m', type: 'rest' }
                  ]}
                ]
              }
            }
          ]
        },
        { 
          id: '3', role: 'user', content: 'Can we add a stargazing session on Saturday night?', 
          timestamp: new Date(Date.now() - 86400000 * 3 - 6000000).toISOString() 
        },
        { 
          id: '4', role: 'assistant', content: "Absolutely. I've updated the itinerary to include Stargazing at Gharameel.", 
          timestamp: new Date(Date.now() - 86400000 * 3 - 5000000).toISOString(),
          artifacts: [
             {
              type: 'itinerary-timeline',
              data: {
                days: [
                  { date: 'Day 1', blocks: [
                    { id: 'b1', time: '09:00', title: 'Arrival & Check-in', location: 'Habitas Al Ula', duration: '1h', type: 'rest' },
                    { id: 'b2', time: '11:00', title: 'Hegra Tour', location: 'Hegra Heritage Site', duration: '3h', type: 'experience' },
                    { id: 'b3', time: '19:00', title: 'Dinner at Tama', location: 'Habitas', duration: '2h', type: 'meal' },
                    { id: 'b6', time: '22:00', title: 'Stargazing', location: 'Gharameel', duration: '2h', type: 'experience', notes: 'Warm clothes recommended' }
                  ]},
                  { date: 'Day 2', blocks: [
                    { id: 'b4', time: '08:00', title: 'Morning Hike', location: 'Oasis Trail', duration: '2h', type: 'experience' },
                    { id: 'b5', time: '14:00', title: 'Spa Treatment', location: 'Wellness Center', duration: '90m', type: 'rest' }
                  ]}
                ]
              }
            }
          ]
        },
        { 
          id: '5', role: 'user', content: 'Looks perfect.', 
          timestamp: new Date(Date.now() - 86400000 * 3 - 100000).toISOString() 
        },
        { 
          id: '6', role: 'assistant', content: 'Great. Here is a summary of the package options.', 
          timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
          artifacts: [
            {
              type: 'comparison-table',
              data: [
                 { name: 'Standard Package', values: { 'Accommodation': 'Caravan', 'Meals': 'Breakfast', 'Tours': 'Hegra Only', 'Price': '3500 SAR' } },
                 { name: 'Luxury Package', values: { 'Accommodation': 'Villa', 'Meals': 'Full Board', 'Tours': 'All Access', 'Price': '7500 SAR' } }
              ]
            }
          ]
        }
    ]);

    // 4. Gift for Mom's Birthday
    await kv.set(`thread_messages_t4`, [
        { 
          id: '1', role: 'user', content: "It's my mom's birthday next week. She loves skincare and home decor. Budget is around 500 SAR.", 
          timestamp: new Date(Date.now() - 86400000 * 5 - 4000000).toISOString() 
        },
        { 
          id: '2', role: 'assistant', content: 'That\'s a lovely thought. Based on popular choices in Riyadh, here are some gift sets she might adore:', 
          timestamp: new Date(Date.now() - 86400000 * 5 - 3900000).toISOString(),
          artifacts: [
            {
              type: 'product-carousel',
              data: [
                { id: 'pr1', name: 'Ritual of Sakura', brand: 'Rituals', price: '265 SAR', image: 'https://images.unsplash.com/photo-1616606013233-858e9f2d1265?auto=format&fit=crop&q=80&w=2000', description: 'Large Gift Set', rating: 4.9 },
                { id: 'pr2', name: 'Ceramic Vase Set', brand: 'Zara Home', price: '450 SAR', image: 'https://images.unsplash.com/photo-1581539250439-c9230958b12e?auto=format&fit=crop&q=80&w=2000', description: 'Handcrafted stoneware', rating: 4.7 },
                { id: 'pr3', name: 'Luxury Skincare Box', brand: 'Sephora', price: '520 SAR', image: 'https://images.unsplash.com/photo-1571781535014-53bd94295ea8?auto=format&fit=crop&q=80&w=2000', description: 'Best sellers edit', rating: 4.8 }
              ]
            }
          ]
        },
        { 
          id: '3', role: 'user', content: 'The Rituals box looks nice. What\'s inside?', 
          timestamp: new Date(Date.now() - 86400000 * 5 - 2000000).toISOString() 
        },
        { 
          id: '4', role: 'assistant', content: 'The "Ritual of Sakura" large gift set includes a foaming shower gel, body scrub, body cream, and mini fragrance sticks. It creates a relaxing spa experience at home.', 
          timestamp: new Date(Date.now() - 86400000 * 5 - 1900000).toISOString(),
          artifacts: [
            {
               type: 'product-carousel',
               data: [
                 { id: 'pr1', name: 'Ritual of Sakura', brand: 'Rituals', price: '265 SAR', image: 'https://images.unsplash.com/photo-1616606013233-858e9f2d1265?auto=format&fit=crop&q=80&w=2000', description: 'Includes Gel, Scrub, Cream, Sticks', rating: 4.9 }
               ]
            }
          ]
        },
        { 
          id: '5', role: 'user', content: 'I\'ll take it. Can you have it delivered on Tuesday?', 
          timestamp: new Date(Date.now() - 86400000 * 5 - 100000).toISOString() 
        },
        { 
          id: '6', role: 'assistant', content: 'Consider it done. I\'ve placed the order for Tuesday delivery.', 
          timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
          artifacts: [
            {
              type: 'order-tracker',
              data: { id: 'o2', orderNumber: 'GIFT-9921', status: 'preparing', items: ['Ritual of Sakura Set', 'Gift Wrap'], total: '280 SAR', estimatedTime: 'Tuesday, 2 PM' }
            }
          ]
        }
    ]);

    // 5. Traffic on King Fahd Rd
    await kv.set(`thread_messages_t5`, [
        { 
          id: '1', role: 'user', content: 'How is the traffic on King Fahd Rd right now? I need to get to the Financial District.', 
          timestamp: new Date(Date.now() - 86400000 * 6 - 3000000).toISOString() 
        },
        { 
          id: '2', role: 'assistant', content: 'It\'s currently quite heavy due to rush hour. Delay is approximately 25 minutes.', 
          timestamp: new Date(Date.now() - 86400000 * 6 - 2900000).toISOString(),
          artifacts: [
             {
               type: 'map-view',
               data: { title: 'Traffic Status', markers: [{ lat: 24.7136, lng: 46.6753, label: 'Heavy Traffic' }] } // Mock coordinates for King Fahd
             }
          ]
        },
        { 
          id: '3', role: 'user', content: 'Is there a faster alternative?', 
          timestamp: new Date(Date.now() - 86400000 * 6 - 1500000).toISOString() 
        },
        { 
          id: '4', role: 'assistant', content: 'Yes, if you take Olaya Street, you might save about 10 minutes, though it\'s moving slowly as well.', 
          timestamp: new Date(Date.now() - 86400000 * 6 - 1400000).toISOString(),
          artifacts: [
            {
              type: 'comparison-table',
              data: [
                 { name: 'King Fahd Rd', values: { 'Time': '45 min', 'Distance': '12 km', 'Status': 'Heavy' } },
                 { name: 'Olaya St', values: { 'Time': '35 min', 'Distance': '13 km', 'Status': 'Moderate' } }
              ]
            }
          ]
        },
        { 
          id: '5', role: 'user', content: 'I\'ll stick to King Fahd then, thanks.', 
          timestamp: new Date(Date.now() - 86400000 * 6 - 50000).toISOString() 
        },
        { 
          id: '6', role: 'assistant', content: 'Drive safely! I\'ll monitor the route for any major incidents.', 
          timestamp: new Date(Date.now() - 86400000 * 6).toISOString() 
        }
    ]);

    // 6. Remote Work Spots (Lifestyle)
    await kv.set(`thread_messages_t6`, [
      { id: '1', role: 'user', content: "I need a quiet place to work for a few hours. Good wifi is a must.", timestamp: new Date(Date.now() - 86400000 * 0.5 - 3600000).toISOString() },
      { id: '2', role: 'assistant', content: "I know just the spots. These cafes are known for their quiet atmosphere and reliable internet.", timestamp: new Date(Date.now() - 86400000 * 0.5 - 3500000).toISOString(), artifacts: [
        { type: 'poi-carousel', data: [
          { id: 'rw1', name: 'Brew Crew', category: 'Cafe', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000', rating: 4.8, distance: '1.2 km', vibe: ['Quiet', 'Fast Wifi'], priceRange: '$$', openNow: true },
          { id: 'rw2', name: 'Focus Space', category: 'Co-working', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000', rating: 4.9, distance: '2.5 km', vibe: ['Professional', 'Meeting Rooms'], priceRange: '$$$', openNow: true }
        ]}
      ]},
      { id: '3', role: 'user', content: "Brew Crew looks good. How do I get there?", timestamp: new Date(Date.now() - 86400000 * 0.5 - 1000000).toISOString() },
      { id: '4', role: 'assistant', content: "Here is the quickest route. It's about a 5-minute drive.", timestamp: new Date(Date.now() - 86400000 * 0.5).toISOString(), artifacts: [
        { type: 'map-view', data: { title: 'Route to Brew Crew', markers: [{ lat: 24.7136, lng: 46.6753, label: 'Brew Crew' }] } }
      ]}
    ]);

    // 7. Home Cleaning (Services)
    await kv.set(`thread_messages_t7`, [
      { id: '1', role: 'user', content: "My apartment is a mess. I need a deep clean this weekend.", timestamp: new Date(Date.now() - 86400000 * 1.5 - 4000000).toISOString() },
      { id: '2', role: 'assistant', content: "I can arrange that. Here are the service packages available from top-rated providers.", timestamp: new Date(Date.now() - 86400000 * 1.5 - 3900000).toISOString(), artifacts: [
        { type: 'service-menu', data: { title: 'Cleaning Packages', items: [
          { id: 's1', name: 'Standard Clean', price: '200 SAR', duration: '3 Hours', description: 'Dusting, mopping, bathrooms, and kitchen surfaces.' },
          { id: 's2', name: 'Deep Clean', price: '350 SAR', duration: '5 Hours', description: 'Includes inside cabinets, appliances, and windows.', popular: true },
          { id: 's3', name: 'Move-in/Out', price: '500 SAR', duration: 'Full Day', description: 'Complete sanitization for empty apartments.' }
        ]}}
      ]},
      { id: '3', role: 'user', content: "Let's go with the Deep Clean.", timestamp: new Date(Date.now() - 86400000 * 1.5 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "Good choice. Please select a time slot for this weekend.", timestamp: new Date(Date.now() - 86400000 * 1.5 - 1900000).toISOString(), artifacts: [
        { type: 'calendar-selector', data: { dates: ['Sat, Oct 14', 'Sun, Oct 15'], slots: ['09:00 AM', '02:00 PM'] }}
      ]},
      { id: '5', role: 'user', content: "Saturday morning at 9 works.", timestamp: new Date(Date.now() - 86400000 * 1.5 - 1000000).toISOString() },
      { id: '6', role: 'assistant', content: "All set. I've booked the Deep Clean for Saturday at 9:00 AM.", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), artifacts: [
        { type: 'confirmation-card', data: { id: 'conf1', title: 'Booking Confirmed', description: 'Deep Clean Service on Sat, Oct 14 at 09:00 AM.', impact: 'Cleaner will arrive with supplies.', riskLevel: 'low', action: 'View Details' }}
      ]}
    ]);

    // 8. New Sneaker Drop (Retail)
    await kv.set(`thread_messages_t8`, [
      { id: '1', role: 'user', content: "Did the new Air Jordans drop yet?", timestamp: new Date(Date.now() - 86400000 * 2.5 - 3000000).toISOString() },
      { id: '2', role: 'assistant', content: "Yes, they dropped this morning! Stock is limited. Here are the available colorways.", timestamp: new Date(Date.now() - 86400000 * 2.5 - 2900000).toISOString(), artifacts: [
        { type: 'product-carousel', data: [
          { id: 'snk1', name: 'Air Jordan 1 High OG', brand: 'Nike', price: '850 SAR', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=2000', description: 'Chicago Reimagined', rating: 5.0 },
          { id: 'snk2', name: 'Air Jordan 4 Retro', brand: 'Nike', price: '950 SAR', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=2000', description: 'Midnight Navy', rating: 4.8 }
        ]}
      ]},
      { id: '3', role: 'user', content: "I want the High OG. Size 44.", timestamp: new Date(Date.now() - 86400000 * 2.5 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "Please confirm your size selection.", timestamp: new Date(Date.now() - 86400000 * 2.5 - 1900000).toISOString(), artifacts: [
        { type: 'selection-chips', data: { title: 'Select Size (EU)', options: ['42', '43', '44', '45'], selected: '44' }}
      ]},
      { id: '5', role: 'user', content: "Confirmed.", timestamp: new Date(Date.now() - 86400000 * 2.5 - 1000000).toISOString() },
      { id: '6', role: 'assistant', content: "Got 'em! Your order is placed.", timestamp: new Date(Date.now() - 86400000 * 2.5).toISOString(), artifacts: [
        { type: 'order-tracker', data: { id: 'o3', orderNumber: 'SNK-992', status: 'confirmed', items: ['Air Jordan 1 High OG (44)'], total: '850 SAR', estimatedTime: 'Tomorrow' }}
      ]}
    ]);

    // 9. Tennis Coach (Sports)
    await kv.set(`thread_messages_t9`, [
      { id: '1', role: 'user', content: "I want to get back into tennis. Can you find me a coach?", timestamp: new Date(Date.now() - 86400000 * 3.5 - 3000000).toISOString() },
      { id: '2', role: 'assistant', content: "Here are some top-rated coaches available in your area.", timestamp: new Date(Date.now() - 86400000 * 3.5 - 2900000).toISOString(), artifacts: [
        { type: 'ambassador-carousel', data: [
          { id: 'a1', name: 'Coach Sarah', style: 'Technical Focus', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200', fitScore: 95, followers: 1200, specialty: ['Beginners', 'Serve'] },
          { id: 'a2', name: 'Coach Mike', style: 'High Intensity', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', fitScore: 88, followers: 3400, specialty: ['Cardio', 'Strategy'] }
        ]}
      ]},
      { id: '3', role: 'user', content: "Sarah sounds good. What would a session look like?", timestamp: new Date(Date.now() - 86400000 * 3.5 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "She proposes a 1-hour assessment session.", timestamp: new Date(Date.now() - 86400000 * 3.5 - 1900000).toISOString(), artifacts: [
        { type: 'itinerary-timeline', data: { days: [{ date: 'Session Plan', blocks: [
          { id: 'tb1', time: '00:00', title: 'Warm-up', location: 'Court 1', duration: '10m', type: 'experience' },
          { id: 'tb2', time: '00:10', title: 'Technique Assessment', location: 'Court 1', duration: '30m', type: 'experience' },
          { id: 'tb3', time: '00:40', title: 'Practice Match', location: 'Court 1', duration: '20m', type: 'experience' }
        ]}]}}
      ]}
    ]);

    // 10. Art District Tour (Culture)
    await kv.set(`thread_messages_t10`, [
      { id: '1', role: 'user', content: "Where are the best art galleries in the city?", timestamp: new Date(Date.now() - 86400000 * 4.5 - 3000000).toISOString() },
      { id: '2', role: 'assistant', content: "Most are concentrated in the JAX District. Here's a heatmap of the activity.", timestamp: new Date(Date.now() - 86400000 * 4.5 - 2900000).toISOString(), artifacts: [
        { type: 'zone-heatmap', data: { title: 'Art District Activity', zones: [{ name: 'JAX District', intensity: 0.9 }, { name: 'Al Faisaliah', intensity: 0.4 }] }}
      ]},
      { id: '3', role: 'user', content: "Looks cool. Any specific recommendations?", timestamp: new Date(Date.now() - 86400000 * 4.5 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "The 'Desert X' exhibition is trending.", timestamp: new Date(Date.now() - 86400000 * 4.5 - 1900000).toISOString(), artifacts: [
        { type: 'poi-carousel', data: [
          { id: 'art1', name: 'Desert X', category: 'Exhibition', image: 'https://images.unsplash.com/photo-1518998053901-5348d3969104?auto=format&fit=crop&q=80&w=2000', rating: 4.9, distance: '12 km', vibe: ['Avant-garde', 'Outdoor'], priceRange: '$$', openNow: true }
        ]}
      ]},
      { id: '5', role: 'user', content: "Get me a pass.", timestamp: new Date(Date.now() - 86400000 * 4.5 - 1000000).toISOString() },
      { id: '6', role: 'assistant', content: "You're in. Here is your digital entry pass.", timestamp: new Date(Date.now() - 86400000 * 4.5).toISOString(), artifacts: [
        { type: 'ticket-pass', data: { id: 'tk2', eventName: 'Desert X Entry', date: 'Valid Today', time: 'Anytime', seat: 'General Admission', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Art123', image: 'https://images.unsplash.com/photo-1518998053901-5348d3969104?auto=format&fit=crop&q=80&w=2000', location: 'JAX District' }}
      ]}
    ]);

    // 11. Meal Prep Plan (Health)
    await kv.set(`thread_messages_t11`, [
      { id: '1', role: 'user', content: "I want to start eating healthier. Maybe keto or vegan?", timestamp: new Date(Date.now() - 86400000 * 7 - 3000000).toISOString() },
      { id: '2', role: 'assistant', content: "Let's compare the subscription plans available.", timestamp: new Date(Date.now() - 86400000 * 7 - 2900000).toISOString(), artifacts: [
        { type: 'comparison-table', data: [
          { name: 'Keto Plan', values: { 'Carbs': 'Low', 'Protein': 'High', 'Cost': '1200 SAR/mo' } },
          { name: 'Vegan Plan', values: { 'Carbs': 'Medium', 'Protein': 'Medium', 'Cost': '1000 SAR/mo' } }
        ]}
      ]},
      { id: '3', role: 'user', content: "Let's try Keto.", timestamp: new Date(Date.now() - 86400000 * 7 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "Here is your projected nutritional breakdown for the week.", timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), artifacts: [
        { type: 'analytics-snapshot', data: { title: 'Weekly Nutrition', metrics: [
          { label: 'Protein', value: '140g', change: '+10%', trend: 'up' },
          { label: 'Carbs', value: '30g', change: '-50%', trend: 'down' },
          { label: 'Fat', value: '90g', change: '+20%', trend: 'up' }
        ]}}
      ]}
    ]);

    // 12. WiFi Troubleshooting (Tech)
    await kv.set(`thread_messages_t12`, [
      { id: '1', role: 'user', content: "My internet is down again.", timestamp: new Date(Date.now() - 86400000 * 8 - 3000000).toISOString() },
      { id: '2', role: 'assistant', content: "I'm sorry to hear that. Let's diagnose the issue. Which light is blinking on your router?", timestamp: new Date(Date.now() - 86400000 * 8 - 2900000).toISOString(), artifacts: [
        { type: 'form-group', data: { title: 'Router Status', fields: [
          { name: 'Power Light', type: 'select', options: ['Solid Green', 'Blinking Red', 'Off'] },
          { name: 'Internet Light', type: 'select', options: ['Solid Green', 'Blinking Green', 'Off'] }
        ]}}
      ]},
      { id: '3', role: 'user', content: "Power is green, Internet is blinking red.", timestamp: new Date(Date.now() - 86400000 * 8 - 2000000).toISOString() },
      { id: '4', role: 'assistant', content: "It seems like a connection drop. I've initiated a reset and scheduled a technician just in case.", timestamp: new Date(Date.now() - 86400000 * 8).toISOString(), artifacts: [
        { type: 'progress-card', data: { title: 'Troubleshooting', steps: [
          { label: 'Remote Reset', status: 'completed' },
          { label: 'Line Check', status: 'in-progress' },
          { label: 'Technician Dispatch', status: 'pending' }
        ]}}
      ]}
    ]);

    // --- AGENT GROUPS THREADS ---

    // G1: Family Planner
    // Context: User + Spouse + Kids + Calendar Agent + Travel Agent
    await kv.set(`thread_messages_g1`, [
      { id: '1', role: 'user', content: "We need to plan the Eid holiday. Everyone is free starting Thursday.", timestamp: new Date(Date.now() - 86400000 * 2 - 3600000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "I've checked everyone's calendar. Sarah has a piano recital on Thursday morning, but the afternoon is clear. Here are three potential getaway options for the long weekend.", timestamp: new Date(Date.now() - 86400000 * 2 - 3500000).toISOString(), artifacts: [
         { type: 'poi-carousel', data: [
            { id: 'eid1', name: 'Red Sea Resort', category: 'Beach', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000', rating: 4.9, distance: 'Flight', vibe: ['Relaxing', 'Luxury'], priceRange: '$$$$', openNow: true },
            { id: 'eid2', name: 'Abha Mountain House', category: 'Nature', image: 'https://images.unsplash.com/photo-1574706591039-445695000574?auto=format&fit=crop&q=80&w=2000', rating: 4.7, distance: 'Flight', vibe: ['Cool', 'Hiking'], priceRange: '$$', openNow: true },
            { id: 'eid3', name: 'Riyadh Staycation', category: 'City', image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&q=80&w=2000', rating: 4.5, distance: 'Local', vibe: ['Fun', 'Easy'], priceRange: '$$', openNow: true }
         ]}
      ]},
      { id: '3', role: 'user', content: "The kids vote for the Red Sea!", timestamp: new Date(Date.now() - 86400000 * 2 - 2000000).toISOString(), sender: { name: 'Sarah (Spouse)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', isMe: false } },
      { id: '4', role: 'assistant', content: "Great choice. I've found these family-friendly activities.", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), artifacts: [
        { type: 'product-carousel', data: [
          { id: 'act1', name: 'Snorkeling Tour', brand: 'Red Sea Diving', price: '450 SAR', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2000', description: 'Guided reef tour', rating: 4.9 },
          { id: 'act2', name: 'Sunset Cruise', brand: 'Marina', price: '300 SAR', image: 'https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&q=80&w=2000', description: 'With dinner', rating: 4.8 }
        ]}
      ]}
    ]);

    // G2: Work Logistics
    // Context: User + Colleagues + Logistics Agent
    await kv.set(`thread_messages_g2`, [
       { id: '1', role: 'user', content: "Status on the shipment for the Expo?", timestamp: new Date(Date.now() - 86400000 * 0.2 - 3600000).toISOString(), sender: { name: 'Me', isMe: true } },
       { id: '2', role: 'assistant', content: "The main equipment is currently in transit. The brochures are delayed.", timestamp: new Date(Date.now() - 86400000 * 0.2 - 3500000).toISOString(), artifacts: [
         { type: 'order-tracker', data: { id: 'shp1', orderNumber: 'EXP-402', status: 'on-the-way', items: ['Booth Structure', 'Lighting Rig'], total: '-', estimatedTime: 'Today, 4 PM' } }
       ]},
       { id: '3', role: 'user', content: "I can check with the printer if we need a rush job.", timestamp: new Date(Date.now() - 86400000 * 0.2 - 2000000).toISOString(), sender: { name: 'Ahmed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', isMe: false } },
       { id: '4', role: 'assistant', content: "That would be helpful. I found a local printer who can do it tonight.", timestamp: new Date(Date.now() - 86400000 * 0.2).toISOString(), artifacts: [
         { type: 'comparison-table', data: [
           { name: 'Wait for Delivery', values: { 'Arrival': 'Tomorrow', 'Cost': '$0', 'Risk': 'High' } },
           { name: 'Local Rush Print', values: { 'Arrival': 'Tonight', 'Cost': '500 SAR', 'Risk': 'Low' } }
         ]}
       ]}
    ]);

    // G3: Crypto Watchers
    // Context: User + Investing Group + Finance Agent
    await kv.set(`thread_messages_g3`, [
      { id: '1', role: 'user', content: "Market looks volatile today.", timestamp: new Date(Date.now() - 3600000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "Bitcoin is up 5% but Altcoins are bleeding. Here is the sentiment analysis.", timestamp: new Date(Date.now() - 3000000).toISOString(), artifacts: [
        { type: 'analytics-snapshot', data: { title: 'Market Sentiment', metrics: [
          { label: 'Bitcoin', value: '$64,200', change: '+5.2%', trend: 'up' },
          { label: 'Ethereum', value: '$3,400', change: '-1.2%', trend: 'down' },
          { label: 'Fear/Greed', value: '75', change: 'Greed', trend: 'neutral' }
        ]}}
      ]},
      { id: '3', role: 'user', content: "Should we buy the dip on ETH?", timestamp: new Date(Date.now() - 2000000).toISOString(), sender: { name: 'CryptoKing', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=King', isMe: false } }
    ]);

    // G4: Riyadh Foodies (Social/Interest)
    // Context: User + Friends + Dining Agent
    await kv.set(`thread_messages_g4`, [
      { id: '1', role: 'user', content: "Guys, I'm craving a really good smash burger. New places only.", timestamp: new Date(Date.now() - 86400000 * 0.1 - 4000000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "Three new spots opened this month with great reviews.", timestamp: new Date(Date.now() - 86400000 * 0.1 - 3900000).toISOString(), artifacts: [
        { type: 'poi-carousel', data: [
          { id: 'bg1', name: 'Smash & Dash', category: 'Burger Joint', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=2000', rating: 4.8, distance: '3 km', vibe: ['Casual', 'Late Night'], priceRange: '$$', openNow: true },
          { id: 'bg2', name: 'The Patty Shop', category: 'Gourmet Burger', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=2000', rating: 4.6, distance: '5 km', vibe: ['Trendy', 'Outdoor'], priceRange: '$$$', openNow: true },
          { id: 'bg3', name: 'Bun Meat Bun', category: 'Classic', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=2000', rating: 4.5, distance: '2 km', vibe: ['Quick', 'Family'], priceRange: '$', openNow: true }
        ]}
      ]},
      { id: '3', role: 'user', content: "Smash & Dash looks good. Can we get a table for 5 at 9 PM?", timestamp: new Date(Date.now() - 86400000 * 0.1 - 2000000).toISOString(), sender: { name: 'Faisal', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Faisal', isMe: false } },
      { id: '4', role: 'assistant', content: "They don't take reservations, but the current wait time is only 10 mins. I've added it to the group plan.", timestamp: new Date(Date.now() - 86400000 * 0.1).toISOString(), artifacts: [
        { type: 'map-view', data: { title: 'Dinner Destination', markers: [{ lat: 24.7136, lng: 46.6753, label: 'Smash & Dash' }] } }
      ]}
    ]);

    // G5: Weekend Football (Sports/Gathering)
    // Context: User + Teammates + Sports Agent
    await kv.set(`thread_messages_g5`, [
      { id: '1', role: 'user', content: "We need a pitch for this Tuesday. 8 vs 8.", timestamp: new Date(Date.now() - 86400000 * 1.2 - 4000000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "Checking availability at nearby fields for Tuesday night.", timestamp: new Date(Date.now() - 86400000 * 1.2 - 3900000).toISOString(), artifacts: [
        { type: 'service-menu', data: { title: 'Available Pitches', items: [
          { id: 'pt1', name: 'Al Awwal Park', price: '400 SAR', duration: '90 Mins', description: 'Premium Turf, Floodlights', popular: true },
          { id: 'pt2', name: 'City Sports Center', price: '250 SAR', duration: '60 Mins', description: 'Standard Grass, Outdoor' },
          { id: 'pt3', name: 'Indoor Arena', price: '350 SAR', duration: '60 Mins', description: 'AC Controlled, Hard Court' }
        ]}}
      ]},
      { id: '3', role: 'user', content: "Let's do Al Awwal Park. 90 mins.", timestamp: new Date(Date.now() - 86400000 * 1.2 - 2000000).toISOString(), sender: { name: 'Omar (Captain)', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omar', isMe: false } },
      { id: '4', role: 'assistant', content: "Booked! Please split the payment.", timestamp: new Date(Date.now() - 86400000 * 1.2).toISOString(), artifacts: [
        { type: 'ticket-pass', data: { id: 'tk-fb', eventName: 'Pitch Reservation', date: 'Tuesday', time: '20:00', seat: 'Field B', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Football', image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=2000', location: 'Al Awwal Park' } }
      ]}
    ]);

    // G6: Startup Founders (Networking/Co-workers)
    // Context: User + Network + Event Agent
    await kv.set(`thread_messages_g6`, [
      { id: '1', role: 'user', content: "Are any of us going to the Leap Tech Conference?", timestamp: new Date(Date.now() - 86400000 * 3 - 4000000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "Yes, Sarah and Mike have already registered. Here are the keynote sessions relevant to your sector.", timestamp: new Date(Date.now() - 86400000 * 3 - 3900000).toISOString(), artifacts: [
        { type: 'event-carousel', data: [
          { id: 'evt1', name: 'Future of AI', date: 'Day 1', time: '10:00 AM', location: 'Main Stage', image: 'https://images.unsplash.com/photo-1544531696-93484532e703?auto=format&fit=crop&q=80&w=2000', category: 'Keynote', attendees: 5000, price: 'Free' },
          { id: 'evt2', name: 'Fintech Revolution', date: 'Day 1', time: '02:00 PM', location: 'Hall B', image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=2000', category: 'Panel', attendees: 1200, price: 'Free' }
        ]}
      ]},
      { id: '3', role: 'user', content: "Register me for the AI keynote.", timestamp: new Date(Date.now() - 86400000 * 3 - 2000000).toISOString(), sender: { name: 'Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', isMe: false } },
      { id: '4', role: 'assistant', content: "Mike, you are already registered. I'll add it for you as well, [User].", timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), artifacts: [
         { type: 'confirmation-card', data: { id: 'conf-leap', title: 'Registration Confirmed', description: 'Future of AI Keynote - Leap Tech Conf', impact: 'Calendar blocked.', riskLevel: 'low', action: 'View Ticket' } }
      ]}
    ]);

    // G7: Book Club (Interest/Hobbies)
    // Context: User + Readers + Shopping Agent
    await kv.set(`thread_messages_g7`, [
      { id: '1', role: 'user', content: "Time to vote for next month's book!", timestamp: new Date(Date.now() - 86400000 * 4 - 4000000).toISOString(), sender: { name: 'Me', isMe: true } },
      { id: '2', role: 'assistant', content: "Here are the top 3 contenders based on the group's wishlist.", timestamp: new Date(Date.now() - 86400000 * 4 - 3900000).toISOString(), artifacts: [
        { type: 'product-carousel', data: [
          { id: 'bk1', name: 'The Midnight Library', brand: 'Fiction', price: '65 SAR', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=2000', description: 'Matt Haig', rating: 4.8 },
          { id: 'bk2', name: 'Atomic Habits', brand: 'Self-Help', price: '75 SAR', image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=2000', description: 'James Clear', rating: 4.9 },
          { id: 'bk3', name: 'Dune', brand: 'Sci-Fi', price: '80 SAR', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=2000', description: 'Frank Herbert', rating: 4.7 }
        ]}
      ]},
      { id: '3', role: 'user', content: "I vote for Atomic Habits.", timestamp: new Date(Date.now() - 86400000 * 4 - 2000000).toISOString(), sender: { name: 'Noura', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noura', isMe: false } },
      { id: '4', role: 'assistant', content: "Noted. It's currently leading the poll.", timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), artifacts: [
        { type: 'analytics-snapshot', data: { title: 'Voting Results', metrics: [
          { label: 'Atomic Habits', value: '60%', change: 'Leading', trend: 'up' },
          { label: 'Midnight Lib', value: '30%', change: '2nd', trend: 'neutral' },
          { label: 'Dune', value: '10%', change: '3rd', trend: 'down' }
        ]}}
      ]}
    ]);

    // Also seed Agent Groups in Context
    const currentContext = (await kv.get("user_context_v1")) || {};
    const updatedContext = {
        ...currentContext,
        agentGroups: [
            { name: "Family Planner", members: 3, id: "g1" },
            { name: "Work Logistics", members: 5, id: "g2" },
            { name: "Crypto Watchers", members: 12, id: "g3" },
            { name: "Riyadh Foodies", members: 8, id: "g4" },
            { name: "Weekend Football", members: 16, id: "g5" },
            { name: "Startup Founders", members: 42, id: "g6" },
            { name: "Book Club", members: 6, id: "g7" }
        ]
    };
    await kv.set("user_context_v1", updatedContext);

    return c.json({ success: true, message: "Seeded threads and context" });
  } catch (error) {
    console.error("Seed error:", error);
    return c.json({ error: error.message }, 500);
  }
});


// --- Context/State Persistence ---

// Get user context (friends, agents, etc.)
app.get("/make-server-e4305fae/context", async (c) => {
  try {
    const context = await kv.get("user_context_v1");
    // Default mock context if empty
    const defaultContext = {
      friends: [
        { id: '1', name: 'Sarah', status: 'online', activity: 'Browsing Cafes', avatar: 'https://i.pravatar.cc/150?u=sarah' },
        { id: '2', name: 'Faisal', status: 'away', activity: 'In a meeting', avatar: 'https://i.pravatar.cc/150?u=faisal' },
        { id: '3', name: 'Omar', status: 'online', activity: 'Near you', avatar: 'https://i.pravatar.cc/150?u=omar' },
      ],
      agents: [
        { id: 'a1', name: 'Dining Concierge', status: 'active', capabilities: ['Reservations', 'Dietary Prefs'], avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=dining' },
        { id: 'a2', name: 'Event Scout', status: 'idle', capabilities: ['Tickets', 'Guest List'], avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=event' },
      ]
    };
    return c.json(context || defaultContext);
  } catch (error) {
    console.error("Error fetching context:", error);
    return c.json({ error: "Failed to fetch context" }, 500);
  }
});

// Update user context
app.post("/make-server-e4305fae/context", async (c) => {
  try {
    const context = await c.req.json();
    await kv.set("user_context_v1", context);
    return c.json({ success: true });
  } catch (error) {
    console.error("Error saving context:", error);
    return c.json({ error: "Failed to save context" }, 500);
  }
});


// --- Vertical Configuration & Simulation ---

import { VERTICAL_CONFIGS, VerticalID } from './verticals_config.ts';

// 1. Get All Verticals
app.get("/make-server-e4305fae/config/verticals", (c) => {
  return c.json(Object.values(VERTICAL_CONFIGS));
});

// 2. Get Specific Vertical Config
app.get("/make-server-e4305fae/config/verticals/:id", (c) => {
  const id = c.req.param('id') as VerticalID;
  const config = VERTICAL_CONFIGS[id];
  if (!config) {
    return c.json({ error: "Vertical not found" }, 404);
  }
  return c.json(config);
});

// 3. Simulate Chat Interaction for Vertical
app.post("/make-server-e4305fae/simulation/chat", async (c) => {
  try {
    const { verticalId, message } = await c.req.json();
    const config = VERTICAL_CONFIGS[verticalId as VerticalID];
    
    if (!config) {
      return c.json({ error: "Invalid vertical ID" }, 400);
    }

    // Mock Response Logic
    const response = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      artifacts: [] as any[]
    };

    switch (verticalId) {
      case 'LOGISTICS':
        response.content = "Fleet status updated. Truck #42 has deviated from the route.";
        response.artifacts.push({
          type: 'logistics-map',
          data: { 
            assets: [
              { id: 'TRK-42', x: 45, y: 30, speed: 0, status: 'delayed', bearing: 90 },
              { id: 'TRK-12', x: 60, y: 55, speed: 65, status: 'moving', bearing: 180 }
            ] 
          }
        });
        response.artifacts.push({
           type: 'fleet-maintenance',
           data: { vehicleId: 'TRK-42', fuel: 15, tires: 85, serviceDue: 'Overdue' }
        });
        break;

      case 'AGTECH':
        response.content = "Alert: Soil moisture levels in Field B are critical. Livestock health is normal.";
        response.artifacts.push({
          type: 'crop-map',
          data: { sector: 'Field B', crop: 'Wheat', grid: [] }
        });
        response.artifacts.push({
          type: 'livestock-tracker',
          data: { id: 'COW-1092', temp: 39.2, activity: 'Resting', steps: 3200 }
        });
        break;

      case 'COMMERCE':
        response.content = "Flash sale started for Electronics! Only 45 minutes left.";
        response.artifacts.push({
          type: 'flash-sale',
          data: { name: 'Sony WH-1000XM5', price: 299, originalPrice: 399, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200', secondsRemaining: 2700 }
        });
        response.artifacts.push({
          type: 'product-card',
          data: { name: 'Sony WH-1000XM5', price: 299, discount: 25, rating: 4.8, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200' }
        });
        break;
        
      case 'ENTERPRISE':
        response.content = "New employee onboarding pending for Sarah Jenkins. Asset assignment required.";
        response.artifacts.push({
           type: 'hr-onboarding',
           data: { candidate: 'Sarah Jenkins', step: 'Asset Allocation', progress: 80 }
        });
        response.artifacts.push({
           type: 'asset-tracker',
           data: { assetName: 'MacBook Pro M3', serialNumber: 'C02-9921-X', status: 'Unassigned', assignedTo: null }
        });
        break;

      default:
        response.content = `Welcome to the ${config.label} module. How can I assist you?`;
    }

    return c.json({ message: response });

  } catch (error) {
     console.error("Simulation error:", error);
     return c.json({ error: "Simulation failed" }, 500);
  }
});


Deno.serve(app.fetch);