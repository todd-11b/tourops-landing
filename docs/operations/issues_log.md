# TO_Run_Issues_Log.md

**Last Updated:** 2026-02-26
**Owner:** Mike
**Rule:** Recurring issues only — 2+ occurrences to enter. Single incidents stay in Run_Weekly_Review.md.
**Root Cause Confirmation Rule:** An issue cannot be marked Resolved without: (1) documented verified root cause AND (2) confirmed no recurrence for 14 consecutive days.

---

## Issue Categories

| Category | Description |
|----------|-------------|
| **Context Awareness** | Asked for info caller already provided |
| **Data Collection** | Missed required info before sending link |
| **Boundary Enforcement** | Failed to handle out-of-scope request correctly |
| **KB Usage** | Didn't query KB / gave wrong factual answer |
| **Conversation Flow** | Too long, rambling, awkward pacing |
| **Escalation Logic** | Didn't escalate when trigger condition was met |
| **Field Stamping** | Disposition fields missing or incorrect after call |
| **Grader** | Grader failed to fire or scored inaccurately |
| **Persona** | Agent name, tone, or intro incorrect, missing, or hardcoded — OP_Profile.md mismatch |
| **Technical** | System error, failed SMS, workflow malfunction |

---

## Severity Levels

| Level | Definition |
|-------|-----------|
| 🔴 CRITICAL | Could cause customer no-show, complaint, safety issue, or brand damage |
| 🟡 IMPORTANT | Degrades experience but recoverable |
| 🟢 MINOR | Cosmetic or polish issues |

---

## Active Issues

| Date ID'd | Issue ID | Description | Category | Severity | Frequency | Root Cause | Fix Attempted | Fix Version | Owner | Status |
|-----------|----------|-------------|----------|----------|-----------|------------|--------------|-------------|-------|--------|
| — | — | No active issues logged | — | — | — | — | — | — | — | — |

---

## Resolved Issues

| Date ID'd | Issue ID | Description | Category | Severity | Frequency | Root Cause | Fix | Version | Owner | Resolved Date | Notes |
|-----------|----------|-------------|----------|----------|-----------|------------|-----|---------|-------|--------------|-------|
| — | — | No resolved issues logged yet | — | — | — | — | — | — | — | — | — |

---

## Issue ID Format

`TOUROPS-[OPERATOR]-[NUMBER]`

Examples:
- `TOUROPS-BB-001` — Barley Bus, first logged issue
- `TOUROPS-OP1-001` — Operator 1, first logged issue
- `TOUROPS-GLOBAL-001` — Platform-wide issue not operator-specific

---

## Recurring Issue Policy

| Occurrence Count | Required Action |
|-----------------|----------------|
| 2nd occurrence (same issue type) | Log in this file. Flag in next Run_Weekly_Review. |
| 3rd occurrence in 30 days | Architecture review required. Escalate to Todd + BUILD. |
| Critical issue (any count) | Escalate to Todd same day. |

---

## Resolution Criteria

An issue is **Resolved** only when ALL three are true:

1. ✅ Root cause documented and verified (not assumed)
2. ✅ Fix deployed and confirmed working via test
3. ✅ No recurrence confirmed for 14 consecutive days

If the issue reappears after Resolved status, it is reopened and the count resets.

---

## Monthly Metrics

Track these at the end of each month:

| Metric | Target |
|--------|--------|
| Open critical issues | 0 |
| Avg time to resolution (critical) | < 48 hours |
| Avg time to resolution (important) | < 1 week |
| Repeat failure rate (issues reopened) | 0 |
| Issues per deployment | Trending down |
| Persona issues (OP_Profile.md mismatches) | 0 |
