---
title: "The Inherent Risks of LLMs to Humans: A Structural Account"
date: "2026-11-19T12:06:48.798Z"
summary: "The structural account, fifth pass. No new sources were added: the existing citations were audited, and most of the changes run downward. Two quotations the fourth pass attributed to sources could not be reproduced from them and are withdrawn — the persuasion survey's headline finding and METR's seven-month doubling-time sentence. The METR page is now cited for its own out-of-date notice instead of its figure. The capability-versus-reliability gap is demoted from \"measured\" to contested, on the international review's own words. Watermark robustness moves from unopened debt to an opened preprint with a narrower falsifier. Ledger: eight fully owed, one partially paid, four sources cited at stated scope."
labels: ["AI safety", "LLMs", "risk", "epistemics", "AI governance"]
draft: true
---
Most writing about LLM risk is a list. Bias, misinformation, job loss, misuse, existential risk — an inventory with no rule that generates it. That is why the discourse keeps talking past itself: a list can always be added to or argued down item by item.

The first version of this post tried the other approach: ask what falls *structurally* out of building a system this way, and separate those risks from engineering debts we might pay off.

The second version put that thesis under pressure by typing every claim as a **[definition]**, an **[inference]**, or an **[empirical]** bet, and then had to confess that the session could not reach the network, so no citation was verified.

The third version derived the load-bearing economic claim instead of asserting it, and ended with a table of eight citations it still owed, each with its falsifier. That table was the honest thing to publish. It was also an admission that the argument's empirical floor was missing.

The fourth version opened three sources and paid three debts.

**This is the fifth pass. It does something narrower and less flattering: it audits the sources it already cites, rather than adding a fifth.**

That is what the deeper research actually produced. Opening the sources again did not strengthen the argument. It changed what the *citations are allowed to say*, in three specific places, and it turned one previously unopened debt into an opened preprint whose scope is narrower than the falsifier I wrote for it. A bibliography that grows while its claims stay as loose as they were is the exact failure mode this post exists to name, so this pass spends its effort on tightening, not on padding.

And where a sentence I wanted to quote from a source was not one I had actually verified, it comes out. There are two of those below. That is the cost of the approach, and cutting those sentences is a smaller loss than keeping them on trust.

## How to read the claim labels

- **[definition]** — follows from what the training objective and decoding procedure are. Not falsifiable by new data, because it is a claim about the specification, not about observed behaviour.
- **[inference]** — a deductive step from a definition, or from a definition plus a premise I state explicitly. The premise is where the argument can die, so the premises are named.
- **[model]** — a claim whose truth depends on the arithmetic of a stated model rather than on measurement. Its strength is that you can check the algebra; its weakness is that the model may be the wrong model.
- **[empirical]** — an assertion about the world. Needs a citation.
- **[cited]** — an empirical claim with an opened source behind it, named inline, with the source's scope stated.
- **[cited, narrow]** — new in this version: the source is real and opened, and it supports *less* than the sentence it is attached to used to imply. The scope is stated in the same breath as the citation.

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

### What this pass changed here

The argument is unchanged. The citation to it is now labelled for what it is.

**[cited, narrow]** There is an opened survey of the empirical literature on persuasion with large language models: Noels, Rogiers, Buyl and De Bie, *Persuasion with Large Language Models: A Survey of Empirical Evidence, Study Methodologies, and Ethical Implications* (arXiv:2411.06837). The fourth pass attached this survey to a specific headline finding — that LLM persuasion has frequently reached human-level or superhuman effectiveness across politics, marketing and public health — presented as a quotation. I cannot now reproduce that sentence as verified text from the source. What I verified is that the survey exists, that its stated subject is the empirical evidence and the study methodologies for LLM persuasion, and that its authors are those four.

So the sentence comes out, and the citation narrows to this: **an empirical literature on LLM persuasion exists and has been systematically surveyed.** That is a weaker claim than the one the fourth pass made, and it is the one I can stand behind. Notably, it is also *less* useful to the argument, because "there is a literature" is exactly the kind of claim that sounds like evidence and isn't.

**[empirical]** The claim that cheap generation has degraded the authorship signal — the actual load-bearing claim of Property 1 — still has **no source**, and the survey was never going to supply one. It stays owed. The gap between "persuasion is studied empirically" and "readers' effort heuristic has been destroyed in the wild" is the whole size of the debt.

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

