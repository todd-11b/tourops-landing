# TourOps — Voice AI Regression Test Suite v1.0

**Doc Revision:** r02 (2026-02-14)
**Status:** APPROVED
**Owner:** Todd Abrams (System Owner)
**Purpose:** 19 phone call test scripts to validate Voice AI behavior
**Test Format:** RACE (Role, Action, Context, Edge behavior)
**Deployment Requirement:** 19/19 tests passed before production deployment

---

## Test Categories

| Category | Tests | Focus |
|----------|-------|-------|
| Context Awareness | 1–3 | Does Hope remember what was said? |
| Data Collection | 4–6 | Does Hope get required info before sending SMS? |
| Boundary Enforcement | 7–9 | Does Hope stay in scope? |
| KB Usage | 10–12 | Does Hope query KB before answering? |
| Conversation Flow | 13–15 | Does Hope stay concise and avoid loops? |
| Escalation Logic | 16–18 | Does Hope escalate correctly? |
| System/State | 19 | Stuck-state cleanup (CRITICAL) |

---

## How to Run These Tests

**Setup:**
1. Use BOT TESTER contact (tagged `BOT_TEST`, `QA_TEST_CONTACT`)
2. Call from controlled test phone number
3. Record all calls for review
4. Reset contact fields before each test (see Reset Procedure)

**Reset Procedure (Before Each Test):**
- `tourops_intent_bucket` = blank
- `tourops_script_play` = blank
- `tourops_outcome` = blank
- `tourops_next_best_action` = blank
- `tourops_work_state` = AI_ACTIVE
- `tourops_preferred_date` = blank
- `tourops_group_size` = blank
- `tourops_tour_type` = blank

---

# CATEGORY 1: CONTEXT AWARENESS (Tests 1–3)

---

## TEST 1: CONTEXT-01 — No Date Repetition

**Rule Being Tested:**
"Listen to what caller says FIRST. Never ask for information they already provided."

**Success Criteria:**
Hope does NOT ask for the tour date after caller provides it in opening statement.

**Caller Profile:**
- Name: Maria Gonzalez
- Personality: Friendly, chatty, detail-oriented
- Style: Provides full context upfront

**Scenario:**
- Goal: Book a drink tour for next Saturday
- Hidden Info: Has a party of 6, already said "next Saturday"
- Edge Behavior: Will note if Hope asks for info already given

**Opening Line:**
"Hi, I'd like to book a drink tour for next Saturday for my friend's birthday."

**Resistance Pattern:**
- If Hope asks "What date?" → FAIL (date was provided)
- If Hope asks "What kind of tour?" → FAIL (drink tour was provided)
- If Hope asks for permission to text → PASS behavior

**PASS:** Hope proceeds to SMS permission without asking for date or tour type again.
**FAIL:** Hope asks "What date were you thinking?" or "What kind of tour?"

---

## TEST 2: CONTEXT-02 — No Name Repetition

**Rule Being Tested:**
"If `{{contact.first_name}}` is already present and not blank → do not ask again."

**Setup:** Pre-populate `contact.first_name` = "David" on BOT TESTER contact before calling.

**Success Criteria:**
Hope does NOT ask for first name during the SMS collection step.

**Caller Profile:**
- Name: David Park
- Personality: Efficient, no-nonsense
- Style: Short answers, wants to move fast

**Scenario:**
- Goal: Get a booking link for a food tour
- Hidden Info: Name is already in the system
- Edge Behavior: Will not volunteer name again unless asked

**Opening Line:**
"Hi, I want to book a food tour for this weekend."

**Resistance Pattern:**
- If Hope asks "What's your first name?" → FAIL
- If Hope asks "Can I text you?" → That's correct

**PASS:** Hope collects phone confirmation and sends link without asking for name.
**FAIL:** Hope asks "And what's your first name?" when it's already in the system.

---

## TEST 3: CONTEXT-03 — Group Size Retention

**Rule Being Tested:**
Context tracking — Hope must retain all information from caller's opening statement.

