# TourOps — Active State

**Rule:** Read this at the start of every session. Update it before you close. One file, one source of truth.
**Last Updated:** 2026-03-03
**Updated By:** Todd Abrams
**Consolidated from:** TourOps_Active_State.md, TO_Governance_Conflicts_Register.md, TO_Run_Issues_Log.md

---

## WHERE WE ARE

**Stage:** Active Build — Hope V6.0 drafted. GHL build work (Conversation AI modules, workflows) in progress directly in BB production.
**Primary Blocker:** None — build in BB, test in BB, then replicate to sandbox. 23/23 regression tests required before V6.0 deploys to production.
**Next Human Decision Required:** Todd sign-off on Hope V6.0 after 23/23 pass.

---

## OPEN LOOPS

| # | What | Who | Due | Status |
|---|------|-----|-----|--------|
| OL-2 | Grader validation — 10 conversations, 3 manually scored, delta ≤ 0.5 | Tim | 2026-02-28 | 🔴 Overdue |
| OL-4 | Version Governance Matrix updated for Schema Contract 3 | Mike | 2026-03-07 | 🟡 Open |
| OL-7 | Airtable + n8n build | Freelancer (Upwork) | 2026-03-14 | 🟡 Pending hire |
| OL-10 | Tim + Mike onboarding emails sent (Claude project setup) | Todd | 2026-03-07 | 🟡 Draft ready — send when Tim has GitHub account |
| OL-11 | Hope V6.0 — 23/23 regression tests | Mike/Tim | After GHL build complete | 🟡 Open — V6.0 drafted 2026-03-03, GHL build in progress in BB |
| OL-12 | V6.0 GHL Build — BB Production | Todd | ASAP | 🟡 In Progress. ✅ 1: Consultation calendar created. ✅ 2: callback_scheduling_link custom value set. ⬜ 3: ConsultationBooked SMS template. ⬜ 4: Book Appointment action on Voice AI. ⬜ 5: V6.0 prompt + personality paste. ⬜ 6: After-call workflow (new outcomes + task creation). ⬜ 7: Grader prompt update. ⬜ 8: Conv AI modules (READY, DISC, RES_CHG, REF_CAN, CORP). ⬜ 9: End-to-end test. |

---

## ACTIVE CONFLICTS

| Conflict | Files | Blocking? | Owner | Due |
|----------|-------|-----------|-------|-----|
| Version Governance Matrix references Contract 2; production is on Contract 3 | Version_Governance_Matrix vs. canonical_schema.md r06 | No | Mike | 2026-03-07 |

**Resolved Conflicts:**
- 2026-02-28: BB overlay files referenced Schema Contract 2 in headers — resolved when Todd confirmed Contract 3 fields already live in BB production. Documentation-only gap.
- 2026-02-28: Duplicate conflicts registers (two versions) — resolved by consolidating into single file.

**Conflict Rules:**
- 🔴 Active/Blocking: Two docs give contradictory instructions affecting production → work stops, Todd resolves immediately
- 🟡 Open/Non-blocking: Docs out of sync but no production harm → resolve within 7 days
- Flag when: two files contradict on same topic, a production change makes a doc inaccurate, schema version changes but companion docs still reference old version

---

## BUILD STATE

**Focus:** Hope V6.0 — GHL build in BB production (Conversation AI modules + workflows)
**Done:** V6.0 prompt drafted. Three-tier escalation model designed. Regression suite updated to 23 tests.
**Blocked on:** Nothing — active build
**Next milestone:** GHL build complete → 23/23 regression tests → Todd sign-off → V6.0 production deploy → replicate to sandbox

---

## GOVERNANCE STATE

Stable. Two items in flight — matrix update (Mike, non-blocking) and infrastructure build (freelancer). No Tier 0/1 conflicts active.

---

## OPERATORS

**Barley Bus**
- Status: Live in production
- Schema: Contract 3 (r06) — confirmed live 2026-02-28
- Grader: Deployed 2026-02-22 — validation in progress
- QA Scores: Provisional until OL-2 closes
- Open Items: None operator-specific beyond grader validation

