---
title: BCN App — Project Spec
tags: [tech, project, productivity, AI, app-spec]
related: ["[[6A-productivity-systems]]", "[[6D-routines-daily]]", "[[10-technology]]"]
sources: ["[[00- Raw/bcn-app - Project Spec.md]]"]
last_updated: 2026-05-26
---

# BCN App — Intelligent Prioritization System

A web app (browser + phone) that acts as an intelligent prioritization system connected to existing tools. Asks "what should I work on?" based on current BCN state (Body, Cognitive, Narrative).

## Architecture

- Capture form + "what should I work on" interface
- Claude API in background for intelligent prioritization
- Bidirectional sync with existing tools

## Integrations
- **Things 3** — URL scheme/API; bidirectional task sync
- **Google Calendar** — OAuth; read-only for availability, deadlines, time patterns
- **Notion** (optional) — API for goals/projects database
- **Conversation history** — context for understanding priorities and energy patterns

## Prioritization Criteria
1. Current BCN state (user inputs each session)
2. Urgency (deadlines from calendar/tasks)
3. Goal alignment (job search > fellowship > systems, based on life phase)
4. Energy match (don't assign deep analysis when Body=depleted)
5. Time available (don't suggest 3-hour deep work if 30 min available)
6. Momentum (if mid-flow, keep going)
7. Pattern learning (Tuesdays after meditation = high creative energy)

## Build Phases
- **Phase 1 (Week 1):** Capture form, BCN check-in interface, basic task DB, Claude API integration
- **Phase 2 (Week 2):** Things 3 sync, Google Calendar read, Notion connection
- **Phase 3 (ongoing):** Pattern learning, predictive suggestions ("you usually crash around 3pm — here are low-energy options")

## Next Steps
- Things 3: Mac/iOS? (affects API access method)
- Google account OAuth
- Notion workspace goals database
- Hosting: Replit/Vercel or self-hosted

---

*See also: [[6A-productivity-systems]] | [[10-technology]]*
