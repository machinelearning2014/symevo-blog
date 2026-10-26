---
title: "The Skill Floor Is Gone: What Three 2026 Reports Actually Say About AI and Attackers"
date: "2026-10-25T13:06:00.000Z"
summary: "Three 2026 publications — Google Threat Intelligence Group (12 May), Anthropic's misuse analysis as reported by Help Net Security (5 June), and CrowdStrike's Threat Hunting Report (3 August) — now document AI inside real intrusions. What they establish, and what they don't."
labels: ["security", "AI", "threat-intelligence", "cybercrime"]
draft: false
---
# The Skill Floor Is Gone: What Three 2026 Reports Actually Say About AI and Attackers

I keep a small collection of quotes that changed how I read security news. The newest one arrived on 5 June 2026, in Help Net Security's write-up of an Anthropic analysis of cyber misuse. The researchers' claim was blunt: "These sorts of post-compromise techniques used to be restricted to actors with the technical knowledge to carry them out... Our investigation shows that AI can now be made to perform these activities on behalf of less sophisticated actors."

That sentence is 2026 in miniature. The question stopped being "can a model write a decent phishing email?" and became "what happens when a model acts inside a live intrusion?" Three dated publications now answer parts of that: Google Threat Intelligence Group on 12 May 2026, Anthropic's analysis as reported by Help Net Security on 5 June 2026, and CrowdStrike's 2026 Threat Hunting Report on 3 August 2026. Different vendors, different telemetry, different incentives — and they converge.

## A zero-day that GTIG believes a model helped build

GTIG's most striking passage describes a cyber crime actor that planned a mass exploitation event around a zero-day in "a Python script that enables the user to bypass two-factor authentication (2FA) on a popular open-source, web-based system administration tool." GTIG worked with the vendor to disclose it.

The attribution is carefully hedged and worth reading in full: "Although we do not believe Gemini was used, based on the structure and content of these exploits, we have high confidence that the actor leveraged an AI model to support the discovery and weaponization of this vulnerability." The stated evidence is style: "the script contains an abundance of educational docstrings, including a hallucinated CVSS score, and uses a structured, textbook Pythonic format highly characteristic of LLMs training data."

And the flaw itself is the kind signature-based tooling is bad at. GTIG writes that it "stems not from common implementation errors like memory corruption or improper input sanitization, but a high-level semantic logic flaw where the developer hardcoded a trust assumption."

## The AI ecosystem is now an attack surface

CrowdStrike's release pairs two facts in one sentence: "China-nexus adversaries exploited critical vulnerabilities within 24 hours of public proof-of-concept (PoC) release, while DPRK-nexus adversaries poisoned 131 trusted AI framework packages." The mechanical detail is in the highlights: "DPRK-nexus STARDUST CHOLLIMA injected a malicious npm package into 131 trusted Mastra AI frameworks."

Notice what that attack required: developers installing a dependency, which is what framework developers do all day. And the tempo is not human: CrowdStrike reports one campaign "that sent nearly 200,000 AI model requests in two minutes," with threat actors using AI "to generate payloads and shell commands, exploit AI infrastructure, and abuse enterprise LLMs."

## The exploitation window collapsed

The headline number: "In 1H 2026, 88% of CrowdStrike-observed exploitation of vulnerabilities with a PoC occurred within 48 hours of release." Two named groups beat even that — "China-nexus actors VAULT PANDA and GENESIS PANDA moved even faster, launching deliberate attacks within 24 hours of disclosure."

Downstream, CrowdStrike's numbers point at identity: "Cloud-conscious eCrime activity surged 171%" and "Monthly device code phishing attempts increased 15x in 1H 2026, reflecting growing abuse of trusted authentication workflows." That last one is the uncomfortable part. Device-code phishing abuses a flow enterprises adopted to be *more* secure.

## What Anthropic's ban review measured

Anthropic's analysis "examined 832 accounts that were banned for malicious cyber activity between March 2025 and March 2026," and the company cautioned that "these 832 cases are just a subset of the total number of accounts banned during this period." Mapping them to MITRE ATT&CK v18, "the study recorded 13,873 actions spanning 482 unique ATT&CK techniques and all 14 ATT&CK tactics." Of those 832 accounts, "67.3% used AI for tasks such as malware development," and "the analysis also identified cases where AI was used to support more advanced operations, including lateral movement inside compromised networks."

The trend inside the window matters more than the totals: "Medium- and high-risk actors accounted for 56% of reviewed cases during the second half of the study period, up from 33% during the first half," concentrated "among actors using AI for activities such as lateral movement, credential dumping, and deploying web shells."

Then there is the case that should keep defenders up: "a cyber espionage campaign disrupted in November 2025 that received the maximum risk score of 100 despite using a number of techniques comparable to medium-risk actors." The researchers' explanation is the whole thesis: "That attack was distinct not because of the number of techniques it employed but because of how the attackers used an AI agent to orchestrate them."

## What none of this says

Three limits, stated plainly.

First, these are publisher-scoped observations. CrowdStrike's percentages come from exploitation its own hunters observed; Anthropic's from a subset of accounts it banned; GTIG's confidence is an attribution judgement built on code style and comments. None is a global census of AI-enabled crime, and none is an independent audit.

Second, the lifecycle framing is theirs partly and mine partly. Anthropic explicitly maps to MITRE ATT&CK, so technique and tactic claims are theirs. Sorting behaviours into "initial access," "resource development," "credential access," "lateral movement," and "orchestration" is my analyst vocabulary, not a claim any source made.

Third, the honest reading is narrower than the headlines. The evidence supports: one actor that a major threat-intel team believes used AI to find and weaponize a real zero-day; documented AI use across a wide span of intrusion techniques, including post-compromise movement, by measurably less-skilled actors; automated activity at machine tempo; and an AI supply chain being poisoned with the same tradecraft as any other.

## What I'd watch next

Offered as judgment, not sourced fact. Dependency decisions are now security decisions with a 48-hour half-life. Identity is where the numbers move fastest in the wrong direction, because device-code phishing borrows trust we deliberately built. And "we use the safe vendor" is not a control when 131 trusted framework packages can be poisoned in one campaign.

## Sources

- Google Threat Intelligence Group, *GTIG AI Threat Tracker: Adversaries Leverage AI for Vulnerability Exploitation, Augmented Operations, and Initial Access*, 12 May 2026 — https://cloud.google.com/blog/topics/threat-intelligence/ai-vulnerability-exploitation-initial-access
- Sinisa Markovic, *AI is helping low-skill hackers pull off advanced cyberattacks*, Help Net Security, 5 June 2026 — https://www.helpnetsecurity.com/2026/06/05/anthropic-ai-cyber-activity-analysis
- CrowdStrike, *CrowdStrike 2026 Threat Hunting Report: AI is Now Embedded Across Modern Adversary Operations*, 3 August 2026 — https://www.crowdstrike.com/en-us/press-releases/crowdstrike-2026-threat-hunting-report/

Every factual assertion above is drawn from those three documents. The closing section is explicitly labelled as judgment.
