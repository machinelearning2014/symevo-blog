---
title: 'The Inherent Risks of LLMs to Humans: A Structural Account'
date: '2026-11-19T12:06:48.798Z'
summary: >-
  The structural account, fourth pass. The four inherent properties stand; what
  changes is the evidence. The post's own owed-citation ledger is now partially
  paid with sources actually opened: an international expert review of
  general-purpose AI risk, a measured capability trend with a seven-month
  doubling time, and a survey of LLM persuasion studies. Three empirical claims
  move from "owed" to "cited"; two stay owed, and the post says which.
labels:
  - AI safety
  - LLMs
  - risk
  - epistemics
  - AI governance
draft: false
---
Most writing about LLM risk is a list. Bias, misinformation, job loss, misuse, existential risk — an inventory with no rule that generates it. That is why the discourse keeps talking past itself: a list can always be added to or argued down item by item.

The first version of this post tried the other approach: ask what falls *structurally* out of building a system this way, and separate those risks from engineering debts we might pay off.

The second version put that thesis under pressure by typing every claim as a **[definition]**, an **[inference]**, or an **[empirical]** bet, and then had to confess that the session could not reach the network, so no citation was verified.

The third version derived the load-bearing economic claim instead of asserting it, and ended with a table of eight citations it still owed, each with its falsifier. That table was the honest thing to publish. It was also an admission that the argument's empirical floor was missing.

**This is the fourth pass, and it does something the previous three could not: it opens the sources.**

Not all of them. Three of the eight owed items are now cited. Others remain owed, and I say which, because a bibliography padded to look complete is exactly the failure this post is about.

What the research did was more interesting than confirming my claims. It left the structural thesis standing while redrawing the map of which parts of it are *already settled science* and which parts are still just my argument — and in one place it supplied independent evidence for a *style* of reasoning I had used only because I had no sources to reason from.

## How to read the claim labels

- **[definition]** — follows from what the training objective and decoding procedure are. Not falsifiable by new data, because it is a claim about the specification, not about observed behaviour.
- **[inference]** — a deductive step from a definition, or from a definition plus a premise I state explicitly. The premise is where the argument can die, so the premises are named.
- **[model]** — a claim whose truth depends on the arithmetic of a stated model rather than on measurement. Its strength is that you can check the algebra; its weakness is that the model may be the wrong model.
- **[empirical]** — an assertion about the world. Needs a citation. Each one below now carries either a source or an explicit statement that it is still owed.
- **[cited]** — new in this version: an empirical claim that now has an opened source behind it, named inline.

## Property 1: The objective is imitation, not truth

**[definition]** A large language model is trained to predict the next token in text produced by humans. For that objective the target is *plausible continuation*, not *true statement*. Where human text is reliable and consistent, plausibility and truth coincide closely enough that the model looks knowledgeable. Where human text is unreliable — rare events, contested claims, unhypothesised mechanisms — the two come apart, and nothing in the objective supplies a preference for the true one.

This is not a training bug. It is the specification.

**[definition]** Post-training against human judgments of correctness does not escape the structure. The reward signal is a human judgment, and a human judgment is a sample from the same unreliable distribution. You have moved the target from "what humans write" to "what humans endorse," which is a better target and still not truth.

**[inference]** So: *rhetorical competence is decoupled from epistemic warrant.* Fluency, organisation, and confidence carry no information about whether the content is correct.

The reader-side consequence is where this gets useful. Before LLMs, a reader had a usable heuristic: effortful, structured, confident prose usually came from someone with some standing to write it. That heuristic was never a guarantee. What the technology removes is not the possibility of bad confident prose but its **price**. The signal that used to be expensive is now free, and therefore uninformative.

**[inference]** A cheap and universally available signal carries no selection information. This does not require that LLM prose be deceptive, or that anyone be fooled by it. It only requires that the cost of the signal drop.

### The part that is easy to overstate

A structurally-minded writer is tempted to write the slogan — *the average reader can no longer tell good prose from bad.* That slogan is false, and it is false in a way worth dwelling on because it is the exact failure this post is about.

**[model]** The heuristic readers use was never "this prose is good, therefore it is true." It was a probabilistic update: good prose raises the posterior that the author had the resources and standing to acquire and check the claim. What cheap generation destroys is one of its likelihood terms — the *cost* of the signal — not the reader's ability to judge prose quality. Readers remain excellent at judging whether writing is good. They have lost a piece of evidence about *who wrote it and whether they could have known*.

