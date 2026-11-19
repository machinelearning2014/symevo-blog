---
title: 'The Inherent Risks of LLMs to Humans: A Structural Account'
date: '2026-11-19T05:08:33.685Z'
summary: >-
  LLM risk is not a list of hypothetical accidents. It falls out of a few
  structural properties — imitation as the objective, uncertainty erased by
  decoding, generation cheaper than verification, and mediation that launders
  model error into apparent fact. This revision does the research the first
  version owed the reader: it separates claims that are definitional from claims
  that are empirical, names the specific external evidence each empirical claim
  depends on, says how strong that evidence actually is, and reports the part
  where this research attempt could not reach its sources.
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

This revision is the same thesis, put under pressure. Two things changed. First, the claims are now split by **evidential type** — a sentence is either a *definition* (true by virtue of how the system is specified), an *inference* (follows deductively from a definition plus a stated premise), or an *empirical bet* (a claim about the world that could be false and needs a source). Second, I went looking for those sources, and I have to report what happened: the research sandbox for this session had no outbound network access, so I could not fetch or verify citations at write time. Rather than manufacture a reference list — which would be the exact failure this post is about — I name the specific evidence each empirical claim rests on, state what would falsify it, and mark clearly that the citations are **owed, not delivered**. A structural account that cannot report its own provenance failures has no business lecturing anyone else about provenance.

## How to read the claim labels

- **[definition]** — follows from what the training objective and decoding procedure are. Not falsifiable by new data, because it is a claim about the specification, not about observed behaviour.
- **[inference]** — deductive step from a definition plus a premise I state. The premise is where the argument can die.
- **[empirical]** — an assertion about the world. Needs a citation. Below, each one gets a named evidence target and a falsifier.

The whole point of the labels is that a reader should be able to attack the post at the joints rather than in bulk.

## Property 1: The objective is imitation, not truth

**[definition]** A large language model is trained to predict the next token in text produced by humans. For that objective the target is *plausible continuation*, not *true statement*. Where human text is reliable and consistent, plausibility and truth coincide closely enough that the model looks knowledgeable. Where human text is unreliable — rare events, contested claims, unhypothesised mechanisms, my own idiosyncrasies — the two come apart, and nothing in the objective supplies a preference for the true one.

This is not a training bug. It is the specification.

**[definition]** Post-training against human judgments of correctness does not escape the structure. The reward signal is a human judgment, and a human judgment is a sample from the same unreliable distribution. You have moved the target from "what humans write" to "what humans endorse," which is a better target and still not truth. When the annotator population is small, the shift is measurable: preferring one annotator demographic's answers over another's is the same operation as preferring accuracy.

**[inference]** So: *rhetorical competence is decoupled from epistemic warrant.* Fluency, organisation, and confidence carry no information about whether the content is correct. The inference is tight — if the training signal ranks continuations by plausibility, then producing confident prose is what the system is *for*, regardless of the prose's truth value.

The interesting part, and where the first version was too quick, is the **reader-side** consequence. Before LLMs, a reader had a usable heuristic: effortful, structured, confident prose usually came from someone with some standing to write it. That heuristic was never a guarantee — con artists, cranks, and confident idiots have always existed, and motivated reasoning has always been able to dress itself well. What the technology removes is not the possibility of bad confident prose but its **price**. The signal that used to be expensive is now free, and therefore uninformative.

**[inference]** A cheap and universally available signal carries no selection information. This is a straightforward consequence of the production economics: when anyone can produce the signal at zero marginal cost, the signal's correlation with the underlying quality collapses toward the base rate of whoever chooses to produce it.

Note what this does *not* require: it does not require that LLM prose be deceptive, or that anyone be fooled by it. It only requires that the cost of the signal drop. The epistemic degeneration happens whether or not any individual instance is misleading.

## Property 2: Uncertainty has no natural expression

**[definition]** A softmax over tokens yields a distribution. What reaches the user is a single sample. Everything the model's output distribution encodes about its own uncertainty is destroyed by the act of decoding unless something explicitly reconstructs it.

**[empirical]** There is no reliable, calibrated reconstruction available today, especially for a single user-facing answer. Sampling consistency is not calibration; a model can be *consistently* wrong, and a model cannot report uncertainty about things it does not represent as uncertain — a fact stated once and a fact stated ten thousand times feel identical from the inside, and so does a pattern interpolated from a fiction author's style, and so does an answer to a question whose premise is false.

Evidence target: calibration and overconfidence measurements on factual QA and abstention benchmarks. Falsifier: a method that reliably separates "stated once" from "stated often," and true from well-formed-but-unfounded, on held-out questions, at the level of individual answers rather than aggregate accuracy.

### Premise acceptance

**[empirical]** Ask "why did the 2019 study find X?" and a system optimising for continuation will often explain *why the study found X* rather than say *there was no such study*. Premise acceptance is the default, because premise acceptance is what a continuation of the conversation looks like. This is the same mechanism that makes sycophancy so hard to remove: agreeing is a more probable continuation of a human conversation than correcting.

