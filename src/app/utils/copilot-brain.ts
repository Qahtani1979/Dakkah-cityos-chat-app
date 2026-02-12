import type { Artifact } from '../types/copilot';
import { CopilotBrain } from './brain/CopilotBrain';

interface CopilotResponse {
  content: string;
  artifacts?: Artifact[];
  mode?: 'suggest' | 'propose' | 'execute';
  simulatedEvent?: string;
}

// Pattern matching for user intents
export function processUserMessage(input: string, systemAction?: any): CopilotResponse {
  const lowerInput = input.toLowerCase();

  // === SYSTEM ACTIONS ===
  if (systemAction) {
    if (systemAction.type === 'system_add_member') {
        const count = systemAction.ids.length;
        return {
            content: `I've updated the group settings. ${count} new member${count > 1 ? 's' : ''} have been added to the chat.${systemAction.shareHistory ? ' The conversation history has been shared to provide context.' : ' They will see new messages starting now.'}`,
            mode: 'execute'
        };
    }

    if (systemAction.type === 'simulate_event' && systemAction.name === 'sarah_vote') {
        // Randomize the winner for realism
        const options = ['Brew Crew', 'The Social Hub', 'Tech Park Cafe'];
        const winner = options[Math.floor(Math.random() * options.length)];
        
        return {
            content: "Update received: Sarah has cast her vote.",
            mode: 'execute',
            artifacts: [
               {
                   type: 'agent-sync-card',
                   data: {
                       title: 'Vote Received',
                       status: 'success',
                       type: 'social',
                       users: [
                           { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', status: 'accepted' }
                       ],
                       result: {
                           title: winner,
                           description: 'Sarah selected her preference.',
                           actions: [{ label: `Book Table at ${winner}`, action: `Book Table at ${winner}`, primary: true }],
                           details: [
                               { label: 'Winner', value: winner },
                               { label: 'Votes', value: '2/2 (100%)' }
                           ]
                       }
                   }
               }
            ]
        };
    }
  }

  // === 0. STATEFUL ACTION LOOPS (Priority 1) ===

  // --- Handling Action Chips from Sync Card ---
  
  // 1. Social: Book Table
  if (lowerInput.startsWith("book table at")) {
      const place = input.substring(14).trim();
      return {
          content: `I've secured a table at **${place}** for tonight. The invitation has been updated with the reservation details.`,
          mode: 'execute',
          artifacts: [
             {
                 type: 'agent-sync-card',
                 data: {
                     title: 'Reservation Confirmed',
                     status: 'success',
                     type: 'dining',
                     result: {
                        title: place,
                        description: 'Reservation Confirmed',
                        details: [
                            { label: 'Place', value: place },
                            { label: 'Time', value: 'Tonight, 8:00 PM' },
                            { label: 'Guests', value: '2 People' }
                        ]
                     }
                 }
             },
             { type: 'selection-chips', data: { question: 'Next?', options: ['Add to Calendar', 'Get Directions', 'Share Ticket'] } }
          ]
      };
  }

  // 2. Social: Send Options
  if (lowerInput.startsWith("send options to")) {
      const name = input.substring(16).trim();
      return {
          content: `I've sent the curated list to **${name}**. I'll notify you once they've voted on their favorite spot.`,
          mode: 'execute',
          simulatedEvent: 'sarah_vote',
          artifacts: [
              {
                  type: 'agent-sync-card',
                  data: {
                      title: 'Options Sent',
                      status: 'success',
                      type: 'social',
                      users: [
                          { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', status: 'viewing' }
                      ],
                      result: {
                        title: 'Waiting for Vote',
                        description: `Curated list sent to ${name}`,
                        details: [
                           { label: 'Recipient', value: name },
                           { label: 'Status', value: 'Delivered' }
                        ]
                      }
                  }
              }
          ]
      };
  }

  // 3. Social: Edit Criteria
  if (lowerInput === "edit criteria") {
      return {
          content: "Sure, what would you like to change?",
          mode: 'suggest',
          artifacts: [
              { type: 'selection-chips', data: { question: 'Suggestions:', options: ['Change Time to 9 PM', 'Switch to Sushi', 'Different Area'] } }
          ]
      };
  }

  // 4. Transport: Book Now
  if (lowerInput.includes("book now") && lowerInput.includes("sar")) {
      return {
          content: "Ride confirmed. Your driver is on the way.",
          mode: 'execute',
          artifacts: [
              {
                  type: 'agent-sync-card',
                  data: {
                      type: 'transport',
                      title: "Driver En Route",
                      steps: ["Payment Verified", "Driver Assigned"],
                      result: {
                          title: "Lexus ES • 3 min",
                          description: "Your ride is confirmed.",
                          details: {
                              id: `ride-${Date.now()}`,
                              orderNumber: "R-998822",
                              status: "arriving",
                              items: ["Lexus ES", "Confirmed"],
                              total: "SAR 45.00",
                              estimatedTime: "3 min"
                          }
                      }
                  }
              },
               { type: 'selection-chips', data: { question: 'Actions:', options: ['Call Driver', 'Share Trip Status', 'Cancel Ride'] } }
          ]
      };
  }

  // 5. Transport: Cheaper Option
  if (lowerInput.includes("see cheaper option")) {
      return {
          content: "I found an Economy option nearby.",
          mode: 'suggest',
          artifacts: [
             {
                  type: 'agent-sync-card',
                  data: {
                      type: 'transport',
                      title: "Economy Found",
                      steps: ["Re-scanning...", "Found Economy"],
                      result: {
                          title: "Toyota Camry • 5 min",
                          description: "Economy ride for SAR 28.",
                          details: {
                              id: `ride-${Date.now()}`,
                              orderNumber: "R-998823",
                              status: "on-the-way",
                              items: ["Toyota Camry", "Economy"],
                              total: "SAR 28.00",
                              estimatedTime: "5 min"
                          }
                      }
                  }
              },
              { type: 'selection-chips', data: { question: 'Confirm?', options: ['Book Economy (SAR 28)', 'Stick to Business', 'Cancel'] } }
          ]
      };
  }
  
  // 6. Invitation: Send via...
  if (lowerInput.includes("send via whatsapp")) {
      return {
          content: "I've generated a unique link for your invitation. Opening WhatsApp now...",
          mode: 'execute'
      };
  }

  if (lowerInput.includes("send via dakkah")) {
       return {
          content: "Invitation sent directly to their Dakkah Inbox.",
          mode: 'execute',
          artifacts: [
              {
                  type: 'agent-sync-card',
                  data: {
                      title: 'Invitation Sent',
                      status: 'success',
                      type: 'general',
                      result: {
                          title: 'Invitation Sent',
                          description: 'Delivered to Dakkah Inbox',
                          details: [
                             { label: 'Channel', value: 'Dakkah Direct' }
                          ]
                      }
                  }
              }
          ]
      };
  }
  
  // 7. Simulation: Sarah Voting
  if (lowerInput.includes("simulate sarah voting")) {
      return {
          content: "Update received: Sarah has cast her vote.",
          mode: 'execute',
          artifacts: [
             {
                 type: 'confirmation-card',
                 data: {
                     title: 'Vote Received',
                     riskLevel: 'low',
                     description: 'Sarah selected her preference.',
                     action: 'Book Table at Brew Crew',
                     details: [
                         { label: 'Winner', value: 'Brew Crew' },
                         { label: 'Votes', value: '2/2 (100%)' }
                     ]
                 }
             }
          ]
      };
  }
  
  // Agent-to-Agent Sync (Meetup Planner)
  if (lowerInput.includes("contact") && lowerInput.includes("agent") && lowerInput.includes("match our shared preferences")) {
     // Extract Name, Vibe, Time
     const nameMatch = input.match(/Contact (.+?)'s agent/);
     const name = nameMatch ? nameMatch[1] : "Friend";
     
     const vibeMatch = input.match(/rated (.+?) spots/);
     const vibe = vibeMatch ? vibeMatch[1] : "Coffee";

     return {
        content: `I'm on it. Initiating secure handshake with **${name}'s Personal Agent** to negotiate a plan.`,
        mode: 'execute',
        artifacts: [
           {
              type: 'agent-sync-card',
              data: {
                 type: 'social',
                 title: `Syncing with ${name}`,
                 steps: [
                    "Connecting...",
                    "Checking Calendar...",
                    "Matching Tastes...",
                    "Found 3 Spots"
                 ],
                 users: [
                     { name: 'Me', initials: 'ME' },
                     { name: name, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' }
                 ],
                 result: {
                    title: "Perfect Match Found",
                    description: `${name} is free tonight after 8 PM.`,
                    details: {
                        id: `evt-match-${Date.now()}`,
                        eventName: `Meetup with ${name}`,
                        date: "Tonight",
                        time: "8:00 PM",
                        seat: "Confirmed",
                        qrCode: "sync-handshake-auth",
                        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
                        location: "Brew Crew (Proposed)"
                    }
                 }
              }
           },
           {
              type: 'poi-carousel',
              data: {
                 pois: [
                    { id: 'm1', name: 'Brew Crew', category: 'Specialty Coffee', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80', rating: 4.9, distance: '1.2 km', vibe: ['#quiet', '#artisanal'], priceRange: '$$', openNow: true },
                    { id: 'm2', name: 'Camel Step', category: 'Roastery', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80', rating: 4.8, distance: '2.5 km', vibe: ['#expert', '#spacious'], priceRange: '$$', openNow: true },
                    { id: 'm3', name: 'Elixir Bunn', category: 'Coffee House', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', rating: 4.7, distance: '3.0 km', vibe: ['#classic', '#cozy'], priceRange: '$$', openNow: true },
                 ]
              }
           },
           { type: 'selection-chips', data: { question: 'Next Step:', options: [`Book Table at Brew Crew`, `Send Options to ${name}`, 'Edit Criteria'] } }
        ]
     };
  }

  // Transport Flow Example
  if (lowerInput.includes("book a ride") || lowerInput.includes("get me a car")) {
      return {
          content: "I'm contacting nearby fleets to find you the best ride.",
          mode: 'execute',
          artifacts: [
              {
                  type: 'agent-sync-card',
                  data: {
                      type: 'transport',
                      title: "Finding Ride",
                      steps: [
                          "Scanning Fleets...",
                          "Comparing Prices...",
                          "Priority Check...",
                          "Ride Secured"
                      ],
                      result: {
                          title: "Lexus ES • 3 min away",
                          description: "Found a Lexus ES via Careem for SAR 45.",
                          details: {
                              id: `ride-${Date.now()}`,
                              orderNumber: "R-998821",
                              status: "on-the-way",
                              items: ["Lexus ES", "Careem Business"],
                              total: "SAR 45.00",
                              estimatedTime: "3 min"
                          }
                      }
                  }
              },
              { type: 'selection-chips', data: { question: 'Confirm Ride?', options: ['Book Now (SAR 45)', 'See Cheaper Option', 'Cancel'] } }
          ]
      };
  }
  
  if (lowerInput.includes("draft a smart invitation")) {
      const nameMatch = input.match(/invitation to (.+?) for/);
      const name = nameMatch ? nameMatch[1] : "Friend";
      
      return {
         content: `I've drafted a smart invitation for **${name}**. It includes interactive voting options so they can choose their favorite spot.`,
         mode: 'propose',
         artifacts: [
            {
               type: 'agent-sync-card',
               data: {
                  title: 'Smart Invite Ready',
                  status: 'warning', // Warning state used for 'Draft'
                  type: 'general',
                  result: {
                      title: 'Draft Invitation',
                      description: 'Ready to send',
                      details: [
                         { label: 'Recipient', value: name },
                         { label: 'Format', value: 'Interactive Card' },
                         { label: 'Options', value: '3 Places Included' }
                      ]
                  }
               }
            },
            { type: 'selection-chips', data: { question: 'Ready to send?', options: ['Send via WhatsApp', 'Send via Dakkah', 'Edit Message'] } }
         ]
      };
  }

  // Service Selection -> Configuration
  if (lowerInput.includes('selected service') || lowerInput.includes('standard cleaning') || lowerInput.includes('deep cleaning')) {
     return {
       content: `Great choice. How many rooms should we cover?`,
       mode: 'execute',
       artifacts: [
         {
           type: 'form-group',
           data: {
             id: 'f1',
             title: 'Configuration',
             type: 'checkbox',
             options: [
               { id: 'o1', label: '1 Bedroom', value: '1b', price: 'Included' },
               { id: 'o2', label: '2 Bedrooms', value: '2b', price: '+SAR 50' },
               { id: 'o3', label: '3+ Bedrooms', value: '3b', price: '+SAR 100' },
               { id: 'o4', label: 'Kitchen Deep Clean', value: 'k', price: '+SAR 40' }
             ]
           }
         },
         { type: 'selection-chips', data: { question: 'Next Step', options: ['Confirm & Schedule'] } }
       ]
     };
  }

  // === AGENT & GROUP CHAT SIMULATION ===
  if ((lowerInput.includes('group') && (lowerInput.includes('chat') || lowerInput.includes('session'))) || lowerInput.includes('start group') || lowerInput.includes('team chat')) {
     return {
       content: `I've opened a secure **Group Session**.\n\n**Participants:**\n• You\n• Dining Concierge (AI)\n• Sarah (Friend)\n• Faisal (Friend)\n\nThe **Dining Concierge** is analyzing everyone's dietary preferences...`,
       mode: 'execute',
       artifacts: [
         {
           type: 'poi-carousel',
           data: {
             pois: [
               { id: 'grp1', name: 'Voting: Dinner Spot', category: 'Poll', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', rating: 4.8, distance: 'Active', vibe: ['#voting', '#group'], priceRange: '3 Votes', openNow: true },
             ]
           }
         },
         { type: 'selection-chips', data: { question: 'Concierge Suggestion:', options: ['View Proposals', 'Change Participants', 'Cancel Session'] } }
       ]
     };
  }

  // === 1. DATA-DRIVEN BRAIN (Priority 2) ===
  // Checks JSON scenarios first
  const brainResponse = CopilotBrain.process(input);
  if (brainResponse) {
    return brainResponse;
  }

  // === 2. LEGACY / COMPLEX LOGIC (Priority 3) ===
  
  // POI Details (Card Click Simulation)
  if (lowerInput.startsWith('tell me more about')) {
    const poiName = input.substring(18).trim(); 
    return {
      content: `Here are the details for **${poiName}**.\n\nIt is a highly rated spot known for its unique atmosphere. Would you like to navigate there or see similar places?`,
      mode: 'execute',
      artifacts: [
        {
          type: 'poi-carousel',
          data: {
            pois: [
              { id: 'sel1', name: poiName, category: 'Selected', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80', rating: 4.9, distance: '0.0 km', vibe: ['#selected', '#details'], priceRange: '$$', openNow: true },
            ]
          }
        },
        { type: 'selection-chips', data: { question: 'Action?', options: ['Navigate', 'Call', 'Book Now', 'Share'] } }
      ]
    };
  }

  // Refinements (Legacy)
  // 4. Nightlife Refinements
  if (['chill', 'party', 'romantic', 'business', 'energetic', 'quiet'].includes(lowerInput)) {
    return {
      content: `Setting the vibe to **${input}**.`,
      mode: 'suggest',
      artifacts: [
        {
          type: 'poi-carousel',
          data: {
            pois: [
              { id: 'nl_ref1', name: `The ${input} Spot`, category: 'Lounge', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80', rating: 4.8, distance: '2 km', vibe: [`#${lowerInput}`, '#music'], priceRange: '$$$', openNow: true },
              { id: 'nl_ref2', name: 'Sky High', category: 'Rooftop', image: 'https://images.unsplash.com/photo-1519671482538-518b5c2a9d67?auto=format&fit=crop&w=600&q=80', rating: 4.9, distance: '1.5 km', vibe: ['#views', `#${lowerInput}`], priceRange: '$$$$', openNow: true },
            ]
          }
        },
        { type: 'selection-chips', data: { question: 'Music?', options: ['Jazz', 'House', 'Pop', 'Live Band'] } }
      ]
    };
  }

  // Fallback for unrecognized input
  return {
    content: "I'm still learning about that. Try asking for places, services, or events nearby.",
    mode: 'suggest',
    artifacts: [
      { type: 'selection-chips', data: { question: 'Try these:', options: ['Best Coffee', 'Book a Cleaner', 'Events tonight', 'Traffic'] } }
    ]
  };
}