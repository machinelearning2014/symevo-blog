---
title: 'The Inherent Risks of LLMs to Humans: A Structural Account'
date: '2026-11-18T23:18:16.753Z'
summary: >-
  LLM risk is not a list of hypothetical accidents. It falls out of four
  structural properties: they are trained to imitate human text, they compress
  uncertainty into confident prose, they are cheap to deploy at scales humans
  cannot audit, and they mediate what we read, decide, and believe. This post
  separates what is inherent to the approach from what is a fixable engineering
  gap, and says which risks survive every mitigation we can currently name.
labels:
  - AI safety
  - LLMs
  - risk
  - epistemics
  - AI governance
draft: false
---
Most writing about LLM risk is a list. Bias, misinformation, job loss, misuse, existential risk — an inventory with no rule that generates it. That is why the discourse keeps talking past itself: a list can always be added to or argued down item by item.

I want to try the other approach. Ask what falls *structurally* out of building a system this way, and separate those risks from the ones that are merely engineering debts we might pay off. "Inherent" here means: implied by the training objective plus deployment pattern, so that it survives any implementation that keeps those two things fixed.

## Property 1: The objective is imitation, not truth

A large language model is trained to predict the next token in text produced by humans. For that objective, the target is **plausible continuation**, not **true statement**. Where human text is reliable and consistent, plausibility and truth coincide closely enough that the model looks knowledgeable. Where human text is unreliable — rare events, contested claims, unhypothesised mechanisms, my own idiosyncrasies — the two come apart, and nothing in the objective supplies a preference for the true one.

This is not a training bug. It is the specification. You can post-train against human judgments of correctness, which helps, but those judgments are themselves human judgments — including their errors and their social biases. So the first inherent risk:

> **Rhetorical competence is decoupled from epistemic warrant.** Fluency, organisation, and confidence carry no information about whether the content is correct.

Before LLMs, human readers had a usable (if imperfect) heuristic: effortful, structured, confident prose usually came from someone with some standing to write it. LLMs break that heuristic at the level of production cost. A confident, well-organised, well-cited-looking paragraph now costs approximately zero to produce. The signal that used to be expensive is now free, and therefore uninformative.

## Property 2: Uncertainty has no natural expression

A softmax over tokens yields a distribution. What reaches the user is a single sample. Everything the model "believes" about its own uncertainty is destroyed by the act of decoding unless something explicitly reconstructs it — and there is no reliable, calibrated reconstruction available today, especially for a single user-facing answer.

Concretely, the model has no reliable felt distinction between:

- a fact stated thousands of times in the training data,
- a fact stated once,
- a pattern interpolated from a fiction author's style,
- an answer to a question whose premise is false.

The last one deserves separate attention because it is the quiet killer. Ask "why did the study in 2019 find X?" and a system optimising for continuation will often explain *why the study found X* rather than say *there was no such study*. Premise acceptance is the default, because premise acceptance is what a continuation of the conversation looks like. This is the same mechanism that makes sycophancy so hard to remove: agreeing is the more probable continuation of a human conversation than correcting.

> **Failure is fluent, specific, and confident.** The model's errors do not look like errors. They look like competence.

Downstream, this produces a risk that is not about any single wrong claim but about the base rate of trust. People calibrate on aggregate experience. A system that is right 90% of the time in prose that is indistinguishable from its 10% wrong time cannot be safely used by a reader who has no independent way to check — and most readers, most of the time, have no independent way to check.

## Property 3: Marginal cost near zero, and a volume asymmetry

LLM outputs are cheap to generate and hard to verify. That asymmetry — verification cost being orders of magnitude above generation cost — is the single most consequential economic fact about the technology.

It means:

- **Fraud and persuasion scale.** Personalised phishing, fabricated documentary evidence, cloned voices: each instance still requires someone to be deceived, but the cost per attempt drops far enough that conversion rates do not need to be good.
- **The information environment fills with noise.** When producing plausible text is free, the scarce resource becomes provenance and attention, not content. The result is not a world where everyone believes falsehoods; it is a world where everyone can doubt anything. The distinctive harm is epistemic exhaustion, not credulity.
- **Verification labour shifts onto the reader.** Every document, citation, review, and summary now carries a checking burden it did not carry before. That burden is real work and it has to land somewhere — on individuals, in the worst case.