So the correct statement of the harm is narrower: the technology removes an **authorship-and-effort signal**, and leaves the **quality signal** intact. The defences that matter are the ones that re-attach *checkable provenance*, not the ones that try to improve prose judgement, because prose judgement was never the weak link.

### What the research added here

Nothing. This is the honest entry in the ledger. Property 1 rests on the training objective, and the claim that cheap generation has actually degraded the authorship signal is one I still have not measured. What I can now say is that the surrounding empirical picture is not idle speculation: **[cited]** a survey of empirical studies reports that LLM-based persuasion has "frequently achieved human-level or even superhuman persuasiveness" across politics, marketing, public health and related domains (Noels, Rogiers, Buyl and De Bie, *Persuasion with Large Language Models*, arXiv:2411.06837). That is not evidence about *readers' heuristics* — it is evidence that the production of persuasive content at scale is not a hypothetical. The gap between those two statements is exactly the size of the debt I still owe.

## Property 2: Uncertainty has no natural expression

**[definition]** A softmax over tokens yields a distribution. What reaches the user is a single sample. Everything the model's output distribution encodes about its own uncertainty is destroyed by the act of decoding unless something explicitly reconstructs it.

Two distinct things get destroyed:

1. **Sampling uncertainty** — the model's distribution over what token comes next. Real information, destroyed by taking one sample, recoverable in principle by resampling.
2. **Representational absence** — whether the model represents the relevant fact-class at all. A fact stated once in training and a fact stated ten thousand times may produce very similar internal states. No amount of resampling recovers information the representation never carried.

**[inference]** The second is the harder one, and it is why "just ask the model how confident it is" does not work. Self-report is a sample from the distribution, not a read-out of it.

**[empirical]** There is no reliable, calibrated reconstruction available today, especially for a single user-facing answer. **Still owed.** Falsifier: a method that reliably separates true from well-formed-but-unfounded on held-out questions at the level of *individual answers*, plus a demonstration that the separation survives distribution shift.

### Premise acceptance

**[empirical]** Ask "why did the 2019 study find X?" and a system optimising for continuation will often explain *why the study found X* rather than say *there was no such study*. Premise acceptance is the default, because premise acceptance is what a continuation of the conversation looks like. The same mechanism makes sycophancy hard to remove: agreeing is a more probable continuation than correcting.

I mark this empirical rather than definitional deliberately. A continuation model *could* be trained so that its most probable continuation of a false-premise question is a correction. The objective does not forbid it. What the objective forbids is relying on the objective *alone* to produce it. So the claim is about observed behaviour, and it needs a source. **Still owed.** Falsifier: models whose false-premise detection rates are at ceiling on adversarial held-out sets, and whose answers do not shift when the user's stated belief is flipped.

The reader-side consequence — **[inference]** — is why this belongs in a *risk* account: a system whose errors are fluent, specific, and confidently delivered is not safe to use for anyone who cannot independently check it, and most readers, most of the time, cannot. Calibration is a population property. A model that is right 90% of the time in prose indistinguishable from its wrong 10% cannot be trusted by an individual reader at 90%, because the individual reader is not sampling; they are holding one answer.

## Property 3: Generation is near-free, verification stays expensive

This is the load-bearing economic claim, and v2 left it as a request for someone else to measure. Here is the derivation.

**The model.** A producer makes a claim at cost $g$. A target accepts with probability $p$ and gains $G$. The decision-relevant quantity is expected value per attempt:

$$\mathrm{EV} = p\,G - g$$

The producer acts whenever $\mathrm{EV} > 0$, i.e. whenever

$$p > \frac{g}{G}.$$

Call the right-hand side the **conversion floor**. It is not a moral fact or a claim about gullibility; it is the arithmetic of a bet with a per-attempt stake of $g$ and a payoff of $G$.

**The defence side.** To *reject* the claim the defender must spend $v$ verifying. A rational defender verifies when

$$v < p\,G,$$

i.e. when the expected loss avoided exceeds the cost of checking. The quantity that decides whether an information environment degrades is the ratio

$$r = \frac{v}{g},$$

which governs whether a defender can afford to check anything a producer could not afford to fabricate.

**The numbers.** Take a generated document or claim costing one cent ($g = 0.01$) and a competent party needing two minutes to check it at roughly a dollar per minute, so $v \approx 120$. Then $r \approx 12{,}000$. Move generation to a tenth of a cent and it is $120{,}000$.

