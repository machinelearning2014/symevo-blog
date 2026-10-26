---
title: 'The Slope, Not the Snapshot: Where AI-Enabled Attack Is Heading'
date: '2026-10-25T14:21:47.088Z'
summary: >-
  The three 2026 documents I read as a snapshot also contain a set of rates of
  change. Read as slopes — discovery, population, tempo — they point somewhere
  specific, and the interesting question stops being what AI can do to a network
  and becomes what happens when skill and time both get cheap.
labels:
  - security
  - AI
  - threat-intelligence
  - cybercrime
draft: false
---
A snapshot tells you where a thing is. A slope tells you where it will be.

In my previous post I wrote up three 2026 documents as a snapshot: Google Threat Intelligence Group on 12 May, Anthropic's misuse analysis as reported by Help Net Security on 5 June, and CrowdStrike's Threat Hunting Report on 3 August. The question I keep being asked is not "is this happening" — on vendor telemetry that is settled. It is "where does this go".

That is a question about derivatives, and the same three documents contain them. None was written to describe a trend; each is a measurement taken at a moment. But put three measurements in an order and the differences between them are the story.

This post adds no new reporting. It re-reads the same three documents and asks a different question of them. Every factual assertion below comes from what those documents said, in the words I quoted in that earlier post. Everything predictive is labelled as my judgment, and I have written down what would prove me wrong.

## Three curves, three slopes

### Discovery: the last human monopoly, eroding

Vulnerability discovery is the stage of an intrusion where, until recently, the scarce input was a person's judgement. A tool can exploit a known bug. Finding a *new* one in unfamiliar code is different work: you have to hold a model of what the program intends and notice where the intent breaks.

GTIG's case is a single actor and a single bug, and its attribution is hedged: "Although we do not believe Gemini was used, based on the structure and content of these exploits, we have high confidence that the actor leveraged an AI model to support the discovery and weaponization of this vulnerability."

Read the stated basis for that confidence, because it is the part that forecasts:

> the script contains an abundance of educational docstrings, including a hallucinated CVSS score, and uses a structured, textbook Pythonic format highly characteristic of LLMs training data

Style. Not provenance, not a watermark — style. And the bug it was built around is described as the kind that automation is bad at: a flaw that "stems not from common implementation errors like memory corruption or improper input sanitization, but a high-level semantic logic flaw where the developer hardcoded a trust assumption."

A semantic trust assumption is exactly the class of defect you find by reading for intent rather than matching patterns. One case is not a trend, and GTIG does not claim it is. But the direction is unambiguous: the stage of the intrusion that was protected by requiring a human analyst is now claimed to have been performed with model assistance, by a criminal actor, on a real target, for a planned mass exploitation event.

### Population: the mix of who does this is changing

The Anthropic analysis is the most forecastable of the three documents, because it does not only count capability — it counts composition.

The base is 832 accounts banned for malicious cyber activity between March 2025 and March 2026, which the researchers caution are "just a subset of the total number of accounts banned during this period." Mapped onto MITRE ATT&CK v18, "the study recorded 13,873 actions spanning 482 unique ATT&CK techniques and all 14 ATT&CK tactics." Of those accounts, "67.3% used AI for tasks such as malware development."

The totals say AI is used widely. The split says something sharper:

> Medium- and high-risk actors accounted for 56% of reviewed cases during the second half of the study period, up from 33% during the first half

That is a composition shift inside a twelve-month window, and composition is a leading indicator where averages are not. If the population of AI-assisted actors is re-weighting upward that quickly — concentrated "among actors using AI for activities such as lateral movement, credential dumping, and deploying web shells" — then the distribution of attacker capability is compressing from the bottom, with the low-skill tail being pulled toward operations that used to require specialists.

Then there is the case that reveals the next capability class. A campaign "disrupted in November 2025 that received the maximum risk score of 100 despite using a number of techniques comparable to medium-risk actors" was, in the researchers' words, "distinct not because of the number of techniques it employed but because of how the attackers used an AI agent to orchestrate them."

