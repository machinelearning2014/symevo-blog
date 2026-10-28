---
title: "SYMEVO: A Symbolic Evidence-Gated Verification Orchestrator"
---

The name is a description, and the honest way to read it is to take it apart. **Symbolic** because the system *decides* by evaluating declared symbols and rules rather than raw impression — which is a property of the whole pipeline, not only of the reasoning inside a phase. **Evidence-gated** because deterministic checks run before a candidate answer can be published. **Orchestrator** because the model never picks the route.

Start with how far the first word reaches, because it is easy to file "symbolic" under `REASON` and move on. The route itself is *derived* by a Prolog program from extracted facts, and the program reports the rule that produced the plan and whether that plan was unique. The evidence obligations, and the authority that owns each one, are Prolog facts. Tool permissions are a declarative boundary the chosen route cannot override. Evidence is bound to its source by content hash, and two renderings of a sentence are compared through a canonical identity rather than a fuzzy match. Completion is decided by checking declared state against each authority's obligations — among them whether every decidable claim's class has been discharged by the one procedure fixed to it.

So the symbolic layer is not a reasoning style available to one authority. It is the decision layer of the entire orchestration: routing, obligation, permission, binding, and verdict are all formal evaluation over declared symbols. The model contributes interpretation at exactly two points — extracting the triage facts, and reasoning inside a phase — and neither of those points is where a verdict comes from.

The authorities are where the idea becomes visible, and each realizes it differently. `REASON` derives its conclusions by executing a Prolog knowledge base. `CODE` registers decidable claims in a runtime-owned, revision-bound *CODE Formal Model*, where a claim's class fixes exactly one procedure that must discharge it — a knowledge-base query, an approved typecheck, an SMT formalization, or the maths bridge. `MATHS` works in SymPy, Z3, and Lean. Three mechanisms, one posture: nothing counts because it was asserted.

The load-bearing sentence is this one: a temperature-zero model extracts *what evidence a request requires*, runtime-owned SWI-Prolog derives the valid authority sequence from those facts, the runtime scores its complexity and compiles a hashed execution plan, each authority executes its own native workflow, and a final-candidate verifier refuses to publish until the gates pass. Every request gets a plan; complex, cross-authority, formal, or externally mutating work gets a detailed plan with explicit artifact handoffs and completion gates.

![Diagram of the SYMEVO turn lifecycle](assets/images/about/turn-lifecycle.svg "The turn lifecycle. The model contributes interpretation at the first box and reasoning inside the authority phases; the route, the certificate, and the terminal status are all runtime-owned.")

What makes it more than a prompt wrapper is where authority sits. The model classifies and reasons; it does not certify. Tool output cannot declare its own workflow completion, and the runtime-owned Prolog harness cannot be redefined by model code. Every terminal answer carries a status the model did not get to award itself.

> **The one sentence to remember.** The model does not write or certify the task graph. It extracts routing facts; trusted Prolog chooses the route; the runtime compiles and hashes the execution plan; and each authority workflow remains authoritative for its own completion.

## Where SYMEVO fits

SYMEVO is a verification orchestrator, and the orchestration is the unit of capability — not the individual model call. A single request can be routed across authorities, and obligations cross between them.

Two examples, both from the policy layer. A `CODE` claim of class `constraint` is discharged by SMT — the same entailment authority `REASON` uses, which is why the SMT controller has to stay reachable from CODE. And the CODE↔MATHS bridge runs `create_manifest` in CODE, proves the exact claim with `maths_problem`, then accepts the runtime-recorded certificate back in CODE. Neither capability belongs to any single authority. Both are properties of the composition, and neither is reducible to one of its parts.

That is the part worth being precise about. A model call produces text; the orchestration produces a *decided* answer, and it can do so because routing, obligation, permission, binding, and verdict are all formal — which is what lets independently verified results be composed into something no single authority, and no single call, could establish on its own. What the system can reach is a function of how its parts are joined, not of the model alone.

The three authorities are the clearest statement of what it is for, and they come with a filter.

### The filter

- **The answer has a checkable form.** A computation you can run, a change you can diff and test, or an argument you can derive from explicit premises. If "correct" has no mechanical witness, there is nothing here for a gate to consume.
- **You would rather be told INCOMPLETE than be told something fluent.** The system is built to refuse. If a confident paragraph is what you actually need, this is a great deal of machinery for a worse experience.
- **You can state the premises.** For `REASON`, the derivation is only as good as what you hand it — and SYMEVO verifies internal consistency, not premise truth. You remain the source of the premises.

### What the three authorities replace

| Authority | Evidence that closes it | What it replaces |
| --- | --- | --- |
| `MATHS` | a computation, a derivation with a frozen certificate, a constructed proof, or exact Lean source hashes | a model asserting a result it may have hallucinated |
| `CODE` | source inspection, the post-mutation diff, and native build/test output | a patch that looks right and was never run |
| `REASON` | an executable Prolog derivation with proof traces, consistency checks, and assumption-dependence testing | a plausible argument with no stated premises |

### The wrong tool

- **Open-ended writing.** There is no gate for prose quality, and no authority owns it.
- **Facts you need to be true.** SYMEVO can ground a claim in a source you opened, but it does not verify that the source is right. Search results are discovery only.
- **Latency-critical paths.** A turn runs a classifier, a Prolog process, an authority workflow, and a verifier. There is a per-turn deadline (default 30 minutes) and it is not a small number.
- **Anything where you want the model's own judgement trusted.** That is the thing the architecture is built not to do.

> **Read this before trusting the gates.** SYMEVO improves the traceability and internal validity of an answer. It does not turn a model into an oracle: source truth, source quality, and the correctness of translating natural language into a formal model all remain inside the trust boundary.
