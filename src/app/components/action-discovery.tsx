import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, X, Compass, Map, Calendar, 
  TrendingUp, Coffee, Music, 
  Utensils, Camera, Bike, Moon, Sun,
  Navigation, Users, Heart, Sparkles,
  Zap, Ticket, Landmark, Building, Building2,
  Leaf, DollarSign, Dumbbell, Book, 
  Cloud, Car, Plane, Gift, Briefcase, 
  GraduationCap, Stethoscope, Mountain, 
  Tent, Trees, Umbrella, Wind,
  ShoppingBag, Anchor,
  Wifi, Monitor, Footprints,
  Baby, Dog, Wine, Beer, Pizza,
  CreditCard, Fuel,
  Train, Bus, Shirt, Scissors,
  Pill, Activity, UtensilsCrossed,
  Martini, PartyPopper, Mic,
  Printer, Truck, Pencil, 
  Languages, Wrench, Hammer, 
  Armchair, Key, Flower2, 
  Gamepad2, Trophy, HeartHandshake,
  Smile, Sofa, WashingMachine,
  ChefHat, Droplet, Lightbulb,
  Smartphone, Paintbrush, 
  Music2, Video, Speaker,
  Library, Calculator, Globe,
  Clock, Scale, Shield, Scroll,
  Drama, Store, Home, PieChart,
  ShoppingBasket, Target, Cpu, Brain, FerrisWheel,
  Package, Recycle, Banknote, Eye, Sword, Swords, Palette,
  Waves, Flag, Apple, LayoutGrid, ChevronRight,
  IceCreamCone, Cherry, Presentation
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { projectId } from '../../utils/supabase/info';

interface ActionDiscoveryProps {
  onClose: () => void;
  onSelect: (prompt: string) => void;
  onActivateVertical?: (id: string) => void;
}

type Category = 
  | 'All' 
  | 'Food & Drink' 
  | 'Nightlife' 
  | 'Culture' 
  | 'Wellness' 
  | 'Shopping' 
  | 'Services' 
  | 'Transit' 
  | 'Family' 
  | 'Work'
  | 'Education'
  | 'Home'
  | 'Social'
  | 'Intel' 
  | 'Planning'
  | 'Outdoor'
  | 'Beauty'
  | 'Health'
  | 'My Activity'
  | 'Utility';

interface CategoryConfig {
  label: Category;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
}

