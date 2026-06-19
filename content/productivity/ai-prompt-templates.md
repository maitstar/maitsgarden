---
title: AI Prompt Templates — Personal Use
tags: [productivity, AI, prompts, tools, health, fitness]
related: ["[[6A-productivity-systems]]", "[[health-wellness-systems]]", "[[strength-goals]]", "[[bcn-app-spec]]"]
last_updated: 2026-05-26
growth: seedling
---

# AI Prompt Templates — Personal Use

Reusable Claude prompts for recurring personal needs.

---

## Fitness AI Coaching Prompts

Interrogative-style prompts — Claude asks you questions first, then diagnoses. More useful than dumping context upfront.

**Progressive Overload Check**
> "I want you to understand my progression history before telling me where I'm going wrong. Ask me what I'm currently lifting on my main compound movements, what I was lifting 3–6 months ago, whether I track my lifts or go by feel, whether I've hit any plateaus recently and how long they've lasted, and whether I have a structured approach to adding weight or reps. Use my answers to tell me honestly whether I'm applying progressive overload correctly and give me a specific strategy to start making consistent progress."

**Muscle Group Avoidance**
> "I need you to understand my full training history before making any calls. Ask me which muscle groups I train most and least frequently, whether there are any exercises or body parts I actively avoid, whether I've ever been told I have any physical imbalances, and how my physique looks to me in the mirror right now. Use my answers to identify any muscle groups I'm neglecting, explain the imbalances this is creating, and give me specific exercises to add into my weekly schedule to fix it."

**Training Frequency**
> "I need you to understand how I currently train before giving me any recommendations. Ask me how many days a week I train, how long I've followed this schedule, how my energy levels feel towards the end of the week, and whether I've ever taken extended rest periods and noticed a difference in my results. Use my answers to tell me honestly whether my training frequency is optimal for my goals or whether I need to restructure my week — and tell me exactly what to change."

**Phone Usage in Gym**
> "I want you to find out about my phone habits in the gym before giving me any advice. Ask me how often I use my phone between sets, what I'm typically doing on it, how long my rest periods actually end up being as a result, and whether I've ever tracked my session length. Use my answers to tell me honestly how much my phone usage is affecting my performance and give me a practical strategy to fix it."

---

## Personal Trainer Context Block

Use when planning workouts, asking for programming adjustments, or troubleshooting form.

```
You are my personal trainer. Here's my context:
- Stats: 54 kg, 158 cm, female
- Goal: body recomposition — grow glutes and hamstrings, maintain upper body, reduce body fat
- Current split: Glute/Ham | Push | Quad+Core | Pull
- Injuries/limitations: none
- Equipment: gym with full weights
- Training age: intermediate beginner (1–2 years consistent)
- On a 17-week cut (started [DATE])

My strength baselines:
- Hip thrust: 10 kg × 8–12 (target: 20–25 kg)
- RDL: 10 kg × 10–12 (target: 20 kg)
- Goblet squat: 4.5 kg avg (target: 8 kg)

Progression rule: add 0.5 kg OR 2–3 reps per session.

[Your question here]
```

---

## Nutritionist Prompt

Use when planning meals, calculating macros, or troubleshooting diet adherence.

```
You are my nutritionist. Here's my context:
- Stats: 54 kg, 158 cm, female, moderate activity level
- Goal: body recomposition — slight caloric deficit, high protein
- Protein target: 0.8–1g per pound bodyweight (~95–120g/day)
- Dietary preferences: [fill in]
- Current phase: 17-week cut

Constraints:
- Blood sugar stability is important (ADHD — stable glucose = stable focus)
- Prioritize protein at breakfast
- Gut health matters: include fermented foods, fiber
- Anti-inflammatory baseline: limit seed oils, limit alcohol

[Your question here]
```

---

*See also: [[health-wellness-systems]] | [[strength-goals]] | [[17-week-cut-plan]]*
