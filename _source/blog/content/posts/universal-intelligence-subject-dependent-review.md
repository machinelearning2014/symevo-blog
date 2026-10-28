---
title: "Universal Intelligence Is Not One Number — It's a Profile"
date: "2026-10-28T01:54:18.909Z"
summary: "Intelligence is not a quantity an entity carries around. It is a relationship between an entity and a subject — and once you take that seriously, savants, specialists, and frontier models stop looking like paradoxes."
labels: ["intelligence", "universal intelligence", "AI evaluation", "reasoning", "philosophy"]
draft: true
---
Ask a simple question — *what is intelligence?* — and the conversation fractures immediately. Psychologists point at factor structures. AI researchers point at benchmarks. Both measure something real, and both keep producing the same embarrassing artefact: entities that look brilliant in one column and incompetent in the next.

A person who multiplies six-digit numbers in his head but cannot navigate a supermarket is not a contradiction. A language model that derives an olympiad proof and then miscounts the letters in a word is not a scandal. The scandal is the assumption we smuggled in before we ever looked: that intelligence is a **general property** — one quantity, residing in the entity, that ought to show up consistently wherever we test it.

I want to take that assumption out and see what is left when we do.

## The move: make intelligence relational

The starting point I find compelling is almost embarrassingly small:

> Intelligence measures the degree to which an entity — human or machine — can reason about a given subject.

Write it as \(I(E, S) = R(E, S)\): the intelligence of entity \(E\) concerning subject \(S\) is its reasoning capability concerning that subject.

Notice what this does *not* say. It does not say intelligence is a number stamped on the entity. The left-hand side has two arguments. Intelligence becomes a **relation** — a property of the pairing, not of the party. Reasoning itself is taken in its ordinary sense: using information to reach conclusions, judgments, or decisions. No commitment is made about *how* the reasoning runs — mental arithmetic and symbolic computation both count, provided the capability is demonstrated.

Once you accept the two-argument form, unevenness stops being a paradox. For distinct subjects \(S_1\) and \(S_2\), nothing in the definition requires \(R(E, S_1) = R(E, S_2)\). Extreme specialisation — say \(I(E, S_1) \gg I(E, S_2)\) — is not an exception to the definition. It is one of its open possibilities.

That single relaxation resolves more confusion than any amount of arguing about IQ ever did. Specialised intelligence is not a defect in a general scale; it is what subject-dependent measurement *predicts*.

## What follows almost immediately

Four things follow from the definitions with no extra machinery, and their modesty is part of their value — these are elementary consequences, not theorems about the mind.

**One subject says nothing about another.** Since \(I(E,S) = R(E,S)\) imposes no equality across subjects, high capability in one place cannot entail high capability in another. Complementarity is permitted, not forced.

**Aggregate scores are monotone.** Evaluate two entities over the same fixed set of subjects. If \(A\) is at least as capable as \(B\) on every subject, then \(A\)'s total cannot be lower. Sum the inequalities; done.

**Breadth behaves like a count.** Define breadth as the number of subjects where an entity clears a threshold \(\tau\). Lower the bar and the count can only rise or stay put. Every subject clearing a high bar already clears a low one.

**A total hides the profile.** Give one entity scores of 1 and 0 over two subjects; give another 0.5 and 0.5. Both sum to 1. Their capabilities are not remotely the same shape. This is the result I would put on a slide for every leaderboard designer alive: **an aggregate score cannot uniquely determine a reasoning profile.** One number is a lossy projection, and the loss is exactly the thing we care about.

## General intelligence, without changing the dictionary

If subject-level scores exist, you can aggregate them over a chosen set of subjects \(\mathcal{S} = \{S_1, \dots, S_N\}\), normalised to a common scale. The sum gives total demonstrated reasoning capability; dividing by \(N\) gives an average that survives changes in the size of the test set — though never escapes the choice of subjects.

This buys a clean separation between two things English usually fuses:

- **Breadth** — how many subjects clear a minimum threshold.
- **Depth** — how far into a subject the capability reaches. Two entities can both "do mathematics" and differ enormously in how hard the mathematics gets.

Depth needs no new primitive: it is already \(R(E,S)\) at full resolution. And general intelligence becomes, plainly, the capacity to reason across a broad range of subjects, possibly at uneven depths. Not a different *kind* of thing. The same thing, read across a wider row.

Work through a three-way comparison — a mathematical savant, a generalist human, a general-purpose AI, five subjects, illustrative numbers — and the picture reorganises itself. The savant tops the mathematics column. The generalist tops the aggregate. The AI is strong across several subjects and conspicuously weaker in others. Nobody is "more intelligent" full stop. Three entities, three profiles, one definition. And crucially: **the aggregate ranking can flip if you change the subject list.** Which is why any aggregate score that does not publish its evaluation scope is not a measurement — it is a claim wearing a decimal point.

