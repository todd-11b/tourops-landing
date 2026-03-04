# TourOps - Canonical Schema

**Schema Contract:** 3
**Doc Revision:** r06 (2026-02-22)
**Created:** 2026-02-14
**Status:** APPROVED — Schema Contract 3 Active
**Owner:** Todd Abrams (System Owner)
**Purpose:** Single source of truth for all system fields, values, and tags
**Scope:** All TourOps systems (Voice AI + Conversation AI)
**Schema Version Field:** `tourops_schema_version = 3`
**Companion Docs:** TourOps_Conversation_Design_Standard, TourOps_GHL_Platform_Capabilities, TourOps_GHL_Implementation_Recipes

---

## Purpose

This document defines the **data contract** for TourOps AI.

All systems must use these exact field names, enum values, and tags. This schema works in concert with the Conversation Design Standard, which defines *how the system behaves*. This document defines *what data the system reads and writes*.

**No deviations permitted without following the change control process.**

---

## Versioning Rules

**Schema Contract** is the only contract-level version in TourOps. It changes only when:
- Field names change (add, remove, rename)
- Enum sets change (add, remove, modify values)
- Required disposition contract changes
- Entry guard precedence changes
- Handoff/suppression control semantics change

Otherwise, update **Doc Revision** only (wording, cross-links, clarifications).

**Companion documents do not carry contract versions.** The Conversation Design Standard and Implementation Recipes use doc revisions only. Schema is the single source of breaking-change authority.

**Companion doc references** must use document names only, never version numbers.

### Non-Alignment Rule

Changes to this document do not require changes to companion documents unless:
- A required field name changes
- An enum set changes
- Entry Guard precedence changes
- AI suppression semantics change

Editorial revisions, clarifications, or internal workflow refinements do not trigger cross-document updates.

---

## Critical Rules

**DO:**
- Use exact field names as specified
- Use exact enum values as specified
- Reference this doc before any system change
- Stamp all required disposition fields at the end of every conversation

**DO NOT:**
- Create new fields without approval
- Rename existing fields
- Add new enum values without a schema version bump
- Use aliases, abbreviations, or free text where enums are defined
- Create tags that control AI behavior; suppression is controlled only by `tourops_work_state`

---

## 1. Schema Version

| Field Name | Type | Value | Purpose |
|------------|------|-------|---------|
| `tourops_schema_version` | Number | `3` | Identifies which version of the schema this account is running |

**Rule:** This field must be set on account setup.

---

## 2. AI Suppression & Work State

| Field Name | Type | Enum Values | Purpose |
|------------|------|-------------|---------|
| `tourops_work_state` | Dropdown | `AI_ACTIVE`, `HUMAN_ACTIVE`, `PAUSED` | Controls whether AI responds |

**Rules:**
- `AI_ACTIVE` — AI responds normally (default)
- `HUMAN_ACTIVE` — AI is suppressed; human has taken over
- `PAUSED` — AI is suppressed; no active human (administrative hold)
- This field is the **single source of truth** for AI suppression
- Tags must never be used to control AI behavior
- The AI sets `HUMAN_ACTIVE` on escalation; the operator's task completion sets it back

---

## 3. Intent & Routing Fields

| Field Name | Type | Enum Values | Purpose |
|------------|------|-------------|---------|
| `tourops_intent_bucket` | Dropdown | `ReadyToBook`, `Discovery`, `DayOf`, `ReservationChange`, `Corporate`, `Complaint`, `Other` | Primary intent classification |
| `tourops_intent_detail` | Text | Free text | Required when intent_bucket = Other |

---

## 4. Lifecycle Stage

| Field Name | Type | Enum Values | Purpose |
|------------|------|-------------|---------|
| `tourops_lifecycle_stage` | Dropdown | `New`, `Engaged`, `LinkSent`, `Booked`, `ActiveToday`, `AtRisk`, `Lost`, `Corporate` | Where contact is in the journey |

---

## 5. Open Loop

| Field Name | Type | Enum Values | Purpose |
|------------|------|-------------|---------|
| `tourops_open_loop` | Dropdown | `NONE`, `NEED_DATE`, `NEED_GROUP_SIZE`, `NEED_BOOKING_DETAILS`, `NEED_RESPONSE` | What's missing to move forward |

---

## 6. Outcome & Next Best Action

| Field Name | Type | Enum Values | Purpose |
|------------|------|-------------|---------|
| `tourops_outcome` | Dropdown | `LinkSent`, `Escalated`, `Answered`, `Abandoned`, `Voicemail`, `Spam` | What happened in this interaction |
| `tourops_next_best_action` | Dropdown | `AwaitCustomerReply`, `HumanFollowUp`, `SendReminder`, `NoAction` | What should happen next |

---

## 7. Booking & Tour Details

| Field Name | Type | Purpose |
|------------|------|---------|
| `tourops_preferred_date` | Date | Desired tour date |
| `tourops_group_size` | Number | Number of people in party |
| `tourops_tour_type` | Dropdown | `CAT_1`, `CAT_2`, `CAT_3`, `PRIVATE` |

---

## 8. Script & Module Tracking

| Field Name | Type | Purpose |
|------------|------|---------|
| `tourops_script_play` | Text | Which module/script was last played |
| `tourops_last_link_sent` | Text | URL of last booking link sent |
| `tourops_last_interaction_at` | Date/Time | Timestamp of most recent interaction |