Orchestration is not tool use. Tool use is asking a model for a payload. Orchestration is delegating a sequence of decisions — what to do next, with which technique, against which host — and that is a management capability, not a coding one. It is also the capability that scales without adding people.

### Tempo: the one dimension that is structural

CrowdStrike supplies the clock. In one release: "China-nexus adversaries exploited critical vulnerabilities within 24 hours of public proof-of-concept (PoC) release, while DPRK-nexus adversaries poisoned 131 trusted AI framework packages." The headline figure is that "In 1H 2026, 88% of CrowdStrike-observed exploitation of vulnerabilities with a PoC occurred within 48 hours of release," with two named China-nexus groups "launching deliberate attacks within 24 hours of disclosure."

And the volume is not human-paced: one campaign "sent nearly 200,000 AI model requests in two minutes," with actors using AI "to generate payloads and shell commands, exploit AI infrastructure, and abuse enterprise LLMs."

Tempo is the dimension where the machine advantage is structural rather than incidental. A human operator's speed is bounded by attention, working memory and sleep. An agent's is bounded by throughput and budget. That asymmetry does not require better models; it requires only models that are good enough, pointed at a queue.

## The constraint moves

Every control in a security programme encodes an assumption about the adversary. Three assumptions have been load-bearing for decades:

1. Attacks require skill. The skill floor has collapsed — that is what the 33% to 56% shift measures.
2. Attacks take time. The window is now 48 hours for most observed exploitation and 24 hours for the fastest named groups.
3. Attacks bear a human fingerprint. GTIG's attribution rests on one, and it is the assumption with the shortest remaining life.

When the first two fail, the scarce resources move. Capability is cheap; tempo is high. What remains expensive is *judgement about what to aim at* and *the ability to keep doing it while defenders react*. So I expect the strategic premium in criminal operations to migrate toward target selection and toward operating inside the defender's decision loop — attacking the response, not just the perimeter. The November 2025 case is the shape of that: unremarkable technique count, maximum impact, because the orchestration was the weapon.

## The tell is going to stop working

The piece of GTIG's evidence I would bet against, over time, is the tell itself.

"An abundance of educational docstrings, including a hallucinated CVSS score" and "a structured, textbook Pythonic format" are properties of how models currently write: eager to explain, confident about numbers they invented, trained on tutorials. Two forces erode that. Models are being shaped away from verbosity toward terse tool-shaped output. And operators strip comments when a comment might be evidence.

Meanwhile the tell's error rate rises for a reason nobody talks about: an entire generation of developers now writes in the LLM idiom, because that is the idiom they learned from. Educational docstrings and uniform structure are becoming the world's default house style, not a signature. Hallucinated numbers are not model-only behaviour either — humans ship wrong CVSS scores routinely.

So attribution-by-artefact-style is a Bayesian signal with a shelf life measured in a couple of years, not a fingerprint. Which produces a forecast that matters more than it looks: expect public disagreement about whether AI was involved in specific incidents, and expect confidence language — "we assess with moderate confidence" — to carry an unusual amount of weight in 2027 reporting.

## The AI supply chain is a delegation problem, not a code problem

The 131 poisoned Mastra framework packages are being read as a supply-chain story, and mechanically they are one: "DPRK-nexus STARDUST CHOLLIMA injected a malicious npm package into 131 trusted Mastra AI frameworks." Same economics as any dependency compromise — one maintainer, many downstream consumers, and developers doing exactly what developers do.

The asymmetry is in what gets compromised. An AI framework is not a parsing library. It is installed with credentials, given tool access, and placed inside a loop that decides what to do next. Compromising it does not merely buy code execution at build time; it buys a seat inside the agent loop, at the point where tool calls are authorised and context is assembled. The malicious package inherits the trust the agent has accumulated, and can act on the agent's behalf.

That makes AI framework and integration packages a categorically better initial-access target than the average npm package: same attack cost, much larger blast radius, and a foothold that lives in the authorisation path rather than in the build. The indicator to watch is not package counts. It is the credential scope attached to agent runtimes, because that is the thing an attacker is actually buying.

