# TourOps Operator Onboarding Plan v2.1

**Status:** Working draft — Todd will finalize
**Owner:** Todd Abrams
**Last Updated:** 2026-03-02
**Target:** Operator testing Voice AI within 3–5 days. Fully live within 14 days.
**Dependencies:** Snapshot v1.2, Prompt Compiler v1.1 (update needed), Schema Contract 3, n8n reusable template
**Replaces:** Playbook B (New Operator Deployment) in TO_Deployment_Playbook.md

> **File Authority:** This document owns the full operator onboarding pipeline — from signature to 30-day report. For technical deployment execution (prompt changes, schema changes), see TO_Deployment_Playbook.md Playbooks A and C. For regression testing procedures, see TO_Testing_Protocol.md.

---

## Design Principles

1. **Speed to first win.** Operator hears their AI working within days, not weeks. Even incomplete, a working skeleton builds belief.
2. **Operator confirms, not creates.** Claude pre-fills everything possible. Operator reviews and fills gaps. No blank pages.
3. **A2P starts immediately.** Registration takes ~1 week. Build runs in parallel.
4. **Claude is an employee at every phase.** Internal automation (intake, KB, prompts) and customer-facing support (post-launch assistant).
5. **Pipeline is tracked in GHL.** Every operator moves through defined stages with automated triggers.
6. **Right Claude tool for each job.** Code for scraping and automation. Skills for repeatable generation tasks. Projects for persistent context. Cowork for operator-facing assistant.
7. **Keep forms short.** Collect only what's needed at each step. Don't front-load questions the operator can't answer yet.

---

## Claude Tool Assignments

| Tool | What It Does | Onboarding Use | When |
|------|-------------|----------------|------|
| **Claude Code** | Terminal agent — crawls sites, runs scripts, audits systems | Website scraping for intake pre-fill. Regression test automation (Q3). Snapshot field auditing via GHL API. | Now (scraping), Q3 (regression + auditing) |
| **Claude Skills** | Saved, reusable task definitions — same quality every run | "Generate Intake from Website" skill. "Generate KBs from Intake" skill. "Draft OP_Profile.md" skill. "Generate Impact Report" skill. One click per operator. | Now — build as first reusable onboarding tools |
| **Claude Projects** | Persistent workspace — holds all context per operator | One internal Project per operator (intake, OP_Profile, KBs, prompts, test reports). One customer-facing Project per operator (simplified docs, support). All Skills and Compiler runs happen inside the Project. | Now — already in plan |
| **Claude Cowork** | Desktop agent for non-technical users, MCP connectors, multi-step tasks | Customer-facing operator assistant. Operator says "update my cancellation policy" → Cowork formats change, flags affected KBs, routes to build team. | Founding cohort as Project. Q3 as Cowork plugin. |
| **Plugins** | Bundled skill/connector packages, installable per team | TourOps Onboarding Plugin — bundles all Skills into single package for consistency at scale. | Q3+ when operator count justifies it |

---

## Updates Required for Prompt Compiler v1.1

**Required change:** Intake template says "Top 3–5 Tours" → must be **ALL tours** (public, private, seasonal, specialty). Incomplete tour coverage creates KB gaps, drives escalation, kills Quality Score.

**New field in OP_Profile.md:** `AI_Confidence_Level` — Strict | Balanced | Flexible (see Phase 2 below).

**New field in OP_Profile.md:** `AI_Personality` — Friendly | Professional | Formal (maps to GHL Conversation AI personality presets and Voice AI prompt tone).

---

## Build Pipeline — GHL Workflow & Stages

This pipeline lives in the **TourOps agency-level GHL account** (not operator sub-accounts). Each new operator is a contact record that moves through pipeline stages. Automations fire at each stage transition.

### Pipeline: "Operator Onboarding"

