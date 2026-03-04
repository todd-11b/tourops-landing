# TO_Technical_Spec.md

**Version:** v1.2
**Last Updated:** 2026-02-28
**Owner:** Todd Abrams
**Architecture Drift Rule:** If production behavior does not match this document, this document must be updated within 24 hours. Spec rot is a critical failure.

---

## Architecture Overview

TourOps Voice AI is a multi-operator SaaS platform built on GHL (GoHighLevel). Each operator gets a deployed instance of the Voice AI and/or Conversation AI system, generated from a master snapshot and compiled from a standardized prompt architecture.

**Two AI Channels:**
1. **Voice AI (Primary Voice Agent)** — Phone calls. Single prompt per operator. Inbound call handling, discovery, booking link delivery, escalation. Agent persona (name, tone, intro) injected from operator OP_Profile.md.
2. **Conversation AI** — SMS/WebChat. Visual Flow Builder. Router + Module architecture. Multi-turn, lifecycle-aware.

**Core Data Flow:**
```
Inbound Call/Message
  → GHL Entry Guard (tourops_work_state check)
  → AI Channel (Voice AI or Conv AI)
  → During-Call/During-Session Actions (field writes, SMS, tags)
  → After-Call/After-Session Workflows (disposition, grader, summary)
  → Contact Record (canonical fields updated)
  → Grader Workflow (score written to tourops_last_score)
  → GHL Webhook → n8n → Airtable (QA data written to Conversations table)
  → Human Task (if escalation, handoff, or critical failure alert required)
```

---

## Persona Architecture

The Platform layer is name-agnostic. Agent persona is defined per operator in `OP_Profile.md` and injected at compile time via Prompt Compiler v1.1.

| Layer | What It Owns | File |
|-------|-------------|------|
| Platform | Prompt structure, logic, escalation, schema fields | All Platform files |
| Operator Overlay | Agent_Name, Agent_Tone, Agent_Intro | OP_Profile.md (per operator) |
| Prompt Compiler | Merges Platform template + OP_Profile.md → final deployed prompt | TourOps_Prompt_Compiler_v1_1.md |

**Rule:** No agent name, tone, or intro may appear hardcoded in any Platform file. Persona hardcoding is a deployment blocker (see TO_Testing_Protocol.md).

---

## Data Schema — Canonical Fields

Source of truth: **TourOps_Canonical_Schema_v2_0.md (Contract 3, r06)**

### Disposition Fields (Section 2)

| Field Name | Type | Allowed Values |
|------------|------|----------------|
| `tourops_intent_bucket` | Text (Enum) | DayOf, ReadyToBook, ReservationChange, Discovery, RefundCancel, Corporate, PartnerVendor, Other |
| `tourops_script_play` | Text (Enum) | DayOfOps, SalesClose, OpsModify, GuidedRec, ObjectionHandle, B2BProfessional, FilterRoute, Fallback |
| `tourops_outcome` | Text (Enum) | LinkSent, Booked, Resolved, FollowUpQueued, Escalated, Abandoned, NoAction |
| `tourops_next_best_action` | Text (Enum) | AwaitCustomerReply, AwaitHumanFollowUp, SendProposal, ResumeNurture, NoFurtherAction |
| `tourops_lifecycle_stage` | Text (Enum) | New, Discovery, ReadyToBook, Booked, Abandoned, Churned |
| `tourops_intent_detail` | Text | Free text (used for Other bucket context) |
| `tourops_open_loop` | Text (Enum) | NEED_DATE, NEED_GROUP_SIZE, NEED_TOUR_TYPE, NEED_CONTACT_INFO, NONE |
| `tourops_last_sms_template` | Text | Template name used in last SMS send |

### AI Control Fields (Section 4)

| Field Name | Type | Allowed Values | Notes |
|------------|------|----------------|-------|
| `tourops_work_state` | Text (Enum) | AI_ACTIVE, HUMAN_ACTIVE, PAUSED | **Authoritative AI suppression control** |
| `tourops_handoff_active` | Boolean | true, false | Mirror of work_state (HUMAN_ACTIVE only) |
| `tourops_last_interaction_at` | Text | ISO 8601 UTC (e.g., "2026-02-14T19:42:31Z") | |
| `tourops_primary_channel` | Text (Enum) | Phone, SMS, WebChat | |

### Narrative Memory Fields (Section 5a)

| Field Name | Type | Update Pattern |
|------------|------|----------------|
| `tourops_voiceai_summary` | Text Area (Multi-line) | Overwrites on each call end |
| `tourops_conversationai_summary` | Text Area (Multi-line) | Overwrites on each session end |

### QA Grader Fields (Section 5b — Schema Contract 3)

| Field Name | Type | Written By |
|------------|------|------------|
| `tourops_last_score` | Number | VAI/CAI Grader workflows |
| `tourops_last_review_date` | Text (ISO 8601) | VAI/CAI Grader workflows |
| `tourops_issue_count` | Number | Increments when score < 3.0 or Critical = Yes |

### Customer Data Fields (Section 5)

| Field Name | Type |
|------------|------|
| `tourops_tour_type` | Text |
| `tourops_tour_date` | Text |
| `tourops_group_size` | Number |
| `tourops_occasion` | Text |

---

## Workflows

