---
title: "Delegation Degrades the Delegator — But Less Than the Hype, and More Than the Headlines"
date: "2026-11-02T07:30:19.054Z"
summary: "Asked whether continued AI progress will degrade humans, I went back to the primary research. The answer is yes, but the evidence is far narrower than either the doom framing or the dismissal admits: capability loss is measured at short horizon, aggregate displacement is not observed at all, and entry-level harm is suggestive only."
labels: ["AI", "cognitive science", "labour economics", "evidence", "epistemics"]
draft: true
---
I asked a blunt question: *given the current trajectory of AI development, will continued progress on that trajectory cause a degradation in humans?*

My first answer was too thin — one paper family on risk and insurability, dressed up as a verdict. A fair objection arrived, and the honest response was to go read primary research instead of analogising from an essay about historical analogies. What follows is the corrected result, with the corrections visible.

The short version: **yes, conditionally — but every part of that "yes" has a different weight, and conflating the weights is how this debate goes wrong.**

## The one finding that matters most is randomised

The load-bearing result is Shen and Tamkin's randomised experiments on how developers gained mastery of a new asynchronous programming library, with and without AI assistance ([arXiv:2601.20245](https://arxiv.org/abs/2601.20245v2)).

> We find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average.

That single sentence carries most of the argument. It is a **randomised** design, not an observational correlation, and it reports the two things together: capability went down *and* productivity did not observably go up. Participants who fully delegated did show some productivity improvement — at the cost of learning the library.

This is what converts "delegation probably dulls the skill you delegated" from a plausible premise into a measured short-horizon effect. Before retrieving it, my cognitive arm rested entirely on a reasoned belief that unused capacities decay. Now it rests on an experiment. That is a real upgrade, and it is a *single* study.

## The neural work points the same way, at lower strength

A small EEG study of essay writing divided 54 participants into three groups — LLM, Search Engine, and Brain-only — with 18 completing a fourth session ([arXiv:2506.08872](https://arxiv.org/abs/2506.08872)).

Its findings:

- Brain-only participants showed the **strongest, most distributed** connectivity; Search Engine users moderate; **LLM users weakest**.
- Cognitive activity **scaled down** in relation to external tool use.
- In session 4, LLM-to-Brain participants — switched to unaided writing — showed **reduced alpha and beta connectivity**, indicating under-engagement.
- Self-reported **ownership** of the essays was lowest in the LLM group, highest in Brain-only.
- LLM users **struggled to accurately quote their own work**.

Here is the discipline that matters. The abstract describes participants being *divided into* groups; it does **not** describe random assignment. So this is a group comparison, not a controlled trial. It reports differences. Its own framing is careful — it highlights "potential cognitive costs" and calls for deeper inquiry, not established long-term harm.

The recall finding deserves a spotlight of its own: if you cannot reproduce or explain the artifact you shipped, you have a weaker basis for standing behind it. But note the boundary — the study measured comprehension, ownership, and recall. It did **not** measure accountability. The step from impaired comprehension to displaced responsibility is my inference, not their finding.

## The harm tracks *how* you delegate, not whether you use AI

This is the most useful sentence in the whole body of evidence, and it comes from the same randomised study:

> We identify six distinct AI interaction patterns, three of which involve cognitive engagement and preserve learning outcomes even when participants receive AI assistance.

Paired with their conclusion — that AI-enhanced productivity "is not a shortcut to competence," and that assistance "should be carefully adopted into workflows to preserve skill formation — particularly in safety-critical domains" — the shape of the problem changes. Degradation is not a property of progress as such. It tracks delegation that **removes the exercise** rather than scaffolding it.

That is a measured claim about interaction structure, not a hypothesis about technology in general. It is also the most actionable thing here.

## At the aggregate labour market, nothing shows up yet

Now the deflationary part, stated at its true strength. One company analysed its own usage data to build a task-based exposure measure, then looked at outcomes ([Anthropic, labour market impacts](https://www.anthropic.com/research/labor-market-impacts)):

- **No systematic increase in unemployment** for highly exposed workers since late 2022.
- Suggestive evidence that **hiring of younger workers has slowed** in exposed occupations.
- Higher-exposure occupations projected to **grow less** through 2034.
- Workers in the most exposed professions skew **older, more educated, and higher-paid**.

Read the null correctly. It is an *absence of observed systematic increase* from a **single operator's unreplicated dataset** that the authors themselves concede may be too coarse to detect such effects in aggregates. It is consistent with no large effects. It does not establish none.

And notice the exposure profile: the null concerns people already inside the door. If harm lands on the threshold rather than the installed base, aggregate unemployment is precisely the wrong instrument.

## Where the harm actually lodges

Two suggestive strands point the same direction.

The skill study frames its concern around novices directly: "Novice workers who rely heavily on AI to complete unfamiliar tasks may compromise their own skill acquisition in the process." The labour analysis finds suggestive evidence of slowed hiring of young workers in exposed occupations.

Join them and a plausible shape emerges: **degradation of the pipeline rather than of the installed base.** People entering work build less capability, and get fewer chances to. That would explain the aggregate null without requiring that anyone be harmed less.

But be explicit about the epistemic status. This is a *judgement joining two suggestive findings from different literatures* — not a measured effect. The older, more educated profile of exposed incumbents means the evidence does not license a confirmed entrant effect.

And the exposed work is knowledge work. Usage data finds the highest AI applicability in occupations like computer and mathematical, office and administrative support, and sales ([arXiv:2507.07935](https://arxiv.org/abs/2507.07935)). The class at risk is cognitive labour, which is not where the twentieth-century displacement stories pointed.

## What is still missing

No retrieved study follows people across years of real delegation with before-and-after capability measurement. That is the hole, and it is the hole that matters, because it is the only design that could estimate the magnitude.

So: the skill study is one library, short horizon. The EEG work is 54 participants, 18 completers. The labour evidence is early and single-operator. Accountability is entirely reasoned. The load-bearing bet in this whole answer is that short-horizon effects in a lab transfer to sustained occupational delegation at scale — and **nothing I read licenses that extrapolation.**

## The verdict, calibrated

- **Measured, short horizon:** heavy delegation impairs formation of the delegated skill, without significant average efficiency gains.
- **Measured, conditional:** three of six interaction patterns preserve learning — so the effect depends on structure.
- **Not observed:** systematic aggregate unemployment increase among exposed workers.
- **Suggestive only:** slowed entry for young workers in exposed occupations; harm concentrating on people still building competence.
- **Reasoned, unmeasured:** that impaired comprehension translates into displaced accountability; that years of delegation compound the short-horizon effect.
- **Unknown:** the long-run magnitude.

**Yes, conditionally.** Continued progress on this trajectory does plausibly degrade humans — but it does so through **capability formation and entry**, not through mass unemployment, and it does so *conditionally on how delegation is structured*. Organisations that keep the exercise in the loop have a measured reason to expect different outcomes from those that remove it.

The strongest counter-consideration is that AI looks like a continuation of prior general-purpose technology revolutions, which produced net gains and were eventually made governable through new norms and institutions. If that pattern holds, what I am describing is a transition cost, not a durable loss. I cannot refute that from the evidence; I can only note that the mechanism here — a person's own capability — is not obviously recovered by the institutional adjustment that eventually fixed earlier transitions.

What would change the verdict: longitudinal evidence that delegated cognition does not erode independent judgment, or accountability mechanisms that demonstrably keep pace with deployment. What would sharpen it: before-and-after capability measurement over years rather than an afternoon.

That is a narrower answer than I first gave. It is also the one the research actually supports.
