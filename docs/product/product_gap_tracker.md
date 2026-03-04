# TO_Product_Gap_Tracker.md

**Last Updated:** 2026-03-02
**Owner:** Todd Abrams
**Purpose:** Maps every feature promised in the Tier & Pricing Architecture to current build state. One table per tier. Updated when roadmap moves.
**Rule:** If it's not ✅ Live, it can't be sold as included. No exceptions.

---

## Readiness Summary

| Tier | Promised Features | Live | Partial | Not Started | Readiness |
|------|-------------------|------|---------|-------------|-----------|
| Tier 1 — Launch ($297) | 22 | 13 | 2 | 7 | 🟡 ~59% |
| Tier 2 — Growth ($497) | 18 | 1 | 3 | 14 | 🔴 ~11% |
| Tier 3 — Scale ($897) | 14 | 0 | 2 | 12 | 🔴 ~7% |

---

## Tier 1 — Launch ($297/mo)

### AI Communication Engine

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 1.1 | Voice AI answering and qualifying inbound calls | ✅ Live | Hope V5.0, 8-intent routing, 6 KBs | — | Live |
| 1.2 | Conversation AI handling SMS, chat, web 24/7 | ✅ Live | Router + 8-module architecture | — | Live |
| 1.3 | AI configured with operator-specific tour info during onboarding | ✅ Live | 6 KBs populated for BB. Prompt Compiler v1.1 ready for new operators | — | Live |
| 1.4 | Missed-call textback | ✅ Live | GHL native | — | Live |

### Unified Operations

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 1.5 | Unified inbox (calls, SMS, email, web chat, social DMs) | ✅ Live | GHL native capability | — | Live |
| 1.6 | Tour-operator CRM with pipeline stages | ✅ Live | GHL native, pipeline customizable per operator | — | Live |
| 1.7 | 72-hour follow-up enforcement (automated sequences) | 🔴 Not Started | Pipeline stages exist but no time-based enforcement workflow. Needs GHL workflow: sequence triggered by stage + elapsed time. | Needs backlog entry | Q2 2026 |
| 1.8 | AI-to-human handoff via GHL calendar | ✅ Live | Task Completed workflow + work_state control active | — | Live |
| 1.9 | Pre-built inquiry and feedback forms | 🟡 Partial | GHL forms capability exists. No standardized TourOps templates built. | Needs backlog entry | Q2 2026 |
| 1.10 | Basic private/group inquiry visibility | 🟡 Partial | Pipeline stage exists. CORP module routes to escalation only — no automated intake or tracking. | P2 — CORP Module (Q3 2026) | Q3 2026 |

### Operator Scorecard

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 1.11 | Weekly scorecard email (Monday 8am) | 🔴 Not Started | No email workflow built. No content template. No scheduling. | Needs backlog entry (P1) | Q2 2026 |
| 1.12 | Inquiry coverage % (handled vs. missed) | 🔴 Not Started | No metric calculation. Grader captures per-conversation scores but not coverage rates. | Needs backlog entry | Q2 2026 |
| 1.13 | After-hours coverage (% and count) | 🔴 Not Started | No time-of-day classification on conversations. | Needs backlog entry | Q2 2026 |
| 1.14 | Conversations & actions (two-way convos, booking links sent, consultations scheduled) | 🟡 Partial | GHL tracks conversation counts natively. "Booking links sent" and "consultations scheduled" not tracked as discrete metrics. | Needs backlog entry | Q2 2026 |
| 1.15 | Estimated Revenue Protected calculation | 🔴 Not Started | Formula defined in pricing doc. Needs operator-provided inputs (avg booking value, conversion rate) and calculation workflow. | Needs backlog entry | Q2 2026 |
| 1.16 | Staff hours absorbed | 🔴 Not Started | Simple math (interactions × ~4–5 min) but needs scorecard infrastructure first. | Blocked by 1.11 | Q2 2026 |
| 1.17 | Investment vs. impact ratio | 🔴 Not Started | Dependent on Revenue Protected calc. | Blocked by 1.15 | Q2 2026 |
| 1.18 | "Top 3 Conversations You Would Have Missed" | 🔴 Not Started | Requires: after-hours classification + conversation snippet extraction + anonymization. | Blocked by 1.13 | Q2 2026 |

