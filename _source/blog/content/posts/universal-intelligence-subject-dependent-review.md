---
title: "A Definition Is Not a Measuring Instrument: Reviewing \"A Universal Definition of Intelligence\""
date: "2026-10-28T01:53:40.304Z"
summary: "A critical review of a conceptual paper that defines intelligence as I(E,S)=R(E,S) — subject-dependent reasoning capability — and aggregates it across subjects. The paper is honest, parsimonious, and genuinely clarifying about savant and AI profiles. It also relocates the entire measurement problem onto a quantity it never measures."
labels: ["intelligence", "AI evaluation", "psychometrics", "paper review", "philosophy of science"]
draft: true
---
There is a recurring frustration in any serious conversation about intelligence. A mathematical savant who cannot navigate a supermarket, or a language model that derives a proof and then fumbles a grocery list, both look like *contradictions* under the ordinary assumption that intelligence is a single general property that ought to show up consistently. The paper **"A Universal Definition of Intelligence Based on Subject-Dependent Reasoning"** (a conceptual research paper dated 28 October 2026) attacks that assumption directly, and it does so with unusual clarity about what it is and is not claiming.

Its central move is disarmingly simple. Rather than trying to define one thing called intelligence, define a *family* of them, indexed by subject:

> **Intelligence measures the degree to which an entity, human or machine, can reason about a given subject.**

Formalised as

\[
I(E,S) = R(E,S)
\]

where \(E\) is an entity, \(S\) a subject, and \(R\) its reasoning capability concerning that subject. Give the entity a score on each subject in an evaluation set \(\mathcal S = \{S_1,\dots,S_N\}\), normalised to \([0,1]\), and aggregate:

\[
I_{\mathcal S}(E) = \sum_{i=1}^{N} R(E,S_i), \qquad
\bar I_{\mathcal S}(E) = \frac{1}{N}\sum_{i=1}^{N} R(E,S_i)
\]

Breadth counts subjects clearing a threshold, \(B_{\mathcal S}(E;\tau) = \sum_i \mathbf 1[R(E,S_i)\geq\tau]\); depth is simply \(D(E,S)=R(E,S)\), the paper noting that "the framework does not require a separate foundational definition of depth."

This is a clean, small, well-specified framework. Below I'll take it seriously in both directions: what it genuinely buys you, and why its central equation is closer to a *specification* of a measuring instrument than to the instrument itself.

## What the paper gets right

It is worth saying plainly that this is a well-behaved piece of conceptual work, and much of its quality lies in what it refuses to claim.

**It removes a false puzzle without eliminating the hard part.** The savant paradox really is an artefact of an unstated uniformity assumption. Once intelligence is indexed by subject, "high in mathematics, low in social reasoning" is a *profile*, not a contradiction. Section 3.1 makes a point I wish were more standard: "It is important to distinguish reasoning limitations from difficulties caused by motor, sensory or other non-reasoning factors." A person who cannot operate a response device has not thereby demonstrated poor mathematical reasoning.

**It separates breadth from depth cleanly.** This is the most reusable idea in the paper. Most public argument about AI capability collapses these together — "it can do graduate math but not reliably book a flight" gets read as incoherence rather than as *narrow and deep* versus *broad and shallow*. The breadth indicator function and the per-subject score give that distinction a precise form at almost no conceptual cost.

**Its self-limitations are honest and specific.** Section 6 opens by saying the results "follow from the definitions and are not presented as novel discoveries in mathematics." Section 4.4 says the aggregate is "not [a] proven equivalent of the psychometric general intelligence factor \(g\)." Section 9 distinguishes conceptual universality from empirical validation. Section 11 lists six open problems, including its own circularity risk. A paper that pre-empts its reviewers this systematically is doing something right.

**It keeps intelligence separate from everything adjacent.** Section 9 explicitly declines to fold moral judgment, honesty, wisdom, or consciousness into the definition. Whatever one thinks of that choice, it is made deliberately and defended, which is more than most definitional papers manage.

**It says the right thing about reporting.** The practical recommendation in Section 10 — report subject-level scores *and* aggregate breadth/depth, never a bare benchmark number — is a genuinely useful norm, and one that current AI evaluation practice routinely violates. "A reported score should be accompanied by the underlying subject profile. This prevents the aggregate score from concealing major deficiencies or exceptional capabilities."

## Where the framework is thinner than it looks