---

## 9. Memory & Narrative Fields

| Field Name | Type | Purpose |
|------------|------|---------|
| `tourops_voiceai_summary` | Text Area | Auto-generated summary of last voice interaction |
| `tourops_conversationai_summary` | Text Area | Auto-generated summary of last conversation AI interaction |

---

## 10. Grader Fields (Schema Contract 3)

| Field Name | Type | Purpose |
|------------|------|---------|
| `tourops_last_score` | Number | Quality score from last graded interaction (1–5) |
| `tourops_last_review_date` | Date | Date of last quality review |
| `tourops_issue_count` | Number | Number of issues detected across interactions |

**Required Custom Values (for task assignment):**
- `ops_manager_user_id` — GHL user ID for ops manager
- `tourops_admin_user_id` — GHL user ID for admin

---

## 11. System Tags (Visibility Only — Do NOT Use to Control AI)

| Tag | Purpose |
|-----|---------|
| `Human handover` | Visual indicator: human is active on this contact |
| `AI_PAUSED` | Visual indicator: AI is administratively paused |
| `BOT_TEST` | Marks contacts used for bot testing — exclude from reporting |
| `QA_TEST_CONTACT` | Marks contacts used for QA — exclude from reporting |
| `support-urgent` | Visual flag for urgent support queue |

**CRITICAL:** Tags are visibility aids only. AI suppression is controlled exclusively by `tourops_work_state`.

---

## 12. Required Disposition Contract

Every conversation must stamp these fields before closing:

### Always Required
| Field | Rule |
|-------|------|
| `tourops_intent_bucket` | Always set |
| `tourops_outcome` | Always set |
| `tourops_next_best_action` | Always set |
| `tourops_last_interaction_at` | Always set |
| `tourops_work_state` | Always set (default: AI_ACTIVE) |

### Conditional
| Field | Condition |
|-------|-----------|
| `tourops_intent_detail` | Required when intent_bucket = Other |
| `tourops_lifecycle_stage` | Update only if a qualifying lifecycle event occurred |
| `tourops_open_loop` | Update if conversation progression changed what's needed |

---

## 13. Pre-Deployment Checklist

Before any deployment:
- [ ] `tourops_schema_version` is set to 3
- [ ] All required disposition fields exist in the account
- [ ] All enum values match this schema exactly
- [ ] `tourops_work_state` field exists with default `AI_ACTIVE`
- [ ] Entry Guard checks `tourops_work_state` first before AI responds
- [ ] Task Completed workflow includes `IF work_state = HUMAN_ACTIVE` guard
- [ ] Stuck-state cleanup workflow is active (every 4 hours)
- [ ] Disposition write nodes exist at the end of every module path
- [ ] System tags match canonical definitions (visibility-only, not control)
- [ ] No custom fields introduced outside change control
- [ ] Operator SMS template extensions use `OPERATOR__` prefix
- [ ] Regression tests pass with v3 canonical values
- [ ] Narrative memory fields exist (`tourops_conversationai_summary`, `tourops_voiceai_summary`)
- [ ] Auto-summaries workflow configured (if using Conversation AI)
- [ ] Grader fields exist (`tourops_last_score`, `tourops_last_review_date`, `tourops_issue_count`)
- [ ] Grader custom values configured (`ops_manager_user_id`, `tourops_admin_user_id`)
- [ ] VAI Grader workflow active (`TourOps — VAI — After Call — Grader v1.0`)
- [ ] CAI Grader workflow active (`TourOps — CAI — Conversation Closed — Grader v1.0`)

---

## 14. Change Control Process

### How to Propose Changes
1. **Proposal** — Document proposed addition, explain purpose, verify no existing field serves purpose
2. **Impact Assessment** — Which systems affected? Which tests need updating? Migration plan?
3. **Approval** — System Owner review and documented approval
4. **Implementation** — Update this document (version bump), update regression tests, test in Sandbox, deploy to Golden, create new snapshot
5. **Verification** — Run full regression suite, verify no breaking changes, monitor 48 hours

### Approval Authority
**System Owner (Todd Abrams) must approve:**
- All new fields
- All new enum values
- All new system tags
- Any deprecations or renames
- Any changes to the Disposition Write Contract

**No exceptions.**

---

## 15. KPI Derivation (Informational)

| KPI | Formula | Fields Used |
|-----|---------|-------------|
| **Call-to-Book Rate** | `Booked / ReadyToBook` | `tourops_outcome`, `tourops_intent_bucket` |
| **Discovery Conversion** | `Booked / Discovery` (over time) | `tourops_outcome`, `tourops_intent_bucket`, `tourops_lifecycle_stage` |
| **Escalation Rate** | `Escalated / Total Interactions` | `tourops_outcome` |
| **SMS Engagement Proxy** | `AwaitCustomerReply after LinkSent / Total LinkSent` | `tourops_next_best_action`, `tourops_outcome` |
| **Handoff Resolution Time** | Time between `work_state = HUMAN_ACTIVE` and `work_state = AI_ACTIVE` | `tourops_work_state`, `tourops_last_interaction_at` |
| **Abandonment Rate** | `Abandoned / LinkSent` (over 48h window) | `tourops_lifecycle_stage`, `tourops_outcome` |

---

*Last Updated: 2026-02-22 | Owner: Todd Abrams | Schema Contract 3*
