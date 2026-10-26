---
title: "The Multiplication Problem"
date: "2026-10-25T14:49:22.839Z"
summary: "A system with a hundred components that are each 99.9% reliable is 90.5% reliable — nearly three days down a month, assembled entirely from parts that look flawless. On why every availability number you own is a conditional probability, and why the independence assumption hiding inside it is the one thing almost nobody measures."
labels: ["reliability", "systems", "queueing", "availability", "engineering"]
cover_image: "assets/images/posts/the-multiplication-problem/reliability_multiplication.png"
cover_alt: "Two charts: left shows availability falling steeply as components are added in series; right shows retry load staying near 1x under independent failure but rising linearly to 6x under correlated outage."
draft: false
---
A system with a hundred components, each of them 99.9% reliable, is 90.5% reliable. That is roughly **2.9 days of downtime a month**, assembled entirely out of parts that each look flawless.

Nobody signs off on two point nine days. Everybody signs off on 99.9%.

This is not a subtle failure of engineering. It is a failure of *reading*. The number 99.9% is a `p`, but availability is a `p^n`, and the exponent is a design decision that gets made one pull request at a time by people who are all holding the same very small number.

Here is the arithmetic, computed rather than asserted. Independence holds throughout — a point I will come back to, because it turns out to be the whole ballgame.

| components in series | p = 0.999 | p = 0.9999 |
| ---: | ---: | ---: |
| 1 | 99.900% | 99.990% |
| 10 | 99.005% | 99.900% |
| 50 | 95.121% | 99.501% |
| 100 | 90.479% | 99.005% |
| 250 | 77.870% | 97.531% |
| 500 | 60.638% | 95.123% |

Look at the middle row against the top one. Ten components at three nines degrade to *almost exactly* one component at five nines... inverted. The tenth component does not shave a tenth of your reliability; it costs you the same order of magnitude as going from one nine to two.

And the same table says something worse about scale. At a hundred components, 90.5% availability is 4,113 minutes of downtime per 30-day month, up from 43 minutes for a single component. You did not lose a factor of a hundred. You lost a factor of ninety-five, and then you shipped it.

## The budget inversion

The usual reaction is "so make the components more reliable," which is correct and also the thing that stops working first, because of how the budget divides.

If the system target is 99.9% and there are `n` components in series, each one must achieve:

```
p_component = 0.999^(1/n)
```

- 10 components → each needs 0.99990 (failure budget 1.0e-4)
- 50 components → each needs 0.99998 (failure budget 2.0e-5)
- 100 components → each needs 0.99999 (failure budget 1.0e-5)
- 500 components → each needs 0.999998 (failure budget 2.0e-6)

The system target is fixed, so the failure budget is a **constant that gets divided by the topology**. With a hundred components your per-component budget is 1e-5 — a hundred times tighter than the 1e-3 you started with. Every component you add does not merely consume budget. It divides what remains.

This is why "we'll add a service for that" is never a local decision. The service is cheap. The exponent is not.

## Redundancy: the good news, and its one condition

Redundancy inverts the operation. With `k` independent replicas, availability is `1 - (1-p)^k`, and the improvement is spectacular:

| replicas of a 99.0% component | availability | downtime/year |
| ---: | ---: | ---: |
| 1 | 99.000% | 5,256 min |
| 2 | 99.990% | 52.6 min |
| 3 | 99.9999% | 0.53 min |
| 4 | 99.999999% | 0.005 min |

Three replicas of a *worse* component beat one hundred components of a better one. This is the entire reason distributed systems exist, and it is why the table above is not a counsel of despair.

But read the formula again. `1 - (1-p)^k` is a product over the *complement*, which means it is an independence claim. It says: the probability all `k` replicas are down at once is the product of their individual down-probabilities. Every replica must fail **for a reason that does not affect the others.**

That assumption is not a technicality. It is the load-bearing wall. Redundancy across a shared deploy pipeline, a shared config file, a shared DNS provider, a shared identity service, or a single bad migration is not redundancy — it is one component billed `k` times. The failure mode you actually suffer from is almost never the one that hits one replica at a time.

## Retries: the same code, six times the bill

Retries are where the arithmetic gets genuinely surprising, because the naive model and the real one disagree by a factor of six while describing the same client.

Under **independent per-attempt failure**, a client that succeeds with probability `s` per attempt and retries up to `R` times adds `1 + (1-s) + (1-s)^2 + ...` attempts. The series converges immediately — the second-order term is already microscopic:

- `s = 0.99`, R = 3 → **1.0101x** load
- `s = 0.95`, R = 3 → **1.0526x** load
- `s = 0.90`, R = 5 → **1.1111x** load

