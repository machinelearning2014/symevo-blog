---
title: "Two Route-Level Defects in SYMEVO's Triage Program (and Four Smaller Ones)"
date: "2026-11-02T23:44:45.849Z"
summary: "A source review of the triage pipeline turned up two defects that discard an answerable answer: a proof question about workspace source that also depends on a fact about the world derives an inconsistent route, and a publish-only request is re-certified onto a REASON phase. Both were confirmed against the real Prolog renderer."
labels: ["SYMEVO", "triage", "routing", "Prolog", "verification"]
draft: true
---
Triage in SYMEVO follows a division of labour the project states plainly: the model **describes** a request, the runtime **observes** the world, and **Prolog derives** the route. The model names no evidence kinds and no authorities. That design is sound. What follows are two places where the derivation itself contradicts an intent written a few lines away from it, plus four smaller issues in the surrounding code.

Both route-level findings were confirmed by running the real `renderSemanticProgram`, `reasonAboutTriage`, and `compileTriagePlan` against SWI-Prolog, not by reading alone.

## Finding 1 — a proof question about workspace source that leans on an external premise routes to `inconsistent`

Take a request with two questions: one "fact about the world" question, and one proof-level mathematical question about a subject that grounds in workspace source. Something like *"formally verify this implementation against the published spec."*

The chain in `src/agent/triage-semantic-program.ts`:

`math_need/3` decides a mathematical question's evidence kind with a conditional:

```prolog
math_need(q(Id,math_truth(Level,Subject)), M, E, Need) :-
    math_subject(Subject, M),
    dependency_needs(Id, external_fact),
    !,
    ...
    E = lean_proof.
```

When the question depends on something needing `external_fact`, the level's own kind — `mathematical_proof` or `formal_proof` — is **replaced**, not added. `lean_proof` is owned by REASON, so no MATHS-owned evidence remains required for that question.

`bridge_requested` still holds, because it fires on any mathematical question with a source subject. But `bridge` requires `allowed(maths)`, which requires `required_owner(maths)` — now never satisfied. So:

```prolog
status(_,inconsistent) :- bridge_requested, \+ bridge, !.
```

fires and short-circuits every other status rule.

Observed output for exactly that semantics:

```
EVO_TRIAGE_STATUS:inconsistent
EVO_TRIAGE_PLAN:code,reason
EVO_TRIAGE_UNIQUE:false
```

and `reasonAboutTriage` returns plan `CODE -> REASON` with `consistent: false`. The turn loop in `evo-agent.ts` gates every terminal path on `routingStatus === "resolved"`, so the model's answer is discarded and the turn ends with an empty list of unresolved questions.

The failure class is larger than the one example. Any source-anchored proof or formal question whose premises include a fact about the world lands here. Two plausible corrections:

1. Let `math_need` keep the mathematical obligation *alongside* `lean_proof`, so MATHS stays required and the bridge holds.
2. Distinguish "no bridge because there is no mathematical obligation" from a genuine contradiction in the `inconsistent` rule.

The second is narrower; the first is closer to what the request actually asks for.

## Finding 2 — a publish-only request is re-certified onto REASON

The program has an explicit intent statement:

```prolog
allowed(code) :- operation(_).
% User-authorized side effects are executed by CODE even when the
% requested operation itself creates no evidence obligation.
```

But `publish` is deliberately absent from `required(repository_state)`, which lists only `commit`, `amend`, `push`, and `create_pr`. A bare publish therefore satisfies `allowed(code)` while generating no `EVO_TRIAGE_EVIDENCE` line, so no evidence kind requires an owner. On the TypeScript side, the justification filter drops the tier and records:

> Dropped unjustified phase(s) CODE: no required evidence owned and not explicitly requested

With no explicit tier, the fallback returns `["REASON"]`, and `compileTriagePlan` produces `REASON(evidence) -> CODE(publication)`. A pure publication request must first pass a full REASON workflow for a turn that has zero questions.

The filter is the safe direction — it never *adds* an authority the evidence does not support. The defect is that the certificate's own trace records its two rules disagreeing. Better: give the side-effect operation a `repository_state` requirement, or make the owner computation honour `allowed(code) :- operation(_)` directly.

## Four smaller issues

**`reassessTriagePlan` cannot compare requests.** `TriagePlan` retains no field holding the compiled input, so the recovery path validates only the phase index and then re-derives steps from the new input while passing the *old* certificate into `compileTriagePlan`. A changed request either trips the certificate-length consistency check or is silently re-certified against phases derived from a different request. In current code the call site passes a per-turn `taskInput`, so it is unreachable today — but the function's contract is not what its name promises.

**A widened optional type is load-bearing.** `reassessTriagePlan` branches on `options.recoveryPhaseIndex !== undefined`, and the caller spreads a possibly-undefined `recoveryPhaseIndex` into the argument object. That is only safe because the parameter type is explicitly `number | undefined` under `exactOptionalPropertyTypes`. Tightening that type would silently make the recovery branch unreachable.

**Two id vocabularies are coupled with no comment.** `normalizeSemantics` validates ids against `[A-Za-z0-9_.-]{1,64}`; `renderSemanticProgram` interpolates them into atoms like `q_${id}`; `triage-reasoner.ts` re-reads them with `/^EVO_TRIAGE_NEED:q_([A-Za-z0-9_.-]+)=/`. The round trip only holds because of that character class. Widening it later would make `questionEvidence` lose entries silently instead of failing loudly. The coupling deserves a comment at the validator.

**`unresolved` carries internal diagnostics.** The clarification payload is taken from `certificate.semantics.unresolved`, and the `needs_observation` path puts runtime reasons there — `Subject grounding failed: ...` and the missing-workspace path problems. Those reach the user verbatim as the question they need to answer. The text is runtime-authored, never a discarded answer, so nothing is unsound. But the guard comment claiming only questions meant for the user live there overstates the invariant; either the comment should admit diagnostics, or the payload should be filtered.

## Why this matters beyond the two bugs

Neither defect is a case of the model certifying its own work. Both are the *runtime* producing a route that its own comment says it will not produce. That is the harder class of bug in this codebase, because the trust boundary looks intact from the outside: the gate fired, the turn ended `INCOMPLETE`, and no false claim was published. The cost is quieter — an answerable request that ends with no answer and an empty list of reasons.

The general lesson is worth stating plainly. A derivation that refuses to finalize is only as good as its ability to say *why* it refused. An `inconsistent` status with an empty `unresolved` list is indistinguishable, from the user's seat, from a bug. When a route is dropped or a contradiction is declared, the certificate should carry the obligation that was unmet — which is exactly the evidence-discipline the rest of the runtime already practices.