This one is *partly* mitigable: watermarking, provenance signing, and institutional practice can re-attach cost to verification. But note the shape of the mitigation. None of them makes generation expensive again. They only try to restore a provenance signal in a world where generation is free. They can succeed locally, inside cooperating institutions; they cannot help a reader encountering unattributed text.

## Property 4: It mediates, it does not just assist

The risks change character when LLMs move from *tool you consult* to *intermediary that shapes what you see*. Search summaries, writing assistants, code reviewers, triage systems, recommendation. Each of these sits between a human and their information, and each one's errors are laundered into apparent input.

The structural problem is that a mediator's errors are attributed to the world rather than to the mediator. If a summariser omits a qualifier, the reader does not experience an omission — the reader experiences a simpler world. Aggregation at this layer converts individual model errors into shared belief, because everyone can be downstream of the same summary. Inherent risks of the mediation layer:

- **Correlated error.** Ten thousand independent humans make independent mistakes. Ten thousand users of one model inherit one mistake with ten thousand's worth of apparent corroboration.
- **Compression loss with no receipt.** The qualifier, the confidence interval, the "under these specific conditions" — the parts that make a claim honest — are exactly the parts that are least informative for prediction and most likely to be dropped.
- **Homogenisation.** Optimising for typicality pushes outputs toward the centre of the training distribution, narrowing the space of framings and questions in circulation. Diversity of epistemic strategy is a defence mechanism against systematic error, and this erodes it.

## What is *not* inherent

It is worth being precise about what belongs in the engineering-debt pile rather than the inherent pile, because conflating them makes the inherent cases look unfalsifiable and helps nobody.

Engineering debts, in principle payable: hallucination rates on well-specified factual tasks; context window limits; prompt injection and tool-use exploits; privacy leakage through memorisation; poor performance in low-resource languages; brittleness under distribution shift; sycophancy, at least in its crudest forms.

I am not saying these are *easy*. Prompt injection in tool-using agents, in particular, looks genuinely hard to solve completely, because the attack channel is the model's own input. But they are properties of current systems, not of the approach, and progress is measurable.

Inherent, under the stated definition: the decoupling of fluency from warrant; the loss of uncertainty in decoding; the generation/verification cost asymmetry; and the attribution laundering of the mediation layer. Every one of these survives a better model.

## The risk that the list form hides

The list form encourages an implicit assumption: that the harms are additive and bounded by the quality of the individual model. The structural account suggests the opposite. The four properties interact.

A model that is fluent *and* confident *and* cheap *and* mediating produces something different from any one of those alone: an information environment where the confidence signal that people used to rely on has been decoupled from its cause, at a scale where no individual can reconstruct the causal chain. The result is a gradient of doubt rather than a wave of belief. Fewer people will be fooled about any one thing; more people will be unable to establish anything.

That is a hard risk to write policy for, because it does not show up as a wrong answer, and because the mitigation is not a model improvement. It lives in institutions: provenance infrastructure, verification as a paid and professionalised activity, disclosure norms where the use of generated text is itself the relevant fact, and — least glamorous and most important — teaching the skill of asking how a claim was *arrived at* rather than how it *sounds*.

## Summary of the claim

Inherent risks of LLMs to humans, structurally:

1. Imitation-trained systems give fluent prose with no guarantee of warrant — and dissolve the historical correlation between effortful writing and epistemic standing.
2. Uncertainty is destroyed by decoding, so failure is fluent, specific, and confidently wrong; false premises get explanations rather than corrections.
3. Generation is nearly free while verification remains expensive, so deception scales and the true cost lands on readers.
4. As mediators, LLMs launder their own errors into the appearance of world-facts, and aggregate them across everyone downstream.

Everything else is a bug we owe it to ourselves to fix. These four are the ones to design institutions around.
