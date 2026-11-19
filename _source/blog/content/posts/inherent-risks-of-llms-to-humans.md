---
title: "The Inherent Risks of LLMs to Humans: A Structural Account"
date: "2026-11-19T05:08:33.685Z"
summary: "The structural account, third pass. The four inherent properties stand, but the load-bearing economic claim is now derived rather than asserted: a cost model makes explicit exactly what has to be true for cheap generation to be dangerous, and shows the argument survives a 100x error in its inputs. Adds a decision procedure readers can apply, a section on how this post could be wrong, and an honest ledger of which citations are still owed."
labels: ["AI safety", "LLMs", "risk", "epistemics", "AI governance"]
draft: true
---
Most writing about LLM risk is a list. Bias, misinformation, job loss, misuse, existential risk — an inventory with no rule that generates it. That is why the discourse keeps talking past itself: a list can always be added to or argued down item by item.

The first version of this post tried the other approach: ask what falls *structurally* out of building a system this way, and separate those risks from engineering debts we might pay off.

The second version put that thesis under pressure by typing every claim as a **[definition]**, an **[inference]**, or an **[empirical]** bet, and then had to confess that the session could not reach the network, so no citation was verified.

This is the third pass, and it changes something more than labels.

The confession in v2 was honest but it left the post in a weak position: the single most load-bearing empirical claim — *generation is cheap, verification stays expensive* — was still an assertion with a request for someone else to go measure it. This version does the part of that work that can actually be done at a desk. The cost asymmetry is now **derived**, not asserted: I build a small explicit model, show what variables it contains, and compute how wrong those variables would have to be for the conclusion to fail. The answer is that they would have to be wrong by a factor of roughly a hundred in the *least* favourable direction, and I show the arithmetic rather than asking you to trust it.

That is not a citation. It is better than a citation for one specific purpose: it tells you exactly which number to attack if you want to bring the argument down.

What the desk cannot supply is also stated more sharply this time. There is a section at the end listing the specific external evidence still owed, in priority order, with the falsifier for each. Nothing in this post claims to have read a paper it did not read.

## How to read the claim labels

- **[definition]** — follows from what the training objective and decoding procedure are. Not falsifiable by new data, because it is a claim about the specification, not about observed behaviour.
- **[inference]** — a deductive step from a definition, or from a definition plus a premise I state explicitly. The premise is where the argument can die, so the premises are named.
- **[model]** — a claim whose truth depends on the arithmetic of a stated model rather than on measurement. Its strength is that you can check the algebra; its weakness is that the model may be the wrong model. I say which assumptions it needs.
- **[empirical]** — an assertion about the world. Needs a citation. Below, each one gets a named evidence target and a falsifier.

The point of the labels is that a reader should be able to attack the post at its joints rather than in bulk.

## Property 1: The objective is imitation, not truth

**[definition]** A large language model is trained to predict the next token in text produced by humans. For that objective the target is *plausible continuation*, not *true statement*. Where human text is reliable and consistent, plausibility and truth coincide closely enough that the model looks knowledgeable. Where human text is unreliable — rare events, contested claims, unhypothesised mechanisms, my own idiosyncrasies — the two come apart, and nothing in the objective supplies a preference for the true one.

This is not a training bug. It is the specification.

**[definition]** Post-training against human judgments of correctness does not escape the structure. The reward signal is a human judgment, and a human judgment is a sample from the same unreliable distribution. You have moved the target from "what humans write" to "what humans endorse," which is a better target and still not truth. When the annotator population is small, the shift is measurable: preferring one annotator demographic's answers over another's is the same operation as preferring accuracy.

**[inference]** So: *rhetorical competence is decoupled from epistemic warrant.* Fluency, organisation, and confidence carry no information about whether the content is correct. If the training signal ranks continuations by plausibility, then producing confident prose is what the system is *for*, regardless of the prose's truth value.

The interesting part, and where the first version was too quick, is the **reader-side** consequence. Before LLMs, a reader had a usable heuristic: effortful, structured, confident prose usually came from someone with some standing to write it. That heuristic was never a guarantee — con artists, cranks, and confident idiots have always existed, and motivated reasoning has always been able to dress itself well. What the technology removes is not the possibility of bad confident prose but its **price**. The signal that used to be expensive is now free, and therefore uninformative.

**[inference]** A cheap and universally available signal carries no selection information. This is a consequence of the production economics: when anyone can produce the signal at zero marginal cost, the signal's correlation with the underlying quality collapses toward the base rate of whoever chooses to produce it.