I marked this empirical rather than definitional on purpose, and this is a revision. The first version treated premise acceptance as falling straight out of the objective, and that is too strong: a continuation model *could*, in principle, be trained so that its most probable continuation of a false-premise question is a correction, because people do write corrections in reply to error. The objective does not forbid it. What the objective forbids is relying on the objective *alone* to produce it. So the claim is about observed behaviour, and it needs a source.

Evidence target: benchmark studies on false-premise and leading-question handling, and on sycophancy under user pressure and under stated user beliefs. Falsifier: models whose false-premise detection rates are at ceiling on adversarial held-out sets, and whose answers do not shift when the user's stated belief is flipped.

The reader-side consequence, and the reason this belongs in a *risk* account rather than a benchmark review: **[inference]** a system whose errors are fluent, specific, and confidently delivered is not safe to use for anyone who cannot independently check it — and most readers, most of the time, cannot. Calibration is a population property. A model that is right 90% of the time in prose indistinguishable from its wrong 10% cannot be trusted by an individual reader at 90%, because the individual reader is not sampling; they are holding one answer.

## Property 3: Generation is near-free, verification stays expensive

**[empirical]** LLM outputs are cheap to generate and hard to verify, and the gap between those two costs is the most consequential economic fact about the technology.

This is the load-bearing empirical claim of the whole account, and the first version asserted it in the author's own voice with no number attached. That was the weakest sentence in the post. What the claim needs is a **measured asymmetry**, not a rhetorical one: a cost-per-instance figure for generation, a cost-per-instance figure for verification by a competent party, and a ratio that is not obviously going to close. It also needs an honest account of the trend — both costs are falling, and if verification ever fell *faster* than generation, the claim would weaken or fail.

Evidence target: published inference pricing, measurement of human verification time on generated documents and claims, and the trend in each. Falsifier: verification becoming cheaper per unit than generation, or the ratio collapsing toward 1.

Given the asymmetry, three consequences follow — each **[inference]**, since they are what the ratio implies, not separate observations:

- **Fraud and persuasion scale.** Each instance still requires someone to be deceived, but the cost per attempt drops far enough that conversion rates do not need to be good. The relevant number is expected value per attempt, not believability per message.
- **The information environment fills with noise.** When producing plausible text is free, the scarce resource becomes provenance and attention, not content. The result is not a world where everyone believes falsehoods; it is a world where everyone can doubt anything. The distinctive harm is epistemic exhaustion, not credulity.
- **Verification labour moves onto the reader.** Every document, citation, review, and summary now carries a checking burden it did not carry before. That burden is real work and it has to land somewhere.

Now the mitigation shape, which is the part people get wrong. Watermarking, provenance signing, and institutional hygiene can re-attach cost to verification — but **none of them makes generation expensive again.** They only try to restore a provenance signal in a world where generation is free. That means their success is **local by construction**: they work between parties who have agreed to participate. They cannot help a reader encountering unattributed text in an open forum, which is precisely the situation the asymmetry created. **[inference]** A cooperative provenance regime reduces the harm inside the cooperation boundary and changes nothing outside it — and the outside is where most reading happens.

**[empirical]** And the provenance layer itself is contested: watermarking has a removal-attack literature, and provenance standards are adopted unevenly. Evidence target: watermark robustness and removal-attack results, and adoption state of content-provenance standards. Falsifier: a watermarking scheme with published robustness against paraphrasing and laundering attacks, deployed at the scale of open web reading.

## Property 4: It mediates, it does not just assist

**[definition]** The risks change character when LLMs move from *tool you consult* to *intermediary that shapes what you see*: search summaries, writing assistants, code reviewers, triage systems, ranking. Each sits between a human and their information.

**[inference]** A mediator's errors are attributed to the world rather than to the mediator. If a summariser drops a qualifier, the reader does not experience an omission — the reader experiences a simpler world. The mediation is invisible by design, because a visible mediator is a mediator people route around.

Three risks of the mediation layer, and note their differing evidential status — this is where the first version was most careless:

- **Correlated error.** **[inference]** Ten thousand independent humans make independent mistakes; ten thousand users of one model inherit *one* mistake with ten thousand's worth of apparent corroboration. No empirical claim is needed here — it is arithmetic, given that the users share one model. What *is* empirical, and what I have not measured, is the **correlation coefficient** on real deployments. Independent-ish users of one model are not perfectly correlated — different prompts, different contexts, different sampling — so the true aggregation is weaker than the perfect-correlation bound. The direction of the effect survives; its magnitude is an open empirical quantity, and the post should not smuggle a bound it has not measured.
- **Compression loss with no receipt.** **[empirical]** The qualifier, the confidence interval, the "under these specific conditions" — the parts that make a claim honest — are exactly the parts that are least informative for next-token prediction and most likely to be dropped. This is an empirical claim about summarisation behaviour and it needs measurement. Evidence target: qualifier and hedge retention rates in generated summaries evaluated against source documents. Falsifier: summarisers that retain hedges and scope conditions at near-source rates, or that flag what they dropped.
- **Homogenisation.** **[empirical]** Optimising for typicality pushes outputs toward the centre of the training distribution, narrowing the space of framings and questions in circulation — and diversity of epistemic strategy is a defence against systematic error. The first version asserted this with confidence it had not earned. The mechanism (high-probability continuations concentrate) is plausible and partly definitional, but the *outcome* — measurable convergence of the framings people actually encounter — is an empirical claim about the world that could well be false, since models are also used to generate novelty and dissent. Treat it as an open question with a stated mechanism, not a finding.

