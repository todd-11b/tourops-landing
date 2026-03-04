# TO_Run_Weekly_Review.md

**Purpose:** Weekly operational summary. Completed every Wednesday by noon. Feeds recommendations to TO_Lead.
**Owner:** Mike
**WIP Rule:** No more than 3 active operational improvement initiatives at once. If a 4th is added, one must be paused or killed.

---

## TEMPLATE — Copy for each week. Append below previous entry.

---

## Week of [DATE]

**Completed by:** Mike | **Time:** [When completed]

---

### KPI Summary

| Metric | This Week | Last Week | Target | Status |
|--------|-----------|-----------|--------|--------|
| Avg Quality Score | — | — | ≥ 4.0 | 🟢🟡🔴 |
| Pass Rate (≥ 4.0) | — | — | ≥ 80% | 🟢🟡🔴 |
| Critical Failures | — | — | 0 | 🟢🟡🔴 |
| Escalation Rate | — | — | < 20% | 🟢🟡🔴 |
| Grader Coverage | — | — | 100% | 🟢🟡🔴 |

**Overall Status:** 🟢 On track / 🟡 Watch / 🔴 Escalate to Todd now

**Leading indicator 🟡 count this week:** [X] — Pre-escalation review required if 2+

---

### Escalation Required?

**YES / NO** — If YES: [What issue, to whom, sent when]

---

### Top 3 Friction Points

1. [Friction point] — KPI affected: [KPI] — Recommendation: [action]
2. [Friction point] — KPI affected: [KPI] — Recommendation: [action]
3. [Friction point] — KPI affected: [KPI] — Recommendation: [action]

---

### Active Improvement Initiatives

| Initiative | Owner | Status | Due |
|-----------|-------|--------|-----|
| 1. [initiative] | [owner] | [status] | [date] |
| 2. | | | |
| 3. | | | |

**Active count: [X]/3**

---

### What We Stopped Doing This Week

[Operational bloat pruned — or "None"]

- Stopped: [X] — Reason: [why]

---

### Escalations This Week

| Issue | Escalated To | Resolution | Status |
|-------|-------------|------------|--------|
| [issue] | [name] | [resolution] | Open/Closed |

---

### New Issues for Issues_Log.md

[List any issue appearing for 2nd time this week — or "None"]

If none: "No recurring issues identified this week."

---

### Grader Validation Note

**Grader accuracy check this week:** Tim manually scored [X] conversations. Average delta vs. grader: [X.X] pts. Status: 🟢🟡🔴

[Flag if delta > 0.5 — possible grader recalibration needed]

---

### Persona Compliance Note

**OP_Profile.md check this week:** Confirmed Agent_Name active and injected correctly for [X] operator(s). Any hardcoding detected: YES / NO.

[Flag immediately to BUILD if hardcoding detected in any live prompt]

---

### Capacity Declaration

- Available capacity next week: [%]
- Current utilization: [%]
- Constraint: Yes/No — [if yes, describe]
- Escalate to Todd if utilization > 85% for 2 consecutive weeks

---

### Recommendations to TO_Lead

1. [Recommendation] — KPI impact: [impact] — Urgency: High/Med/Low
2. [Recommendation] — KPI impact: [impact] — Urgency: High/Med/Low

---

---

## First Entry Placeholder

## Week of 2026-02-24

**Completed by:** Mike | **Time:** [Pending — first live review after grader deploy]

**Note:** This is the first week of grader-assisted QA. Grader deployed 2026-02-22. Scores from this week will establish the baseline. Tim is validating grader accuracy against manual scores — results due 2026-02-28.

**Overall Status:** 🟡 Watch — Grader in validation, no confirmed baseline yet.

**Escalation Required?** NO — Monitoring.

**Grader Validation Note:** Tim performing first accuracy validation. Delta unknown until 2026-02-28 report.

**Persona Compliance Note:** Platform name-agnostic refactor completed 2026-02-26. BB OP_Profile.md pending (due 2026-03-03). No live operators on new system yet — no hardcoding check required this week.

**Recommendations to TO_Lead:**
1. Hold off on scoring targets until grader validation complete — Urgency: High
2. Confirm BB OP_Profile.md creation is on track (due 2026-03-03) — Urgency: Med
