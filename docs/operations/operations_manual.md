# TO_Run_Operations_Manual.md

**Last Updated:** 2026-02-26
**Owner:** Mike
**Primary KPI:** Voice AI Conversation Quality Score ≥ 4.0 average
**SOP Drift Rule:** Any SOP not reviewed in 90 days must be audited before use.
**Ownership Rule:** Every recurring task has a named owner. No shared ownership without a primary.

---

## System Overview

TourOps Voice AI RUN manages the daily and weekly quality operations for the Primary Voice Agent and all operator AI deployments. Primary responsibilities: QA scoring, issue tracking, escalation handling, operator support, and weekly review reporting.

---

## Role Responsibilities

| Role | Responsibilities | Tools Used | Primary Owner |
|------|-----------------|-----------|---------------|
| QA Manager | Weekly review, scoring, Issues_Log, Run_Weekly_Review | GHL, Google Sheets, Claude AI Command Center | Mike |
| QA Support & Communications | **Primary owner of all communications** — grader validation, customer callbacks, escalation handling, and all outbound/inbound communications with operators and customers. Tim's primary function is Barley Bus GM operations; QA Support duties are scoped to available capacity. Tim's bandwidth for grader validation (due 2026-02-28) must be explicitly confirmed with Mike before assuming availability. | GHL, Google Sheets, Quality_Scoring_Rubric | Tim |
| System Owner | Approve prompt changes, P0/P0b escalations, schema decisions | GHL, all files | Todd |

---

## Core SOPs

---

### SOP 1 — Daily Escalation Review

**Trigger:** 9:00 AM every business day
**Last Reviewed:** 2026-02-26 | **Owner:** Mike | **KPI Impacted:** Escalation Rate, Customer Experience

**Steps:**

1. Open GHL → filter contacts by `tourops_work_state = HUMAN_ACTIVE` (authoritative) → Tool: GHL | Check: Any contacts? | Owner: Mike
2. Secondary visual check: `Human handover` tag for UI filtering — visibility aid only, not authoritative → Tool: GHL | Owner: Mike
3. Count open escalations. Identify any past SLA. → Owner: Mike
4. Prioritize by category: Safety (P0) > DayOf > Human Request > Standard → Owner: Mike
5. Handle all overdue items first. Assign to appropriate handler. → Owner: Mike / Tim
6. For P0/P0b: Notify Todd immediately via GHL internal chat → Owner: Mike
7. Log any new patterns (same question 3+ times = KB gap) → Tool: Issues_Log | Owner: Mike

**Definition of Done:** All HUMAN_ACTIVE contacts have an open task assigned. All P0/P0b escalations have been escalated to Todd. No contacts past SLA without a logged reason.

---

### SOP 2 — Weekly QA Review

**Trigger:** Every Wednesday by 12:00 PM
**Last Reviewed:** 2026-02-26 | **Owner:** Mike | **KPI Impacted:** Quality Score

**Steps:**

1. Pull all conversations from prior 7 days → Tool: GHL + Google Sheets | Owner: Mike
2. Pull grader scores from `tourops_last_score` field on reviewed contacts → Tool: GHL | Owner: Mike
3. For any conversation scoring < 3.0 OR flagged as Critical: pull full transcript and manually score using Quality_Scoring_Rubric → Tool: Google Sheets | Owner: Mike
4. Manually spot-check 3 additional random conversations (grader validation) → Owner: Mike / Tim
5. Calculate weekly averages: Overall score, category breakdowns, pass rate, critical failure count → Tool: Google Sheets | Owner: Mike
6. Update Performance_Dashboard.md with weekly metrics → Owner: Mike
7. Identify top 3 friction points. Determine root cause. → Owner: Mike
8. Log any recurring issues (2nd occurrence) to Issues_Log.md → Owner: Mike
9. Complete Run_Weekly_Review.md. Flag escalations to Todd if needed. → Owner: Mike

**Definition of Done:** Run_Weekly_Review.md completed and dated. Performance_Dashboard.md updated. Any 🔴 metrics escalated to Todd via GHL.

---

### SOP 3 — Customer Callback (Escalation Resolution)

**Trigger:** Escalation task assigned to Mike or Tim in GHL
**Last Reviewed:** 2026-02-26 | **Owner:** Tim (primary communications owner) | **KPI Impacted:** Escalation Rate, Customer Experience

**Steps:**