### Messaging & Compliance (Tier 1)

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 1.19 | Reactive-only messaging enforcement | ✅ Live | GHL sub-account settings. Daily SMS cap + outbound restrictions configurable per operator. Config during onboarding. | — | Live |
| 1.20 | Usage caps (300 voice min, 500 SMS, 2,500 contacts) | ✅ Live | GHL native usage/overage billing. Selection per sub-account. Config during onboarding. | — | Live |
| 1.21 | Overage alerting (alerts before hitting caps) | ✅ Live | GHL native. Included in usage billing configuration. | — | Live |
| 1.22 | Compliance defaults (STOP/HELP, opt-out, consent tracking) | ✅ Live | GHL native defaults. A2P registration process documented. | — | Live |

---

## Tier 2 — Growth ($497/mo)

*Everything in Tier 1, plus:*

### Booking System Integration

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 2.1 | Booking events feed into CRM (new booking, cancellation, completion) | 🔴 Not Started | No webhook/API integration with FareHarbor, Peek, or Xola. | FLAG NEEDED (which booking system?) | Q3–Q4 2026 |
| 2.2 | Events trigger automations (review requests, upsell sequences, reactivation tags) | 🔴 Not Started | Dependent on 2.1. | Blocked by 2.1 | Q4 2026 |
| 2.3 | Source attribution (OTA vs. direct vs. referral) | 🔴 Not Started | Requires booking system integration. | Blocked by 2.1 | Q4 2026 |

### Review Generation & Reputation

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 2.4 | Post-tour review requests (Google, TripAdvisor, Viator routing) | 🔴 Not Started | No review automation built. Not on current roadmap. | Needs backlog entry | Q4 2026 |
| 2.5 | Negative feedback interception | 🔴 Not Started | Dependent on 2.4. | Blocked by 2.4 | Q4 2026 |
| 2.6 | Reputation dashboard (review velocity, avg rating, response status) | 🔴 Not Started | Dependent on 2.4. | Blocked by 2.4 | 2027 |

### Revenue Expansion

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 2.7 | Upsell automation (pre-trip upgrades, post-booking cross-sells) | 🔴 Not Started | Requires booking system integration for event triggers. | Blocked by 2.1 | Q4 2026 |
| 2.8 | Reactivation campaigns (seasonal, anniversary, lapsed guest) | 🔴 Not Started | Requires booking data + proactive messaging. | Blocked by 2.1 | Q4 2026 |
| 2.9 | Referral program ("Give $20, Get $20" with tracking) | 🔴 Not Started | No referral infrastructure. | Needs backlog entry | 2027 |
| 2.10 | Abandoned inquiry recovery sequences | 🔴 Not Started | Could be built on GHL workflows without booking integration. Lower dependency. | Needs backlog entry | Q3 2026 |

### Private/Group Pipeline (Structured)

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 2.11 | Dedicated group intake form | 🟡 Partial | GHL forms exist. No standardized group intake template. | Needs backlog entry | Q2 2026 |
| 2.12 | Group follow-up sequences with SLA enforcement | 🔴 Not Started | Same gap as 1.7 (follow-up enforcement) but for group pipeline. | Needs backlog entry | Q3 2026 |
| 2.13 | CORP module (W-9, invoice, group inquiry flows before human handoff) | 🔴 Not Started | Currently routes to escalation. Dedicated module planned. | P2 — CORP Module | Q3 2026 |