| Stage | Name | Trigger to Enter | Automated Actions on Entry |
|-------|------|-----------------|---------------------------|
| 1 | **Signed** | Manual move (Todd confirms payment) | Send Day 0 Questionnaire (email/SMS with form link). Create Todd task: "Review questionnaire when returned." Start A2P clock note. |
| 2 | **Intake Received** | Day 0 Questionnaire submitted (form submission trigger) | Write form fields to contact record (POC name, POC phone, POC email, Business Legal Name, EIN, website URL, AI coverage mode). Tag: `Onboarding_Day0_Complete`. Create Todd task: "Start website scrape + pre-fill intake doc." Notify Todd via email. |
| 3 | **Intake Review** | Manual move (Todd sends pre-filled doc to operator) | Create operator task: "Review and complete intake document — target 48 hours." Start 48-hour follow-up sequence if not returned. |
| 4 | **Building** | Manual move (Todd approves final intake + OP_Profile.md) | Create Mike task: "Deploy snapshot + run Prompt Compiler + build skeleton Voice AI." Tag: `Build_In_Progress`. |
| 5 | **Internal Testing** | Manual move (Mike confirms skeleton deployed) | Send operator notification: "Your Voice AI is ready for testing! Call [number] to try it out." Create Todd task: "Schedule onboarding interview — review feedback from testing." Tag: `Skeleton_Live`. |
| 6 | **Refining** | Manual move (after onboarding interview) | Create Mike task: "Update KBs + refine prompt based on interview feedback." |
| 7 | **Regression** | Manual move (Mike confirms KBs + prompt updated) | Create Mike task: "Run regression per TO_Testing_Protocol.md — 19/19 required." Create Todd task: "Review test report when ready." |
| 8 | **Awaiting Approval** | Manual move (Mike uploads test report) | Create Todd task: "Review regression results — approve or reject for go-live." |
| 9 | **Live** | Manual move (Todd approves + compliance acknowledgment signed + A2P confirmed) | Enable AI in production. Tag: `Operator_Live`. Send operator go-live email. Start billing. Create Mike task: "Monitor first 10 conversations." Remove from onboarding pipeline. Add to Operator QA pipeline. |
| 10 | **On Hold** | Manual move (any blocker) | Notify Todd. Log reason in contact notes. Pause all automated sequences. |

### Automated Sequences Attached to Pipeline

**48-hour intake nudge:** If operator stays in "Intake Review" for 48 hours without returning doc → send friendly reminder email. Repeat at 96 hours. At 7 days → create Todd task: "Operator intake stalled — follow up or pause."

**A2P tracking:** On entry to "Signed" stage → create internal note with A2P submission date. Todd manually updates when approved. If operator reaches "Internal Testing" before A2P is approved → hold SMS testing, voice-only until cleared.

---

## Phase 0 — Sign-Up & Day 0 Questionnaire

**Owner:** Todd
**Duration:** Day of signing
**Claude Role:** None (this is fast and manual)
**Goal:** Collect the minimum needed to start A2P registration and the website scrape. Nothing else.

### Day 0 Questionnaire

Delivered via email/SMS link within 1 hour of signing. Operator fills this out in under 2 minutes.

| Field | Purpose | Required |
|-------|---------|----------|
| POC Name, Email, Phone | Primary onboarding contact | Yes |
| Business Legal Name | A2P registration | Yes |
| EIN | A2P registration | Yes |
| Website URL | Website scrape for intake pre-fill | Yes |
| AI Coverage Mode | After Hours Only / Overflow / 24/7 — determines call routing, business hours config, and AI greeting | Yes |

**Six fields. No personality questions, no voice preferences, no AI configuration. Those come later when the operator has context.**

### What happens on submission:

1. GHL workflow writes all fields to operator contact record
2. Tags contact: `Onboarding_Day0_Complete`
3. Creates Todd task: "Day 0 received for [Operator]. Start A2P + website scrape."
4. Sends auto-reply to operator: "Got it! We're already pulling info from your website to get started. You'll receive a pre-filled document to review within 48 hours."
5. Pipeline moves to **Stage 2: Intake Received**

### A2P Registration (runs in parallel)

Todd submits A2P/10DLC registration using Business Legal Name, EIN, and Business Phone. This typically takes ~1 week. Build continues regardless — Voice AI testing works without SMS. A2P must be approved before go-live (Stage 9).

---

## Phase 1 — Website Scrape + Pre-Filled Intake Doc

**Owner:** Todd (with Claude)
**Duration:** 1–2 hours
**Claude Role:** Research + document generation

### Process:

1. Open operator's Claude Project: "[Operator Name] — Onboarding"
2. Upload Day 0 questionnaire responses
3. **Run "Generate Intake from Website" Skill** (or Claude Code for deeper scrape): Takes website URL as input. Claude Code crawls all tour pages, policy pages, FAQ, about page. Outputs structured intake document in template format with ALL tours, booking URLs, policies, meeting points. Flags `[NOT FOUND]` and `[PLEASE VERIFY]` items.
4. Claude generates pre-filled intake document (~60–80% complete)
5. Todd reviews in ~10 minutes — cleans up obvious issues, adds any notes
6. Send pre-filled doc to operator with preference questions appended (see below)
7. Pipeline moves to **Stage 3: Intake Review**

