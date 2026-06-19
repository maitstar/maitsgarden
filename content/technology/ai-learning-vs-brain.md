---
title: AI Learning vs. Brain — Reward Functions & Inference
tags: [technology, AI, neuroscience, learning, cognition]
related: ["[[ai-technology-index]]", "[[semiconductors-chips]]"]
sources: ["[[00- Raw/Processed/AI Intelligence Structure - Notes.md]]"]
last_updated: 2026-06-19
growth: seedling
---

# AI Learning vs. Brain — Reward Functions & Inference

## Core Thesis

AI struggles because it learns with simple objectives (like "predict the next token"), while the brain learns using many rich, evolution-designed reward signals that teach it *what to care about* and allow it to predict anything from anything.

Human-level learning efficiency comes less from brain *architecture* and more from richly structured, evolution-shaped **reward (loss) functions** and **omnidirectional inference** — both of which current AI largely lacks.

---

## Key Ideas

**Reward functions as the secret sauce.** Evolution encodes complex, context-dependent loss functions and curricula — different rewards active at different times and regions. ML uses simple objectives (next-token prediction). The gap is in what the system is trained to care about, not how it's built.

**Learning vs. Steering subsystems** (Steve Byrnes):
- *Steering subsystem*: innate, subcortical (hypothalamus, brainstem, superior colliculus) — hard-coded heuristics and rewards: fear, shame, status, reflexes.
- *Learning subsystem*: cortex learns a world model and **predicts the steering subsystem's responses**, wiring learned concepts (e.g. "Yann LeCun," "status") to innate rewards.

**How abstract desires get grounded.** The cortex learns predictors of innate responses (e.g. "about to flinch," "social threat"), enabling generalization from raw stimuli to abstract symbols without direct supervision.

**Omnidirectional inference.** The cortex may natively predict *any subset of variables from any other subset* (joint distribution modeling), unlike LLMs' asymmetric next-token prediction. This supports cross-modal, bidirectional reasoning.

**Amortized inference.** Brains approximate intractable Bayesian inference by amortizing it into neural circuitry — fast predictions replacing slow sampling across many conditional queries.

**Architecture vs. objectives.** Architectural inductive biases matter (e.g. vision priors, retinal preprocessing), but may be secondary to how rewards and prediction targets are structured.

---

## What's Missing in Current AI

- Rich, evolution-like reward curricula
- Native omnidirectional inference
- Robust linkage between learned abstractions and innate-style rewards

---

## Implication

Simply adding more modalities or training masks is likely insufficient. Progress probably needs: flexible test-time-selectable inference targets, richer reward structures, and possibly energy-based or alternative learning schemes.

---

## References

Steve Byrnes (learning vs. steering theory), Yann LeCun (energy-based models), amygdala/superior colliculus research, Doris Tsao-inspired vision inductive biases.

*See also: [[ai-technology-index]] | [[semiconductors-chips]]*