### Payments, Forms, Analytics

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 2.14 | GHL payment/invoice links for deposits | 🟡 Partial | GHL native capability. Not configured or templated for TourOps. | Needs backlog entry | Q2 2026 |
| 2.15 | Lead form integration (GHL web forms / webhook capture) | ✅ Live | GHL native. Opt-in language needs standardization per operator. | — | Live |
| 2.16 | Full Value Dashboard (real booking data replacing estimates) | 🔴 Not Started | Requires booking system integration. | Blocked by 2.1 | Q4 2026 |
| 2.17 | Proactive messaging (compliance-gated, higher caps) | 🟡 Partial | GHL native usage billing handles caps. Compliance review workflow not built. | Needs backlog entry | Q3 2026 |
| 2.18 | Monthly detailed impact report | 🔴 Not Started | Requires scorecard infrastructure + booking data. | Blocked by 1.11 + 2.1 | 2027 |

---

## Tier 3 — Scale ($897/mo)

*Everything in Tier 2, plus:*

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| 3.1 | Bidirectional booking system sync | 🔴 Not Started | Tier 2 is one-way. Bidirectional is a major engineering effort. | Needs backlog entry | 2027 |
| 3.2 | Corporate proposal and contract templates | 🔴 Not Started | No proposal/contract automation. | Needs backlog entry | 2027 |
| 3.3 | Automated corporate follow-up cadences with response-speed enforcement | 🔴 Not Started | Dependent on CORP module (2.13). | Blocked by 2.13 | 2027 |
| 3.4 | Group-specific pricing and deposit workflows | 🔴 Not Started | Requires payment infrastructure (2.14) + group pipeline (2.11). | Blocked by 2.14 | 2027 |
| 3.5 | Multi-location management (centralized dashboard, per-location comparison) | 🔴 Not Started | Schema Contract 4 may include multi-location fields. No target date. | P3 — Schema Contract 4 | 2027 |
| 3.6 | Full GHL workflow builder access for operators | 🔴 Not Started | Governance question: operator access vs. system integrity. Not designed. | Needs backlog entry | 2027 |
| 3.7 | Call intelligence (transcription, categorization, missed-opportunity tagging) | 🔴 Not Started | Voice AI transcripts exist in GHL. No analytics or tagging layer built. | Needs backlog entry | 2027 |
| 3.8 | Network benchmarking (anonymous cross-operator performance comparison) | 🔴 Not Started | Requires multiple operators generating data. Airtable could store benchmarks. | Needs backlog entry | 2027+ |
| 3.9 | Guide coordination workflows (booking → notify guide, availability forms) | 🔴 Not Started | Scoped as beta in pricing doc. Not on roadmap. | Needs backlog entry | 2027 |
| 3.10 | Dedicated success manager + quarterly business reviews | 🔴 Not Started | Operational capacity — not a tech build. Requires headcount. | N/A — hiring decision | When revenue supports it |
| 3.11 | Priority support (under 4 hours) | 🔴 Not Started | Operational capacity. | N/A — hiring decision | When revenue supports it |
| 3.12 | White-label branded communications | 🟡 Partial | GHL supports white-label. Not configured or tested for TourOps. | Needs backlog entry | Q4 2026 |
| 3.13 | Custom API access | 🔴 Not Started | No API layer built. | Needs backlog entry | 2027+ |
| 3.14 | High-volume messaging (10K SMS, 3K voice, no overage) | 🟡 Partial | GHL native usage billing handles caps. Abuse monitoring not built. | Needs backlog entry | Q4 2026 |

---

## Onboarding & Retention Features