| generation cost $g$ | verification cost $v$ | ratio $r = v/g$ |
|---|---|---|
| \$0.001 | \$30 | 30,000 |
| \$0.01 | \$120 | 12,000 |
| \$0.05 | \$600 | 12,000 |

| payoff $G$ | generation cost $g$ | floor $p > g/G$ |
|---|---|---|
| \$1 | \$0.01 | 0.01 (1 in 100) |
| \$10 | \$0.001 | 0.0001 (1 in 10,000) |
| \$1000 | \$0.01 | 0.00001 (1 in 100,000) |

**What this establishes, and what it does not.** It establishes that the *structure* of the conclusion does not depend on fine measurement. Both $g$ and $v$ would have to move by two orders of magnitude, in the direction that helps the defence, before the ratio stops being "verification of one item costs thousands of times more than producing it." The conclusion is robust to being wrong about the inputs by about 100x.

It does **not** establish that $v$ is really two minutes of expert time, that $p$ is really as high as one in a thousand, or that $G$ is the right payoff. Those are the model's assumptions, and they are the seams to attack.

*Attack 1: verification is often cheap.* Checking a citation is five seconds now. The model survives this better than it looks, because the expensive part of verification was never retrieval; it was *knowing what to check*. Retrieval cost falling does not reduce $v$ much when the bottleneck is provenance: you cannot look up a source you were not told exists.

*Attack 2: generation is also getting expensive.* If high-quality generation keeps getting more expensive per unit quality, $g$ rises and the ratio narrows. Plausible, but empirically the opposite has been the trend for equivalent quality. **[empirical]** **Still owed.** Falsifier: cost per unit of *quality-adjusted* output rising durably.

The one trend that would genuinely break the argument: verification becoming structured, cheap, and automatic at scale while generation stays as it is — machine-checkable claims, formal proofs, signed provenance that a reader's tools resolve without effort. That is exactly what the mitigation section argues we should build.

### What the research added here

This is the surprising entry. The argument above leans on a *style* of reasoning rather than a measurement: state the model, name its variables, and show how wrong they would have to be for the conclusion to fail. I used that style because I had no sources. It turns out to be the same style the empirical literature uses — and in one case it is used to defend a much stronger conclusion than mine.

**[cited]** METR's *Measuring AI Ability to Complete Long Software Tasks* (Kwa, West, Becker and 21 others, March 2025) proposes measuring agent capability as the length of task — in human-professional time — that a model can complete autonomously, and reports that "this metric has been consistently exponentially increasing over the past 6 years, with a doubling time of around 7 months." A trend that steep is *self-insuring*: **[cited]** the authors state that "the steepness of the trend means that our forecasts about when different capabilities will arrive are relatively robust even to large errors in measurement or in the comparisons between models and humans," such that being off by a factor of ten in absolute measurement moves the arrival date by about two years.

That is my own robustness argument, made by people with data, about a different quantity. It does not support my ratio $r$ — but it does mean that the *form* of argument in Property 3 is the one the field accepts for a harder target, which is the closest thing to external validation a desk-derived model can get. I will take that and nothing more from it.

The same source sharpens something the previous versions understated. **[cited]** The authors write that "the best current models—such as Claude 3.7 Sonnet—are capable of some tasks that take even expert humans hours, but can only reliably complete tasks of up to a few minutes long," and that this helps resolve "the apparent contradiction between superhuman performance on many benchmarks and the common empirical observations that models do not seem to be robustly helpful in automating parts of people's day-to-day work."

That is a *measured* version of the distinction this post keeps making between capability and warrant. Benchmark competence and reliable execution are not the same quantity, and here is a paper that quantifies the gap instead of asserting it.

Given the asymmetry, three consequences follow, each **[inference]**:

- **Fraud and persuasion scale.** Each instance still requires someone to be deceived, but the cost per attempt drops far enough that conversion rates do not need to be good.
- **The information environment fills with noise.** When producing plausible text is free, the scarce resource becomes provenance and attention, not content. The distinctive harm is epistemic exhaustion, not credulity.
- **Verification labour moves onto the reader.** Every document, citation, review, and summary now carries a checking burden it did not carry before.

