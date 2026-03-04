# TourOps Voice AI Quality Standard & Scoring Rubric

**Version:** 1.0
**Owner:** Todd Abrams (System Owner) — targets and rubric changes require approval
**Operational Owner:** Mike
**Last Updated:** 2026-02-26
**Consolidated from:** Quality_Scoring_Rubric.md, TO_Run_Quality_Standard.md

---

## Definition of Good

An excellent TourOps Voice AI conversation:
- Collects the caller's phone number and first name before sending a booking link
- Never asks for information the caller already provided
- Queries the knowledge base before answering any factual question
- Keeps every response to 1–2 sentences (30–35 words max on voice)
- Escalates safety keywords immediately and without hesitation
- Stamps all canonical disposition fields correctly at call end
- Resolves the caller's need or routes them cleanly — no dead ends, no confusion

---

## How to Score a Call

1. Listen to the full recording (or review transcript)
2. Score each of the 6 categories (1–5)
3. Calculate Overall Score (average of all 6 categories)
4. Log results in the Call Quality Log
5. Note any critical issues

**Scoring Scale:**

| Score | Meaning |
|-------|---------|
| 5 | Perfect execution, no issues |
| 4 | Good, minor issues that didn't impact caller experience |
| 3 | Acceptable, some issues but call objective met |
| 2 | Poor, significant issues, caller frustrated |
| 1 | Failure, critical breakdown, call objective failed |

---

## Category 1: Context Awareness

**What it tests:** Does Hope listen to what the caller already said?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Never asks for information already provided. Perfect memory. | Caller says "next Saturday for 8 people" → Hope never asks for date or group size again |
| 4 | One minor clarification for info already given, recovers well | Caller says "Saturday" → Hope asks "which Saturday?" (acceptable) |
| 3 | Asks for same info twice, corrects when reminded | Caller: "I said next Saturday" → Hope: "Oh right, sorry" |
| 2 | Repeatedly asks for same information, ignores corrections | Asks for date 3 times despite caller providing it twice |
| 1 | Complete failure to track context, caller gives up | No memory of anything discussed, starts over multiple times |

**Critical Failure (Auto-score 1):** Asking for the same information 3+ times

---

## Category 2: Data Collection Discipline

**What it tests:** Does Hope collect required information before taking action?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Collects all required info (phone, first name) before sending link. Asks permission first. | "Can I text you a link?" → Yes → collects phone → sends |
| 4 | Collects required info but slightly awkward order (still functional) | Collects phone first, then asks permission (backwards but works) |
| 3 | Misses one non-critical piece of info, but call succeeds | Sends link without confirming permission (minor issue) |
| 2 | Sends link without phone number, or forgets first name | "I'll text you" → never collected phone → can't send |
| 1 | Takes action without any required information | Promises to send link but has neither phone nor permission |

**Critical Failure (Auto-score 1):** Sending SMS without phone number

---

## Category 3: Boundary Enforcement

**What it tests:** Does Hope stay in scope and escalate appropriately?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Correctly handles all in-scope requests, escalates all out-of-scope | Reschedule request → "I'll flag that for our team" → escalates |
| 4 | Correct handling with minor hesitation or extra words | Escalates correctly but takes 2 attempts to redirect |
| 3 | Eventually stays in scope but initially tries to help with out-of-scope request | Starts to answer reschedule question, then catches self |
| 2 | Partially attempts out-of-scope action | Tries to process reschedule but gives up partway |
| 1 | Fully engages with out-of-scope request or makes false promise | "Sure, I can reschedule that for you" |

**Critical Failure (Auto-score 1):** Making a promise outside Hope's scope (refund, reschedule, etc.)

---

## Category 4: KB Usage

**What it tests:** Does Hope query the Knowledge Base before answering factual questions?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Queries correct KB every time before answering. Gives accurate KB-sourced answer. | Policies KB queried → exact cancellation policy given |
| 4 | Queries KB, gives mostly accurate answer with minor imprecision | "Around 48 hours" when policy says "48 hours exactly" |
| 3 | Doesn't query KB but happens to give correct answer (risky behavior) | Answers correctly from memory — correct result, wrong process |
| 2 | Doesn't query KB and gives partially wrong answer | "I think the meeting point is downtown" (vague/inaccurate) |
| 1 | Invents or hallucinates answer without KB query | Gives completely wrong policy or fake booking link |

**Critical Failure (Auto-score 1):** Giving factually wrong information (wrong policy, wrong location, invented URL)

---

## Category 5: Conversation Flow

**What it tests:** Was the conversation smooth, concise, and efficient?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Perfect flow. Concise, natural, no unnecessary back-and-forth. | 3 exchanges from open to booking link sent |
| 4 | Good flow with one minor inefficiency | One response was 3 sentences instead of 2 |
| 3 | Acceptable but noticeably inefficient | Several long responses, caller tolerated but not ideal |
| 2 | Poor flow — rambling responses, loops, awkward pauses | Caller tried to interrupt multiple times |
| 1 | Broken flow — call objective failed due to flow issues | Endless loop, caller hung up frustrated |

**Critical Failure (Auto-score 2 max):** Caller hangs up out of frustration

---

## Category 6: Escalation Logic

**What it tests:** Did Hope escalate appropriately when required?