| # | Promised Feature | Status | Notes | Backlog Ref | Target |
|---|-----------------|--------|-------|-------------|--------|
| O.1 | Structured AI intake form (operator fills in tours, prices, policies) | 🟡 Partial | KB build process exists but no standardized intake form. Prompt Compiler v1.1 expects specific inputs. | Needs backlog entry | Q2 2026 |
| O.2 | Go-Live Checklist (automated or tracked) | 🟡 Partial | Pre-Deployment Checklist exists in Testing Protocol. Not operator-facing. Not tracked per operator. | — | Q2 2026 |
| O.3 | Scorecard Ritual setup during onboarding (avg booking value, conversion rate inputs) | 🔴 Not Started | Dependent on scorecard (1.11). | Blocked by 1.11 | Q2 2026 |
| O.4 | "Flag this conversation" button for operator AI feedback | 🔴 Not Started | Not built. Not on roadmap. | Needs backlog entry | Q3 2026 |
| O.5 | Upgrade triggers embedded in scorecard (grayed-out Tier 2 features) | 🔴 Not Started | Dependent on scorecard dashboard. | Blocked by 1.11 | Q3 2026 |
| O.6 | Seasonal pause ($149/mo) | 🔴 Not Started | Billing infrastructure needed. GHL sub-account pause process not defined. | Needs backlog entry | Q3 2026 |
| O.7 | Compliance acknowledgment at onboarding | 🔴 Not Started | Language drafted in pricing doc. No signing mechanism or tracking. | Needs backlog entry | Q2 2026 |

---

## Critical Path: What to Build First

Priority sequenced by retention and revenue impact:

| Priority | Feature(s) | Why First | Effort | Target |
|----------|-----------|-----------|--------|--------|
| **P0** | Operator Scorecard — weekly email + basic dashboard (1.11–1.18) | Retention engine. Without it, operators can't see value. Scorecard v0 can be manual (Mike sends Monday email from GHL data + Google Sheet). Automate later. | v0: Low (manual). v1: Medium-High. | v0: This week. v1: Q2 2026 |
| **P1** | 72-hour follow-up enforcement (1.7) | Conversion engine. Differentiates TourOps from "just an AI answering service." GHL workflow build. | Medium | This week |
| **P2** | Standardized onboarding templates (O.1, O.2, O.7, 1.9) | Speed to deploy new operators. Founding cohort depends on this. | Low-Medium | This week |
| **P3** | Booking system integration — one-way (2.1) | Unlocks entire Tier 2. Single biggest feature dependency in the product. | High | Q3–Q4 2026 |
| **P4** | Review automation (2.4) | Strongest natural upsell trigger from Tier 1 → Tier 2. | Medium | Q4 2026 |

---

## Dependencies Map

```
Scorecard (1.11) ──────► Revenue Protected (1.15) ──► Investment vs. Impact (1.17)
       │                         │
       ├──► Staff Hours (1.16)   └──► Monthly Report (2.18)
       │
       ├──► After-Hours Classification (1.13) ──► Top 3 Missed (1.18)
       │
       └──► Upgrade Triggers (O.5)

Usage Metering (1.20) ──► GHL NATIVE — No build required
       │
       ├──► Reactive Enforcement (1.19) — GHL config
       ├──► Proactive Messaging (2.17) — config + compliance review
       └──► High-Volume Messaging (3.14) — config + abuse monitoring

Booking Integration (2.1) ──► Source Attribution (2.3)
       │
       ├──► Event-Triggered Automations (2.2) ──► Upsell (2.7) + Reactivation (2.8)
       ├──► Full Value Dashboard (2.16)
       └──► Bidirectional Sync (3.1)

CORP Module (2.13) ──► Corporate Follow-Up (3.3)
       │
       └──► Group Pricing Workflows (3.4)
```

---

## How to Use This File

**When roadmap moves:** Update Status column and Target dates. Move items from "Not Started" to "Partial" or "Live" as builds complete.

**When writing sales materials:** Filter to ✅ Live only. Everything else is roadmap, not product.

**When scoping a new quarter:** Pull all items targeting that quarter. Confirm backlog entries exist. Assign owners.

**Monthly audit:** Count Live vs. Total per tier. Update Readiness Summary at top.

---

*File: TO_Product_Gap_Tracker.md | Owner: Todd Abrams | Update when roadmap moves*