## The part that actually decides whether this is science

A definition is cheap. This one is universal in a specific, limited sense: it assigns the same *meaning* to intelligence for any reasoning entity, whether carbon or silicon. That is conceptual universality, and it should never be confused with empirical validation. A universal definition does not guarantee that reasoning can be measured perfectly across every conceivable subject.

So what would it take to measure it? An estimated score \(\hat R(E,S)\) — a weighted average of task performances, with \(q(E,t_j) \in [0,1]\) and weights \(w_j > 0\) — must be held sharply apart from the underlying capability \(R(E,S)\). One is the thing; the other is what finite observations license you to say about the thing. Conflating them is where most intelligence claims quietly die.

Three disciplines follow, and each has real teeth:

**Correctness is not evidence of reasoning.** An answer produced by memorisation, copying, or retrieval from a solution database is not an answer produced by reasoning. Any protocol that cannot distinguish these is measuring familiarity and calling it intelligence. The objection that skill is contaminated by prior knowledge is not a footnote here; it is a design constraint on every task.

**Fairness cuts both ways.** A person with restricted motor control must not be scored as mathematically unintelligent because they cannot operate a response device. Symmetrically, a model must not get credit for reasoning it retrieved rather than performed. Equivalent reasoning objectives do not require identical interfaces, and identical interfaces do not guarantee equivalent objectives.

**The taxonomy is part of the measurement.** Split mathematics into twenty subfields and leave social reasoning as one bucket, and your aggregate is mostly a mathematics score wearing a lab coat. Subject granularity moves the number without the entity changing at all. Publishing the taxonomy and blocking gratuitous duplication of near-identical subjects is not bureaucratic tidiness; it is the difference between a score and a story.

Add reproducibility — subjects, tasks, scoring, permitted tools, conditions, uncertainty — and you have something repeatable. And what repeats is a claim about demonstrated capability **under those conditions**, not an infallible intrinsic quantity.

## Where this sits, and what it refuses to claim

The idea is not born in a vacuum. Psychometric research has long held that cognitive abilities differentiate — broad and narrow factors, correlated but distinct. The difference in starting point matters: rather than defining intelligence as a statistical factor inferred from test correlations, this framing defines it directly as subject-specific reasoning capability. Whether the aggregate lands near psychometric \(g\) is an open empirical question, not an identity to be asserted.

There is also a neighbouring ambition worth naming: a single standard that applies to very different entities, grounded not in reasoning about subjects but in expected performance across environments, with reward accumulated over an environment distribution. The two visions may overlap richly; neither is automatically reducible to the other. I would rather say "these are different foundational quantities" than manufacture a unification that does not exist.

And the boundaries are worth stating plainly. Conceptual universality is not empirical completeness. Intelligence, as defined here, does not entail moral judgment, benevolence, consciousness, honesty, wisdom, or reliability under every condition. Those matter enormously when you decide what to build or trust. Folding them into the definition would buy false unity at the cost of clarity. Keep them separate.

## What I would actually change

For AI specifically, the practical consequence is a reporting rule I think is close to non-negotiable:

**Report the profile, not just the score.** Subject-specific reasoning scores plus aggregate breadth and depth — never a handful of benchmark numbers presented as a measure of intelligence. A single headline figure hides both the exceptional column and the catastrophic one, and it invites incomparable systems to be compared as if they shared an evaluation set.

Progress, under this lens, is legible in three ordinary ways: reason better inside subjects you already have, extend reasoning to subjects you did not, or both. That is a healthier target than chasing a scalar.

## The honest weaknesses

This is a framework, not a finished instrument, and pretending otherwise would be exactly the failure mode it warns about.

We need observable criteria for when reasoning has occurred, not just for when an answer is right. Subjects need consistent definition, or aggregate scores drift on paper while the entity stands still. Scales need calibration, since an uncalibrated number carries no comparative meaning. Correctness alone cannot certify reasoning. Equal aggregates never imply equal profiles. And above all: nobody has yet shown empirically that subject-specific reasoning assessments are stable, or that the aggregate predicts performance on subjects never tested.

Those are problems of operationalisation, not contradictions in the definition. That is a real distinction — but it is also a promissory note, and the framework owes payment in data.

---

Here is why I find the framing worth the trouble. Most intelligence arguments are really arguments about a hidden assumption — that there is one quantity, and that a fair test would expose it. Drop that assumption and the paradoxes evaporate: the savant, the specialist, the model with a strange hole in its competence. What remains is a harder and more useful question than *how smart is it?* Namely: **what, specifically, can this entity reason about, how deeply, and how do we know it reasoned rather than remembered?**

That question has a real answer for any entity, carbon or silicon. A number never did.
