# TourOps AI Command Center — README
## How to Use This Chat Effectively

**For:** Tim ([QA_MANAGER]) and Mike ([TECHNICAL_LEAD])
**Owner:** Todd Abrams ([SYSTEM_OWNER])
**Last Updated:** 2026-02-28

---

## What This Is

This is the TourOps AI Command Center — a Claude-powered strategic assistant that knows the full TourOps system: schema contracts, GHL architecture, escalation rules, QA rubric, prompt logic, and all operator configurations.

It is not a general AI chatbot. It knows your system specifically.

Use it to:
- Score and analyze GHL conversations
- Get exact GHL navigation guidance
- Flag issues and get prompt or KB fix recommendations
- Run weekly QA reviews
- Get answers on schema, escalation, and workflow questions

---

## The Four Things You'll Do Here

---

### 1 — Score a Conversation (Most Common)

**Tim's primary use case.**

Paste a transcript or conversation summary directly into the chat. Claude will score it across all 6 QA categories, flag any critical failures, and tell you what went wrong and why.

**How to paste a GHL conversation:**

In GHL → Conversations → open the conversation → click the three dots or export option → copy the full transcript text → paste it here.

For Voice AI calls: GHL → Voice AI → Call History → open the call → copy the transcript from the call detail view.

**What to include when you paste:**

```
Channel: [Voice AI or Conversation AI]
Date: [date of conversation]
Transcript:
[paste full transcript here]
```

That's it. Claude will handle the rest.

---

### 2 — Make a Correction (Critical for Continuous Improvement)

If Claude scores something wrong, or you know Hope should have handled something differently — say so directly. This is how the system gets better.

**How to make a correction:**

Just type it in plain language after the score comes back. Examples:

- "She already gave her phone number earlier in the call — Hope should have caught that."
- "Hope never acknowledged it was a bachelorette party. That should have triggered the private tour triage."
- "That escalation should have fired — she said DUI."

Claude will then do one of three things:
1. **Revise the score** with an explanation of why
2. **Flag a KB gap** — Hope didn't have the right information → tells you exactly which KB to fix and what to add
3. **Flag a prompt issue** — Hope had the info but did the wrong thing → drafts the exact language change needed

**The one question that makes corrections more actionable:**

After flagging an issue, answer: **"Was this a KB problem or a logic problem?"**

- KB problem = Hope didn't know the answer
- Logic problem = Hope knew but did the wrong thing

That single distinction tells Claude exactly where to send the fix.

---

### 3 — Get GHL Navigation Help

If you're not sure where something is in GHL, ask directly. Claude knows the TourOps-specific GHL setup and will give you exact paths.

**At the start of any GHL session, Claude will ask:**
*"Want me to check the GHL changelog for recent updates before we dive in?"*

Say yes if you want a quick scan for anything that might have changed. Say no to skip it and get straight to work.

**If Claude gives you a path that doesn't match what you see in GHL:**
Tell Claude exactly what you see on screen. Claude will correct immediately and you can add the update to GHL_Platform_Notes.md so it's logged for future sessions.

---

### 4 — Weekly QA Review (Mike + Tim)

Every Wednesday, use this chat to run the weekly review instead of building it manually.

**How it works:**

Paste or share the week's conversation data — either:
- A summary of scores and issues from your Google Sheets tracker, or
- The GHL Sheets export if the GHL → Sheets automation is active

Then say: *"Run the weekly review."*

Claude will produce a completed Run_Weekly_Review.md entry including KPI summary, friction points, escalation flags, issues log candidates, and recommendations to Todd.

Review it, make any corrections, then hand it to Todd.

---

## Ground Rules for Using This Chat

**Always state your role when starting a session.**
Tim = [QA_MANAGER]. Mike = [TECHNICAL_LEAD].
Claude adjusts its guidance based on who's asking.

**You propose corrections. Claude drafts the fix. Todd approves.**
Neither Tim nor Mike deploys prompt or schema changes directly. Claude drafts — Todd reviews and approves — Mike deploys.

**If something doesn't look right, say so.**
Claude is calibrated by your corrections. Every pushback makes the scoring and guidance tighter. Don't accept a score you disagree with — challenge it and explain why.

**Don't ask Claude to deploy, modify production, or approve changes.**
Claude cannot and will not do this. It will always tell you what to do — not do it for you.

---

## Quick Reference — What to Say

| What you want | What to type |
|---------------|-------------|
| Score a conversation | Paste transcript + "Score this" |
| Flag a correction | "Hope should have done X instead" |
| Get a KB fix | "This was a KB problem — what do I change?" |
| Get a prompt fix | "This was a logic problem — what's the fix?" |
| Find something in GHL | "Where do I find X in GHL?" |
| Run weekly review | "Run the weekly review" + paste data |
| Check GHL changelog | "Check the GHL changelog" |
| Flag an open loop | "Log this as an open loop" |
| Escalate to Todd | Claude will tell you when — follow its direction |

---

## Files That Live in This Project

These are the documents Claude reads to know your system. You don't need to explain context — Claude already has it.

| File | What It Is |
|------|-----------|
| BB_Profile.md | Barley Bus operator config — persona, tone, services, constraints |
| BB_AI_System.md | Active prompt versions, schema contract, GHL bot settings |
| BB_Current_State.md | Live operational state — open loops, risks, next actions |
| GHL_Platform_Notes.md | Running log of GHL UI changes and navigation paths |
| to_run_quality_standard.md | QA rubric — 6 categories, scoring thresholds, critical failures |
| to_run_escalation_playbook.md | Escalation procedures by priority level |
| to_run_operations_manual.md | SOPs for daily review, callbacks, weekly QA |

---

## When to Go to Todd Instead

Go directly to Todd (not through this chat) for:

- Any P0 or P0b escalation on a live customer call
- Any decision to pause Hope
- Any prompt or schema change approval
- Anything that feels like it needs a System Owner decision

Claude will also tell you when to escalate to Todd. Follow that guidance.

---

*This document is a reference — not a rulebook. If something isn't working, say so here and we'll fix it.*