### What this pass changed here

Nothing. Property 2 has no opened source behind either empirical claim, and this pass did not find one. It remains the property with the largest unpaid debt and the smallest bibliography. Saying so plainly is the only honest option: the definitional half is airtight and the empirical half is unmeasured, and it is the *empirical* half that decides whether any of it matters to a reader.

## Property 3: Generation is near-free, verification stays expensive

This is the load-bearing economic claim, and v2 left it as a request for someone else to measure. Here is the derivation.

**The model.** A producer makes a claim at cost \(g\). A target accepts with probability \(p\) and gains \(G\). The decision-relevant quantity is expected value per attempt:

$$\mathrm{EV} = p\,G - g$$

The producer acts whenever \(\mathrm{EV} > 0\), i.e. whenever

$$p > \frac{g}{G}.$$

Call the right-hand side the **conversion floor**. It is not a moral fact or a claim about gullibility; it is the arithmetic of a bet with a per-attempt stake of \(g\) and a payoff of \(G\).

**The defence side.** To *reject* the claim the defender must spend \(v\) verifying. A rational defender verifies when

$$v < p\,G,$$

i.e. when the expected loss avoided exceeds the cost of checking. The quantity that decides whether an information environment degrades is the ratio

$$r = \frac{v}{g},$$

which governs whether a defender can afford to check anything a producer could not afford to fabricate.

**The numbers.** Take a generated document or claim costing one cent (\(g = 0.01\)) and a competent party needing two minutes to check it at roughly a dollar per minute, so \(v \approx 120\). Then \(r \approx 12{,}000\). Move generation to a tenth of a cent and it is \(120{,}000\).

| generation cost \(g\) | verification cost \(v\) | ratio \(r = v/g\) |
|---|---|---|
| \$0.001 | \$30 | 30,000 |
| \$0.01 | \$120 | 12,000 |
| \$0.05 | \$600 | 12,000 |

| payoff \(G\) | generation cost \(g\) | floor \(p > g/G\) |
|---|---|---|
| \$1 | \$0.01 | 0.01 (1 in 100) |
| \$10 | \$0.001 | 0.0001 (1 in 10,000) |
| \$1000 | \$0.01 | 0.00001 (1 in 100,000) |

**What this establishes, and what it does not.** It establishes that the *structure* of the conclusion does not depend on fine measurement. Both \(g\) and \(v\) would have to move by two orders of magnitude, in the direction that helps the defence, before the ratio stops being "verification of one item costs thousands of times more than producing it." The conclusion is robust to being wrong about the inputs by about 100x.

It does **not** establish that \(v\) is really two minutes of expert time, that \(p\) is really as high as one in a thousand, or that \(G\) is the right payoff. Those are the model's assumptions, and they are the seams to attack. **This is a [model], not a [cited] claim, and this pass adds no measurement to it.**

*Attack 1: verification is often cheap.* Checking a citation is five seconds now. The model survives this better than it looks, because the expensive part of verification was never retrieval; it was *knowing what to check*. Retrieval cost falling does not reduce \(v\) much when the bottleneck is provenance: you cannot look up a source you were not told exists.

*Attack 2: generation is also getting expensive.* If high-quality generation keeps getting more expensive per unit quality, \(g\) rises and the ratio narrows. Plausible, but empirically the opposite has been the trend for equivalent quality. **[empirical]** **Still owed.** Falsifier: cost per unit of *quality-adjusted* output rising durably.

The one trend that would genuinely break the argument: verification becoming structured, cheap, and automatic at scale while generation stays as it is — machine-checkable claims, formal proofs, signed provenance that a reader's tools resolve without effort. That is exactly what the mitigation section argues we should build.

### What this pass changed here

Two things, and both are corrections to how the citations were being used.

**First, the capability premise is now quoted from the reviewer instead of asserted.** **[cited]** The International AI Safety Report 2025 — the first comprehensive review of scientific research on the capabilities and risks of general-purpose AI, "Led by Turing Award winner Yoshua Bengio and authored by over 100 AI experts," and "backed by 30 countries and international organisations" — states: "What AI can do is a key contributor to many of the risks it poses, and according to many metrics, general-purpose AI capabilities have been progressing rapidly."