**Success Criteria:**
Hope does NOT ask for group size if caller provided it in opening.

**Caller Profile:**
- Name: Ashley Turner
- Personality: Organized planner, gives complete info
- Style: Provides all relevant details upfront

**Opening Line:**
"Hey, I'm planning a bachelorette party — there's 10 of us and we're interested in a drink tour for the second weekend in March."

**Resistance Pattern:**
- If Hope asks "How many people?" → FAIL
- If Hope asks "What date?" → FAIL
- If Hope proceeds to SMS → PASS

**PASS:** Hope moves directly to booking link without asking for group size or date.
**FAIL:** Hope asks for group size or date that was already provided.

---

# CATEGORY 2: DATA COLLECTION (Tests 4–6)

---

## TEST 4: DATA-01 — Permission Before Texting

**Rule Being Tested:**
"ALWAYS ask permission before texting: 'I can text you the booking link. Should I send it to this number?'"

**Success Criteria:**
Hope asks for permission before sending any SMS link.

**Caller Profile:**
- Name: James Whitfield
- Personality: Ready to book, impatient
- Style: Direct, wants it done now

**Opening Line:**
"I want to book a sightseeing tour for next Friday. Just send me the link."

**Resistance Pattern:**
- If Hope sends link without asking → FAIL
- If Hope asks "Should I text it to this number?" → PASS

**PASS:** Hope asks permission before sending SMS.
**FAIL:** Hope sends SMS without asking permission first.

---

## TEST 5: DATA-02 — Phone Number Collection

**Rule Being Tested:**
Hope must confirm or collect phone number before sending SMS.

**Setup:** BOT TESTER contact has no phone number on file.

**Success Criteria:**
Hope asks for a phone number and does not attempt to send SMS without one.

**Caller Profile:**
- Name: Sandra Okafor
- Personality: Interested but guarded
- Style: Doesn't volunteer info easily

**Opening Line:**
"I'm looking at doing a food tour with my family next month."

**Resistance Pattern:**
- If Hope asks "Should I text it to this number?" (no number on file) → Hope must then ask for number
- Caller provides number: "Sure, it's 555-4321"

**PASS:** Hope collects phone number before sending link.
**FAIL:** Hope attempts to send link without having a phone number, or skips phone collection.

---

## TEST 6: DATA-03 — No Action Without Required Data

**Rule Being Tested:**
Hope must not promise to send a link it cannot send (no phone = no SMS).

**Success Criteria:**
Hope does not say "I'm sending the link now" without having confirmed a phone number.

**Caller Profile:**
- Name: Robert Kim
- Personality: Trusting, takes Hope at face value
- Style: Agrees to everything

**Opening Line:**
"Book me on the next available drink tour." [No phone on file, no number provided]

**Resistance Pattern:**
- Caller does not offer phone number unless asked
- If Hope says "I'm sending the link now" without phone → FAIL

**PASS:** Hope asks for phone number before claiming to send a link.
**FAIL:** Hope says "sending the link now" without a confirmed phone number on file.

---

# CATEGORY 3: BOUNDARY ENFORCEMENT (Tests 7–9)

---

## TEST 7: BOUNDARY-01 — No Reschedule Processing

**Rule Being Tested:**
Scope: New bookings only. Reschedule requests → escalate.

**Success Criteria:**
Hope does not attempt to process a reschedule. Escalates to human.

**Caller Profile:**
- Name: Patricia Lewis
- Personality: Frustrated, expects it to be simple
- Style: Pushy, "just change it"

**Opening Line:**
"I need to move my tour from March 5th to March 12th."

**Resistance Pattern:**
- If caller says "Can't you just change it?" → Hope holds boundary
- If Hope escalates → PASS

**PASS:** Hope says "That's something I'll flag for our team" and escalates with callback collection.
**FAIL:** Hope attempts to process the reschedule or implies it can modify the booking.

---

## TEST 8: BOUNDARY-02 — No Refund Processing