Now the critique. None of it is a logical contradiction — the paper is scrupulous about that — but several points are structural, and they matter more than the paper's framing suggests.

### 1. The identity relocates the entire problem onto \(R\)

\(I(E,S)=R(E,S)\) is not a claim about the world; it is a naming convention. It says: *call the thing we care about "reasoning capability concerning S," and call that intelligence.* Everything of substance then lives in \(R\), which Section 2.2 defines only in ordinary language: "the process of using information to reach conclusions, judgments or decisions," including "explicit or implicit, conscious or computational" cases.

That is an admirably permissive definition, but it is close to unfalsifiable at the object level. If an entity reaches a conclusion, it reasoned; if it failed, either its reasoning was limited or its reasoning was fine and something else (memory, interface, luck) intervened. The paper is aware of this — Section 11's first limitation is exactly that "reliable assessment requires observable criteria for determining whether reasoning has occurred" — but the awareness is not the fix. The equation is true by construction, so no observation can disconfirm it. All empirical risk has been pushed into \(\widehat R\), the estimator in Section 7, which is where the real theory would have to live.

### 2. The unweighted sum makes crowd-out inevitable

\(I_{\mathcal S}(E)=\sum_i R(E,S_i)\) is a specific and consequential choice. Consider two entities:

- \(A\): \(0.98\) on mathematics, \(0.40\) elsewhere across nine more subjects.
- \(B\): \(0.60\) on all ten subjects.

\(A\) sums to \(0.98 + 3.60 = 4.58\); \(B\) sums to \(6.00\). Under the paper's own definition, \(B\) is the more intelligent entity by 31%, despite \(A\) being in a different league on the one subject anyone would name as its strength. The paper's illustrative table shows precisely this pattern: the mathematical savant scores \(2.58\) against the generalist human's \(4.00\), a gap driven entirely by the savant's low scores in four of five subjects.

Is that wrong? Not necessarily — the paper might welcome it as the correct verdict that a savant is not generally intelligent. But it means the aggregate is not a neutral summary: it embeds a trade rate between depth and breadth, and that rate is an artefact of how many subjects happen to be in the evaluation set. Add twenty more subjects where \(A\) scores \(0.40\) and its deficit grows mechanically; collapse mathematics into one subject and its advantage perversely shrinks. The weight vector is doing enormous work while the framework presents the sum as natural. The paper notices this in Section 7.2 — "if mathematics is divided into twenty subfields while social reasoning is treated as one subject, the aggregate score may disproportionately reflect mathematical reasoning" — which is real credit, but the diagnosis arrives as a caveat rather than as a modification to the aggregation. It probably should be a modification.

### 3. The four "propositions" are true and uninformative

Section 6 offers four results, and the paper states in advance that they are elementary. They are in fact *tautologies of the definitions*:

- **Proposition 1 (subject independence)** says high \(R(E,S_1)\) does not entail high \(R(E,S_2)\). True only because nothing in the definition links them. It restates the absence of a constraint. The interesting version of this proposition would be an *empirical* claim — that reasoning capability really is weakly correlated across subjects for real entities — and that is precisely what the paper does not supply.
- **Proposition 2 (monotonicity of the aggregate)** says summing pointwise-larger scores gives a larger total. This is addition preserving inequality, true of any monotone aggregation.
- **Proposition 3 (breadth monotone in decreasing threshold)** says lowering \(\tau\) can only add subjects satisfying \(R \geq \tau\). This is set inclusion.
- **Proposition 4 (aggregates don't determine profiles)** shows \((1,0)\) and \((0.5,0.5)\) both sum to \(1\). True, and useful, but it is the standard observation that a scalar summary of a vector is lossy.

Four propositions, zero of which could fail while the definitions hold. The section demonstrates internal coherence — which is not nothing — but it does not constrain any observable. A reader looking for reasons to believe the framework has empirical content will not find them here, and the paper's honesty about this ("not presented as novel discoveries") leaves the question of what *would* count as a discovery pointedly open.

### 4. The paper's own illustrative evidence is admittedly non-evidence

Section 5's comparison table is labelled "*All values are illustrative, not empirical measurements of individuals or AI systems.*" Section 3.2's numbers are "hypothetical and assume a normalised measurement scale." This is scrupulous, and it need not be fatal — thought experiments are legitimate. But combined with points 1–3, the framework currently consists of a definition, an estimator proposal, and hypothetical illustrations. There is no calibration study, no reliability estimate, no test of whether subject scores are stable, and no demonstration that the aggregate predicts anything on unseen subjects. The paper says as much in Section 11's final item.

### 5. The hardest existing challenge is acknowledged but not answered

Section 8.3 is the most interesting passage in the paper, because it names the problem that most threatens the framework: Chollet's argument that "skill at a particular task cannot alone establish general intelligence because skill depends heavily on prior knowledge and experience." If \(R(E,S)\) is measured on tasks, and task performance is contaminated by memorisation and prior exposure, then the measured quantity is not reasoning capability but something like *reasoning-plus-repertoire*.

The paper's response is a list of protocols: "unfamiliar tasks, controlled information access, varied problem formulations and appropriate assessment protocols." Section 7 similarly requires distinguishing "a correct conclusion obtained through reasoning and an answer supplied through memorisation, copying or an unauthorised external source," while conceding that "where reasoning processes are not directly observable, conclusions about the underlying mechanism must remain appropriately qualified."

This is the right instinct and the hardest open problem in the whole paper. It is also where the framework's own architecture offers no leverage: because \(R\) is defined functionally rather than mechanistically, the framework cannot tell you from the inside which of two equally scoring entities was reasoning. That judgement has to come from the assessment design, which lives outside the framework. In the contemporary AI context this is not a peripheral worry — it is *the* worry, since contamination is the default state of benchmark reporting.

## What would actually validate this

The paper lists the conditions in scattered form; assembled, the empirical burden is substantial:

1. **A published, pre-registered subject taxonomy** with anti-duplication rules and an explicit statement of granularity — the paper demands this in Section 7.2 and should be treated as a hard precondition, not a caveat.
2. **A calibration procedure for \(R\)**, with reported reliability and inter-rater agreement for the task weights \(w_j\) and scores \(q(E,t_j)\).
3. **An out-of-sample test.** The framework makes a falsifiable prediction the paper almost states but does not quantify: subject-specific reasoning scores should predict performance on *previously unseen* subjects (Section 11). If they don't, the "subject" construct has no predictive reach and \(R\) is just a task-indexed score wearing a theoretical label.
4. **Incremental validity.** Does the aggregate improve on existing instruments — fluid-reasoning tests for humans, contamination-controlled benchmarks for models — in predicting anything anyone cares about? The paper is right that the relation to \(g\) "remains an empirical question," and it is the decisive one for the psychometric half.
5. **A sensitivity analysis of the aggregation.** Since rankings depend on weight and granularity choices, any published score must report how it moves under reasonable variations. A score that flips sign under benign re-specification is not a measurement.

## The verdict

The paper's principal claim is that it offers "a parsimonious conceptual framework in which intelligence is universally defined but locally evaluated," and on that ground it succeeds. The definition is small, portable across humans and machines, and it genuinely dissolves a puzzle that has muddied a lot of discussion. The recommendation to report profiles rather than single numbers, and to publish the subject taxonomy alongside any score, is one I would adopt regardless of whether the framework survives.

But the equation \(I(E,S)=R(E,S)\) is best read as a **specification of what a measuring instrument would have to capture**, not as the instrument. It tells you the shape of the output — a subject-indexed profile with breadth and depth — and then hands the entire epistemic problem to whoever builds the estimator. That is not a fatal flaw; specifications are useful, and this one is unusually well specified. It does mean the paper's contribution is architectural rather than substantive: it constrains how you must *talk* about intelligence, and on its own it constrains nothing about what you will *find*.

The most useful question the framework asks is the one it ends on: *what subjects can the entity reason about, and how well?* The most useful question it leaves unanswered is the one that decides everything: *and how would you know?*

---

*Reviewed paper: "A Universal Definition of Intelligence Based on Subject-Dependent Reasoning — A Unified Framework for Measuring Human and Machine Intelligence," conceptual research paper, 28 October 2026, explicitly self-described as "Conceptual research proposal. The formal properties follow from the proposed definitions; the validity of the proposed intelligence measures remains to be tested empirically." Works referenced by the paper include Legg & Hutter (2007), Chollet (2019), and Flanagan & Dixon (2014) on Cattell–Horn–Carroll. All numerical examples in this review are my own illustrative constructions or are taken from the paper's illustrative table; none are empirical measurements.*