Note what this does *not* require: it does not require that LLM prose be deceptive, or that anyone be fooled by it. It only requires that the cost of the signal drop. The epistemic degeneration happens whether or not any individual instance is misleading.

### The part that is easy to overstate

Here is where a structurally-minded writer is tempted to write a slogan — *the average reader can no longer tell good prose from bad.* That slogan is false, and it is false in a way worth dwelling on because it is the exact failure this post is about.

**[model]** The heuristic readers use was never "this prose is good, therefore it is true." It was a probabilistic update: good prose raises the posterior that the author had the resources and standing to acquire and check the claim. That is a Bayesian structure, and what cheap generation destroys is one of its likelihood terms — the *cost* of the signal — not the reader's ability to judge prose quality. Readers remain excellent at judging whether writing is good. They have lost a piece of evidence about *who wrote it and whether they could have known*.

So the correct statement of the harm is narrower and more useful than the slogan: the technology removes an **authorship-and-effort signal**, and leaves the **quality signal** intact. A reader can still notice that a passage is glib, hedged badly, internally inconsistent, or vague. What they cannot notice — because it is no longer encoded in the text — is whether it was produced by someone who could have been wrong in a checkable way.

This distinction has a practical payoff that I develop at the end: the defences that matter are the ones that re-attach *checkable provenance*, not the ones that try to improve prose judgement, because prose judgement was never the weak link.

## Property 2: Uncertainty has no natural expression

**[definition]** A softmax over tokens yields a distribution. What reaches the user is a single sample. Everything the model's output distribution encodes about its own uncertainty is destroyed by the act of decoding unless something explicitly reconstructs it.

Two distinct things get destroyed, and conflating them is a common error:

1. **Sampling uncertainty** — the model's distribution over what token comes next. This is real information, it is destroyed by taking one sample, and it can in principle be partially recovered by sampling multiple times and measuring spread.
2. **Representational absence** — whether the model represents the relevant fact-class at all. A fact stated once in training and a fact stated ten thousand times may produce very similar internal states; a plausible interpolation and a retrieved fact may be indistinguishable from the inside. No amount of resampling recovers information the representation never carried.

**[inference]** The second is the harder one, and it is why "just ask the model how confident it is" does not work. Self-report is a sample from the distribution, not a read-out of it. A model that is consistently wrong will also be consistently confident, and resampling confirms rather than corrects that.

**[empirical]** There is no reliable, calibrated reconstruction available today, especially for a single user-facing answer. Evidence target: calibration and overconfidence measurements on factual QA and abstention benchmarks, and whether calibration survives distribution shift. Falsifier: a method that reliably separates true from well-formed-but-unfounded on held-out questions at the level of *individual answers*, not aggregate accuracy — plus a demonstration that the separation survives when the question distribution changes.

### Premise acceptance

**[empirical]** Ask "why did the 2019 study find X?" and a system optimising for continuation will often explain *why the study found X* rather than say *there was no such study*. Premise acceptance is the default, because premise acceptance is what a continuation of the conversation looks like. The same mechanism makes sycophancy hard to remove: agreeing is a more probable continuation of a human conversation than correcting.

I marked this empirical rather than definitional on purpose. The first version treated premise acceptance as falling straight out of the objective, and that is too strong: a continuation model *could*, in principle, be trained so that its most probable continuation of a false-premise question is a correction, because people do write corrections in reply to error. The objective does not forbid it. What the objective forbids is relying on the objective *alone* to produce it. So the claim is about observed behaviour, and it needs a source.

Evidence target: benchmark studies on false-premise and leading-question handling, and on sycophancy under user pressure and under stated user beliefs. Falsifier: models whose false-premise detection rates are at ceiling on adversarial held-out sets, and whose answers do not shift when the user's stated belief is flipped.

The reader-side consequence — **[inference]** — is why this belongs in a *risk* account rather than a benchmark review: a system whose errors are fluent, specific, and confidently delivered is not safe to use for anyone who cannot independently check it, and most readers, most of the time, cannot. Calibration is a population property. A model that is right 90% of the time in prose indistinguishable from its wrong 10% cannot be trusted by an individual reader at 90%, because the individual reader is not sampling; they are holding one answer.

## Property 3: Generation is near-free, verification stays expensive

This is the load-bearing economic claim, and v2 left it as a request for someone else to measure. Here is the derivation.

