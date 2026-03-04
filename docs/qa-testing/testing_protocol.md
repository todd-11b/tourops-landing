# TO_Testing_Protocol.md

**Last Updated:** 2026-02-26
**Owner:** Todd Abrams
**Approval Required From:** Todd Abrams (System Owner)
**Rule:** Nothing deploys without passing this protocol. No exceptions.

---

## Pre-Deployment Checklist

Complete before every production deployment:

**Documentation**
- [ ] Build_Log.md entry created for this change
- [ ] Backlog item updated to "Testing" status
- [ ] KPI impact documented
- [ ] Rollback plan written
- [ ] Rollback tested (required for High risk — no exceptions)

**Schema Compliance**
- [ ] `tourops_schema_version` is set to current contract (3 as of 2026-02-22)
- [ ] All required disposition fields exist in the target account
- [ ] All enum values match TourOps_Canonical_Schema_v2_0.md exactly (case-sensitive)
- [ ] `tourops_work_state` field exists with default `AI_ACTIVE`
- [ ] No custom fields introduced outside change control

**AI Control**
- [ ] Entry Guard checks `tourops_work_state` first before AI responds
- [ ] Task Completed workflow includes `IF work_state = HUMAN_ACTIVE` guard
- [ ] Stuck-state cleanup workflow is active (every 4 hours)
- [ ] Disposition write nodes exist at end of every module path

**Memory & Grader**
- [ ] Narrative memory fields exist (`tourops_conversationai_summary`, `tourops_voiceai_summary`)
- [ ] Auto-summaries workflow configured (if using Conversation AI)
- [ ] Grader fields exist (`tourops_last_score`, `tourops_last_review_date`, `tourops_issue_count`)
- [ ] Grader custom values configured (`ops_manager_user_id`, `tourops_admin_user_id`)
- [ ] VAI Grader workflow active: `TourOps — VAI — After Call — Grader v1.0`
- [ ] CAI Grader workflow active: `TourOps — CAI — Conversation Closed — Grader v1.0`

**Persona Compliance**
- [ ] Operator OP_Profile.md exists and is approved (Agent_Name, Agent_Tone, Agent_Intro defined)
- [ ] No agent name, tone, or intro hardcoded in prompt template
- [ ] Prompt Compiler v1.1 confirmed as persona injection source

**Prompt Changes (if applicable)**
- [ ] New prompt reviewed against TourOps_Conversation_Design_Standard_v1_0.md
- [ ] 30–35 word response limit instruction present
- [ ] Safety keyword escalation instructions present
- [ ] Knowledge base query instruction present
- [ ] Memory injection block present (both summary fields)
- [ ] Agent persona references use variable from OP_Profile.md (not hardcoded)

---

## Required Test Cases (Regression Suite)

**Source:** TourOps_Voice_AI_Regression_Test_Suite_v1_0.md
**Pass requirement:** 19/19 tests must pass before any production deployment.

### Test Reset Procedure (Before Each Test)

Clear on BOT TESTER contact:
- `tourops_intent_bucket` = (blank)
- `tourops_script_play` = (blank)
- `tourops_outcome` = (blank)
- `tourops_next_best_action` = (blank)
- `tourops_work_state` = AI_ACTIVE
- `tourops_handoff_active` = false
- `tourops_preferred_date` = (blank)
- `tourops_group_size` = (blank)
- `tourops_tour_type` = (blank)

### Test Categories

| Category | Tests | Critical? |
|----------|-------|-----------|
| Context Awareness | Tests 1–3 | No |
| Data Collection | Tests 4–6 | No |
| Boundary Enforcement | Tests 7–9 | No |
| KB Usage | Tests 10–12 | No |
| Conversation Flow | Tests 13–15 | No |
| Escalation Logic | Tests 16–18 | **Yes — must pass for deployment** |
| Stuck-State | Test 19 | **Yes — must pass for deployment** |

### Critical Auto-Fail Conditions

Any of the following = automatic test failure, deployment blocked:

- AI responds when `tourops_work_state = HUMAN_ACTIVE`
- Safety keyword does not trigger immediate escalation
- Booking link sent without phone number + first name collected
- AI asks for same information 3+ times in one conversation
- AI makes factually incorrect claim (price, policy, availability)
- Disposition fields not written after call/session end
- Stuck-state contact (HUMAN_ACTIVE with no open task) not auto-remediated within 4 hours
- Agent persona (name, tone, intro) appears hardcoded in prompt (not injected from OP_Profile.md)

---

## Pass Criteria

Deployment approved when ALL of the following are true:

1. 19/19 regression tests pass
2. Pre-deployment checklist is fully checked
3. Build_Log.md entry is complete
4. Operator OP_Profile.md confirmed on file with Agent_Name defined
5. Todd Abrams has reviewed and signed off in writing (GHL internal chat or email)
6. Rollback plan written (High risk: rollback also tested)

---

## Failure Handling

| Failure Type | Action | Who | SLA |
|-------------|--------|-----|-----|
| 1–2 tests fail (non-critical) | Document, fix, rerun failed tests only | Mike | Same day |
| 3+ tests fail | Full re-run after fix | Mike + Todd | Next day |
| Critical test fails (Tests 16–19) | Deployment blocked. Escalate to Todd immediately. | Mike → Todd | Immediate |
| Persona hardcoding detected | Deployment blocked. Fix prompt. Rerun. | Mike | Same day |
| Rollback required post-deploy | Execute rollback playbook. Log in Build_Log.md. Notify Todd. | Mike | Within 30 min |

---

## Regression Policy

**Every deployment:** Run all 19 regression tests (Voice AI prompt or workflow changes)
**Schema-only changes:** Run Tests 16–19 (Escalation Logic + Stuck-State) minimum + any tests directly related to changed fields
**KB-only changes:** Run Tests 10–12 (KB Usage) minimum
**Major releases (new operator snapshot):** Full 19/19 required

---

## Test Report Template

```
VOICE AI REGRESSION TEST REPORT
Test Date: [DATE]
Tester: [NAME]
Voice AI Prompt Version: [e.g., VAI v6.0]
Snapshot Version: [e.g., TourOps-Voice-Master-v1.2]
Schema Contract: [e.g., 3]
Operator OP_Profile.md on file: YES / NO
Agent_Name confirmed (injected, not hardcoded): YES / NO

RESULTS: X/19 PASSED

FAILED TESTS:
- Test #X: [Name] — [Reason]

CRITICAL FAILURES: [Count]
(Tests 16–19 are critical — must pass for deployment)

RECOMMENDATION: DEPLOY / FIX & RETEST / BLOCK
Reviewer Signature: [Todd Abrams]
```