## What I expect, and how I would know I am wrong

All of this section is judgment. Dates are my estimates, not anyone's forecast.

**By mid-2027, a documented intrusion will trace to a semantic trust flaw shipped by an AI-assisted developer** — not found by an AI-assisted attacker, but written that way. GTIG's description of the bug class is the reason: a high-level semantic logic flaw where the developer hardcoded a trust assumption is precisely how generated code resolves ambiguity, by assuming. If discovery is getting cheap on the attacker's side, bug creation is getting cheap on ours, and the same tooling produces both.

**Agent-orchestrated intrusions stop being notable.** The November 2025 campaign was remarkable because an agent orchestrated the operation. Expect "orchestrated by an agent" to become the routine description of commodity intrusion, with reporting emphasis moving from novelty to scale, persistence and targeting.

**Attribution becomes contested in public.** Once style tells decay, whether a given intrusion was AI-enabled becomes a judgement call that vendors will make differently, with the disagreement visible.

**The tempo numbers get harder to interpret, not easier.** 88% within 48 hours is a publisher-scoped figure. It should also saturate: when nearly everything happens within a day, the percentage stops discriminating between actors, and the interesting quantity becomes variance and dwell time rather than the median.

**Defence shifts from detecting the intrusion to bounding the blast radius.** If dwell time approaches zero, detection has little to work with. Controls whose value depends on having time — patch windows, change review queues, SOC triage — lose marginal value. Controls whose value comes from invariants gain it: hardware-bound credentials, least privilege for agent identities, out-of-band confirmation for changes to trust flows, deterministic authorisation of tool calls that does not rely on a model's judgment.

The falsifiers, so this is checkable rather than merely confident: if the medium- and high-risk share in the next Anthropic-style review falls back toward a third; if the 48-hour exploitation share stops rising or drops materially below 88%; if AI framework packages stop recurring as an initial-access theme in 2027 reporting; if agent-orchestrated campaigns remain rare, isolated exceptions rather than the description of ordinary intrusions.

## The stable fact underneath the forecast

One number in these documents is not about AI at all in its mechanism. Monthly device-code phishing attempts "increased 15x in 1H 2026, reflecting growing abuse of trusted authentication workflows" — and device-code flow is a thing enterprises adopted in order to be *more* secure than password-plus-prompt.

That is the pattern to carry into every prediction above. The controls we will lose are the ones whose security came from friction, because friction is exactly what automation buys down. Controls whose security comes from mathematics, or from an authorisation decision that a model cannot talk its way out of, survive the slope.

So the honest summary of the trajectory is not "AI does hacking now". It is narrower and more useful: the two scarcest inputs to an intrusion — the person who knows how, and the time it takes — are getting cheap at the same time. Plan for the second-order consequence. If intrusion becomes fast, cheap and unremarkable, the defensible position stops being "keep them out" and becomes "make entry not matter".

## Sources

- Google Threat Intelligence Group, *GTIG AI Threat Tracker: Adversaries Leverage AI for Vulnerability Exploitation, Augmented Operations, and Initial Access*, 12 May 2026 — https://cloud.google.com/blog/topics/threat-intelligence/ai-vulnerability-exploitation-initial-access
- Sinisa Markovic, *AI is helping low-skill hackers pull off advanced cyberattacks*, Help Net Security, 5 June 2026 — https://www.helpnetsecurity.com/2026/06/05/anthropic-ai-cyber-activity-analysis
- CrowdStrike, *CrowdStrike 2026 Threat Hunting Report: AI is Now Embedded Across Modern Adversary Operations*, 3 August 2026 — https://www.crowdstrike.com/en-us/press-releases/crowdstrike-2026-threat-hunting-report/

Every factual assertion above is drawn from those three documents, in the wording quoted in the earlier post. No new reporting was done for this piece. The section headed "What I expect, and how I would know I am wrong", and the interpretive framing throughout — slopes, constraint migration, delegation hijack — are my analysis, not claims made by any of the sources.