1. Open GHL task. Read full conversation transcript before calling. → Tool: GHL | Owner: Tim / Mike
2. Identify: What did the Primary Voice Agent fail to resolve? What does the customer need? → Owner: Tim / Mike
3. Call customer back. Use appropriate script from Escalation_Playbook. → Tool: GHL phone | Owner: Tim / Mike
4. Resolve issue or route to Todd (P0/P0b). → Owner: Tim / Mike → Todd (if needed)
5. Complete GHL task. → Tool: GHL | Owner: Tim / Mike
6. System auto-resets `tourops_work_state = AI_ACTIVE` upon task completion. Verify reset occurred. → Check: work_state field | Owner: Mike
7. If resolution reveals KB gap or recurring pattern, flag in Issues_Log.md → Owner: Mike

**Definition of Done:** Task completed in GHL. Customer issue resolved or routed. work_state confirmed back to AI_ACTIVE.

---

### SOP 4 — New Operator QA Onboarding

**Trigger:** New operator deployment complete (BUILD confirms 19/19 regression pass)
**Last Reviewed:** 2026-02-26 | **Owner:** Mike | **KPI Impacted:** Quality Score (new operator)

**Steps:**

1. Receive confirmation from BUILD: "Operator [Name] deployed. 19/19 pass." → Tool: GHL internal chat | Owner: Mike
2. Confirm operator OP_Profile.md is on file and Agent_Name is active in deployed prompt → Tool: GHL + project knowledge | Owner: Mike
3. Add operator to weekly QA rotation in Google Sheets → Tool: Google Sheets | Owner: Mike
4. Monitor first 10 live customer conversations manually (grader + manual spot check) → Tool: GHL + Google Sheets | Owner: Mike
5. Report to Todd after conversations 5 and 10: "Operator [Name] QA update — score X.X, issues: [list]" → Tool: GHL internal chat | Owner: Mike
6. Begin standard weekly QA cadence for operator → Owner: Mike

**Definition of Done:** First 10 conversations reviewed. Todd notified. Operator in standard QA rotation. OP_Profile.md confirmed active.

---

### SOP 5 — Prompt Change QA Monitoring

**Trigger:** BUILD deploys prompt change to production
**Last Reviewed:** 2026-02-26 | **Owner:** Mike | **KPI Impacted:** Quality Score

**Steps:**

1. Receive deployment notification from BUILD via GHL internal chat → Owner: Mike
2. Flag new prompt version in Google Sheets tracker (note deployment date + version) → Tool: Google Sheets | Owner: Mike
3. Confirm OP_Profile.md persona still active in new prompt (agent name not hardcoded) → Tool: GHL + project knowledge | Owner: Mike
4. Score first 5 live conversations post-deployment manually, regardless of grader → Tool: Google Sheets | Owner: Mike
5. Compare pre/post scores. Flag any delta > 0.5 drop for immediate review. → Owner: Mike
6. Report to Todd at 24h and 48h post-deploy: "Prompt [version] — [score]. [Issues/None]." → Tool: GHL internal chat | Owner: Mike
7. If score drops below 3.5 within first 3 days → escalate to Todd immediately for rollback decision → Owner: Mike → Todd

**Definition of Done:** 48h report sent to Todd. No rollback required OR rollback executed and confirmed. OP_Profile.md persona confirmed active.

---

## Daily / Weekly / Monthly Tasks

| Task | Owner | Tool | Frequency | Time |
|------|-------|------|-----------|------|
| Daily escalation review | Mike | GHL | Daily 9:00 AM | 15 min |
| Grader score spot check (3 random calls) | Tim | GHL + Sheets | Daily | 20 min |
| Customer callbacks (open tasks) | Tim (primary) / Mike | GHL | As needed | Varies |
| Weekly QA review | Mike | GHL + Sheets | Wednesday by noon | 45 min |
| Performance_Dashboard update | Mike | Sheets | Wednesday | 15 min |
| Run_Weekly_Review completion | Mike | Claude AI CC | Wednesday | 20 min |
| Issues_Log review | Mike | Issues_Log | Wednesday | 10 min |
| Grader validation vs. manual score | Tim | Sheets | Weekly | 30 min |
| OP_Profile.md audit (confirm persona active per operator) | Mike | GHL + project knowledge | Monthly | 15 min |
| Monthly SOP audit (90-day drift check) | Mike | Operations_Manual | Monthly | 30 min |