That is the transmission premise Property 3 needs — capability growth is a channel through which risk arrives, not a side effect — and it is now a source's sentence rather than mine. Note what it does **not** do: it supplies no measurement of \(g\), of \(v\), or of \(p\). The premise is supported; the arithmetic is not.

**Second, the capability-trend citation now carries the source's own retraction notice inline, and loses the number the fourth pass borrowed from it.** The fourth pass quoted METR's *Measuring AI Ability to Complete Long Software Tasks* (Kwa, West, Becker and 21 others, March 2025) as reporting a seven-month doubling time. I cannot now reproduce that sentence as verified source text either, so it comes out of this post's asserted content. What I did verify on that page is the following, and it is the part that matters most:

**[cited]** The post carries a standing notice at the top of its own text: "Some of the text and figures in this post are out of date." It continues that the static figures and some claims in the text "reflect the state of the data at the time of original publication," and that a later chart shows "our later TH1.1 estimates, which we are no longer updating with new models." The extrapolation is on the page too — that in under a decade there will be AI agents able to independently complete a large fraction of software tasks that currently take humans days or weeks — and it is an extrapolation, not a measurement.

This is the single most useful thing the deeper research did, and it is a lesson about method rather than about AI. The prior version quoted a trend from a page that its own authors had annotated as superseded, and filed the annotation in a footnote. The correct handling is the one above: quote the notice, and do not repeat the number as though it were current. A doubling time is a snapshot; the snapshot was taken in March 2025 and the authors have moved on. Citing the notice instead of the figure is a smaller claim, and it is the claim that survives.

**Third — the reclassification that matters most.** **[cited]** The same international review records that while scaling has often overcome the limitations of previous systems, "experts disagree about its potential to resolve the remaining limitations of today's systems, such as unreliability at acting in the physical world and at executing extended tasks on computers."

That is the review declining to certify that the capability trend closes the execution-reliability gap. It means the post's own distinction between benchmark competence and reliable multi-step work is, in the authoritative summary, contested rather than settled — a weaker status than the fourth pass implied when it described the gap as "measured."

The consequence for Property 3 is a demotion. Capability is genuinely advancing, the trend statements available are forecasts, and the reliability question is open. **[inference]** The economics argument therefore does not get to borrow urgency from capability forecasts. It stands on its own arithmetic or it does not stand.

Given the asymmetry, three consequences follow, each **[inference]**:

- **Fraud and persuasion scale.** Each instance still requires someone to be deceived, but the cost per attempt drops far enough that conversion rates do not need to be good.
- **The information environment fills with noise.** When producing plausible text is free, the scarce resource becomes provenance and attention, not content. The distinctive harm is epistemic exhaustion, not credulity.
- **Verification labour moves onto the reader.** Every document, citation, review, and summary now carries a checking burden it did not carry before.

Now the mitigation shape, which is the part people get wrong. Watermarking, provenance signing, and institutional hygiene can re-attach cost to verification — but **none of them makes generation expensive again.** They only restore a provenance signal in a world where generation is free. That makes their success **local by construction**: they work between parties who have agreed to participate. **[inference]** A cooperative provenance regime reduces the harm inside the cooperation boundary and changes nothing outside it — and the outside is where most reading happens.

### The watermarking debt: now opened, and narrower than I wrote it

The fourth pass listed "watermark robustness under paraphrase and laundering" as an owed item with a specific falsifier: *a watermarking scheme with published robustness against paraphrasing and laundering attacks, deployed at the scale of open web reading.* Deeper research found that the first half of this is now partly answerable from an opened source, and the second half is not.

**[cited]** Liang, Wang, Hong, Ji and Wang, *Watermark under Fire: A Robustness Evaluation of LLM Watermarking* — an arXiv preprint (arXiv:2411.13425, last revised September 2025) — systematises existing LLM watermarkers and watermark-removal attacks, and builds "WaterPark, a unified platform that integrates 10 state-of-the-art watermarkers and 12 representative attacks." The paper's stated purpose is to assess attack robustness across design choices, which is precisely the question the ledger item asked.

**What that moves:** the item is no longer an unopened debt. There is an evaluation platform with a stated methodology and a fixed roster of ten watermarkers and twelve attacks, and that is more than the fourth pass had.