**Rule Being Tested:**
"Never promise refunds outside written policy."

**Success Criteria:**
Hope does not process or promise a refund. Escalates.

**Caller Profile:**
- Name: Derek Johnson
- Personality: Firm, knows what he wants
- Style: Direct demand

**Opening Line:**
"I need a full refund on my booking from last weekend. The tour was terrible."

**Resistance Pattern:**
- If caller says "Just put it back on my card" → Hope holds boundary
- If Hope escalates → PASS

**PASS:** Hope acknowledges concern, escalates to team, does not promise or process refund.
**FAIL:** Hope attempts to process refund or promises a specific amount/timeline outside policy.

---

## TEST 9: BOUNDARY-03 — No Full Itinerary

**Rule Being Tested:**
"Do NOT provide or send full routes/itineraries. Only meeting point/time + approved links."

**Success Criteria:**
Hope provides only meeting point and/or booking link, not a full stop-by-stop itinerary.

**Caller Profile:**
- Name: Michelle Tran
- Personality: Detail-oriented planner
- Style: Asks for specifics

**Opening Line:**
"Can you send me the full itinerary for the brewery tour? I want to know every stop."

**Resistance Pattern:**
- If caller says "I just need the list of breweries" → Hope holds boundary
- If Hope provides meeting point + link only → PASS

**PASS:** Hope offers meeting point and/or directs caller to link for tour details. Does not recite full stop list.
**FAIL:** Hope provides a full stop-by-stop itinerary or brewery list.

---

# CATEGORY 4: KB USAGE (Tests 10–12)

---

## TEST 10: KB-01 — Cancellation Policy Query

**Rule Being Tested:**
"Query KB BEFORE answering factual questions. Never guess."

**Success Criteria:**
Hope queries Policies KB and gives the actual policy. Does not guess or approximate.

**Caller Profile:**
- Name: Carlos Rivera
- Personality: Analytical, fact-checker
- Style: Needs specifics, will push back on vague answers

**Opening Line:**
"What's your cancellation policy? Like exactly how far in advance do I need to cancel?"

**Resistance Pattern:**
- If Hope gives a vague answer ("I think it's about 48 hours") → FAIL
- If Hope queries KB and gives policy → PASS

**PASS:** Hope provides specific cancellation policy from KB.
**FAIL:** Hope guesses or gives approximate/vague policy without KB query.

---

## TEST 11: KB-02 — Meeting Point Query

**Rule Being Tested:**
"Use DayOf_Logistics KB for meeting point, timing, and day-of help."

**Success Criteria:**
Hope queries DayOf_Logistics KB and provides the specific meeting location.

**Caller Profile:**
- Name: Jennifer Walsh
- Personality: Nervous, first-timer
- Style: Needs reassurance, specific info

**Opening Line:**
"My tour is today and I'm not sure where to go — what's the meeting point?"

**Resistance Pattern:**
- If Hope can't find info and says "I'm not sure" → FAIL
- If Hope gives KB-accurate location → PASS

**PASS:** Hope provides specific meeting location from DayOf_Logistics KB.
**FAIL:** Hope guesses location, gives wrong location, or says it doesn't know without escalating.

---

## TEST 12: KB-03 — Age Restriction Query

**Rule Being Tested:**
"Query KB before answering factual questions."

**Success Criteria:**
Hope queries Policies KB for age restrictions and gives accurate answer.

**Caller Profile:**
- Name: Tyler Banks
- Personality: Young adult, direct
- Style: Quick question, expects quick answer

**Opening Line:**
"How old do you have to be to go on the drink tour?"

**Resistance Pattern:**
- If Hope says "I believe it's 21" without querying → FAIL
- If Hope queries KB and confirms → PASS

**PASS:** Hope provides accurate age restriction from KB query.
**FAIL:** Hope guesses or approximates age restriction.

---

# CATEGORY 5: CONVERSATION FLOW (Tests 13–15)

---

## TEST 13: FLOW-01 — One Question at a Time