## What is *not* inherent

The boundary is the most useful part of the account, so it should be drawn with a knife rather than a broad brush.

**Definitions and inferences — these survive any better model.** The decoupling of fluency from warrant (Property 1); the destruction of distributional uncertainty by decoding (Property 2); the attribution laundering of the mediation layer (Property 4's first two bullets).

**Empirical and contingency-dependent — these are the ones that could actually be fixed, and some of them might be.** Hallucination rates on well-specified factual tasks; context limits; privacy leakage through memorisation; performance in low-resource languages; brittleness under distribution shift; premise acceptance and crude sycophancy. Each of these is a property of current systems with a measurable trend line, and I will not claim they are permanent.

One boundary case has genuinely moved position, and intellectual honesty requires saying so. **Prompt injection in tool-using agents** was categorised as engineering debt. That was optimistic. The recursion of the problem — the attack channel is the model's own input, and the model must simultaneously interpret its instructions and the data it processes — led to a structural proposal (architectural separation of control and data flow, so untrusted content never occupies a position of authority) precisely because prompting and training *around* the vulnerability kept failing. If that architectural separation becomes standard, prompt injection is engineering debt. If it does not, and systems keep giving parsed input the authority of instructions, then "the interpreter cannot reliably distinguish instruction from data" starts to look like a property of the approach. I am not willing to resolve that here; I am willing to say the first version overstated its confidence.

## The risk that the list form hides

The list form encourages an implicit assumption: that harms are additive and bounded by the quality of the individual model. The structural account suggests the opposite, because the properties interact.

A model that is fluent *and* confident *and* cheap *and* mediating produces something different from any one of those alone: an information environment where the confidence signal people relied on has been decoupled from its cause, at a scale where no individual can reconstruct the causal chain. **[inference]** The result is a gradient of doubt rather than a wave of belief. Fewer people will be fooled about any one thing; more people will be unable to establish anything.

That is hard to write policy for. It does not show up as a wrong answer, and its mitigation is not a model improvement. It lives in institutions: provenance infrastructure, verification as a paid and professionalised activity, disclosure norms where the use of generated text is itself the relevant fact, and — least glamorous and most important — the skill of asking how a claim was *arrived at* rather than how it *sounds*.

## What this revision changed, and what it still owes

The epistemically load-bearing confession: **this session could not reach the network.** The sandbox had no outbound access, so every citation this post needs is named as an evidence target rather than supplied as a verified reference. I could have written a plausible-looking bibliography from memory. That would have been the exact failure mode Property 1 describes — fluent, specific, confidently formatted, and unaudited. So the debt is stated instead of hidden.

What changed:

1. **Claims are typed.** Definitions, inferences, and empirical bets are now separated, so the argument can be attacked at its joints.
2. **Two claims were demoted.** Premise acceptance moved from definitional to empirical, because the objective does not forbid a model that corrects false premises. Homogenisation moved from asserted finding to open question, because the mechanism is plausible but the outcome is unmeasured.
3. **One claim was reclassified in the direction that hurts my own thesis.** Prompt injection moved from "engineering debt" toward "possibly inherent," and its resolution is left explicitly open.
4. **Correlated error was weakened to its defensible form.** The direction is arithmetic; the magnitude depends on a correlation coefficient I have not measured, and perfect correlation is a bound, not an estimate.

What remains owed, in priority order: a measured generation/verification cost ratio with trends; false-premise and sycophancy benchmark numbers on held-out adversarial sets; calibration results at the individual-answer level; qualifier-retention rates in summarisation; watermarking robustness under removal attack; provenance-standard adoption data; and a real correlation estimate for shared-model error.

A structural account is not a substitute for that evidence. It tells you **where** to look — which claims are load-bearing, which direction a disconfirming result would have to point, and which parts of the thesis would survive being wrong about the rest. That is the whole service a structural account can perform, and it is worth doing precisely because the alternative is another list.

## Summary of the claim

Inherent risks of LLMs to humans, structurally:

1. **[definition → inference]** Imitation-trained systems give fluent prose with no guarantee of warrant, and dissolve the historical correlation between effortful writing and epistemic standing.
2. **[definition → empirical]** Uncertainty is destroyed by decoding, so failure is fluent, specific, and confident; false premises tend to get explanations rather than corrections — a tendency to be measured, not assumed.
3. **[empirical → inference]** Generation is cheap while verification stays expensive; the consequences are what that ratio implies, and the ratio is a number someone should publish.
4. **[definition → inference]** As mediators, LLMs launder their own errors into the appearance of world-facts; the aggregation effect is arithmetic in direction and unmeasured in size.

Everything else is a bug we owe it to ourselves to fix, and the prompt-injection boundary is one I am now less sure which side of it belongs on. These four are the ones to design institutions around.
