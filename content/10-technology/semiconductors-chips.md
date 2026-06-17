---
title: Semiconductors & Chip Architecture
tags: [technology, semiconductors, hardware, AI, computing]
related: ["[[ai-technology-index]]", "[[tech-tools]]"]
last_updated: 2026-06-16
sources: ["[[00- Raw/2026-06-10]]"]
growth: seedling
---

# Semiconductors & Chip Architecture

## What Is a Semiconductor?

Semiconductors conduct electricity in some conditions and block it in others. They have two energy bands — a **conduction band** and a **valence band** — separated by a **bandgap**. Electrons in the conduction band can move freely (conducting current); holes in the valence band are positively charged and can combine with electrons to emit light or heat.

Common examples: silicon, diamond (elemental); gallium nitride, gallium arsenide, silicon carbide, cadmium telluride (compound).

---

## Moore's Law

In 1965, Gordon Moore predicted that the number of components on a chip doubles roughly every two years. The semiconductor industry used this as a planning target. The economic implication: component cost only goes down over time — more functionality at the same price point.

---

## How a Chip Works: Three Layers

### 1. Physical Layer — The Transistor
A transistor is a tiny switch. A small voltage applied to the **Gate** opens a path for current to flow. No voltage = no flow. This is the binary 1/0.

### 2. Logic Layer — Gates
Transistors wired in sequence create **Logic Gates**:
- **AND Gate**: current flows only if both inputs are on
- **OR Gate**: current flows if either input is on

Combining logic gates enables arithmetic and any computable operation.

### 3. Instruction Layer
Programs compile down to streams of 1s and 0s. These signals travel to the chip, opening and closing transistors in precise sequences. The chip is a static map of wires; the "intelligence" comes from electricity taking specific logical routes.

---

## Types of Chips

| Type | Strength | Analogy |
|------|----------|---------|
| **CPU** | Sequential logic, complex branching | The brain — manages overall flow |
| **GPU** | Thousands of simple parallel tasks | The artist — renders pixels simultaneously |
| **TPU/NPU** | Massive-scale matrix math | The calculator — optimized for neural net math |

---

## Why AI Chips Are Different

AI models are fundamentally giant **matrix multiplications** ($C = A \times B$ over enormous grids of numbers). Standard chips hit bottlenecks; AI chips are purpose-built around three properties:

1. **Parallelism** — split the matrix into thousands of pieces, compute simultaneously (vs. CPU's sequential A→B→C)
2. **Custom math circuits** — hardware wired to run matrix multiply at ~$10^{15}$ ops/second
3. **High-bandwidth memory** — "superhighways" that feed data to processing cores without traffic jams, keeping cores from sitting idle

An AI chip isn't smarter — it's a specialized calculator that runs the specific math of neural networks far faster than a general-purpose CPU.

---

## Notes / Loose Threads
- **Reiner pop convo**: Chris Miller Fletcher — follow up
- **Mati carbon interview notes** — incomplete, needs expansion before ingesting