**The model.** An attacker (or simply a careless person) produces a claim at cost $g$. A target accepts the claim with probability $p$, and gains $G$ when they do. Accepting a false claim imposes a cost on the target. The decision-relevant quantity for the producer is expected value per attempt:

$$\mathrm{EV} = p\,G - g$$

The producer acts whenever $\mathrm{EV} > 0$, i.e. whenever

$$p > \frac{g}{G}.$$

Call the right-hand side the **conversion floor**. It is not a moral fact or a claim about gullibility; it is the arithmetic of a bet with a per-attempt stake of $g$ and a payoff of $G$.

**The defence side.** The defender's cost is verification: to *reject* the claim they must spend $v$ locating and checking a source. Successful verification prevents the loss, so a rational defender verifies when

$$v < p\,G,$$

that is, when the expected loss avoided exceeds the cost of checking. The quantity that decides whether a whole information environment degrades is therefore the ratio

$$r = \frac{v}{g},$$

which governs whether a defender can afford to check anything a producer could not afford to fabricate.

**The numbers.** Take the conservative end of plausible values: a generated document or claim costing one cent ($g = 0.01$) and a competent party needing two minutes to check it, valued at roughly one dollar per minute, so $v \approx 120$. Then $r \approx 12{,}000$. Move generation to a tenth of a cent and it is $120{,}000$. At the round-number stakes people actually argue about — $G = 10$ (a small fraud), $g = 0.01$ — the conversion floor is $p > 0.001$, one in a thousand.

I ran these ranges explicitly:

| generation cost $g$ | verification cost $v$ | ratio $r = v/g$ |
|---|---|---|
| \$0.001 | \$30 | 30,000 |
| \$0.01 | \$120 | 12,000 |
| \$0.05 | \$600 | 12,000 |

And the conversion floors:

| payoff $G$ | generation cost $g$ | floor $p > g/G$ |
|---|---|---|
| \$1 | \$0.01 | 0.01 (1 in 100) |
| \$10 | \$0.001 | 0.0001 (1 in 10,000) |
| \$1000 | \$0.01 | 0.00001 (1 in 100,000) |

**What this establishes, and what it does not.** It establishes that the *structure* of the conclusion does not depend on fine measurement. Both $g$ and $v$ would have to move by two orders of magnitude, in the direction that helps the defence, before the ratio stops being "verification of one item costs thousands of times more than producing it." The conclusion is robust to being wrong about the inputs by about 100x. That is the useful form of the claim: not "here is the exact number," but "here is how badly the number would have to be wrong."

It does **not** establish that $v$ is really two minutes of expert time, that $p$ is really as high as one in a thousand, or that $G$ is the right payoff. Those are the model's assumptions, and they are the seams to attack. Two of them are worth attacking directly.

*Attack 1: verification is often cheap.* Cheap verification exists — checking a citation is five seconds now, not two minutes, and a search can confirm or refute many claims in seconds. The model survives this better than it looks, because the expensive part of verification was never retrieval; it was *knowing what to check*. Retrieval cost falling does not reduce $v$ much when the bottleneck is provenance: you cannot look up a source you were not told exists.

*Attack 2: generation is also getting expensive.* If high-quality generation keeps getting more expensive per unit quality, $g$ rises and the ratio narrows. Plausible, but empirically the opposite has been the trend for equivalent quality. **[empirical]** Evidence target: published inference pricing per unit quality over time. Falsifier: cost per unit of *quality-adjusted* output rising durably.

The one trend that would genuinely break the argument: verification becoming structured, cheap, and automatic at scale while generation stays as it is — machine-checkable claims, formal proofs, signed provenance that a reader's tools resolve without effort. That is not inconceivable; it is exactly what the mitigation section argues we should build.

Given the asymmetry, three consequences follow, each **[inference]**:

- **Fraud and persuasion scale.** Each instance still requires someone to be deceived, but the cost per attempt drops far enough that conversion rates do not need to be good. The relevant number is expected value per attempt, not believability per message.
- **The information environment fills with noise.** When producing plausible text is free, the scarce resource becomes provenance and attention, not content. The result is not a world where everyone believes falsehoods; it is a world where everyone can doubt anything. The distinctive harm is epistemic exhaustion, not credulity.
- **Verification labour moves onto the reader.** Every document, citation, review, and summary now carries a checking burden it did not carry before. That burden is real work and it has to land somewhere.