**Tool note:** For founding cohort, Claude Code gives the deepest scrape — it can follow pagination, crawl sub-pages, and handle sites with complex navigation. The "Generate Intake from Website" Skill is the lighter version for when the process is proven and needs to be fast/repeatable. Build the Skill from what works in the Claude Code runs.

### Intake Document Structure

The intake doc is sent to the operator pre-filled from their website. They review, correct, and fill gaps.

**Section 1 — Company & Tours (pre-filled from scrape):**
- Company identity (pre-filled from Day 0)
- ALL tours — name, duration, highlights, booking URL, meeting point address, meeting point landmark, seasonal flag, active/inactive status
- Private tours — availability, process, URL, min group size
- Policies — cancellation (exact wording), age restrictions, weather, late arrival, no-show, gratuity
- Escalation contacts — owner name/phone, ops manager name/phone
- Additional notes

**Section 2 — AI Preferences (operator fills in, not pre-filled):**

| Field | Options | Purpose |
|-------|---------|---------|
| What should we call your AI agent? | Open text (e.g., "Hope", "Jade") | Agent name in OP_Profile.md |
| AI Personality | Friendly / Professional / Formal | Maps to GHL Conversation AI personality preset + Voice AI prompt tone |
| AI Confidence Level | **Strict:** "If it's not in the KB, hand off to our team. Never improvise." / **Balanced:** "Answer general questions naturally, but hand off anything about pricing, policies, or commitments." / **Flexible:** "Use good judgment for most questions. Only hand off when truly uncertain or sensitive." | Controls prompt injection (see Phase 2) |
| Voice Gender Preference | Male / Female / No preference | Voice AI voice selection |

**Why here, not Day 0:** By this point the operator has seen their pre-filled doc — they know we did the work. Asking "what should we call your AI?" and "how confident should it be?" now has context. On Day 0, these questions feel abstract.

### When operator returns the doc:

1. Todd uploads completed doc to operator's Claude Project
2. Claude scans for remaining gaps: missing URLs, tours without meeting points, policies without exact wording
3. **Run "Draft OP_Profile.md" Skill:** Takes personality selection + agent name + confidence level + voice preferences → outputs formatted OP_Profile.md
4. Todd reviews, resolves any final gaps via quick call/email with operator
5. Todd approves final intake + OP_Profile.md
6. Pipeline moves to **Stage 4: Building**

---

## Phase 2 — Skeleton Build (Speed to First Win)

**Owner:** Mike
**Duration:** 2–3 hours
**Claude Role:** Prompt generation + KB generation

### Purpose: Get a working Voice AI in front of the operator ASAP, even if incomplete.

1. Deploy Voice Master Snapshot v1.2 to new operator sub-account
2. Run Prompt Compiler v1.1 inside operator's Claude Project (full context already loaded)
3. **Run "Generate KBs from Intake" Skill:** Takes approved intake → outputs 6 KBs in correct format. For skeleton build, generates Tour_Descriptions, Booking_Links, and Policies at minimum. Exact tour names, exact policy wording, flagged gaps.
4. Paste Voice AI prompt + skeleton KBs into GHL
5. Configure voice selection based on operator's gender preference + personality setting
6. Set Conversation AI bot personality to match operator's selection (Friendly / Professional / Formal)
7. Create BOT TESTER contact
8. Run 3 smoke tests: sales call, service call, safety escalation
9. If smoke tests pass → deploy to operator's test number

### AI Confidence Level → Prompt Injection

Based on the operator's selection, the Prompt Compiler injects one of these instruction blocks:

**Strict:**
```
CONFIDENCE RULE: If the knowledge base does not contain the answer, say:
"Let me have our team get back to you on that." Then escalate.
Never infer, assume, or improvise an answer. If you're not certain,
you don't say it.
```

**Balanced (default for most operators):**
```
CONFIDENCE RULE: You may answer general, non-committal questions
naturally using common sense and context (parking, what to wear,
general vibe). But NEVER improvise answers about: pricing, policies,
refunds, cancellations, availability, tour specifics, or any
commitment. For those topics, if the KB doesn't have it, say:
"That's a great question — let me have our team confirm that for you."
Then escalate.
```