| Workflow Name | Trigger | Action | Output |
|---------------|---------|--------|--------|
| TourOps — VAI — During Call — Send SMS | "During The Call" (booking intent) | Send SMS with booking link | `tourops_last_sms_template = BookingLink` |
| TourOps — VAI — After Call — Disposition | Call end + transcript generated | Write disposition fields from transcript | tourops_* fields stamped |
| TourOps — VAI — After Call — Grader v1.0 | Call end + transcript generated | Call Anthropic API grader → write score | `tourops_last_score`, `tourops_last_review_date` |
| TourOps — VAI — After Call — Webhook to n8n | Call end + fields stamped | POST canonical fields to n8n webhook | Airtable Conversations record created |
| TourOps — CAI — Conv AI — Summary to Notes | Conv AI session end | Write summary to contact notes | Permanent audit trail |
| TourOps — CAI — Conversation Closed — Grader v1.0 | Conv AI session end | Grade conversation → write score | `tourops_last_score`, `tourops_last_review_date` |
| TourOps — Stuck State Cleanup | Every 4 hours | Find HUMAN_ACTIVE contacts with no open task; auto-resolve | `tourops_work_state → AI_ACTIVE` |
| TourOps — Entry Guard | Inbound call/message | Check `tourops_work_state` before AI responds | Suppresses AI if HUMAN_ACTIVE |

---

## Voice AI Architecture

**Prompt:** Single prompt per operator (generated via TourOps_Prompt_Compiler_v1_1.md)
**Persona:** Agent name, tone, and intro injected from operator OP_Profile.md at compile time. Never hardcoded in Platform template.
**Knowledge Base:** Per-operator KB (tour descriptions, pricing, policies, FAQs)
**Response limit:** 30–35 words per turn
**Escalation:** Safety keywords trigger immediate transfer
**SMS Send:** Requires phone number + first name before sending booking link

**Current Production Versions:**
- Barley Bus: Legacy prompt (pre-Schema v2) — migration to Contract 3 planned 2026-03-03. OP_Profile.md pending.
- New Operators: Generated via Prompt Compiler v1.1 + Schema Contract 3 + OP_Profile.md persona injection

---

## Conversation AI Architecture

**Type:** GHL Flow Builder — Router + Module
**Router:** Master AI Splitter classifies intent → routes to module
**Modules (Continue Conversation nodes):**
- DISC (Discovery)
- BOOK (Booking/SalesClose)
- FAQ (Resolved/info)
- CORP (Corporate/B2B)
- DAYOF (Day-of operations)
- ESCL (Escalation/handoff)

**Memory Injection (all modules):**
```
Voice Call Summary (context only): {{contact.tourops_voiceai_summary}}
Conversation Summary (context only): {{contact.tourops_conversationai_summary}}
```

---

## Snapshot Architecture

**Voice Master Snapshot:** TourOps_Voice_Master_Snapshot_Build_Guide_v1_2.md (authoritative)
- Pre-built, pre-configured GHL sub-account template
- Includes: Voice AI agent, all canonical custom fields, all standard workflows
- Deployed once per new operator, then customized via Custom Values + OP_Profile.md

**Prompt Compiler:** TourOps_Prompt_Compiler_v1_1.md
- Takes operator Custom Values + OP_Profile.md as input
- Outputs operator-specific prompt (Schema Contract 3 compliant, persona injected)

---

## n8n Operator Onboarding Layer

n8n serves as the reusable data infrastructure layer connecting GHL to Airtable for all operators. The flow is a **template** — the operator name is passed as a variable (`{{operator}}`) in the GHL webhook payload and is never hardcoded in n8n logic.

**Per new operator, data infrastructure setup is under 20 minutes:**
1. Add operator row to Airtable Operators table
2. Copy GHL webhook workflow into new operator sub-account
3. Update operator name variable in webhook payload
4. Run one test conversation to verify Airtable record creation

No new n8n build is required per operator. See `Architecture_Decision_n8n_Reusability.md` (standing architecture decision) and `n8n_build_spec.md` (implementation spec).

**Architecture rule:** Any hardcoded operator name found in the n8n flow is a build defect. Verified during Reusability Verification step in n8n_build_spec.md before freelancer contract close.

---

## External Integrations

| System | Purpose | Status |
|--------|---------|--------|
| Anthropic API | QA Grader AI calls (scoring transcripts) | ✅ Active |
| GHL LC Phone | Voice calling infrastructure | ✅ Active |
| GHL Webhooks | Triggers n8n after each Voice AI call | ✅ Active |
| n8n | Reusable operator onboarding + data processing layer. Routes GHL webhook payload → Airtable. Operator name as variable — no per-operator builds required. | ✅ Active |
| Airtable | QA data store — Conversations, Operators, Errors tables. Receives all post-call canonical field data from n8n. Drives critical failure alerting back into GHL. | ✅ Active |
| Google Sheets | QA tracking, KPI ledger | ✅ Active |

---

## Known Constraints

- Voice AI cannot count conversational turns natively — must be behavioral prompt instruction
- Voice AI cannot check real-time staff availability for live transfer
- Voice AI cannot write contact fields directly — requires workflow actions
- GHL does not support DateTime custom field types — use Text with ISO 8601 UTC
- GHL Task Completed trigger cannot filter by task title — `tourops_work_state` guard required
- GHL Conversation AI API (Generations endpoint) may not be available on all plan tiers — verify before building automated test harness
- Airtable API rate limit: 5 requests/second per base — enable batching or 200ms delay if volume approaches limit

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| v1.2 | 2026-02-28 | Added n8n reusable operator onboarding layer section; added Airtable and n8n to External Integrations; added GHL → n8n → Airtable webhook to Workflows table; updated core data flow diagram |
| v1.1 | 2026-02-26 | Platform name-agnostic refactor — persona architecture section added, OP_Profile.md defined as injection source |
| v1.0 | 2026-02-24 | Initial spec creation for TO_Build project |