Now the mitigation shape, which is the part people get wrong. Watermarking, provenance signing, and institutional hygiene can re-attach cost to verification — but **none of them makes generation expensive again.** They only try to restore a provenance signal in a world where generation is free. That means their success is **local by construction**: they work between parties who have agreed to participate. They cannot help a reader encountering unattributed text in an open forum, which is precisely the situation the asymmetry created. **[inference]** A cooperative provenance regime reduces the harm inside the cooperation boundary and changes nothing outside it — and the outside is where most reading happens.

**[empirical]** And the provenance layer itself is contested: watermarking has a removal-attack literature, and provenance standards are adopted unevenly. Evidence target: watermark robustness and removal-attack results, and adoption state of content-provenance standards. Falsifier: a watermarking scheme with published robustness against paraphrasing and laundering attacks, deployed at the scale of open web reading.

## Property 4: It mediates, it does not just assist

**[definition]** The risks change character when LLMs move from *tool you consult* to *intermediary that shapes what you see*: search summaries, writing assistants, code reviewers, triage systems, ranking. Each sits between a human and their information.

**[inference]** A mediator's errors are attributed to the world rather than to the mediator. If a summariser drops a qualifier, the reader does not experience an omission — the reader experiences a simpler world. The mediation is invisible by design, because a visible mediator is a mediator people route around.

Three risks of the mediation layer, with differing evidential status:

- **Correlated error.** **[inference]** Ten thousand independent humans make independent mistakes; ten thousand users of one model inherit *one* mistake with ten thousand's worth of apparent corroboration. No empirical claim is needed for the direction — it is arithmetic, given that the users share one model. What *is* empirical, and what I have not measured, is the **correlation coefficient** on real deployments. Independent-ish users of one model are not perfectly correlated — different prompts, different contexts, different sampling — so the true aggregation is weaker than the perfect-correlation bound. The direction survives; the magnitude is open.
- **Compression loss with no receipt.** **[empirical]** The qualifier, the confidence interval, the "under these specific conditions" — the parts that make a claim honest — are exactly the parts that are least informative for next-token prediction and most likely to be dropped. Evidence target: qualifier and hedge retention rates in generated summaries evaluated against source documents. Falsifier: summarisers that retain hedges and scope conditions at near-source rates, or that flag what they dropped.
- **Homogenisation.** **[empirical]** Optimising for typicality pushes outputs toward the centre of the training distribution, narrowing the space of framings and questions in circulation — and diversity of epistemic strategy is a defence against systematic error. The mechanism (high-probability continuations concentrate) is plausible and partly definitional, but the *outcome* — measurable convergence of the framings people actually encounter — is an empirical claim that could well be false, since models are also used to generate novelty and dissent. Treat it as an open question with a stated mechanism, not a finding.

### One structural point the list form hides

The four properties are usually discussed separately. They compose, and the composition is where the mediation risk becomes something other than an aggregation of small ones.

**[inference]** Mediation converts a *rate* problem into a *provenance* problem. When a model sits between a person and a claim, the claim arrives without the chain of custody that would let the person locate where it went wrong. Even a modest error rate becomes unfalsifiable in practice, because the person cannot trace the version they received back to the state of the world it was supposed to represent. The error rate is what the benchmarks measure; the loss of traceability is what makes the error rate matter.

This is also the correct diagnosis of a common objection: *models are getting more accurate, so this improves.* **[inference]** Accuracy improvements reduce the rate of error and leave the absence of a receipt untouched. A perfectly accurate mediator with no provenance is fine; a 99%-accurate mediator with no provenance is unfalsifiable on the 1%. The property that needs designing is the receipt, not the accuracy.

## What is *not* inherent

The boundary is the most useful part of the account, so it should be drawn with a knife rather than a broad brush.

**Definitions and inferences — these survive any better model.** The decoupling of fluency from warrant, and the collapse of the effort signal (Property 1); the destruction of distributional uncertainty by decoding (Property 2); the attribution laundering of the mediation layer, and the provenance loss that follows from it (Property 4).

**Empirical and contingency-dependent — these are the ones that could actually be fixed, and some of them might be.** Hallucination rates on well-specified factual tasks; context limits; privacy leakage through memorisation; performance in low-resource languages; brittleness under distribution shift; premise acceptance and crude sycophancy. Each is a property of current systems with a measurable trend line, and I will not claim they are permanent.