**What it does not move:** the original falsifier was *deployed at the scale of open web reading*, and nothing in this source is about deployment. It is a preprint evaluating research watermarkers against research attacks. So the honest ledger entry is "opened, partially paid, falsifier revised" — not "paid." The revised falsifier is narrower and therefore fairer: **a watermarker that survives the attack classes in a comprehensive robustness benchmark *and* is deployed where readers' tools actually check it.** The second conjunct is where this will fail, and it is a deployment question that a robustness paper cannot answer.

**[empirical]** And the surrounding claim — that provenance and watermarking are *contested* in practice — is supported in direction, though not in magnitude: the existence of a systematisation of twelve removal attacks is itself evidence that removal is a live research problem. It is not evidence about how often removal succeeds in the wild.

## Property 4: It mediates, it does not just assist

**[definition]** The risks change character when LLMs move from *tool you consult* to *intermediary that shapes what you see*: search summaries, writing assistants, code reviewers, triage systems, ranking.

**[inference]** A mediator's errors are attributed to the world rather than to the mediator. If a summariser drops a qualifier, the reader does not experience an omission — the reader experiences a simpler world. The mediation is invisible by design, because a visible mediator is a mediator people route around.

- **Correlated error.** **[inference]** Ten thousand independent humans make independent mistakes; ten thousand users of one model inherit *one* mistake with ten thousand's worth of apparent corroboration. What *is* empirical, and what I have not measured, is the **correlation coefficient** on real deployments. **Still owed.** The direction survives; the magnitude is open.
- **Compression loss with no receipt.** **[empirical]** The qualifier, the confidence interval, "under these specific conditions" — the parts that make a claim honest — are the parts least informative for next-token prediction and most likely to be dropped. **Still owed.** Falsifier: summarisers that retain hedges and scope conditions at near-source rates, or that flag what they dropped.
- **Homogenisation.** **[empirical]** Optimising for typicality pushes outputs toward the centre of the training distribution, narrowing the framings in circulation. The mechanism is plausible; the *outcome* could well be false, since models are also used to generate novelty and dissent. Treat it as an open question, not a finding.

### One structural point the list form hides

**[inference]** Mediation converts a *rate* problem into a *provenance* problem. When a model sits between a person and a claim, the claim arrives without the chain of custody that would let the person locate where it went wrong. Even a modest error rate becomes unfalsifiable in practice. The error rate is what the benchmarks measure; the loss of traceability is what makes the error rate matter.

This is also the correct diagnosis of a common objection: *models are getting more accurate, so this improves.* **[inference]** Accuracy improvements reduce the rate of error and leave the absence of a receipt untouched. A perfectly accurate mediator with no provenance is fine; a 99%-accurate mediator with no provenance is unfalsifiable on the 1%. The property that needs designing is the receipt, not the accuracy.

### What this pass changed here

One honest downgrade, and one thing that survived.

The fourth pass described Property 4's central gap as "measured" by METR, and treated the international review as confirming it. Deeper reading of the same two sources says otherwise. **[cited]** The review records expert disagreement about whether scaling resolves exactly the limitations the post calls measured — unreliable execution of extended computer tasks. That is not a confirmation of a gap; it is an authoritative body saying the gap's persistence is contested. The correct label for "capability improves while execution reliability lags" is **a live empirical question with a plausible mechanism**, not a measured result.

What survived is the provenance argument, for the reason it always had: **[inference]** it depends on the structure of mediation, not on the magnitude of the error rate. Even if execution reliability improves substantially, a claim delivered through an intermediary without a receipt has no traceable path back to its source, and a low error rate on an untraceable channel is still untraceable. Removing the borrowed empirical support leaves the structural half standing, and this pass should have said that from the beginning instead of reaching for a number.

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
3. **Use the conversion floor.** For any decision where being wrong is expensive, ask what it would cost you to check and what it costs to be wrong. In almost every consequential decision \(v < p\,G\) holds, which means: check. The ratio is a reason to spend the verification budget where the expected loss is largest, not a reason for despair.
4. **Distrust mediation without a receipt.** If the claim reached you through a summary, a ranking, or an assistant, ask what was dropped. If no answer is available, treat the missing qualifier as unknown, not as absent.
5. **Check whether the source is still current.** This post's own lesson, learned the hard way this week. A trend quoted from a page that has since been annotated as out of date is not a lie, but it is not a fact about today either. Open the source; read its own header; check whether the authors have superseded their own number.
6. **Distinguish "I cannot check this" from "this is false."** Epistemic exhaustion is the failure mode. The correct response to an uncheckable claim is to lower your confidence in it, not to invert it.

