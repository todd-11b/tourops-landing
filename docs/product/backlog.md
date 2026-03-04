# TO_Build_Backlog.md

**Last Updated:** 2026-02-28
**Owner:** Todd Abrams
**KPI Linkage Rule:** Every P1 item must state the KPI it impacts. No KPI = P3 or removed.
**WIP Rule:** No more than 3 active P1 items at once.
**Hygiene Rule:** Items in Planned >90 days without progress → moved to P3 or removed at monthly health check.

---

## Active P1 Count: 0/3

---

## P1 — Critical Priority

| Feature | Problem Solved | KPI Impact | Owner | Status | Target Date |
|---------|---------------|------------|-------|--------|-------------|
| Barley Bus → Schema Contract 3 Migration | BB running legacy prompt (pre-Schema v2). Grader fields, narrative memory, and work_state controls are not aligned with current contract. Creates schema drift risk as new operators onboard on Contract 3. | Voice AI Quality Score (grader can't run accurately on legacy schema) | Todd Abrams | Planned | **2026-03-03** |

---

## P2 — Important

| Feature | Problem Solved | KPI Impact | Owner | Status | Target Date |
|---------|---------------|------------|-------|--------|-------------|
| Automated Regression Harness (Conversation AI API) | Regression tests currently require manual SMS/WebChat interaction. Automation via GHL Conv AI API would cut test time from ~3 hours to ~20 min. | Quality Score (faster iteration = faster fixes) | Mike | Planned | Q3 2026 |
| Founder Cohort Operator #1 Deployment | First non-Barley Bus operator ready for snapshot + prompt compiler pipeline. Validates the multi-operator model end-to-end. Data infrastructure inherited from reusable n8n template (GHL → n8n → Airtable) — per-operator setup under 20 minutes, no new n8n build required. See Architecture_Decision_n8n_Reusability.md and n8n_build_spec.md. | Call-to-Book Rate (operator-level) | Todd Abrams | Planned | Q2 2026 |
| Conversation AI Module Expansion — CORP | Corporate/B2B intent currently routes to escalation. A dedicated CORP module would handle W-9, invoice, and group inquiry flows before human handoff. | Escalation Rate (reduce unnecessary handoffs) | Mike | Planned | Q3 2026 |
| OP_Profile.md for all active operators | BB and any live operators need persona overlay files created and confirmed. Ensures Agent_Name is injected correctly and no persona is hardcoded in Platform prompts. | Deployment Consistency / Operator Onboarding Time | Mike | In Progress | 2026-03-03 |

---

## P3 — Backlog / Future

| Feature | Problem Solved | KPI Impact | Owner | Status | Target Date |
|---------|---------------|------------|-------|--------|-------------|
| Real-time availability check via webhook | Voice AI currently cannot confirm tour availability. Requires external API integration. | Call-to-Book Rate | Todd Abrams | Planned | FLAG NEEDED |
| Operator-level QA dashboard (Sheets → GHL) | QA scores currently tracked in Google Sheets. A GHL-native view would reduce ops friction for Mike. | Quality Score (ops efficiency) | Mike | Planned | Q4 2026 |
| Schema Contract 4 planning | Contract 3 added grader fields. Contract 4 may add multi-location, multi-tour-type, or revenue attribution fields. | TBD | Todd Abrams | Planned | Q4 2026 |
| Voice AI → Conversation AI handoff flow | Caller converts to SMS mid-conversation — currently no warm handoff between channels. | SMS Engagement Rate | Mike | Planned | Q3 2026 |

---

## Completed

| Feature | Completed Date | KPI Impact | Result |
|---------|---------------|------------|--------|
| n8n Reusable Template — GHL → Airtable Data Flow | 2026-02-28 | Deployment Velocity | Per-operator data infrastructure setup reduced to under 20 minutes. Operator name passed as variable — no hardcoding in n8n. See Architecture_Decision_n8n_Reusability.md. |
| Platform name-agnostic refactor (persona → OP_Profile.md) | 2026-02-26 | Deployment Consistency / Operator Onboarding Time | Agent persona removed from all Platform files. OP_Profile.md template created. |
| Schema Contract 3 — QA Grader Fields | 2026-02-22 | Quality Score | tourops_last_score, tourops_last_review_date, tourops_issue_count added |
| Narrative Memory Fields (voiceai_summary, conversationai_summary) | 2026-02-17 | Quality Score / Context Awareness | Cross-channel memory enabled |
| GHL Auto-Summaries Integration | 2026-02-17 | Context Awareness | Conversation AI session summaries to contact notes |
| VAI Grader Workflow v1.0 | 2026-02-22 | Quality Score | Automated per-call scoring deployed |
| CAI Grader Workflow v1.0 | 2026-02-22 | Quality Score | Automated per-session scoring deployed |
| Voice Master Snapshot v1.2 | 2026-02-17 | Deployment Speed | Authoritative build guide supersedes v1.1 |
| Prompt Compiler v1.1 | 2026-02-17 | Deployment Consistency | Operator-specific prompt generation standardized |
| Voice AI Regression Test Suite v1.0 | 2026-02-14 | Quality Score | 19 RACE-format tests, 19/19 required to deploy |
| Canonical Schema Contract 2 | 2026-02-14 | All KPIs | work_state as authoritative control, lifecycle-aware model |

---

## FLAGS NEEDED (Blocked — Todd Must Confirm)

| Item | What's Needed | Flagged |
|------|--------------|---------|
| Real-time availability API | Which booking system? What endpoint? Rate limits? | 2026-02-24 |
| Schema Contract 4 scope | What business problem does it solve? What KPI? | 2026-02-24 |