**Flexible:**
```
CONFIDENCE RULE: Use good judgment to answer most questions naturally.
You represent this business and should sound knowledgeable and helpful.
Escalate only when: (1) the question involves a specific commitment you
cannot verify, (2) you genuinely don't know, or (3) a safety/legal
trigger is detected. When in doubt, it's always okay to say: "I want
to make sure I get this right — let me have our team confirm."
```

### What the operator gets:

A phone number they can call to test their Voice AI. It knows their tour names, can send booking links, and handles basic questions. It won't be perfect — some KBs are thin, edge cases aren't covered. But it works. They hear their agent name, their greeting, their personality.

**This is the first win. It happens within 3–5 days of signing.**

Pipeline moves to **Stage 5: Internal Testing**

---

## Phase 3 — Onboarding Interview (Gaps + Voice + Edge Cases)

**Owner:** Todd
**Duration:** 20–30 min call
**Claude Role:** Note processing + intake refinement

### This happens AFTER the operator has tested the skeleton Voice AI.

The operator now has context. They've called it a few times. They have opinions: "It didn't know about our private events." "The meeting point description is wrong." "It sounds too stiff." This feedback is gold — it's specific, grounded, and actionable.

### Interview covers:

**Feedback on skeleton AI:**
- What worked? What felt off?
- Any wrong information?
- Missing tours or policies?