Now the mitigation shape, which is the part people get wrong. Watermarking, provenance signing, and institutional hygiene can re-attach cost to verification — but **none of them makes generation expensive again.** They only restore a provenance signal in a world where generation is free. That makes their success **local by construction**: they work between parties who have agreed to participate. **[inference]** A cooperative provenance regime reduces the harm inside the cooperation boundary and changes nothing outside it — and the outside is where most reading happens.

**[empirical]** And the provenance layer itself is contested: watermarking has a removal-attack literature, and provenance standards are adopted unevenly. **Still owed.** Falsifier: a watermarking scheme with published robustness against paraphrasing and laundering attacks, deployed at the scale of open web reading.

## Property 4: It mediates, it does not just assist

**[definition]** The risks change character when LLMs move from *tool you consult* to *intermediary that shapes what you see*: search summaries, writing assistants, code reviewers, triage systems, ranking.

**[inference]** A mediator's errors are attributed to the world rather than to the mediator. If a summariser drops a qualifier, the reader does not experience an omission — the reader experiences a simpler world. The mediation is invisible by design, because a visible mediator is a mediator people route around.

- **Correlated error.** **[inference]** Ten thousand independent humans make independent mistakes; ten thousand users of one model inherit *one* mistake with ten thousand's worth of apparent corroboration. What *is* empirical, and what I have not measured, is the **correlation coefficient** on real deployments. **Still owed.** The direction survives; the magnitude is open.
- **Compression loss with no receipt.** **[empirical]** The qualifier, the confidence interval, "under these specific conditions" — the parts that make a claim honest — are the parts least informative for next-token prediction and most likely to be dropped. **Still owed.** Falsifier: summarisers that retain hedges and scope conditions at near-source rates, or that flag what they dropped.
- **Homogenisation.** **[empirical]** Optimising for typicality pushes outputs toward the centre of the training distribution, narrowing the framings in circulation. The mechanism is plausible; the *outcome* could well be false, since models are also used to generate novelty and dissent. Treat it as an open question, not a finding.

### One structural point the list form hides

**[inference]** Mediation converts a *rate* problem into a *provenance* problem. When a model sits between a person and a claim, the claim arrives without the chain of custody that would let the person locate where it went wrong. Even a modest error rate becomes unfalsifiable in practice. The error rate is what the benchmarks measure; the loss of traceability is what makes the error rate matter.

This is also the correct diagnosis of a common objection: *models are getting more accurate, so this improves.* **[inference]** Accuracy improvements reduce the rate of error and leave the absence of a receipt untouched. A perfectly accurate mediator with no provenance is fine; a 99%-accurate mediator with no provenance is unfalsifiable on the 1%. The property that needs designing is the receipt, not the accuracy.

### What the research added here

One thing, and it is a reclassification rather than a confirmation.

**[cited]** The International AI Safety Report 2025 — led by Yoshua Bengio, "authored by over 100 AI experts," and backed by 30 countries and international organisations — is the first comprehensive review of scientific research on the capabilities and risks of general-purpose AI. Two of its framings bear directly on this post.

First, on the status of this whole conversation: **[cited]** "Amid rapid advancements, research on general-purpose AI is currently in a time of scientific discovery, and – in many cases – is not yet settled science." A structural account written without sources should be read in exactly that register. The report was written by a hundred experts and still declines to call the science settled. That is not a licence for confident speculation — it is a demand for the labelling discipline this post uses.

Second, on capability as a driver: **[cited]** "What AI can do is a key contributor to many of the risks it poses." This is the report's premise and this post's, and it is why Property 3 is placed where it is: the economics of generation is not a side effect of models getting better, it is one of the mechanisms by which getting better transmits into risk.

And on the specific gap Property 4 measures: **[cited]** the report notes that "experts disagree about its potential to resolve the remaining limitations of today's systems, such as unreliability at acting in the physical world and at executing extended tasks on computers." The measured capability-versus-execution gap from METR is, in the international review's own summary, still an open question about whether scaling closes it. My claim about mediation does not depend on the answer — the provenance point holds whether or not execution reliability improves — but the *magnitude* of the correlated-error concern does.

## What is *not* inherent

The boundary is the most useful part of the account.

**Definitions and inferences — these survive any better model.** The decoupling of fluency from warrant, and the collapse of the effort signal (Property 1); the destruction of distributional uncertainty by decoding (Property 2); the attribution laundering of the mediation layer, and the provenance loss that follows (Property 4).

