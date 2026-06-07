---
title: Career-Ops Scraper System
tags: [career, job-search, automation, systems, scraper]
related: ["[[job-search-system]]", "[[career-principles]]"]
last_updated: 2026-04-18
---

# Career-Ops Scraper System

> **Automated job pipeline:** Free scraping from Greenhouse, Lever, BambooHR, YC Work@Startup → heuristic 6-block evaluation → prioritized inbox in dashboard.

## System Status

| Component | Status | Data |
|---|---|---|
| Scraper (free sources) | ✅ Live | 23 new jobs today |
| Evaluation pipeline | ✅ Live | 200 total jobs, P1: 0 / P2: 32 / P3: 168 |
| Dashboard inject | ✅ Wired | Auto-loads at `/Personal/MaitreyiMenon_Dashboard.html` |
| Target role filtering | ✅ Active | Chief of Staff, Strategy, Analyst, Associate focus |

## Daily Workflow

```bash
# Fast run (~30s): Greenhouse + BambooHR only
npm run scrape:fast && npm run pipeline

# Full run (~3 min): includes YC Work@Startup Playwright
npm run full-run --skip-yc  # for speed, omit --skip-yc for YC inclusion
```

Files: `/career-ops/data/jobs-inbox.json` | `jobs-evaluated.json` | `dashboard-inject.js`

## Architecture

### Data Sources

| Platform | Companies | Status |
|---|---|---|
| Greenhouse | Acumen, Systemiq, WRI, GiveWell, Breakthrough Energy | ✅ Free public API |
| BambooHR | IDinsight (23 roles), C40 Cities, E3G | ✅ Free JSON |
| YC Work@Startup | COS, founder associate, strategy, analyst | ✅ Playwright ready |
| scan-portals | 12 target company job portals | ✅ Integrated |

### Evaluation (6-Block Scoring, max 10)

1. **Archetype** (1.5×) — Chief of Staff, Blended Finance, Impact Investing, Climate Finance, VC, Research, Policy, Strategy
2. **CV Match** (1.5×) — impact investing, blended finance, financial modeling, due diligence, chief of staff
3. **Experience Gap** (1.0×) — 2-3 yrs (good), <10 yrs (soft), <15 yrs (hard disqualify)
4. **Compensation** (0.5×) — $110k+ (10), $95k+ (8), $75k+ (6), $60k+ (4)
5. **Target Company** (1.0×) — Acumen, RMI, EDF, WRI, GiveWell, Breakthrough Energy, IFC, Calvert Impact
6. **Network** (1.0×) — Contact at company (8), warm intro (9), target org (5), none (3)

**Priority thresholds:** P1 ≥7.0 | P2 5.0–7.0 | P3 <5.0

## Next Steps

1. Run full scrape — `npm run full-run` to include YC
2. Monitor P2 jobs weekly in dashboard inbox
3. Extend scan-portals — add Workday (RMI, EDF), iCIMS (NRDC, Brookings)
4. Clean 175 old Indeed jobs — `npm run pipeline:force`

*See also: [[job-search-system]] | [[3A-principles]] | [[3E-outreach]]*