const CATEGORY_THEMES: Record<Category, CategoryConfig> = {
  'All': { label: 'All', icon: LayoutGrid, color: 'text-stone-600', bg: 'bg-stone-100', border: 'border-stone-200' },
  'Food & Drink': { label: 'Food & Drink', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  'Nightlife': { label: 'Nightlife', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
  'Culture': { label: 'Culture', icon: Landmark, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  'Wellness': { label: 'Wellness', icon: Leaf, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
  'Shopping': { label: 'Shopping', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  'Services': { label: 'Services', icon: Wrench, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100' },
  'Transit': { label: 'Transit', icon: Car, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
  'Family': { label: 'Family', icon: Baby, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
  'Work': { label: 'Work', icon: Briefcase, color: 'text-zinc-600', bg: 'bg-zinc-50', border: 'border-zinc-100' },
  'Education': { label: 'Education', icon: GraduationCap, color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
  'Home': { label: 'Home', icon: Home, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
  'Social': { label: 'Social', icon: Users, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
  'Intel': { label: 'Intel', icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
  'Planning': { label: 'Planning', icon: Map, color: 'text-lime-600', bg: 'bg-lime-50', border: 'border-lime-100' },
  'Outdoor': { label: 'Outdoor', icon: Mountain, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  'Beauty': { label: 'Beauty', icon: Sparkles, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50', border: 'border-fuchsia-100' },
  'Health': { label: 'Health', icon: Activity, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
  'My Activity': { label: 'My Activity', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  'Utility': { label: 'Utility', icon: Calculator, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100' },
};

interface ActionItem {
  id: string;
  title: string;
  prompt: string;
  category: Category;
  icon: React.ElementType;
}

const actions: ActionItem[] = [
  // Food & Drink
  { id: '101', title: 'Best Coffee', prompt: 'Show me the best rated coffee shops nearby', category: 'Food & Drink', icon: Coffee },
  { id: '102', title: 'Healthy Eats', prompt: 'Find healthy dining options nearby', category: 'Food & Drink', icon: Leaf },
  { id: '103', title: 'Luxury Dinner', prompt: 'Find a fine dining experience', category: 'Food & Drink', icon: UtensilsCrossed },
  { id: '104', title: 'Street Food', prompt: 'Where are the best street food spots?', category: 'Food & Drink', icon: Pizza },
  { id: '105', title: 'Brunch Spots', prompt: 'Find a great place for brunch', category: 'Food & Drink', icon: Sun },
  { id: '106', title: 'Vegan', prompt: 'Find vegan restaurants', category: 'Food & Drink', icon: Leaf },
  { id: '107', title: 'Bakeries', prompt: 'Where is the nearest artisan bakery?', category: 'Food & Drink', icon: ChefHat },
  { id: '108', title: 'Craft Beer', prompt: 'Show me local craft breweries', category: 'Food & Drink', icon: Beer },
  { id: '109', title: 'Wine Bars', prompt: 'Find a quiet wine bar', category: 'Food & Drink', icon: Wine },
  { id: '111', title: 'Bubble Tea', prompt: 'Find the best bubble tea nearby', category: 'Food & Drink', icon: Coffee },
  { id: '112', title: 'Food Trucks', prompt: 'Are there any food truck parks nearby?', category: 'Food & Drink', icon: Truck },
  { id: '113', title: 'Matcha', prompt: 'Find the best matcha latte nearby', category: 'Food & Drink', icon: Leaf },
  { id: '114', title: 'Sushi', prompt: 'Find top rated sushi spots', category: 'Food & Drink', icon: UtensilsCrossed },
  { id: '115', title: 'Burgers', prompt: 'Where are the best burgers?', category: 'Food & Drink', icon: Pizza },
  { id: '116', title: 'Steakhouse', prompt: 'Find a premium steakhouse', category: 'Food & Drink', icon: Utensils },
  { id: '117', title: 'Ice Cream', prompt: 'Find best ice cream and gelato', category: 'Food & Drink', icon: IceCreamCone },
  { id: '118', title: 'Pizza', prompt: 'Find authentic wood-fired pizza', category: 'Food & Drink', icon: Pizza },
  { id: '125', title: 'Acai Bowls', prompt: 'Find acai and smoothie bowls', category: 'Food & Drink', icon: Cherry },
  
  // Nightlife
  { id: '201', title: 'Rooftops', prompt: 'Show me rooftop bars with a view', category: 'Nightlife', icon: Cloud },
  { id: '202', title: 'Live Music', prompt: 'Find live music venues open now', category: 'Nightlife', icon: Music },
  { id: '203', title: 'Cocktails', prompt: 'Where can I get good cocktails?', category: 'Nightlife', icon: Martini },
  { id: '204', title: 'Clubs', prompt: 'Show me trending nightclubs', category: 'Nightlife', icon: PartyPopper },
  { id: '205', title: 'Comedy', prompt: 'Find a comedy club', category: 'Nightlife', icon: Mic },
  { id: '206', title: 'Late Night', prompt: 'Where can I eat after midnight?', category: 'Nightlife', icon: Moon },
  { id: '207', title: 'Jazz Bars', prompt: 'Find a cozy jazz bar', category: 'Nightlife', icon: Music2 },
  { id: '208', title: 'Speakeasies', prompt: 'Find hidden speakeasy bars', category: 'Nightlife', icon: Key },

  // Culture
  { id: '301', title: 'Museums', prompt: 'List the top museums in the city', category: 'Culture', icon: Landmark },
  { id: '302', title: 'Art Galleries', prompt: 'Show me current art exhibitions', category: 'Culture', icon: Ticket },
  { id: '304', title: 'Architecture', prompt: 'Show me notable architecture nearby', category: 'Culture', icon: Building },
  { id: '305', title: 'Historical', prompt: 'Show me historical sites', category: 'Culture', icon: Scroll },
  { id: '306', title: 'Theatre', prompt: 'What plays are showing?', category: 'Culture', icon: Drama },
  { id: '307', title: 'Cinema', prompt: 'Show movie showtimes nearby', category: 'Culture', icon: Video },
  { id: '308', title: 'Local Events', prompt: "What's happening in town tonight?", category: 'Culture', icon: Calendar },
  { id: '310', title: 'Bookstore', prompt: 'Find a cozy bookstore', category: 'Culture', icon: Book },
  { id: '311', title: 'Libraries', prompt: 'Find public libraries and archives', category: 'Culture', icon: Book },
  { id: '320', title: 'Festivals', prompt: 'Show upcoming festivals and fairs', category: 'Culture', icon: Tent },
  { id: '321', title: 'Sports Tickets', prompt: 'Buy tickets for sports matches', category: 'Culture', icon: Ticket },

  // Wellness
  { id: '401', title: 'Mental Wellness', prompt: 'Find therapists and counseling', category: 'Wellness', icon: Brain },
  { id: '402', title: 'Specialists', prompt: 'Find physiotherapists and chiros', category: 'Wellness', icon: Stethoscope },
  { id: '404', title: 'Recovery Labs', prompt: 'Find cryotherapy and float tanks', category: 'Wellness', icon: Sparkles },
  { id: '407', title: 'Spas', prompt: 'I need a relaxing spa', category: 'Wellness', icon: Sparkles },
  { id: '408', title: 'Yoga', prompt: 'Find a yoga studio nearby', category: 'Wellness', icon: Activity },
  { id: '409', title: 'Meditation', prompt: 'Find meditation and mindfulness centers', category: 'Wellness', icon: Moon },
  { id: '410', title: 'Nutrition', prompt: 'Find dietitians and nutritionists', category: 'Wellness', icon: Apple },
  { id: '411', title: 'Pilates', prompt: 'Find reformer pilates studios', category: 'Wellness', icon: Activity },

  // Shopping
  { id: '501', title: 'Malls', prompt: 'Where are the biggest shopping malls?', category: 'Shopping', icon: ShoppingBag },
  { id: '502', title: 'Boutiques', prompt: 'Find unique fashion boutiques', category: 'Shopping', icon: Shirt },
  { id: '503', title: 'Markets', prompt: 'Are there any flea markets open?', category: 'Shopping', icon: Store },
  { id: '505', title: 'Electronics', prompt: 'Where can I buy electronics?', category: 'Shopping', icon: Monitor },
  { id: '506', title: 'Souvenirs', prompt: 'Where can I buy local souvenirs?', category: 'Shopping', icon: Gift },
  { id: '508', title: 'Groceries', prompt: 'Where is the nearest supermarket?', category: 'Shopping', icon: ShoppingBasket },
  { id: '509', title: 'Sneakers', prompt: 'Find limited edition sneakers', category: 'Shopping', icon: Footprints },
  { id: '510', title: 'Luxury', prompt: 'Show me luxury brand boutiques', category: 'Shopping', icon: ShoppingBag },
  { id: '513', title: 'Perfume', prompt: 'Where can I buy niche perfumes?', category: 'Shopping', icon: Droplet },
  { id: '514', title: 'Jewelry', prompt: 'Find jewelry and watch stores', category: 'Shopping', icon: Sparkles },
  { id: '515', title: 'Kids Store', prompt: 'Find toy stores and kids clothing', category: 'Shopping', icon: Gift },
  { id: '516', title: 'Pet Store', prompt: 'Find pet supplies and food', category: 'Shopping', icon: Dog },
  { id: '517', title: 'Sports', prompt: 'Find sports gear and equipment', category: 'Shopping', icon: Activity },
  { id: '519', title: 'Art Supplies', prompt: 'Find art and craft supplies', category: 'Shopping', icon: Paintbrush },
  { id: '522', title: 'Fabrics', prompt: 'Find textile and fabric shops', category: 'Shopping', icon: Scissors },
  { id: '523', title: 'Gaming', prompt: 'Find video game stores', category: 'Shopping', icon: Gamepad2 },

  // Services
  { id: '601', title: 'Legal Aid', prompt: 'Find lawyers and notaries', category: 'Services', icon: Scale },
  { id: '602', title: 'Automotive', prompt: 'Find mechanics and detailing', category: 'Services', icon: Wrench },
  { id: '603', title: 'Pet Health', prompt: 'Find vets and pet clinics', category: 'Services', icon: Stethoscope },
  { id: '604', title: 'Government', prompt: 'Find embassies and government centers', category: 'Services', icon: Landmark },
  { id: '605', title: 'Financial', prompt: 'Find accountants and tax services', category: 'Services', icon: Briefcase },
  { id: '606', title: 'Banks', prompt: 'Find an ATM or bank branch', category: 'Services', icon: CreditCard },
  { id: '607', title: 'Tailors', prompt: 'Find a clothing alteration service', category: 'Services', icon: Scissors },
  { id: '609', title: 'Tech Repair', prompt: 'Fix my phone or laptop', category: 'Services', icon: Cpu },
  { id: '611', title: 'Dry Cleaning', prompt: 'Find dry cleaners and laundry', category: 'Services', icon: Shirt },
  { id: '612', title: 'Courier', prompt: 'Find shipping and post offices', category: 'Services', icon: Truck },
  { id: '613', title: 'Florist', prompt: 'Find a florist for gifts', category: 'Services', icon: Flower2 },
  { id: '614', title: 'Photography', prompt: 'Find a photo studio or photographer', category: 'Services', icon: Camera },
  { id: '615', title: 'Storage', prompt: 'Find self-storage units', category: 'Services', icon: Package },
  { id: '616', title: 'Recycling', prompt: 'Find recycling centers', category: 'Services', icon: Recycle },
  { id: '617', title: 'Exchange', prompt: 'Find currency exchange', category: 'Services', icon: Banknote },
  { id: '619', title: 'Real Estate', prompt: 'Find property agents', category: 'Services', icon: Home },
  { id: '621', title: 'Childcare', prompt: 'Find daycares and nannies', category: 'Services', icon: Baby },
  { id: '622', title: 'Catering', prompt: 'Find catering services', category: 'Services', icon: ChefHat },
  { id: '624', title: 'Printing', prompt: 'Find print shops', category: 'Services', icon: Printer },
  { id: '630', title: 'Visa Services', prompt: 'Find visa application centers', category: 'Services', icon: Globe },
  { id: '631', title: 'Pay Fines', prompt: 'Check and pay traffic fines', category: 'Services', icon: Banknote },
  { id: '632', title: 'City Report', prompt: 'Report a city maintenance issue', category: 'Services', icon: Flag },
  { id: '640', title: 'Movers', prompt: 'Find home moving services', category: 'Services', icon: Truck },
  { id: '645', title: 'Pet Grooming', prompt: 'Find pet groomers nearby', category: 'Services', icon: Scissors },
  { id: '646', title: 'Dog Walking', prompt: 'Find dog walkers', category: 'Services', icon: Footprints },
  { id: '650', title: 'Property Mgmt', prompt: 'Find property management', category: 'Services', icon: Building2 },

  // Transit
  { id: '701', title: 'Traffic', prompt: 'How is the traffic situation?', category: 'Transit', icon: Car },
  { id: '702', title: 'Airport', prompt: 'What is the best way to get to the airport?', category: 'Transit', icon: Plane },
  { id: '703', title: 'Parking', prompt: 'Find parking lots nearby', category: 'Transit', icon: Car },
  { id: '704', title: 'Gas Stations', prompt: 'Where is the nearest gas station?', category: 'Transit', icon: Fuel },
  { id: '705', title: 'EV Charging', prompt: 'Find electric vehicle charging stations', category: 'Transit', icon: Zap },
  { id: '706', title: 'Metro', prompt: 'Show me the nearest metro station', category: 'Transit', icon: Train },
  { id: '707', title: 'Bike Routes', prompt: 'Show me scenic bike routes', category: 'Transit', icon: Bike },
  { id: '708', title: 'Bike Rental', prompt: 'Rent a bike nearby', category: 'Transit', icon: Bike },
  { id: '709', title: 'Rideshare', prompt: 'Book a ride or taxi nearby', category: 'Transit', icon: Car },
  { id: '710', title: 'Scooters', prompt: 'Find electric scooters for rent', category: 'Transit', icon: Zap },
  { id: '711', title: 'Car Rental', prompt: 'Find car rental agencies', category: 'Transit', icon: Key },
  { id: '712', title: 'Trains', prompt: 'Check train schedules and stations', category: 'Transit', icon: Train },
  { id: '713', title: 'Flights', prompt: 'Check flight status and departures', category: 'Transit', icon: Plane },

  // Work
  { id: '1101', title: 'Coworking', prompt: 'Find a coworking space with good wifi', category: 'Work', icon: Briefcase },
  { id: '1102', title: 'Private Offices', prompt: 'Find private offices for teams', category: 'Work', icon: Building2 },
  { id: '1103', title: 'Meeting Rooms', prompt: 'Rent a meeting room for an hour', category: 'Work', icon: Users },
  { id: '1106', title: 'Networking', prompt: 'Find business networking events', category: 'Work', icon: HeartHandshake },
  { id: '1110', title: 'Business Reg', prompt: 'Register a new business', category: 'Work', icon: Briefcase },
  { id: '322', title: 'Conferences', prompt: 'Find professional conferences', category: 'Work', icon: Presentation },

  // Education
  { id: '1201', title: 'Libraries', prompt: 'Find public libraries', category: 'Education', icon: Library },
  { id: '1202', title: 'Universities', prompt: 'Show me nearby universities', category: 'Education', icon: GraduationCap },
  { id: '1204', title: 'Language Schools', prompt: 'Find language learning centers', category: 'Education', icon: Languages },
  { id: '1205', title: 'Tutoring', prompt: 'Find math or science tutors', category: 'Education', icon: Calculator },
  { id: '1206', title: 'Workshops', prompt: 'Find creative workshops nearby', category: 'Education', icon: Sparkles },
  { id: '1208', title: 'Coding', prompt: 'Find coding bootcamps', category: 'Education', icon: Monitor },

  // Home (Includes Gardening)
  { id: '1301', title: 'Handyman', prompt: 'Find a reliable handyman', category: 'Home', icon: Hammer },
  { id: '1302', title: 'Cleaning', prompt: 'Book a home cleaning service', category: 'Home', icon: Sparkles },
  { id: '1303', title: 'Furniture', prompt: 'Find furniture stores nearby', category: 'Home', icon: Armchair },
  { id: '1304', title: 'Decor', prompt: 'Where can I buy home decor?', category: 'Home', icon: Sofa },
  { id: '1306', title: 'Garden', prompt: 'Find a garden center or nursery', category: 'Home', icon: Flower2 },
  { id: '1307', title: 'Plumbers', prompt: 'Find emergency plumbers', category: 'Home', icon: Droplet },
  { id: '1308', title: 'Electricians', prompt: 'Find licensed electricians', category: 'Home', icon: Lightbulb },
  { id: '1309', title: 'Locksmiths', prompt: 'Find a 24/7 locksmith', category: 'Home', icon: Key },
  { id: '1310', title: 'Plant Doctor', prompt: 'Diagnose plant health issues', category: 'Home', icon: Leaf },

  // Social
  { id: '1401', title: 'Bowling', prompt: 'Find a bowling alley', category: 'Social', icon: Trophy },
  { id: '1402', title: 'Karaoke', prompt: 'Where is a karaoke bar?', category: 'Social', icon: Mic },
  { id: '1403', title: 'Board Games', prompt: 'Find a board game cafe', category: 'Social', icon: Gamepad2 },
  { id: '1404', title: 'Escape Rooms', prompt: 'Find escape rooms nearby', category: 'Social', icon: Key },
  { id: '1405', title: 'Picnic Spots', prompt: 'Best spots for a group picnic', category: 'Social', icon: Trees },
  { id: '1407', title: 'Meetups', prompt: 'Find social meetups near me', category: 'Social', icon: Users },
  { id: '1413', title: 'Padel Club', prompt: 'Book a Padel court for 4', category: 'Social', icon: Activity },
  { id: '414', title: 'Sports Leagues', prompt: 'Join a local sports league', category: 'Social', icon: Trophy },

  // Family
  { id: '801', title: 'Indoor Play', prompt: 'Find soft play areas and arcades', category: 'Family', icon: Gamepad2 },
  { id: '802', title: 'Theme Parks', prompt: 'Find amusement parks and rides', category: 'Family', icon: FerrisWheel },
  { id: '804', title: 'Baby & Mom', prompt: 'Find baby gear and maternity stores', category: 'Family', icon: Baby },
  { id: '806', title: 'Schools', prompt: 'Show me top rated schools in this area', category: 'Family', icon: GraduationCap },
  { id: '807', title: 'Daycare', prompt: 'Find child daycare centers', category: 'Family', icon: Baby },

  // Outdoor
  { id: '1601', title: 'Hiking', prompt: 'Find hiking trails nearby', category: 'Outdoor', icon: Mountain },
  { id: '1602', title: 'Camping', prompt: 'Find desert camping spots', category: 'Outdoor', icon: Tent },
  { id: '1603', title: 'Parks', prompt: 'Show me large public parks', category: 'Outdoor', icon: Trees },
  { id: '1605', title: 'Dog Parks', prompt: 'Find off-leash dog parks', category: 'Outdoor', icon: Trees },
  { id: '1610', title: 'Cycling', prompt: 'Find cycling routes', category: 'Outdoor', icon: Bike },
  { id: '1612', title: 'Golf', prompt: 'Find golf courses', category: 'Outdoor', icon: Flag },
  { id: '1620', title: 'Urban Farm', prompt: 'Find community gardens', category: 'Outdoor', icon: Flower2 },
  { id: '1622', title: 'Organic Market', prompt: 'Find organic produce markets', category: 'Shopping', icon: Apple },

  // Beauty
  { id: '1701', title: 'Barbers', prompt: 'Find top-rated barber shops', category: 'Beauty', icon: Scissors },
  { id: '1702', title: 'Salons', prompt: 'Find luxury hair salons', category: 'Beauty', icon: Sparkles },
  { id: '1703', title: 'Nails', prompt: 'Find nail spas nearby', category: 'Beauty', icon: Sparkles },
  { id: '1704', title: 'Makeup', prompt: 'Find professional makeup artists', category: 'Beauty', icon: Paintbrush },

  // Health
  { id: '1801', title: 'Pharmacy', prompt: 'Find a 24/7 pharmacy', category: 'Health', icon: Pill },
  { id: '1802', title: 'Hospital', prompt: 'Find the nearest hospital', category: 'Health', icon: Activity },
  { id: '1803', title: 'Dentist', prompt: 'Find a dental clinic', category: 'Health', icon: Smile },
  { id: '406', title: 'Gyms', prompt: 'Find a gym with day passes', category: 'Health', icon: Dumbbell },
  { id: '1805', title: 'Emergency', prompt: 'Show me emergency rooms nearby', category: 'Health', icon: Shield },
  { id: '412', title: 'Swimming', prompt: 'Find public swimming pools', category: 'Health', icon: Waves },
  { id: '413', title: 'Martial Arts', prompt: 'Find martial arts dojos', category: 'Health', icon: Swords },

  // Intel
  { id: '901', title: 'Trending', prompt: 'Which zones are trending right now?', category: 'Intel', icon: TrendingUp },
  { id: '902', title: 'Safety', prompt: 'What is the safety score of this area?', category: 'Intel', icon: Shield },
  { id: '906', title: 'Demographics', prompt: 'Show me demographic data for this area', category: 'Intel', icon: PieChart },
  { id: '908', title: 'Compare', prompt: 'Compare the vibe of Al Olaya vs Al Malqa', category: 'Intel', icon: Scale },
  { id: '913', title: 'Investment', prompt: 'Property investment analysis', category: 'Intel', icon: TrendingUp },
  { id: '914', title: 'Rental Market', prompt: 'See rental market trends', category: 'Intel', icon: Building },

  // Planning
  { id: '1001', title: 'Weekend', prompt: 'Plan a 3-day weekend itinerary', category: 'Planning', icon: Map },
  { id: '1002', title: 'Date Night', prompt: 'Create a romantic date night plan', category: 'Planning', icon: Heart },
  { id: '1003', title: 'Group Trip', prompt: 'Plan a day out for a group of 5 friends', category: 'Planning', icon: Users },
  { id: '1005', title: 'Budget', prompt: 'Plan a low-budget day trip', category: 'Planning', icon: DollarSign },

  // My Activity
  { id: '1901', title: 'Track Order', prompt: 'Track my current delivery order', category: 'My Activity', icon: Truck },
  { id: '1902', title: 'My Tickets', prompt: 'Show my upcoming event tickets', category: 'My Activity', icon: Ticket },
  { id: '1903', title: 'Bookings', prompt: 'Show my restaurant reservations', category: 'My Activity', icon: Calendar },
  { id: '1905', title: 'Wallet', prompt: 'Show my digital wallet balance', category: 'My Activity', icon: CreditCard },

  // Utility
  { id: '2001', title: 'Traffic', prompt: 'How is the traffic right now?', category: 'Utility', icon: Car },
  { id: '2002', title: 'Weather', prompt: 'What is the weather forecast?', category: 'Utility', icon: Cloud },
  { id: '2008', title: 'Air Quality', prompt: 'Check air quality index', category: 'Utility', icon: Wind },
  { id: '2003', title: 'Prayer Times', prompt: 'Show prayer times for today', category: 'Utility', icon: Clock },
  { id: '2004', title: 'Currency', prompt: 'Currency converter SAR to USD', category: 'Utility', icon: Banknote },
  { id: '2005', title: 'Translate', prompt: 'Open translator', category: 'Utility', icon: Languages },
  { id: '2007', title: 'Wifi Map', prompt: 'Find free wifi spots nearby', category: 'Utility', icon: Wifi },
  { id: '2010', title: 'Bill Pay', prompt: 'Pay water and electricity bills', category: 'Utility', icon: CreditCard },
  { id: '2011', title: 'Internet', prompt: 'Compare home internet packages', category: 'Utility', icon: Wifi },
];

const categories: Category[] = [
  'All', 
  'My Activity',
  'Food & Drink', 
  'Nightlife', 
  'Culture', 
  'Wellness', 
  'Shopping', 
  'Services', 
  'Transit', 
  'Family', 
  'Work',
  'Education',
  'Home',
  'Social',
  'Intel', 
  'Planning',
  'Outdoor',
  'Beauty',
  'Health',
  'Utility'
];

export function ActionDiscovery({ onClose, onSelect, onActivateVertical }: ActionDiscoveryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [verticals, setVerticals] = useState<any[]>([]);
  const [loadingVerticals,RP] = useState(true);

  useEffect(() => {
    fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e4305fae/config/verticals`)
      .then(res => res.json())
      .then(data => {
          if (Array.isArray(data)) setVerticals(data);
          RP(false);
      })
      .catch(err => {
        console.error(err);
        RP(false);
      });
  }, []);

  const filteredActions = useMemo(() => {
    return actions.filter(action => {
      const matchesCategory = activeCategory === 'All' || action.category === activeCategory;
      const matchesSearch = action.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           action.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="absolute inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-stone-50/95 backdrop-blur-xl w-full md:max-w-4xl h-[90vh] md:h-[85vh] rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-stone-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 shrink-0 bg-white/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <Compass className="w-6 h-6 text-stone-900" /> Discovery Engine
              </h2>
              <p className="text-stone-500">Explore apps, actions, and city services</p>
            </div>
            <Button size="icon" variant="ghost" onClick={onClose} className="rounded-full hover:bg-stone-100">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <Input 
              placeholder="Search for apps, services, or places..." 
              className="pl-10 h-12 text-lg bg-stone-50 border-stone-200 focus:ring-stone-900/10 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          
          {/* === MY APPS SECTION === */}
          {!searchQuery && verticals.length > 0 && (
            <div className="p-6 pb-2 border-b border-stone-200 bg-white/50">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" /> My Apps
                  </h3>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px]">Customize</Button>
               </div>
               
               <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
                  {verticals.map((v) => (
                     <motion.button 
                        key={v.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                           onActivateVertical?.(v.id);
                           onClose();
                        }}
                        className="flex flex-col items-center gap-2 group"
                     >
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-white transition-shadow group-hover:shadow-md relative overflow-hidden"
                          style={{ backgroundColor: v.theme.primaryColor }}
                        >
                           <span className="font-bold text-xl relative z-10">{v.label.substring(0, 1)}</span>
                           
                           {/* Gradient Overlay */}
                           <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[10px] font-medium text-stone-600 text-center leading-tight w-full truncate">{v.label}</span>
                     </motion.button>
                  ))}
                  
                  {/* Add New App Button */}
                  <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex flex-col items-center gap-2 group"
                     >
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-dashed border-stone-300 text-stone-400 bg-stone-50 group-hover:border-stone-400 group-hover:bg-stone-100 transition-colors">
                           <span className="font-bold text-xl">+</span>
                        </div>
                        <span className="text-[10px] font-medium text-stone-400 text-center">Add App</span>
                  </motion.button>
               </div>
            </div>
          )}

          {/* === PROMPTS SECTION === */}
          <div className="p-6">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Suggested Actions
            </h3>

            {/* Categories Chips */}
            <div className="mb-6 overflow-x-auto no-scrollbar -mx-6 px-6">
              <div className="flex gap-2.5">
                {categories.map((cat) => {
                  const config = CATEGORY_THEMES[cat];
                  const Icon = config.icon;
                  const isActive = activeCategory === cat;
                  
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border",
                        isActive 
                          ? cn("bg-stone-900 text-white border-stone-900 shadow-sm")
                          : "bg-white border-stone-200 hover:bg-stone-50 text-stone-600"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", isActive ? "text-white" : config.color)} />
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nano Chips Grid */}
            <div className="flex flex-wrap gap-2 pb-20 md:pb-0">
              {filteredActions.map((action) => {
                const theme = CATEGORY_THEMES[action.category];
                
                return (
                  <motion.button
                    key={action.id}
                    layoutId={action.id}
                    onClick={() => onSelect(action.prompt)}
                    className={cn(
                      "flex items-center gap-2 pl-1 pr-3 py-1 bg-white hover:bg-stone-50 border rounded-full transition-all shadow-sm hover:shadow-md group text-left",
                      theme.border
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center transition-colors shrink-0",
                      theme.bg,
                      theme.color
                    )}>
                      <action.icon className="w-3.5 h-3.5" />
                    </div>
                    
                    <span className="text-xs font-medium text-stone-700 group-hover:text-stone-900">
                      {action.title}
                    </span>
                  </motion.button>
                );
              })}

              {filteredActions.length === 0 && (
                <div className="w-full flex flex-col items-center justify-center py-12 text-stone-400">
                  <Compass className="w-12 h-12 mb-4 opacity-20" />
                  <p>No actions found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
