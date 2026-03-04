# TO_Run_Training_Guide.md

**Last Updated:** 2026-02-26
**Owner:** Mike
**Purpose:** Onboard someone to TourOps Voice AI RUN operations. Complete enough that Todd is not needed.

---

## Onboarding Steps

### Step 1 — System Orientation (Day 1) — Est. 2 hours

1. Read TourOps_Canonical_Schema_v2_0.md — understand all canonical fields, especially `tourops_work_state`, `tourops_intent_bucket`, `tourops_outcome`. Pay attention to allowed enum values — case-sensitive. *Est. 45 min*
2. Read VAI_Operational_Rules_v2.md — understand what the Primary Voice Agent is allowed to do and what triggers escalation. *Est. 30 min*
3. Read TourOps_Escalation_Playbook_v2.md — understand the full escalation lifecycle. *Est. 20 min*
4. Read Quality_Scoring_Rubric.md — memorize the 6 categories and critical failure triggers. *Est. 20 min*

**Checkpoint:** Can you answer these without looking?
- What field controls AI suppression? (`tourops_work_state`)
- What are the 7 intent buckets?
- What triggers an auto-score of 1 in Escalation Logic?
- What does an operator do when they receive a GHL task?

---

### Step 2 — QA Scoring Practice (Day 2) — Est. 2 hours

1. Pull 5 historical conversation transcripts from GHL (ask Mike for access to BB test calls)
2. Score each using Quality_Scoring_Rubric.md — all 6 categories
3. Compare your scores to Mike's scores for the same calls
4. Discuss any deltas > 0.5 with Mike — understand the reasoning
5. Repeat with 5 more calls until your average delta is ≤ 0.3

**Pass Criteria:** ≤ 0.3 average delta from Mike's scores across 10 calls.

---

### Step 3 — GHL Navigation (Day 2–3) — Est. 1 hour

1. Log into GHL. Locate Barley Bus sub-account.
2. Filter contacts by `tourops_work_state = HUMAN_ACTIVE`. Understand what you're seeing.
3. Open a contact. Find: `tourops_intent_bucket`, `tourops_outcome`, `tourops_last_score`. Know where these live.
4. Open a completed GHL task. Understand the title format: `TOUROPS — {Intent} — {Summary}`.
5. Practice completing a test task (Mike will set one up). Verify `work_state` resets to `AI_ACTIVE` after.

---

### Step 4 — Escalation Handling Shadow (Day 3–5) — Est. 3 days

1. Shadow Mike on 5 escalation callbacks (listen only)
2. Review transcript before each call, score the AI conversation, then observe the human resolution
3. Handle 3 callbacks with Mike on the line (Human Request / Standard tier only — not P0/P0b)
4. Handle 5 callbacks independently with Mike reviewing after

**Pass Criteria:** Mike signs off: "Ready to handle Human Request and Standard escalations independently."

---

### Step 5 — Weekly QA Review Shadow (First Wednesday) — Est. 1 week

1. Shadow Mike through one full Wednesday QA review
2. Run the following week's QA review independently with Mike reviewing output
3. Mike compares your Run_Weekly_Review to what he would have written — flag deltas

**Pass Criteria:** Mike signs off: "Weekly review output meets standard."

---

## Required Knowledge Before Operating Independently

- [ ] All 6 QA categories and critical failure triggers (memorized, not referenced)
- [ ] All 7 intent buckets and their corresponding script plays
- [ ] Escalation priority ladder and SLAs
- [ ] How to filter GHL by `tourops_work_state`
- [ ] How to complete a GHL task and verify work_state reset
- [ ] What NOT to say on P0/P0b calls (no fault admission, no policy discussion)
- [ ] When to escalate to Todd vs. handle independently
- [ ] Issues_Log entry format — when to log vs. leave in weekly review
- [ ] What OP_Profile.md is and why agent persona lives there (not in Platform prompts)

---

## Tools Used

| Tool | Purpose | Access | Training Resource |
|------|---------|--------|-------------------|
| GHL (GoHighLevel) | Contacts, tasks, escalations, conversation transcripts | Request from Mike | GHL internal docs + shadowing |
| Google Sheets | QA score tracking, performance dashboard | Request from Mike | Ask Mike for template tour |
| Claude AI Command Center | Weekly reviews, quick scoring, test generation | BB Claude project | This project's prompt |
| Quality_Scoring_Rubric.md | Score conversations | Project Knowledge | Read during onboarding Step 2 |
| TourOps_Escalation_Playbook_v2.md | Handle escalations | Project Knowledge | Read during onboarding Step 1 |
| GHL Internal Chat | Communicate with Todd and Mike | Included in GHL access | Intuitive — ask Mike if unclear |

---

## Shadowing Protocol

- **Shadow for:** 1 week (5 business days)
- **Sign-off from:** Mike
- **Competency check:**
  - QA scoring delta ≤ 0.3 across 10 calls
  - 5 escalation callbacks handled independently (Human Request / Standard)
  - 1 weekly review completed independently and approved
  - Can answer all checkpoint questions without referencing docs

---

## What You Should Never Do

- Complete a GHL task before the customer issue is actually resolved
- Handle P0 or P0b without notifying Todd first
- Score a conversation without reading/listening to the full transcript
- Log something in Issues_Log.md on the first occurrence — wait for recurrence
- Tell a customer you'll have someone call them by a specific time (no SLA promises to customers)
- Modify any canonical fields (`tourops_*`) manually outside of GHL task completion — let the system handle it
- Reference an agent by name in customer communications unless the operator's OP_Profile.md has confirmed the agent name for that deployment
