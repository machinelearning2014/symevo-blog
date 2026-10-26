---
title: "Why an evidence gate changes the shape of an answer"
date: "2026-10-25T09:00:00Z"
summary: "A verification gate is not a spell-checker at the end of a turn. It changes which claims are worth making in the first place."
labels: ["verification", "agents", "design"]
cover_image: "assets/images/posts/welcome/cover.svg"
cover_alt: "Abstract geometric illustration in warm paper tones with a teal gate motif."
draft: false
---

Most agent systems treat verification as a final filter: produce an answer, then ask a second model whether it looks right. That ordering is backwards. When a claim is cheap to write and expensive to check, the system will generate far more claims than it can ever verify, and the verifier becomes a bottleneck that mostly says "looks plausible."

An evidence gate changes the economics. Before a sentence can become the answer, the runtime asks what kind of evidence would make it true, and whether that evidence is actually present. The model does not get to award itself completion.

## The gate is a contract, not a checklist

A useful gate has three properties:

1. **It is owned by the runtime.** The model can propose facts and derivations, but it cannot redefine the predicates that decide completion.
2. **It names the missing evidence.** "Not verified" is not feedback. "The workspace source was never inspected" is.
3. **It fails closed.** An incomplete answer is a designed outcome, not an exception.

> A system that can always produce an answer is not verifying anything. It is only formatting confidence.

## What this looks like in practice

A CODE turn mutates a file, then must inspect the post-mutation diff before the change counts as verified. A REASON turn derives a conclusion from a knowledge base, and the conclusion must reproduce the exact text the harness proved. A MATHS turn can be computational, derivational, or formal, and the level is echoed in the triage marker so the answer cannot quietly upgrade itself.

The common thread is that the model's prose never closes the loop. The loop closes when the runtime's own evidence predicates are satisfied — or it does not close at all.

That is a less satisfying demo and a much better system.