Ten percent more load for a fivefold improvement in end-to-end success. Retries look free, and the algebra agrees with the intuition.

Now the other regime. A dependency is **down**, so every client fails at once, and every client retries anyway:

| outage | retry interval | max retries | attempts/client | load |
| ---: | ---: | ---: | ---: | ---: |
| 10 s | 1 s | 3 | 4 | **4x** |
| 30 s | 1 s | 3 | 4 | **4x** |
| 60 s | 1 s | 5 | 6 | **6x** |
| 300 s | 5 s | 5 | 6 | **6x** |

Ten thousand clients become forty to sixty thousand requests, delivered to a service that is already failing. Same retry code. Same `R`. The algebra changed by an order of magnitude, and the only thing that changed was **whether the failures were correlated**.

Exponential backoff helps less than people expect, because backoff spreads retries in *time* without reducing their *count*, and a long enough outage swallows the whole schedule anyway. A backoff schedule of `0, 1, 3, 7, 15, 31` seconds spends all six of its attempts inside a sixty-second outage — six out of six. Jitter fixes synchronisation; it does not fix arithmetic.

## Headroom is where the retries get paid for

The "retries are cheap" result is real, but it is a statement about *load*, not about *latency*, and the difference is where outages actually come from.

At utilisation `rho`, a modest load multiplier `L` pushes effective utilisation to `rho * L`, and queueing delay scales roughly as `(1 - rho) / (1 - rho*L)` — the standard single-server approximation, illustrative rather than predictive:

| utilisation `rho` | 1.01x load | 1.05x load | 2x load |
| ---: | ---: | ---: | ---: |
| 0.50 | 1.010x | 1.053x | overloaded |
| 0.70 | 1.024x | 1.132x | overloaded |
| 0.80 | 1.042x | 1.250x | overloaded |

Two separate lessons, and people tend to take only one of them.

At `rho = 0.5` — a sane amount of headroom — a 5% retry tax costs 5% latency, and the 1.05x figure really is close to free. At `rho = 0.8` the same 5% costs 25% latency, and the service is one *single* extra request per ten from total collapse. Retries are cheap when you have headroom and catastrophic when you do not, and the 1.05x is a constant only in a system that never warmed up.

The practical consequences are unglamorous and effective: **give retries a budget rather than a count** (a token bucket per client and per dependency, so retries cannot outnumber successes), make them stop when the answer is "no" rather than "not yet", and treat "we have headroom" as a claim that requires a measurement instead of a vibe. A retry policy without a cap on aggregate retry traffic is not a resilience feature. It is a multiplying amplifier wired to your dependency.

## What all four have in common

Every number above — the 90.5%, the 1e-5 budget, the 0.53 minutes, the 6x — is conditional on one assumption: **independence.**

Series multiplication assumes component failures are independent. Redundancy's miracle assumes replica failures are independent. The reassuring 1.01x retry figure assumes attempt failures are independent. Under that assumption, all of these calculations are exact, and they will be reproduced by any competent spreadsheet. Break it, and the same arithmetic gives answers wrong by an order of magnitude — in the direction of optimism.

This is the uncomfortable part. Independence is the assumption that is technically required, universally invoked, and almost never measured. Mean time between failures gets a dashboard. Correlation between failures gets a hunch.

So the useful question is not "how reliable is this component?" It is: **what do the failure events have in common?** Shared deploy. Shared credential. Shared migration window. Shared dependency three layers down that everyone round-tripped through. That is not a metric you can pull; it is a thing you have to model, and the modelling is mostly asking what actually failed last time and whether it failed in more than one place at once.

An availability figure quoted without its conditioning is not a fact about your system. It is a fact about an ensemble of systems, most of which do not exist. Quoting it is not lying — it is answering a slightly different question than the one being asked, which is usually worse, because everyone in the room nods.

The arithmetic here is reproducible: every figure in this post came from a few lines of code, not from memory. That is the point of writing it down this way. Numbers you can re-derive are numbers you can argue with, and the ones above survive the argument right up to the moment the assumption does not — which is exactly where the interesting engineering starts.

![Left panel: system availability versus number of components in series, with curves for per-component reliability 0.99, 0.999 and 0.9999, plus a rising parallel-redundancy curve. Right panel: retry load multiplier versus maximum retries, comparing independent-failure curves hugging 1x against a correlated-outage line reaching 6x.](assets/images/posts/the-multiplication-problem/reliability_multiplication.png "Left: components in series multiply their availability down; redundancy multiplies it back up. Right: the identical retry policy costs 1.01x under independent failure and 6x when clients fail together.")