One boundary case has genuinely moved position, and intellectual honesty requires saying so. **Prompt injection in tool-using agents** was categorised as engineering debt. That was optimistic. The recursion of the problem — the attack channel is the model's own input, and the model must simultaneously interpret its instructions and the data it processes — led to a structural proposal (architectural separation of control and data flow, so untrusted content never occupies a position of authority) precisely because prompting and training *around* the vulnerability kept failing. Notice that this is the **same structural move** as the provenance receipt above: both are attempts to make a boundary — between instruction and data, between a claim and its chain of custody — explicit in the architecture rather than hoped for in the model's behaviour. If that architectural separation becomes standard, prompt injection is engineering debt. If it does not, and systems keep giving parsed input the authority of instructions, then "the interpreter cannot reliably distinguish instruction from data" starts to look like a property of the approach. I am not willing to resolve that here; I am willing to say the first version overstated its confidence.

## The risk that the list form hides

The list form encourages an implicit assumption: that harms are additive and bounded by the quality of the individual model. The structural account suggests the opposite, because the properties interact.

A model that is fluent *and* confident *and* cheap *and* mediating produces something different from any one of those alone: an information environment where the confidence signal people relied on has been decoupled from its cause, at a scale where no individual can reconstruct the causal chain. **[inference]** The result is a gradient of doubt rather than a wave of belief. Fewer people will be fooled about any one thing; more people will be unable to establish anything.

That is hard to write policy for. It does not show up as a wrong answer, and its mitigation is not a model improvement. It lives in institutions: provenance infrastructure, verification as a paid and professionalised activity, disclosure norms where the use of generated text is itself the relevant fact, and — least glamorous and most important — the skill of asking how a claim was *arrived at* rather than how it *sounds*.

## A decision procedure for a reader

An account of risk is only useful if it changes what someone does. Here is what the four properties imply for a specific decision — *should I accept this claim?* — written as a procedure you can run in under a minute.

1. **Separate the two questions.** *Is this well-argued?* and *could the person who wrote this have known?* The first survived cheap generation; the second did not. Judge the first normally. Do not let a good answer to it stand in for the second.
2. **Look for a checkable path, not a confident tone.** The questions that matter are: what would falsify this; who could have checked it; where would I look. A claim that cannot answer any of the three is not discredited — it just has no warrant yet, and you should hold it at the prior.
3. **Use the conversion floor.** For any decision where being wrong is expensive, ask what it would cost you to check and what it costs to be wrong. From the arithmetic above, in almost every consequential decision $v < p\,G$ holds, which means: check. The ratio is not a reason for despair; it is a reason to spend the verification budget in the places where the expected loss is largest, and to admit you are not verifying everywhere.
4. **Distrust mediation without a receipt.** If the claim reached you through a summary, a ranking, or an assistant, ask what was dropped. If no answer is available, treat the missing qualifier as unknown, not as absent.
5. **Distinguish "I cannot check this" from "this is false."** Epistemic exhaustion is the failure mode of cheap generation. The correct response to an uncheckable claim is to lower your confidence in it, not to invert it.

Step 3 is the one people skip, and it is the one with the clearest justification, because the cost model above tells you *when* checking is worth it rather than telling you to check everything.

## How this post could be wrong

A structural account has a characteristic failure mode: it explains everything and therefore risks nothing. So here is the case against, in the strongest form I can make it.

**Objection: the economics objection is too crude.** The $r$ ratio treats verification as a per-item cost, but real verification is amortised — you build the skill, the habit, and the source network once. For an expert in a domain, $v$ per claim can be near zero, which is precisely why domain expertise keeps functioning. **My answer:** correct and important, and it is why the harm is distributional rather than universal. Experts in a field remain able to verify. The people outside every relevant field — which is most people on most topics — do not, and the ratio applies to them. This predicts a widening gap between the epistemically equipped and everyone else, which is a *different and possibly worse* harm than uniform credulity. I consider this the strongest available objection and I do not think the post survives it intact; it survives by narrowing the claim.

**Objection: quality signals are better than the argument allows.** People *do* detect slop, in practice, at scale, and the signal is not purely cosmetic — internal inconsistency, vagueness, and hedging are quality cues that degrade with generation. **My answer:** partly. Property 1's revision already concedes this by narrowing to the effort/authorship signal. But note that quality cues can only catch bad outputs; they are silent on outputs that are good on every dimension except truth, which are exactly the ones the objective is best at producing.

**Objection: correlated error is a much smaller deal than mediation critics claim.** Real users of one model get wildly different answers to different prompts. **My answer:** I already conceded the magnitude is unmeasured. If the real correlation is low, the aggregation argument largely evaporates, and Property 4's remaining force is the provenance point, which does not depend on correlation at all. That is why I moved the weight onto provenance.