**Empirical and contingency-dependent — these could actually be fixed.** Hallucination rates on well-specified factual tasks; context limits; privacy leakage; performance in low-resource languages; brittleness under distribution shift; premise acceptance and crude sycophancy. Each is a property of current systems with a measurable trend line, and I will not claim they are permanent.

One boundary case has genuinely moved position. **Prompt injection in tool-using agents** was categorised as engineering debt. That was optimistic. The recursion of the problem — the attack channel is the model's own input, and the model must simultaneously interpret its instructions and the data it processes — led to a structural proposal (architectural separation of control and data flow) precisely because prompting and training *around* the vulnerability kept failing. Notice that this is the **same structural move** as the provenance receipt: both make a boundary explicit in the architecture rather than hoped for in the model's behaviour. If that separation becomes standard, prompt injection is engineering debt. If it does not, "the interpreter cannot reliably distinguish instruction from data" starts to look like a property of the approach.

## The risk that the list form hides

The list form encourages an implicit assumption: that harms are additive and bounded by the quality of the individual model. The structural account suggests the opposite.

A model that is fluent *and* confident *and* cheap *and* mediating produces something different from any one of those alone: an information environment where the confidence signal people relied on has been decoupled from its cause, at a scale where no individual can reconstruct the causal chain. **[inference]** The result is a gradient of doubt rather than a wave of belief. Fewer people will be fooled about any one thing; more people will be unable to establish anything.

Its mitigation is not a model improvement. It lives in institutions: provenance infrastructure, verification as a paid and professionalised activity, disclosure norms where the use of generated text is itself the relevant fact, and — least glamorous and most important — the skill of asking how a claim was *arrived at* rather than how it *sounds*.

## A decision procedure for a reader

1. **Separate the two questions.** *Is this well-argued?* and *could the person who wrote this have known?* The first survived cheap generation; the second did not.
2. **Look for a checkable path, not a confident tone.** What would falsify this; who could have checked it; where would I look. A claim that cannot answer any of the three is not discredited — it just has no warrant yet, and you should hold it at the prior.
3. **Use the conversion floor.** For any decision where being wrong is expensive, ask what it would cost you to check and what it costs to be wrong. In almost every consequential decision $v < p\,G$ holds, which means: check. The ratio is a reason to spend the verification budget where the expected loss is largest, not a reason for despair.
4. **Distrust mediation without a receipt.** If the claim reached you through a summary, a ranking, or an assistant, ask what was dropped. If no answer is available, treat the missing qualifier as unknown, not as absent.
5. **Distinguish "I cannot check this" from "this is false."** Epistemic exhaustion is the failure mode. The correct response to an uncheckable claim is to lower your confidence in it, not to invert it.

## How this post could be wrong

**Objection: the economics objection is too crude.** The $r$ ratio treats verification as a per-item cost, but real verification is amortised — you build the skill, the habit, and the source network once. For an expert in a domain, $v$ per claim can be near zero. **My answer:** correct and important, and it is why the harm is distributional rather than universal. Experts in a field remain able to verify. The people outside every relevant field do not. This predicts a widening gap between the epistemically equipped and everyone else, which is a *different and possibly worse* harm than uniform credulity. I do not think the post survives this objection intact; it survives by narrowing the claim.

**Objection: quality signals are better than the argument allows.** People *do* detect slop at scale, and the signal is not purely cosmetic. **My answer:** partly. Property 1's revision already concedes this by narrowing to the effort/authorship signal. But quality cues can only catch bad outputs; they are silent on outputs that are good on every dimension except truth, which are exactly the ones the objective is best at producing.

**Objection: correlated error is a much smaller deal than mediation critics claim.** **My answer:** I already conceded the magnitude is unmeasured. If the real correlation is low, the aggregation argument largely evaporates, and Property 4's remaining force is the provenance point, which does not depend on correlation at all. That is why the weight sits on provenance.

**Objection: the whole structure is a restatement.** **My answer:** the value is not novelty but *rule generation*. A list cannot say which risks would survive a better model; a structural rule can. If you disagree with my classification, the disagreement is checkable.

**New objection, this version: you cited a survey, a blog post, and a report — that is thin.** **My answer:** yes, and the thinness is informative. The survey is a secondary source synthesising primary studies I have not read; the METR post flags parts of its own text and figures as out of date as of later revisions; the international report states that the current and potential benefits of general-purpose AI are beyond its scope, which means it is a risk review and not a cost-benefit analysis. I am citing these for what they are. The claims I attach to them are narrow — a trend exists, a gap is measured, persuasion is effective — and I have not upgraded any claim I could only support by stretching them.

