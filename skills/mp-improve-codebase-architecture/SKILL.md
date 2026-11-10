---
name: mp-improve-codebase-architecture
description: "Use when looking for deepening opportunities — refactors that turn shallow modules into deep ones, informed by CONTEXT.md domain language and prior ADRs. Aim: testability and AI-navigability."
source: https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md
generated: 2026-05-12T18:05:08.991Z
category: concept
audience: engineers
---

## Tutorials

- https://skillmake.xyz/v/mp-improve-codebase-architecture.mp4

## When to use

- User wants to improve architecture, find refactor opportunities, or consolidate tightly-coupled modules
- Codebase has shallow pass-through modules whose interface is nearly as complex as their implementation
- Pure functions extracted just for testability while the real bugs hide in how they're called
- Preparing a codebase to be more AI-navigable by concentrating complexity behind small interfaces

## Key concepts

### module

Anything with an interface and an implementation — a function, class, package, or slice. Don't drift into 'component', 'service', 'API', or 'boundary'; consistent vocabulary is the point.

### interface (broader than type signature)

Everything a caller must know to use the module: types, invariants, error modes, ordering constraints, configuration. Not just the function signature. The interface is the test surface.

### depth

Leverage at the interface — a lot of behaviour behind a small interface. Deep = high leverage. Shallow = interface nearly as complex as the implementation. Deep modules are the goal.

### seam

Where an interface lives — a place behaviour can be altered without editing the implementation in place. Use this word, not 'boundary'. One adapter = hypothetical seam. Two adapters = real seam.

### leverage vs locality

Two complementary benefits of depth. Leverage: what CALLERS get — a lot of behaviour for a tiny interface. Locality: what MAINTAINERS get — change, bugs, and knowledge concentrated in one place instead of scattered across N callers.

### deletion test

Imagine deleting the module. If complexity vanishes, it was a pass-through — delete it. If complexity reappears across N callers, it was earning its keep. Apply this to anything you suspect is shallow.

### informed by domain model

This skill is informed by, not separate from, the project's domain. Read CONTEXT.md and any ADRs in the area first. Domain language gives names to good seams; ADRs record decisions you should not re-litigate. Use CONTEXT.md vocabulary in candidate names — 'the Order intake module', not 'the FooBarHandler' or 'the Order service'.

## API reference

```
Process — 1. Explore
```

Use the Agent tool with subagent_type=Explore to walk the codebase. Don't follow rigid heuristics — explore organically and note friction. Apply the deletion test to anything suspected of being shallow.

```
Friction signals to note:
- Understanding one concept requires bouncing between many small modules
- Modules where the interface is nearly as complex as the implementation (shallow)
- Pure functions extracted just for testability, while bugs hide in how they're called (no locality)
- Tightly-coupled modules leaking across seams
- Parts of the codebase that are untested or hard to test through their current interface
```

```
Process — 2. Present candidates (numbered list)
```

For each deepening opportunity show four sections. Use CONTEXT.md vocabulary for the domain and the architecture glossary (module, interface, seam, depth, leverage, locality) for the architecture. Do NOT propose new interfaces yet — let the user pick a candidate first.

```
- Files: which files/modules are involved
- Problem: why the current architecture is causing friction
- Solution: plain English description of what would change
- Benefits: explained in terms of locality, leverage, and how tests improve

Then ask: "Which of these would you like to explore?"
```

```
Process — 3. Grilling loop with inline side effects
```

Once a candidate is picked, drop into a grilling conversation walking the design tree. Apply doc side effects inline as decisions crystallise.

```
- Naming the deepened module after a new concept → add the term to CONTEXT.md (lazily create if missing)
- Sharpening a fuzzy term during the conversation → update CONTEXT.md right there
- User rejects the candidate with a load-bearing reason → offer an ADR framed as "Want me to record this so future reviews don't re-suggest it?" — only when the reason would actually be needed by a future explorer
- Exploring alternative interfaces for the deepened module → see INTERFACE-DESIGN.md
```

## Gotchas

- Use the exact architecture glossary — module, interface, implementation, depth, seam, adapter, leverage, locality. Don't drift into 'component', 'service', 'API', or 'boundary'.
- Apply the deletion test: a module whose deletion makes complexity vanish was a pass-through, not a deep module.
- Don't propose interfaces during step 2 — list candidates, let the user pick, then grill on the chosen one.
- Use CONTEXT.md vocabulary for domain names — 'Order intake module', not 'FooBarHandler' or 'Order service'.
- One adapter is a hypothetical seam; you need at least two adapters before claiming a real seam.
- ADR conflicts: only surface a candidate that contradicts an existing ADR when the friction warrants reopening it, and mark it clearly ('contradicts ADR-0007 — but worth reopening because…').
- Beware pure functions extracted just for testability — they often have leverage but no locality, leaving bugs in the call-site glue.
- If a candidate is rejected with a load-bearing reason, offer an ADR — but only when a future explorer would need it; skip ephemeral ('not worth it now') and self-evident reasons.

---
Generated by SkillMake from https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md on 2026-05-12T18:05:08.991Z.
Verify against source before relying on details.