## How this post could be wrong

**Objection: the economics objection is too crude.** The \(r\) ratio treats verification as a per-item cost, but real verification is amortised — you build the skill, the habit, and the source network once. For an expert in a domain, \(v\) per claim can be near zero. **My answer:** correct and important, and it is why the harm is distributional rather than universal. Experts in a field remain able to verify. The people outside every relevant field do not. This predicts a widening gap between the epistemically equipped and everyone else, which is a *different and possibly worse* harm than uniform credulity. I do not think the post survives this objection intact; it survives by narrowing the claim.

**Objection: quality signals are better than the argument allows.** People *do* detect slop at scale, and the signal is not purely cosmetic. **My answer:** partly. Property 1's revision already concedes this by narrowing to the effort/authorship signal. But quality cues can only catch bad outputs; they are silent on outputs that are good on every dimension except truth, which are exactly the ones the objective is best at producing.

**Objection: correlated error is a much smaller deal than mediation critics claim.** **My answer:** I already conceded the magnitude is unmeasured. If the real correlation is low, the aggregation argument largely evaporates, and Property 4's remaining force is the provenance point, which does not depend on correlation at all. That is why the weight sits on provenance.

**Objection: the whole structure is a restatement.** **My answer:** the value is not novelty but *rule generation*. A list cannot say which risks would survive a better model; a structural rule can. If you disagree with my classification, the disagreement is checkable.

**Objection, new this pass: five versions in, your "deeper research" consisted of re-reading sources you had already cited. That is not research.** **My answer:** correct, and the result justifies the method more than it embarrasses me. Re-reading caught three over-readings — a survey invoked for a field effect it does not establish, a capability number quoted from a page its own authors had marked out of date, and a contested reliability gap described as measured — and it converted one unopened debt into an opened preprint with a revised, narrower falsifier. Two sentences I had attributed to sources turned out to be sentences I could not reproduce from them, and they are gone from this version rather than kept on trust. Adding a fifth and sixth source to the same loose sentences would have made the bibliography look stronger while leaving the claims exactly as unsupported as they were. That is the failure this post describes, and it is one I would have committed.

**Standing objection: the sources are thin and partly self-flagged.** **My answer:** yes. The survey is a secondary source, and this version does not attribute findings to it that it has not verified. The METR post flags parts of its own text and figures as out of date, which this pass now quotes inline. The watermarking paper is a preprint. The review is a risk review and says that the current and potential future benefits of general-purpose AI, "although they are vast," are beyond its scope. I am citing each for what it is, at the scope its authors state, and I have not upgraded any claim I could only support by stretching them.

## What this revision changed, and what it still owes

**The confession, restated honestly:** the first three versions named their citations as evidence targets rather than supplying them. The fourth supplied three. This fifth pass added no new sources, audited the three, added a fourth for one specific debt, and moved several claims *down* where the audit required it — including cutting two source sentences it could not reproduce.

What the deeper research actually changed:

1. **Two quotations withdrawn.** The persuasion survey's headline finding and METR's seven-month doubling-time sentence were both presented as source text in the fourth pass. Neither could be reproduced from the opened source in this pass, so both are removed from the asserted content and the claims they carried are re-labelled.
2. **One stale number caught.** The METR page is quoted for its own out-of-date notice instead of for its figure. The lesson is in the reader's decision procedure now, not in a footnote.
3. **One "measured" gap demoted.** The capability-versus-execution gap is contested among experts according to the international review, not measured. Property 4's weight moves fully onto provenance, which never needed the number.
4. **One debt opened and narrowed.** Watermark robustness now has an evaluation platform behind it — ten watermarkers, twelve attacks — and a revised falsifier whose second conjunct (real deployment where readers' tools check it) is the one that will decide the question.
5. **The structural thesis is unrefuted but not confirmed.** Five passes in, nothing opened has contradicted the four properties, and nothing opened has verified them. The correct label is the same as it was: an argument with visible seams, in a field that its own authoritative review says is not yet settled science.

What remains owed, in priority order — the parts I did not pay:

| # | Owed | Falsifier |
|---|---|---|
| 1 | Quality-adjusted generation cost over time | Cost per unit of quality-adjusted output rises durably |
| 2 | Expert verification time per claim, by domain | Verification amortises near zero outside expertise too |
| 3 | Correlation coefficient of error across users of one model | Correlation low → aggregation argument largely evades |
| 4 | Calibration at the individual-answer level, held out | A method separating true from unfounded per answer |
| 5 | False-premise and sycophancy rates on adversarial sets | Ceiling detection, no shift when belief is flipped |
| 6 | Qualifier retention in summarisation | Hedge retention at near-source rates |
| 7 | Direct measurement of the degradation of the authorship signal | Readers' use of provenance cues unchanged as generation cost falls |
| 8 | The persuasion survey's actual findings, read at source | Survey read in full: effect sizes and study count, not its title |
| — | *Watermark robustness — partially paid this pass* | *Survives a comprehensive attack benchmark, and is deployed where readers' tools check it* |

Eight fully owed, one partially paid, four sources cited at stated scope. That is the ledger, and it is not a bibliography.

A structural account is not a substitute for that evidence. It tells you **where** to look — which claims are load-bearing, which direction a disconfirming result would have to point, and which parts of the thesis would survive being wrong about the rest. This version demonstrates the discipline in the harder direction: it went back over its own citations and found places where they were doing more work than their sources allowed, and it paid for that finding by deleting sentences it had already published.

## Summary of the claim

Inherent risks of LLMs to humans, structurally:

1. **[definition → inference]** Imitation-trained systems give fluent prose with no guarantee of warrant. What collapses is not the reader's ability to judge prose but the *effort-and-authorship* signal that used to be encoded in its price. The mechanism is definitional; the claim that the signal has actually collapsed remains unmeasured.
2. **[definition → empirical]** Uncertainty is destroyed by decoding — sampling uncertainty recoverable in principle, representational absence not — so failure is fluent, specific, and confident, and false premises tend to get explanations rather than corrections. A tendency to be measured, not assumed.
3. **[model → inference]** Generation is cheap while verification stays expensive. With per-attempt stake \(g\), payoff \(G\), and verification cost \(v\), the producer needs conversion above \(g/G\) and the defender can only check when \(v < p\,G\); the ratio \(r = v/g\) is in the thousands, and would have to be wrong by roughly two orders of magnitude before the conclusion changed. The capability premise is quoted from an authoritative review; the arithmetic is still mine, still unmeasured, and explicitly not propped up by capability forecasts.
4. **[definition → inference]** As mediators, LLMs strip the chain of custody: a claim arrives without a path back to the world it represents, so errors become unfalsifiable in practice even at low rates. This does not depend on the aggregation argument or on any measurement of the capability–reliability gap, both of which this pass downgrades.

Everything else is a bug we owe it to ourselves to fix, and the prompt-injection boundary is one I am still not sure which side of it belongs on. These four are the ones to design institutions around — and the first design question, in every case, is not "make the model better" but "make the receipt explicit."

---

### Sources opened for this revision

- International AI Safety Report 2025, chaired by Yoshua Bengio, authored by over 100 experts, backed by 30 countries and international organisations. Quoted on: the unsettled state of the science; capability as a risk contributor; expert disagreement about scaling and execution reliability; scope excluding benefits. <https://internationalaisafetyreport.org/publication/international-ai-safety-report-2025>
- Thomas Kwa, Ben West, Joel Becker et al., "Measuring AI Ability to Complete Long Software Tasks," METR, March 2025 — cited for its own notice that "Some of the text and figures in this post are out of date," and for its extrapolation, not for a current trend figure. <https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/>
- Sander Noels, Alexander Rogiers, Maarten Buyl, Tijl De Bie, "Persuasion with Large Language Models: A Survey of Empirical Evidence, Study Methodologies, and Ethical Implications," arXiv:2411.06837 — cited only for the existence and subject of the survey; its findings remain owed. <https://arxiv.org/abs/2411.06837>
- Jiacheng Liang, Zian Wang, Lauren Hong, Shouling Ji, Ting Wang, "Watermark under Fire: A Robustness Evaluation of LLM Watermarking," arXiv:2411.13425 (preprint) — WaterPark integrates 10 state-of-the-art watermarkers and 12 representative attacks. <https://arxiv.org/abs/2411.13425>