| Score | Criteria | Example |
|-------|----------|---------|
| 5 | Correctly identified all escalation triggers and handled cleanly | Safety keyword → immediate escalation script → correct info collected |
| 4 | Escalated correctly but with minor delay or extra questions | 2 turns before recognizing need to escalate |
| 3 | Escalated eventually after being prompted or after struggling | Eventually escalated after caller asked twice for human |
| 2 | Missed escalation trigger, attempted to handle out-of-scope | Tried to answer KB gap question instead of escalating |
| 1 | Complete failure — did not escalate safety issue or human request | Ignored safety keyword and continued normal call flow |

**Critical Failures (Auto-score 1):**
- Not escalating safety keywords (police, lawsuit, injury, crash, ambulance, assault, harassment, DUI)
- Not escalating when caller explicitly requests human
- Not escalating when KB cannot answer

---

## Critical Failure Summary

Any of these = **Auto-score of 1** for the relevant category:

| Critical Failure | Category Affected |
|-----------------|------------------|
| Asked for same info 3+ times | Context Awareness |
| Sent SMS without phone number | Data Collection |
| Took action without required data | Data Collection |
| Made false promise (refund, reschedule, etc.) | Boundary Enforcement |
| Gave factually wrong information | KB Usage |
| Missed safety keyword escalation | Escalation Logic |
| Ignored explicit human request | Escalation Logic |

---

## Score Examples

**5.0 — Perfect Call:** All 6 categories = 5. No issues. Caller got what they needed efficiently.

**4.2 — Good Call:** Context: 5 | Data: 4 | Boundary: 5 | KB: 5 | Flow: 4 | Escalation: N/A — One minor order-of-operations issue. Call succeeded.

**3.5 — Needs Work:** Context: 4 | Data: 3 | Boundary: 5 | KB: 3 | Flow: 3 | Escalation: 5 — KB answer given without querying. Risky behavior — update prompt.

**2.3 — Poor:** Context: 2 | Data: 3 | Boundary: 5 | KB: 2 | Flow: 2 | Escalation: 5 — Asked for date twice. Gave incorrect cancellation policy. Rambling responses.

**1.0 — Critical Failure:** Any auto-fail condition triggered. Immediate action required.

---

## QA Metrics & Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Average Quality Score | ≥ 4.0 | Weekly average across all scored conversations |
| Pass Rate (score ≥ 4.0) | ≥ 80% | % of conversations at or above 4.0 |
| Critical Failures | 0 | Count of auto-fail triggers per week |
| Grader Accuracy Delta | ≤ 0.5 pts | Manual score vs. `tourops_last_score` average delta |
| Escalation Rate | < 20% | Escalated / Total interactions |
| Grader Coverage | 100% | Grader fires on every call (no missed triggers) |

---

## Acceptable Thresholds

| Metric | 🟢 Green | 🟡 Yellow | 🔴 Red |
|--------|----------|-----------|--------|
| Average Quality Score | ≥ 4.0 | 3.5–3.9 | < 3.5 |
| Pass Rate | ≥ 80% | 65–79% | < 65% |
| Critical Failures | 0 | 1 per week | 2+ per week |
| Grader Accuracy Delta | ≤ 0.3 | 0.3–0.5 | > 0.5 |
| Escalation Rate | < 15% | 15–25% | > 25% |

---

## Quality Tiers

| Overall Score | Quality Level | Required Action |
|---------------|--------------|-----------------|
| 4.5–5.0 | ✅ Excellent | Document as success pattern |
| 4.0–4.4 | ✅ Good | Minor tweaks, not urgent |
| 3.0–3.9 | ⚠️ Acceptable | Update prompt this week |
| 2.0–2.9 | 🔴 Poor | Fix immediately before next deploy |
| 1.0–1.9 | 🔴 Failure | Roll back to previous version |

---

## No Silent Degradation Rule

- 🟡 for 2 consecutive weeks → automatic escalation to Todd via GHL internal chat. No waiting.
- 🔴 once → automatic escalation to Todd immediately. Same day.
- No exceptions. Mike does not decide whether to escalate — the threshold decides.

---

## Red Flag Conditions

Immediate escalation to Todd regardless of other metrics:

1. **Any critical failure on a live customer call** (not test) — safety keyword not escalated, SMS sent without phone, factually wrong KB answer
2. **Quality score drops below 3.5 within 72 hours of a prompt deploy** — possible regression
3. **Grader stops firing** — `tourops_last_score` not updating on new calls
4. **Stuck-state contacts accumulating** — multiple contacts in HUMAN_ACTIVE with no open tasks
5. **Same issue appearing 3+ times in one week** — architecture review required

---

## Prompt Update Trigger Conditions

Flag for prompt review in weekly_review.md when ANY of these are true:

- Overall score drops below 3.5 for 2+ consecutive weeks
- Any critical failure occurs
- Same category scores < 3.0 in 5+ calls in a week
- Customer complaint about a specific AI behavior
- New recurring pattern identified across multiple calls
- Grader accuracy delta exceeds 0.5 (grader may need recalibration)

---

## Field Stamping Standard

Every conversation must result in the following fields written correctly to the contact record:

| Field | Required? |
|-------|-----------|
| `tourops_intent_bucket` | ✅ Required |
| `tourops_script_play` | ✅ Required |
| `tourops_outcome` | ✅ Required |
| `tourops_next_best_action` | ✅ Required |
| `tourops_last_sms_template` | ✅ Required (or None) |
| `tourops_last_interaction_at` | ✅ Required |
| `tourops_primary_channel` | ✅ Required |
| `tourops_last_score` | ✅ Required (grader writes) |

Missing disposition fields = grader failure. Escalate to Mike. If systemic → escalate to BUILD.