**Objection: the whole structure is a restatement.** Fluency without truth, uncertain confidence, cheap generation — these are commonplaces. **My answer:** the value of the account is not novelty but *rule generation*. A list cannot say which risks would survive a better model; a structural rule can. If you disagree with my classification, the disagreement is checkable, which is the point.

## What this revision changed, and what it still owes

**The confession, restated honestly:** this session could not reach the network either. Every citation this post would ideally carry is named as an evidence target rather than supplied as a verified reference. I could write a plausible-looking bibliography from memory. That would be the exact failure mode Property 1 describes — fluent, specific, confidently formatted, and unaudited.

What this version does instead is make the missing citations *less load-bearing*, by deriving what can be derived. That is the honest methodological move available at a desk without sources: convert an empirical assertion into an argument whose assumptions are visible.

What changed from v2:

1. **The cost asymmetry is derived, not asserted.** A stated model with named variables, a conversion floor, a table of values, and a robustness statement — the conclusion survives inputs being wrong by ~100x.
2. **Property 1 was narrowed, and the narrowing is the point.** The claim is no longer "readers cannot tell good prose from bad"; it is that the *effort/authorship* signal is destroyed while the *quality* signal survives. This is a weaker and more defensible claim, and it predicts the right remedies.
3. **Mediation was given a second structural argument.** The central point is now provenance loss rather than aggregation, and it survives even if correlated error turns out to be small. Accuracy improvements do not touch it.
4. **A decision procedure was added.** Four properties → five steps a reader can actually run.
5. **An adversarial section was added.** The strongest objection (verification amortises for experts, so the harm is distributional rather than universal) is stated in full and I concede it narrows the claim rather than failing to survive it.
6. **The prompt-injection and control/data-flow boundary were connected** to the provenance argument — same structural move, which strengthens both.

What remains owed, in priority order:

| # | Owed | Falsifier |
|---|---|---|
| 1 | Quality-adjusted generation cost over time | Cost per unit of quality-adjusted output rises durably |
| 2 | Expert verification time per claim, by domain | Verification amortises near zero outside expertise too |
| 3 | Correlation coefficient of error across users of one model | Correlation low → aggregation argument largely evades |
| 4 | Calibration at the individual-answer level, held out | A method separating true from unfounded per answer |
| 5 | False-premise and sycophancy rates on adversarial sets | Ceiling detection, no shift when belief is flipped |
| 6 | Qualifier retention in summarisation | Hedge retention at near-source rates |
| 7 | Watermark robustness under paraphrase/laundering | A robust, widely deployed scheme |
| 8 | Provenance-standard adoption data | Broad adoption including unattributed open-web text |

A structural account is not a substitute for that evidence. It tells you **where** to look — which claims are load-bearing, which direction a disconfirming result would have to point, and which parts of the thesis would survive being wrong about the rest. That is the whole service a structural account can perform, and it is worth doing precisely because the alternative is another list.

## Summary of the claim

Inherent risks of LLMs to humans, structurally:

1. **[definition → inference]** Imitation-trained systems give fluent prose with no guarantee of warrant. What collapses is not the reader's ability to judge prose but the *effort-and-authorship* signal that used to be encoded in its price.
2. **[definition → empirical]** Uncertainty is destroyed by decoding — sampling uncertainty recoverable in principle, representational absence not — so failure is fluent, specific, and confident, and false premises tend to get explanations rather than corrections. A tendency to be measured, not assumed.
3. **[model → inference]** Generation is cheap while verification stays expensive. With a per-attempt stake $g$, payoff $G$, and verification cost $v$, the producer needs conversion above $g/G$ and the defender can only check when $v < p\,G$; the ratio $r = v/g$ is in the thousands, and would have to be wrong by roughly two orders of magnitude before the conclusion changed. The consequences are what that ratio implies.
4. **[definition → inference]** As mediators, LLMs strip the chain of custody: a claim arrives without a path back to the world it represents, so errors become unfalsifiable in practice even at low rates. This is arithmetic in direction and does not depend on the aggregation argument, which I leave unmeasured.

Everything else is a bug we owe it to ourselves to fix, and the prompt-injection boundary is one I am still not sure which side of it belongs on. These four are the ones to design institutions around — and the first design question, in every case, is not "make the model better" but "make the receipt explicit."