**Voice and edge cases (things websites don't cover):**
- "When someone calls excited about a bachelorette party, how does your team respond? Give me the actual words."
- "What's the one question you get ten times a day?"
- "What do you actually do when someone calls day-of wanting a refund?"
- "Are there any upcoming tours, seasonal offerings, or changes not on the website?"

**Operational patterns:**
- Peak call times, after-hours volume estimate
- Most common call reasons
- What they absolutely want to handle personally vs. what AI can own

**Escalation boundaries:**
- "What situations should always come to you directly?"

**Scorecard inputs (for weekly reporting):**
- "What's your average booking value?" (most operators know this)
- "What percentage of inquiries turn into bookings?" (if unsure, use 25% as conservative baseline)
- These two numbers power the Estimated Revenue Protected calculation in the weekly scorecard

### After the call:

1. Todd pastes notes (or feeds transcript) into operator's Claude Project
2. Claude updates the intake document with interview findings
3. Claude regenerates/updates KBs with new information
4. Claude flags any prompt changes needed (e.g., operator wants different escalation language)
5. Pipeline moves to **Stage 6: Refining**

---

## Phase 4 — KB Refinement + Prompt Update

**Owner:** Mike
**Duration:** 1–2 hours
**Claude Role:** KB regeneration + prompt update

1. **Run "Generate KBs from Intake" Skill** with full updated intake → outputs all 6 KBs (Tour_Descriptions, Policies, DayOf_Logistics, Escalation_Safety, Private_Tours_Sales, Booking_Links)
2. Claude updates Voice AI prompt based on interview feedback (inside operator's Project — full context available)
3. Mike reviews, pastes updated KBs + prompt into GHL
4. Mike runs smoke tests with updated content
5. Pipeline moves to **Stage 7: Regression**

---

## Phase 5 — Regression + Data Infrastructure

**Owner:** Mike → Todd
**Duration:** 2–4 hours

### Regression:

Run full regression per **TO_Testing_Protocol.md** — 19/19 required, no exceptions. Document results in Test Report Template.

### Data Infrastructure (parallel with regression):

Per **Architecture_Decision_n8n_Reusability.md** — total setup under 20 minutes:

1. Add operator row to Airtable Operators table (~2 min)
2. Copy GHL webhook workflow into operator sub-account (~5 min)
3. Update operator name variable in webhook payload (~2 min)
4. Run one test conversation → verify Airtable record (~10 min)
5. Confirm zero hardcoded operator references in n8n flow

### Approval:

1. Mike uploads test report
2. Pipeline moves to **Stage 8: Awaiting Approval**
3. Todd reviews and approves deployment in writing
4. A2P registration confirmed approved (if not → hold at Stage 8)

---

## Phase 6 — Go-Live

**Owner:** Todd
**Duration:** <1 hour

### Pre-Go-Live Gate:

- [ ] 19/19 regression pass confirmed
- [ ] A2P registration approved
- [ ] Todd deployment approval in writing
- [ ] **Compliance acknowledgment signed by operator** (see below)
- [ ] GHL usage/overage billing configured for operator sub-account

### Compliance Acknowledgment

Before AI goes live, operator signs: *"I confirm that all messaging sent through TourOps will comply with applicable messaging laws and that I maintain proper opt-in consent for all contacts. I understand that TourOps may immediately suspend messaging if carrier complaints or spam flags arise."*

Delivered as a simple form or document. Signed copy stored in operator's Claude Project and GHL contact notes.

### Go-Live Steps:

1. Enable AI agent in production sub-account
2. Verify first live call within 24 hours
3. Build_Log.md entry: "New Operator: [Name]" + deployment date
4. Operator notification: "Your system is live. Billing begins now. Your 30-day guarantee window starts today."
5. Pipeline moves to **Stage 9: Live**
6. Operator removed from Onboarding pipeline, added to Operator QA pipeline

---

## Phase 7 — Early Monitoring (First 2 Weeks)

**Owner:** Mike
**Duration:** Ongoing
**Process:** Per TO_Run_Operations_Manual.md SOP 4 (New Operator QA Onboarding)

1. VAI + CAI Graders score from day 1 (already on Claude API)
2. Mike monitors first 10 live conversations (grader + manual spot check)
3. Report to Todd at conversations 5 and 10: score, issues, patterns
4. Add operator to weekly QA rotation in Google Sheets
5. Flag any score < 3.5 or critical failure immediately

---

## Phase 8 — 30-Day Impact Report

**Owner:** Todd
**Duration:** Day 30

1. Pull 30-day data from GHL + Airtable
2. **Run "Generate Impact Report" Skill:** Takes raw data (call counts, after-hours volume, booking links sent, avg booking value, conversion rate from Phase 3) → outputs TourOps Revenue Impact Report.
   - Inquiry coverage (total inbound, after-hours handled, % responded < 60 seconds)
   - Booking activity (conversations created, booking links sent, opportunities)
   - Estimated revenue protected (after-hours inquiries × conversion rate × avg booking value)
   - Labor replaced (inquiries × 4 min = hours × $20/hr)
3. Todd delivers personally for founding cohort
4. This closes the 30-day onboarding guarantee window

**⚠️ NOT YET BUILT:** Impact Report template doesn't exist as a dashboard, template, or automation. Build for founding cohort: generate manually using Claude + raw data. Automate in Q2.

---

## Customer-Facing: TourOps Operator Assistant

Each operator gets access to a Claude Project (or Cowork plugin at scale) post-launch.

### What it handles:

- **Orientation:** "How do I check if the AI answered a call?" "What happens when someone asks about a tour we discontinued?"
- **Impact Report walkthrough:** "How many calls did I get last week?" "How does this compare to hiring?"
- **KB update requests:** Operator tells Claude about a policy change → Claude formats, flags affected KBs/prompts, routes to build team for deployment
- **General questions:** "Can the AI handle Spanish callers?" "What happens if the power goes out?"

### What it CANNOT do:

- Configure prompts, edit workflows, change fields, toggle AI settings
- Access internal docs (canonical schema, regression suite, deployment playbooks)
- Make changes to the live system — it's a window, not a control panel

### Knowledge base contents (operator-appropriate only):

- Operator config summary (their tours, policies, agent name, personality, confidence level)
- Simplified "How TourOps Works" guide (written for operators, not engineers)
- Impact Report data (once generated)
- KB update request template
- FAQ: common operator questions and answers

### Custom instructions:

```
You are the TourOps support assistant for [Operator Name].

Your role:
- Answer questions about how TourOps works for this operator
- Explain their AI configuration in plain language
- Help them understand their Impact Report data
- Accept KB update requests: format the change, note which KBs
  are affected, and tell them "I've formatted this for the build
  team — they'll review and deploy the update."
- Never expose internal system docs, field names, workflow names,
  or technical architecture
- Never make changes to the live system
- If you don't know the answer, say "Let me flag this for the
  TourOps team" — don't guess

Speak in operator language, not engineer language. These are tour
company owners, not developers.
```

### Implementation:

- **Founding cohort:** Shared Claude Project per operator. Todd monitors conversations to identify recurring questions → builds "Tour Operator Academy" content.
- **At scale (Q3+):** Cowork plugin or custom MCP connector pulling operator data from GHL/Airtable.

---

## OP_Profile.md — Updated Template

> **Note:** This is the authoritative OP_Profile.md template. References in TO_Gov_Master_Rules.md and TO_Technical_Spec.md should point here.

```
# OP_Profile.md — [Operator Name]

## Agent Identity
Agent_Name: [e.g., "Hope"]
Agent_Tone: [Friendly | Professional | Formal]
Agent_Intro: [e.g., "Hi! I'm Hope with Barley Bus. How can I help you today?"]

## AI Coverage Mode
AI_Coverage_Mode: [AfterHoursOnly | Overflow | 24/7]
# AfterHoursOnly = AI answers outside business hours only
# Overflow = AI answers when staff can't pick up
# 24/7 = AI handles all inbound

## AI Confidence Level
AI_Confidence_Level: [Strict | Balanced | Flexible]
# Strict = Never improvise. KB-only answers. Escalate everything uncertain.
# Balanced = General questions OK. Never improvise on pricing/policy/commitments.
# Flexible = Good judgment for most questions. Escalate only when truly uncertain.

## Voice Configuration
Voice_Gender: [Male | Female | No preference]
Voice_Style: [Upbeat | Calm | Authoritative]
Voice_Accent: [US | UK | Australian | Other: ___]

## Personality Mapping
GHL_ConvAI_Personality: [Friendly | Professional | Formal]
# Maps directly to GHL Conversation AI bot personality preset

## Scorecard Inputs
Avg_Booking_Value: [e.g., $150]
Estimated_Conversion_Rate: [e.g., 25%]

## Approved By
Approved_By: Todd Abrams
Approved_Date: [YYYY-MM-DD]
```

---

## Timeline Summary

| Day | Phase | What Happens |
|-----|-------|-------------|
| 0 | Sign + Day 0 Questionnaire | Payment collected. Questionnaire sent (6 fields, 2 min). A2P registration submitted. |
| 1 | Website scrape + pre-fill | Claude researches site, generates pre-filled intake doc + AI preference questions. Sent to operator. |
| 1–3 | Operator reviews intake | Operator confirms tours/policies, fills gaps, chooses AI personality + confidence level + agent name. 48-hour nudge if stalled. |
| 3–5 | Skeleton build | Snapshot deployed, skeleton prompt + KBs, operator can call and test. **First win.** |
| 5–7 | Onboarding interview | Todd calls operator. Feedback on AI + gaps + voice + edge cases. Collects scorecard inputs (avg booking value, conversion rate). |
| 7–9 | KB refinement + prompt update | Full KBs built, prompt refined from interview. |
| 9–11 | Regression + data infra | 19/19 per TO_Testing_Protocol.md. Airtable setup (~20 min). Todd approves. |
| 11–14 | Go-live | Compliance acknowledgment signed. AI enabled in production. Billing starts. Monitoring begins. |
| 14–28 | Early monitoring | First 10 conversations scored. Weekly QA rotation. |
| 30 | Impact Report | 30-day report delivered. Guarantee window closes. |

**Total human work: ~4–6 hours (Todd + Mike) spread across ~14 calendar days.**

---

## Open Items for Todd

1. **Approve intake template change:** "Top 3–5" → "ALL tours" in Prompt Compiler v1.1
2. **Approve new OP_Profile.md fields:** AI_Coverage_Mode, AI_Confidence_Level, AI_Personality, Voice Configuration, Scorecard Inputs
3. **Impact Report template:** Build or approve standardized template (not yet built — #1 churn killer)
4. **Day 0 Questionnaire:** Approve field list and delivery method (GHL form link via email/SMS)
5. **Build Pipeline in GHL:** Approve pipeline stages and automated actions for agency-level account
6. **Customer-facing Claude assistant:** Approve scope boundaries and knowledge base contents
7. **Prompt Compiler v1.2:** Should it natively reference the confidence level blocks and Project-based workflow?
8. **Automated regression (Q3):** Confirm priority — remaining manual bottleneck

---

## Files Affected by This Document

| File | Required Update |
|------|----------------|
| TO_Deployment_Playbook.md | Remove Playbook B. Replace with: "For new operator deployments, follow the Operator Onboarding Plan." Playbooks A and C unchanged. |
| TO_Gov_Master_Rules.md | Update OP_Profile.md template reference to point here (expanded fields). |
| TO_Technical_Spec.md | Update OP_Profile.md template reference to point here. |
| Prompt_Compiler v1.1 | Apply two changes: ALL tours (not top 3–5), AI Confidence Level injection blocks. |
| TO_Product_Gap_Tracker.md | Mark O.1, O.2, O.3, O.7 as covered by this document. |