*(Add new `## Operator: [Name]` sections here as new operators go live)*

---

## DECISIONS LOG

| Decision | Authority | Date |
|----------|-----------|------|
| Hope V6.0 drafted — KB-only URLs, path architecture (A–G), three-tier escalation. Pending 23/23 before deploy. | Todd | 2026-03-03 |
| Build order: BB production first, sandbox second. Not standard dev flow — intentional. | Todd | 2026-03-03 |
| Claude project instructions written for Todd, Mike, Tim. Onboarding emails drafted. | Todd | 2026-03-03 |
| Airtable confirmed as data layer | Todd | 2026-02-28 |
| n8n built as reusable operator template — operator name as variable | Todd | 2026-02-28 |
| Mike focused on GHL-specific work — data infrastructure hired out | Todd | 2026-02-28 |
| Freelancer hired via Upwork for Airtable + n8n QA data flow | Todd | 2026-02-28 |
| BB confirmed as Operator #1 | Todd | 2026-02-28 |
| BB Schema Contract 3 migration confirmed complete in production | Todd | 2026-02-28 |

---

## ISSUES LOG

*Recurring issues only — 2+ occurrences to enter. Single incidents stay in the weekly review entry.*
*An issue cannot be marked Resolved without: (1) documented verified root cause AND (2) confirmed no recurrence for 14 consecutive days.*

### Active Issues

| Date | Issue ID | Description | Category | Severity | Frequency | Root Cause | Fix Attempted | Owner | Status |
|------|----------|-------------|----------|----------|-----------|------------|--------------|-------|--------|
| — | — | No active issues logged | — | — | — | — | — | — | — |

### Resolved Issues

| Date | Issue ID | Description | Category | Fix | Resolved | Notes |
|------|----------|-------------|----------|-----|----------|-------|
| — | — | No resolved issues logged yet | — | — | — | — |

### Issue ID Format
`TOUROPS-[OPERATOR]-[NUMBER]`
Examples: `TOUROPS-BB-001`, `TOUROPS-GLOBAL-001`

### Issue Categories

| Category | Description |
|----------|-------------|
| Context Awareness | Asked for info caller already provided |
| Data Collection | Missed required info before sending link |
| Boundary Enforcement | Failed to handle out-of-scope request correctly |
| KB Usage | Didn't query KB / gave wrong factual answer |
| Conversation Flow | Too long, rambling, awkward pacing |
| Escalation Logic | Didn't escalate when trigger condition was met |
| Field Stamping | Disposition fields missing or incorrect after call |
| Grader | Grader failed to fire or scored inaccurately |
| Persona | Agent name, tone, or intro incorrect or hardcoded — OP_Profile.md mismatch |
| Technical | System error, failed SMS, workflow malfunction |

### Recurring Issue Policy

| Occurrence | Required Action |
|------------|----------------|
| 2nd occurrence (same issue type) | Log in this file. Flag in next weekly review. |
| 3rd occurrence in 30 days | Architecture review. Escalate to Todd + BUILD. |
| Critical issue (any count) | Escalate to Todd same day. |

### Monthly Metrics Targets

| Metric | Target |
|--------|--------|
| Open critical issues | 0 |
| Avg time to resolution (critical) | < 48 hours |
| Avg time to resolution (important) | < 1 week |
| Repeat failure rate | 0 |
| Issues per deployment | Trending down |
| Persona issues (OP_Profile.md mismatches) | 0 |

---

## HOW TO USE THIS FILE

**Session start:** Read this file. Note the current stage, open loops, and active conflicts before doing anything.
**Session end:** Update open loops (close what's done), add new decisions, note any new conflicts.
**New operator goes live:** Add a new `## Operator: [Name]` section.
**Closing a loop:** Remove from Open Loops, note resolution in Decisions Log.

**This file does NOT replace:** Schema contracts, platform rules, prompt files, regression suites. Those stay as standalone files. This file is only for what's actively moving.
