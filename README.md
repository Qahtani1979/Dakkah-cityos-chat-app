# Dakkah — Conversational City Experience OS

A prototype demonstrating a **copilot-only interaction model** where every capability is accessed exclusively through the Super Copilot.

## Core Concept

Dakkah is not a traditional app with UI navigation. It's a **City Experience Runtime** driven entirely by an AI orchestrator. The Super Copilot IS the operating system shell.

## Key Principles

❌ **NO traditional UI:**
- No tab bars
- No dashboards  
- No settings screens
- No admin panels
- No forms
- No search bars
- No filters UI

✅ **Everything through conversation:**
- Natural language input
- Dynamic UI artifacts
- Context-aware responses
- Three response modes: Suggest, Propose, Execute

## Capabilities Demonstrated

### Discovery & POI Intelligence
- "Show me quiet places near me"
- Renders POI carousel with images, ratings, vibes, and action chips

### Planning & Trip System
- "Plan a 3-day Riyadh experience"
- Generates interactive itinerary timeline
- Supports natural adjustments ("make it cheaper", "less walking")

### Events & Community
- "What's happening this weekend?"
- Shows event carousel with details and RSVP options

### Ambassador System (Trust Layer)
- "Who should I trust for food recommendations?"
- Displays ambassadors with fit scores and specialty matching

### Zone Intelligence (ZES)
- "What zones are trending now?"
- Visualizes Zone Experience Scores with factor breakdowns
- Shows real-time vibes, activity, safety, events

### Commerce & Booking
- "Book this restaurant for 7"
- Presents confirmation cards for actions requiring approval

### Gamification
- "How do I earn more XP?"
- Shows progress, badges, and active missions

### Comparison
- "Compare restaurants"
- Renders comparison tables

## Interaction Modes

### 💡 Suggest Mode
Recommendations, insights, and ideas. No commitment required.

### ✋ Propose Mode  
Structured actions requiring confirmation:
- Bookings
- Publishing content
- Platform changes
- Economic transactions

### ✓ Execute Mode
Safe, instant actions:
- Display results
- Apply filters
- Show analytics

## UI Artifacts

The Copilot dynamically renders:
- **POI Carousels** — Scrollable place cards with images and metadata
- **Event Carousels** — Event cards with dates, locations, attendees
- **Ambassador Profiles** — Trust indicators and fit scores
- **Itinerary Timelines** — Multi-day plans with editable blocks
- **Confirmation Cards** — Risk-aware approval flows
- **Zone Heatmaps** — ZES intelligence visualization
- **Selection Chips** — Quick action buttons
- **Comparison Tables** — Side-by-side evaluations
- **Progress Cards** — XP, levels, badges, missions

## Try These Prompts

**Discovery:**
- "Show me quiet places near me"
- "Find family-friendly activities"

**Planning:**
- "Plan a 3-day Riyadh experience"
- "Create a date night plan"

**Events:**
- "What's happening this weekend?"
- "Show me cultural events"

**Intelligence:**
- "What zones are trending now?"
- "Compare neighborhoods"

**Trust:**
- "Who should I trust for food recommendations?"

**Progress:**
- "How do I earn more XP?"

## Architecture

```
User Intent
    ↓
Conversational Interface
    ↓
Intent Interpreter
    ↓
Context Engine (who/where/when/mood/role)
    ↓
Orchestrator (decision & governance)
    ↓
Tool Registry (allowed actions only)
    ↓
Execution Layer
    ↓
UI Artifacts → User
```

## Why This Model?

### Zero Cognitive Load
Users never need to learn features — the Copilot reveals them contextually.

### Infinite Scalability
Add new services, partners, and tools without increasing UI complexity.

### Perfect for SuperApp Evolution
Mini-apps become tools, not screens.

### Soft Governance
Safety, trust, and fairness enforced quietly through confirmation flows.

---

**Built for Figma Make** | Demonstrating the future of conversational city platforms
