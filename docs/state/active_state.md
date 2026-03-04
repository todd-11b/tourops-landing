# TourOps_Active_State.md

**Replaces:** TO_Build_Current_State.md, TO_Gov_Current_State.md, BB_Current_State.md  
**Rule:** Upload this at the start of every session. Update it before you close. One file, one source of truth.  
**Last Updated:** 2026-02-28  
**Updated By:** Todd Abrams [SYSTEM_OWNER]

---

## WHERE WE ARE (Read First)

**Stage:** Testing — Grader v1.0 deployed 2026-02-22. Validation window in progress.  
**Primary Blocker:** Tim's grader validation report is overdue. Nothing downstream can be trusted until it's in.  
**Next Human Decision Required:** Todd go/no-go after Tim delivers report.

---

## OPEN LOOPS (The Only List That Matters)

| # | What | Who | Due | Status |
|---|------|-----|-----|--------|
| OL-2 | Grader validation — 10 conversations, 3 manually scored, delta ≤ 0.5 | Tim | 2026-02-28 | 🔴 Overdue |
| OL-4 | Version Governance Matrix updated for Schema Contract 3 | Mike | 2026-03-07 | 🟡 Open |
| OL-7 | Airtable + n8n build | Freelancer (Upwork) | 2026-03-14 | 🟡 Pending hire |
| OL-8 | Claude project instructions updated (new system prompt) | Todd | 2026-03-01 | 🟡 Pending |
| OL-9 | New project knowledge files added | Todd | 2026-03-01 | 🟡 Pending |
| OL-10 | Tim added to Claude project | Todd | 2026-03-01 | 🟡 Confirm before sending README |

---

## ACTIVE CONFLICTS

| Conflict | Files | Blocking? | Owner | Due |
|----------|-------|-----------|-------|-----|
| Version Governance Matrix references Contract 2, production is on Contract 3 | Version_Governance_Matrix vs. Schema_v2_0 r06 | No | Mike | 2026-03-07 |

---

## BUILD STATE

**Focus:** Grader v1.0 validation (VAI + CAI)  
**Done:** Schema Contract 3 live in BB production. BB overlay files corrected.  
**Blocked on:** Tim's validation report (OL-2)  
**Next build action after unblock:** Airtable + n8n infrastructure (freelancer)

---

## GOVERNANCE STATE

**Stable.** Two items in flight — matrix update (Mike, non-blocking) and infrastructure build (freelancer).  
No Tier 0/1 conflicts active.

---

## OPERATOR: BARLEY BUS (BB)

**Status:** Live in production  
**Schema:** Contract 3 (r06) — confirmed live 2026-02-28  
**Grader:** Deployed 2026-02-22 — validation in progress  
**QA Scores:** Provisional until OL-2 closes  
**Open Items:** None operator-specific beyond grader validation

---

## DECISIONS LOG (This Session)

| Decision | Authority | Date |
|----------|-----------|------|
| Airtable confirmed as data layer | [SYSTEM_OWNER] | 2026-02-28 |
| n8n built as reusable operator template — operator name as variable | [SYSTEM_OWNER] | 2026-02-28 |
| Mike focused on GHL-specific work — data infrastructure hired out | [SYSTEM_OWNER] | 2026-02-28 |
| Freelancer hired via Upwork for Airtable + n8n QA data flow | [SYSTEM_OWNER] | 2026-02-28 |
| BB confirmed as Operator #1 | [SYSTEM_OWNER] | 2026-02-28 |
| BB Schema Contract 3 migration confirmed complete in production | [SYSTEM_OWNER] | 2026-02-28 |

---

## HOW TO USE THIS FILE

**Session start:** Upload this file. I read it. We work.  
**Session end:** Tell me what changed. I update the artifact. You copy it, save it, replace the old one.  
**Adding a new operator:** Add a new `## OPERATOR: [NAME]` section.  
**Closing a loop:** Move it out of Open Loops, note resolution in Decisions Log.

---

## WHAT THIS FILE DOES NOT REPLACE

Schema contracts, platform rules, prompt files, regression suites — those stay as standalone files in project knowledge. They don't change often. This file is only for what's actively moving.