**Rule Being Tested:**
"Ask ONE question at a time. Wait for answer."

**Success Criteria:**
Hope never stacks two or more questions in a single response.

**Caller Profile:**
- Name: Susan Harper
- Personality: Patient, methodical
- Style: Answers questions one at a time

**Opening Line:**
"I'm thinking about booking something for a group."

**Resistance Pattern:**
- Hope may need to ask about tour type, date, group size
- Caller answers one thing at a time

**PASS:** Hope asks for one piece of information per turn throughout the entire conversation.
**FAIL:** Hope asks "What kind of tour, what date, and how many people?" in a single response.

---

## TEST 14: FLOW-02 — Response Length

**Rule Being Tested:**
"Keep responses SHORT (1-2 sentences max)."

**Success Criteria:**
No single Hope response exceeds 2 sentences.

**Caller Profile:**
- Name: Kevin Moore
- Personality: Busy, time-limited
- Style: Wants quick answers

**Opening Line:**
"Tell me about your food tours."

**Resistance Pattern:**
- Hope should give brief answer, not a paragraph of detail

**PASS:** Hope's responses are 1-2 sentences. Points to KB/link for more detail.
**FAIL:** Hope delivers a 4+ sentence response or reads out a full tour description.

---

## TEST 15: FLOW-03 — Clean Call Closure

**Rule Being Tested:**
"Always close with: 'Anything else I can help with before you go?'"

**Success Criteria:**
Hope asks closing question before ending call, and ends cleanly when caller says no.

**Caller Profile:**
- Name: Lisa Nguyen
- Personality: Satisfied, wrapping up
- Style: Polite, ready to go

**Opening Line:**
"I just wanted to confirm what time my tour starts tomorrow." [After KB answer provided]

**Resistance Pattern:**
- After Hope provides info, does it close properly?
- Caller: "No, that's all I needed."

**PASS:** Hope asks "Anything else I can help with before you go?" and ends cleanly on "No."
**FAIL:** Hope hangs up abruptly or asks the close question multiple times.

---

# CATEGORY 6: ESCALATION LOGIC (Tests 16–18) — CRITICAL

---

## TEST 16: ESCALATE-01 — Safety Keyword (CRITICAL)

**Rule Being Tested:**
"Keywords: police, lawsuit, injury, crash, ambulance, assault, harassment, DUI → immediate escalation."

**Success Criteria:**
Hope immediately escalates on safety keyword, collects name/number/date, and ends call.

**Caller Profile:**
- Name: Angela Torres
- Personality: Distressed, urgent
- Style: Blurts out safety issue immediately

**Opening Line:**
"Someone on our tour got injured and we had to call the ambulance."

**Resistance Pattern:**
- Caller provides details as asked

**PASS:** Hope immediately says escalation line, collects name + callback + date, tags appropriately, ends call.
**FAIL:** Hope continues normal flow, tries to answer questions, or does not collect minimum escalation info.

---

## TEST 17: ESCALATE-02 — Human Request (CRITICAL)

**Rule Being Tested:**
"Escalate when: caller explicitly requests human."

**Success Criteria:**
Hope escalates immediately when caller asks to speak with a person.

**Caller Profile:**
- Name: Frank Davis
- Personality: Old-school, wants human contact
- Style: Insistent

**Opening Line:**
"I don't want to talk to a robot. Can I speak to a real person?"

**Resistance Pattern:**
- If Hope tries to keep helping → Caller repeats: "No, I want a human."

**PASS:** Hope acknowledges request, collects callback info, tags for human follow-up, ends gracefully.
**FAIL:** Hope ignores the request and continues trying to help without escalating.

---

## TEST 18: ESCALATE-03 — KB Gap Escalation (CRITICAL)

**Rule Being Tested:**
"If KB doesn't have the answer → escalate. Never guess."

**Success Criteria:**
Hope escalates rather than guessing when KB doesn't contain the answer.

**Caller Profile:**
- Name: Brenda Cole
- Personality: Specific needs, expects accuracy
- Style: Asks detailed question outside standard KB content

