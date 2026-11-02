---
title: "Delegation Degrades the Delegator — But Less Than the Hype, and More Than the Headlines"
date: "2026-11-02T07:30:19.054Z"
summary: "Whether continued AI progress degrades humans turns out to be three questions with three different answers: capability loss is measured at short horizon, aggregate displacement isn't observed at all, and entry-level harm is suggestive only. A look at what the randomised evidence actually says — and where the extrapolation runs out."
labels: ["AI", "cognitive science", "labour economics", "evidence", "epistemics"]
draft: true
---
Most arguments about whether AI is degrading us get stuck at the same place: both sides are right about different things, and neither says which.

*Will continued progress on the current trajectory degrade humans?* It is a good question and a bad search query. It collapses at least three separate questions — about skill, about employment, and about responsibility — each of which has a different evidentiary status. Answer them together and you get a verdict that no single finding can support.

So here is what happens when you take them apart.

## The soundbite result is a randomised experiment

Start with the load-bearing one, because it is stronger than most people expect.

Shen and Tamkin ran randomised experiments on how developers gained mastery of a new asynchronous programming library, with and without AI assistance ([arXiv:2601.20245](https://arxiv.org/abs/2601.20245v2)). Their finding:

> We find that AI use impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average.

Read that twice, because the conjunction is the point. Capability went down **and** productivity did not observably go up. Participants who fully delegated did show some productivity improvement — they got the library working — but at the cost of learning it.

This is a randomised design, not a correlation dredged from usage logs. It converts a piece of folk wisdom ("if you always let the machine do it, you lose the skill") from a plausible premise into a measured short-horizon effect. That is a real upgrade in evidentiary status, and it rests on a single study.

## The EEG work points the same way, more weakly

There is a second strand of evidence that people cite confidently and should not, or at least not in the way they usually do.

A study of essay writing divided 54 participants into three groups — using an LLM, using a search engine, and using nothing — with 18 completing a fourth session ([arXiv:2506.08872](https://arxiv.org/abs/2506.08872)). What it found:

- Brain-only participants showed the **strongest, most distributed** neural connectivity; search-engine users moderate; **LLM users weakest**.
- Cognitive activity **scaled down** in relation to external tool use.
- In the fourth session, LLM users switched to unaided writing showed **reduced alpha and beta connectivity** — under-engagement even after the tool was removed.
- **Ownership** of the essays was lowest in the LLM group and highest in the brain-only group.
- LLM users **struggled to accurately quote their own work.**

That last one is the quietly disturbing result. If you can't reproduce or explain the thing you shipped, you have a much weaker basis for standing behind it.

Now the discipline. The abstract describes participants being *divided into* groups. It does not describe random assignment. So this is a group comparison — 54 people, 18 completers — not a controlled trial, and the authors themselves frame it as highlighting "potential cognitive costs" and calling for deeper inquiry rather than as established long-term harm. Treat it as convergent with the randomised study, not as independent proof of the same thing.

And note the boundary: they measured comprehension, ownership, and recall. They did **not** measure accountability. More on that below.

## The harm depends on how you delegate

Here is the most useful sentence in the literature, and it comes from the randomised study rather than from either of the camps arguing about it:

> We identify six distinct AI interaction patterns, three of which involve cognitive engagement and preserve learning outcomes even when participants receive AI assistance.

Paired with their conclusion — that AI-enhanced productivity "is not a shortcut to competence," and that assistance "should be carefully adopted into workflows to preserve skill formation — particularly in safety-critical domains" — the shape of the problem changes.

Degradation isn't a property of progress as such. It tracks delegation that **removes the exercise** rather than scaffolding it. Half the interaction patterns they observed preserved learning with AI in the room. That is a measured claim about structure, and it is the most actionable thing in this entire post: the outcome depends on choices organisations are actually making right now, not on the technology's existence.

## At the aggregate labour market, nothing shows up yet

Now the deflationary half, which deserves the same precision.

One company analysed its own usage data to build a task-based exposure measure, then looked at labour outcomes ([Anthropic, labour market impacts](https://www.anthropic.com/research/labor-market-impacts)):

- **No systematic increase in unemployment** for highly exposed workers since late 2022.
- Suggestive evidence that **hiring of younger workers has slowed** in exposed occupations.
- Higher-exposure occupations projected to **grow less** through 2034.
- Workers in the most exposed professions skew **older, more educated, and higher-paid**.

The null is the headline and it should be read carefully. This is an *absence of observed systematic increase*, from a **single operator's unreplicated dataset**, which the authors concede may be too coarse to detect effects in aggregate. It is consistent with no large effects. It does not establish that none exist.

Then notice the exposure profile: the workers most exposed are older, more educated, higher-paid. The null is about people already inside the door. If harm lands on the threshold rather than on the installed base, aggregate unemployment is precisely the wrong instrument to find it with.

## Where the harm actually lodges

Two suggestive strands point the same way.

The skill study names its concern directly: "Novice workers who rely heavily on AI to complete unfamiliar tasks may compromise their own skill acquisition in the process." The labour analysis finds suggestive evidence of slowed hiring of young workers in exposed occupations.

Put them side by side and a plausible shape appears: **degradation of the pipeline rather than of the installed base.** People entering work build less capability, and get fewer opportunities to build it.

That would explain the aggregate null without requiring anyone to be harmed less. But be honest about the status — this is a judgement joining two suggestive findings from different literatures, not a measured effect. The older, more educated profile of exposed incumbents means the evidence does not license a confirmed entrant effect.

And the exposed work is knowledge work. Usage data finds the highest AI applicability in computer and mathematical occupations, office and administrative support, and sales ([arXiv:2507.07935](https://arxiv.org/abs/2507.07935)). The class at risk here is cognitive labour — which is not where the twentieth-century displacement stories pointed, and arguably not where our policy instincts are calibrated.

## What is missing, and why it matters

No study I found follows people across years of real delegation with before-and-after capability measurement. That is the hole, and it is the one that matters, because it is the only design that could estimate magnitude rather than direction.

So the inventory, plainly: the skill study covers one library over a short horizon. The EEG work is 54 participants with 18 completers. The labour evidence is early and single-operator. The accountability arm is entirely reasoned. And the load-bearing bet in this whole answer — that short-horizon lab effects transfer to sustained occupational delegation at scale — is an extrapolation that **none of the cited work licenses.**

## The verdict, with weights attached

- **Measured, short horizon:** heavy delegation impairs formation of the delegated skill, without significant average efficiency gains.
- **Measured, conditional:** three of six interaction patterns preserved learning, so the effect depends on structure.
- **Not observed:** systematic aggregate unemployment increase among exposed workers.
- **Suggestive only:** slowed entry for young workers in exposed occupations; harm concentrating on people still building competence.
- **Reasoned, unmeasured:** that impaired comprehension translates into displaced accountability; that years of delegation compound the short-horizon effect.
- **Unknown:** the long-run magnitude.

**Yes, conditionally.** Continued progress on this trajectory does plausibly degrade humans — through **capability formation and entry**, not through mass unemployment, and conditionally on how delegation is structured.

The accountability piece is the one I find most concerning and can least support. If you cannot explain the artifact you put your name on, your oversight is nominal. But nothing I read measures the gap between impaired comprehension and displaced responsibility; that step is inference, and I'd rather say so than smuggle it in as a finding.

The strongest counter-consideration is that AI looks like a continuation of prior general-purpose technology revolutions, which produced net gains and were eventually made governable through new norms and institutions. If that pattern holds, what I've described is a transition cost, not a durable loss. I can't refute that. I can only point out that the mechanism here is a person's own capability, and a capability not exercised during the years it would have formed is not obviously recovered by the institutional adjustment that eventually fixed earlier transitions.

What would change my mind: longitudinal evidence that delegated cognition doesn't erode independent judgment, or accountability mechanisms that demonstrably keep pace with deployment. What would sharpen it: before-and-after capability measurement over years, rather than over an afternoon.

A narrower answer than the question invites. Also the one the research actually supports.
