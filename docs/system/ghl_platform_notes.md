# GHL_Platform_Notes.md

**Purpose:** Running log of GoHighLevel UI changes, feature updates, and navigation paths relevant to TourOps Voice AI operations.
**Owner:** Mike (primary updater) / Tim (contributor)
**Rule:** Append only. Never delete. Add date to every entry.
**How Claude uses this:** Read at session start before advising Tim on GHL navigation.
**Update Sources:**
- GHL Community / Release Notes: https://community.gohighlevel.com/c/releases
- GHL Changelog: https://ideas.gohighlevel.com/changelog
- GHL Help Docs: https://help.gohighlevel.com

---

## How to Add an Entry

```
**[DATE] — [Feature Area]**
Change: [What changed]
Old path: [Where it used to be]
New path: [Where it is now]
Affects: [Tim / Mike / both / specific workflow]
Source: [GHL release note URL or "Observed in production"]
```

---

## Current Navigation Reference (As of 2026-02-26)

*These are the known stable paths as of system build. Update when GHL changes UI.*

---

### Voice AI

**Access Path:**
Sub-account → Left sidebar → **Voice AI** (may appear as "AI Employees" or "AI Agents" depending on plan/version)

**Active Agent Settings:**
Voice AI → Select agent → **Settings tab**
- Agent name
- Prompt (paste full prompt here)
- Knowledge Bases (attach here)
- Voice selection
- Language

**Knowledge Base Management (Voice AI):**
Voice AI → **Knowledge Bases** tab
- Create / Edit / Delete KBs
- Each KB can contain multiple documents or URLs
- KB attached to agent in agent Settings tab

**Test a Voice AI Call:**
Voice AI → Agent → **Test** tab
- Enter phone number → triggers outbound test call
- Use BOT TESTER contact for all regression testing

---

### Conversation AI

**Access Path:**
Sub-account → Left sidebar → **Conversation AI**

**Bot Settings:**
Conversation AI → **Bots** tab → Select bot → **Settings**
Key settings:
- Bot name
- Status (Auto Pilot / Suggest / Off)
- Channels (SMS, WebChat)
- Max messages
- Tone / Bot Goals
- Toggles: Stop Bot, Human Handover, Auto Followup, Allow Cancel/Reschedule Appointment

**⚠️ TourOps Rule:** All toggles must remain OFF. Escalation handled via tourops_work_state field only.

**Flow Builder (Module Architecture):**
Conversation AI → **Bots** tab → Select bot → **Flow** tab
- Master AI Splitter lives here
- Each module is a "Continue Conversation" node
- Intent routing branches configured here

**Knowledge Base Management (Conv AI):**
Conversation AI → **Knowledge Bases** tab
- Same KB pool as Voice AI
- Attach to bot in bot Settings

**Finding KB Source on a Response:**
Conversations → Open specific conversation → Find AI response in thread
- Look for **"Sources"** citation below the AI message
- Shows which KB document was referenced
- If no source shown → AI answered without KB (protocol violation — flag as prompt issue)
- If wrong source shown → routing logic issue in Flow Builder
- If right source but wrong answer → KB entry needs to be rewritten

**Auto-Summaries:**
Conversation AI → Bot Settings → **Summaries** section
- Inactivity timer: 30 min (TourOps standard)
- Minimum messages: 5
- Writes to: tourops_conversationai_summary field

---

### Contacts & Custom Fields

**View Contact Record:**
Contacts → Search contact → Open record → **Custom Fields** tab (right panel or scroll down)

**Key Fields to Check During QA:**
- `tourops_work_state` — should be AI_ACTIVE unless human is handling
- `tourops_intent_bucket` — disposition written post-call
- `tourops_outcome` — result of conversation
- `tourops_last_score` — grader score (written automatically)
- `tourops_last_interaction_at` — timestamp of last contact

**Filter Contacts by work_state:**
Contacts → **Filters** → Add filter → Custom Field → tourops_work_state → equals → HUMAN_ACTIVE
Use this for daily 9 AM escalation review.

---

### Workflows

**Access Path:**
Sub-account → Left sidebar → **Automation** → **Workflows**

**Key TourOps Workflows:**
| Workflow Name | What It Does |
|--------------|--------------|
| TourOps — VAI — After Call — Disposition | Writes disposition fields post-call |
| TourOps — VAI — After Call — Grader v1.0 | Calls grader, writes tourops_last_score |
| TourOps — Conv AI — Summary to Notes | Appends Conv AI summaries to contact notes |
| TourOps — Stuck State Cleanup | Runs every 4 hours — resets stuck HUMAN_ACTIVE contacts |
| Task Completed Reset | Resets work_state to AI_ACTIVE when operator completes task |

**Opening a Workflow:**
Automation → Workflows → Search by name → Click to open → View trigger + action steps

**Testing a Workflow Manually:**
Open workflow → **Test Workflow** button (top right) → Select contact → Run

---

### Tasks (Escalation Handling)

**View Open Tasks:**
Left sidebar → **Tasks** (or via contact record → Tasks tab)

**Task Title Format (TourOps standard):**
`TOUROPS — {Intent} — {Summary}`
Example: `TOUROPS — DayOf — Bus not at pickup location`

**Completing a Task:**
Open task → Mark complete → System auto-triggers Task Completed Reset workflow → Verify tourops_work_state resets to AI_ACTIVE within 2 minutes

---

### GHL Internal Chat (Team Communication)

**Access:** Bottom left → Chat icon (or Messages → Internal)
Use for: P0/P0b escalations to Todd, deployment notifications, QA flags

---

## Update Log

*Append new entries below — newest at top*

---

**2026-02-26 — Initial Build**
Created from known production configuration as of system launch.
Source: Observed in production during BB deployment.
Covers: Voice AI, Conversation AI, Contacts, Workflows, Tasks.
Next review: When GHL ships a UI update affecting any of the above paths.

---

## Pending Confirmations

*Items that need to be verified in live GHL — not yet confirmed*

| Item | Status | Owner |
|------|--------|-------|
| GHL Snapshot ID for BB Golden Snapshot | ⚠️ Not yet recorded | [TECHNICAL_LEAD] after snapshot creation |
| Exact field name for `booking_id` (native or custom?) | ⚠️ Unconfirmed | [TECHNICAL_LEAD] |
| Exact field name for `arrival_date` | ⚠️ Unconfirmed | [TECHNICAL_LEAD] |
| Drip SMS workflow name that applies tourops_quote_lead tag | ⚠️ Unconfirmed | [TECHNICAL_LEAD] |
| GHL plan tier — Conv AI API (Generations endpoint) available? | ⚠️ Verify before building automated test harness | [TECHNICAL_LEAD] |

---

## GHL Release Notes to Watch

Subscribe to or check regularly:
- **GHL Community Releases:** https://community.gohighlevel.com/c/releases
- **GHL Ideas Changelog:** https://ideas.gohighlevel.com/changelog
- **GHL Status Page:** https://status.gohighlevel.com

When a relevant update is shipped, add an entry to the Update Log above and flag any navigation path changes to Tim before his next QA session.