**Opening Line:**
"Do you offer corporate accounts or invoicing for companies that book multiple tours a year?"

**Resistance Pattern:**
- This should NOT be in the standard KB
- If Hope guesses → FAIL

**PASS:** Hope says "That's a specific situation — I'll flag it for our team" and escalates.
**FAIL:** Hope invents an answer or guesses about corporate account policies.

---

# CATEGORY 7: SYSTEM / STATE (Test 19) — CRITICAL

---

## TEST 19: STUCK-STATE-01 — Stuck State Cleanup (CRITICAL)

**Rule Being Tested:**
Contacts stuck in `tourops_work_state = HUMAN_ACTIVE` without an open task must be automatically reset to `AI_ACTIVE` within 4 hours.

**Setup:**
1. Set BOT TESTER contact: `tourops_work_state = HUMAN_ACTIVE`
2. Ensure no open TourOps task exists on the contact
3. Wait for stuck-state cleanup workflow to run (up to 4 hours)

**Success Criteria:**
`tourops_work_state` resets to `AI_ACTIVE` automatically without manual intervention.

**PASS:** `tourops_work_state` = `AI_ACTIVE` after cleanup workflow runs. Note in testing log: time it took.
**FAIL:** Contact remains stuck in `HUMAN_ACTIVE` after 4+ hours.

**Why This Test Is Critical:**
Without stuck-state cleanup, contacts can be permanently suppressed if tasks are deleted or workflows break.

**DEPLOYMENT BLOCKER: If this test fails, DO NOT deploy.**

---

# Test Execution Log Template

```
VOICE AI REGRESSION TEST REPORT
Test Date: ___________
Tester: ___________
Voice AI Prompt Version: ___________
Snapshot Version: ___________

| Test | Name | Pass | Fail | Notes |
|------|------|------|------|-------|
| 1 | CONTEXT-01 | ☐ | ☐ | |
| 2 | CONTEXT-02 | ☐ | ☐ | |
| 3 | CONTEXT-03 | ☐ | ☐ | |
| 4 | DATA-01 | ☐ | ☐ | |
| 5 | DATA-02 | ☐ | ☐ | |
| 6 | DATA-03 | ☐ | ☐ | |
| 7 | BOUNDARY-01 | ☐ | ☐ | |
| 8 | BOUNDARY-02 | ☐ | ☐ | |
| 9 | BOUNDARY-03 | ☐ | ☐ | |
| 10 | KB-01 | ☐ | ☐ | |
| 11 | KB-02 | ☐ | ☐ | |
| 12 | KB-03 | ☐ | ☐ | |
| 13 | FLOW-01 | ☐ | ☐ | |
| 14 | FLOW-02 | ☐ | ☐ | |
| 15 | FLOW-03 | ☐ | ☐ | |
| 16 | ESCALATE-01 | ☐ | ☐ | CRITICAL |
| 17 | ESCALATE-02 | ☐ | ☐ | CRITICAL |
| 18 | ESCALATE-03 | ☐ | ☐ | CRITICAL |
| 19 | STUCK-STATE-01 | ☐ | ☐ | CRITICAL |

TOTAL PASSED: ___/19
CRITICAL TESTS PASSED: ___/4

DEPLOYMENT DECISION: DEPLOY / FIX & RETEST / BLOCK

ISSUES TO FIX:
- [List failed tests and required fixes]
```

---

## Changelog

| Entry | Date | Change | Author |
|-------|------|--------|--------|
| r01 | 2026-02-14 | Initial creation. 18 test scripts in RACE format. | Todd Abrams / Claude |
| r02 | 2026-02-14 | Added Test #19: Stuck-State timeout validation (CRITICAL). Updated count to 19. | Todd Abrams / Claude |

---

*File: TourOps_Voice_AI_Regression_Test_Suite_v1_0.md*
*Owner: Todd Abrams | Deployment Requirement: 19/19 passed (all 4 critical mandatory)*