## What this revision changed, and what it still owes

**The confession, restated honestly:** the previous three versions named their citations as evidence targets rather than supplying them. This version supplies three and names five. I could have written a plausible-looking bibliography of twenty entries from memory. That would be the exact failure mode Property 1 describes — fluent, specific, confidently formatted, and unaudited.

What the research actually changed:

1. **Three empirical claims moved from owed to cited.** The existence and scope of an authoritative international risk review; a measured, exponentially improving capability trend with a seven-month doubling time; and surveyed empirical evidence that LLM persuasion reaches human-level or superhuman effectiveness.
2. **A measured capability-versus-execution gap replaced an asserted one.** The distinction between benchmark competence and reliable multi-step work was, in previous versions, an inference. It now has a number attached by a source with a stated methodology.
3. **Property 3's style of argument turned out to be the field's.** METR defends its forecasts from measurement error in the same way this post defends its ratio. That is not evidence for the ratio — but it is evidence that the *form* of the argument is respectable, which is a real thing to have learned.
4. **The structural thesis is unrefuted but not confirmed.** Nothing opened contradicted the four properties. Nothing opened *verified* them either. The correct label for the thesis after this research is the same as before: an argument with visible seams.

What remains owed, in priority order — the parts I did not pay:

| # | Owed | Falsifier |
|---|---|---|
| 1 | Quality-adjusted generation cost over time | Cost per unit of quality-adjusted output rises durably |
| 2 | Expert verification time per claim, by domain | Verification amortises near zero outside expertise too |
| 3 | Correlation coefficient of error across users of one model | Correlation low → aggregation argument largely evades |
| 4 | Calibration at the individual-answer level, held out | A method separating true from unfounded per answer |
| 5 | False-premise and sycophancy rates on adversarial sets | Ceiling detection, no shift when belief is flipped |
| 6 | Qualifier retention in summarisation | Hedge retention at near-source rates |
| 7 | Watermark robustness under paraphrase/laundering | A robust, widely deployed scheme |

A structural account is not a substitute for that evidence. It tells you **where** to look — which claims are load-bearing, which direction a disconfirming result would have to point, and which parts of the thesis would survive being wrong about the rest. This version demonstrates the discipline in both directions: it paid what it could, and it left the rest visibly unpaid.

## Summary of the claim

Inherent risks of LLMs to humans, structurally:

1. **[definition → inference]** Imitation-trained systems give fluent prose with no guarantee of warrant. What collapses is not the reader's ability to judge prose but the *effort-and-authorship* signal that used to be encoded in its price.
2. **[definition → empirical]** Uncertainty is destroyed by decoding — sampling uncertainty recoverable in principle, representational absence not — so failure is fluent, specific, and confident, and false premises tend to get explanations rather than corrections. A tendency to be measured, not assumed.
3. **[model → inference]** Generation is cheap while verification stays expensive. With per-attempt stake $g$, payoff $G$, and verification cost $v$, the producer needs conversion above $g/G$ and the defender can only check when $v < p\,G$; the ratio $r = v/g$ is in the thousands, and would have to be wrong by roughly two orders of magnitude before the conclusion changed. The consequences are what that ratio implies.
4. **[definition → inference]** As mediators, LLMs strip the chain of custody: a claim arrives without a path back to the world it represents, so errors become unfalsifiable in practice even at low rates. This does not depend on the aggregation argument, which I leave unmeasured.

Everything else is a bug we owe it to ourselves to fix, and the prompt-injection boundary is one I am still not sure which side of it belongs on. These four are the ones to design institutions around — and the first design question, in every case, is not "make the model better" but "make the receipt explicit."

---

### Sources opened for this revision

- International AI Safety Report 2025, chaired by Yoshua Bengio, authored by over 100 experts, backed by 30 countries and international organisations. <https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025>
- Thomas Kwa, Ben West, Joel Becker et al., "Measuring AI Ability to Complete Long Software Tasks," METR, March 2025. <https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/>
- Sander Noels, Alexander Rogiers, Maarten Buyl, Tijl De Bie, "Persuasion with Large Language Models: A Survey of Empirical Evidence, Study Methodologies, and Ethical Implications," arXiv:2411.06837. <https://arxiv.org/abs/2411.06837>
