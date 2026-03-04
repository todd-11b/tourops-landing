# TO_Governance_Conflicts_Register.md

**Tier:** Tier 1 — No version in filename. Version in header only.
**Version:** v1.2
**Last Updated:** 2026-02-28
**Owner:** Todd Abrams
**Reviewed:** Weekly (Fridays)
**Escalation Rule:** Conflict past 7 days → Todd immediately. Tier 0/1 conflict → work stops until resolved.

---

## Active Conflicts

| Date | Conflict | Files Involved | Tier | Owner | Resolution Plan | Due Date | Status |
|------|----------|---------------|------|-------|----------------|----------|--------|
| 2026-02-24 | **Version Governance Matrix out of sync with production.** TourOps_Version_Governance_Matrix_v1_0.md references Schema Contract 2 as current release. Production is on Schema Contract 3 (r06, 2026-02-22). Matrix does not reflect Contract 3 components. | TourOps_Version_Governance_Matrix_v1_0.md vs. TourOps_Canonical_Schema_v2_0.md (r06) | Tier 2 | Mike | Update matrix to add Contract 3 row with correct component versions. Re-upload. Todd reviews. | 2026-03-07 | 🟡 Open — non-blocking |

---

## Resolved Conflicts

| Date | Conflict | Resolution | Resolved Date |
|------|----------|-----------|---------------|
| 2026-02-24 | **BB overlay files (BB_Current_State.md, BB_AI_System.md) referenced Schema Contract 2 in headers.** Files stated "Schema Contract 2 is the baseline — no migration required" which contradicted production state. | [SYSTEM_OWNER] confirmed 2026-02-28 that Schema Contract 3 fields are already live in BB production. BB_Current_State.md and BB_AI_System.md headers corrected to Contract 3 (r06). No migration required — was already done. Documentation was the only gap. | 2026-02-28 |
| 2026-02-28 | **Duplicate Conflicts Register.** Two versions present: to_gov_conflicts.md (v1.1, 2026-02-26) and gov_conflicts.md (v1.2, 2026-02-28). v1.1 showed BB schema drift as 🔴 Active — contradicting confirmed production state. | v1.1 file archived (renamed ARCHIVE_CANDIDATE_to_gov_conflicts_v1_1.md). v1.2 confirmed as canonical. Filename standardized to to_gov_conflicts.md. | 2026-02-28 |

---

## Conflict Severity Guide

| Severity | Definition | Action |
|----------|-----------|--------|
| 🔴 **Active / Blocking** | Two docs give contradictory instructions that affect production behavior right now | Work on affected area stops. Todd resolves immediately. |
| 🟡 **Open / Non-Blocking** | Docs are out of sync but not causing immediate production harm | Resolve within 7 days. Monitor for escalation. |
| 🟢 **Acknowledged / Planned** | Conflict known, resolution scheduled, not urgent | Track. Ensure resolution date holds. |

---

## Conflict Detection Triggers

Flag a conflict when:
- Two files give contradictory instructions on the same topic
- A production change makes an existing doc inaccurate
- A schema version changes but companion docs still reference old version
- A file is created that overlaps an existing file's scope
- An operator deviates from canonical schema in a way that contradicts documented behavior

---

## Current Risk Assessment

**Highest risk conflict:** Version Governance Matrix out of sync with Schema Contract 3. Non-blocking but due 2026-03-07. Mike owns.

**BB schema drift:** RESOLVED 2026-02-28.

**Duplicate Conflicts Register:** RESOLVED 2026-02-28.
