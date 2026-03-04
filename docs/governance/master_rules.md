# TO_Governance_Master_Rules.md

**Tier:** Tier 0 — No version in filename. Version in header only. Overwrite, never duplicate.
**Version:** v1.1
**Last Updated:** 2026-02-26
**Owner:** Todd Abrams (System Owner)
**Change Authority:** Todd Abrams only

---

## Purpose

This is the constitution for the TourOps Voice AI system. Every project (BUILD, RUN, LEAD) inherits from this document. Nothing in any sub-project overrides these rules.

---

## Operating Principles

1. **Claude proposes. Humans confirm. Always.** No build, deploy, or schema change executes without explicit human approval.
2. **The Schema is the contract.** TourOps_Canonical_Schema_v2_0.md is the sole data contract authority. No field exists outside it. No enum value deviates from it.
3. **One doc per concept. No duplicates. Ever.** If a doc exists, update it. Do not create a parallel version.
4. **Test before deploy. Always.** 19/19 regression tests required. No exceptions. No "we'll monitor it."
5. **Operators never touch system fields.** Operators complete tasks. Automation handles all field writes.
6. **Build once. Document forever.** Every build change logged in Build_Log.md before it goes live.
7. **Every priority replaces one.** No net WIP increase across BUILD, RUN, or LEAD.

---

## AI Usage Rules

- Claude recommends. Todd or designated owner confirms all execution.
- Claude never changes production without explicit human approval.
- Claude flags cross-project impacts before acting (e.g., schema change affects BUILD + RUN + LEAD).
- Claude requests missing docs rather than inferring from gaps.
- Claude AI Command Center (this project) is the QA and analysis layer — not the deployment layer.

---

## Anti-Fork Rules

- One doc per concept. No duplicates.
- If a doc exists, update it. Do not create a new one.
- New file overlaps existing file → flag conflict immediately → stop work until resolved.
- Consolidation before continuation. Always.
- **TourOps-specific:** TourOps_Canonical_Schema_v2_0.md is the only schema authority. No operator, no workflow, no prompt may define schema outside this document.

---

## Document Tiers

| Tier | Type | Example | Filename Versioned? | Who Can Change |
|------|------|---------|-------------------|----------------|
| Tier 0 | Constitution | TO_Governance_Master_Rules.md | No | Todd only |
| Tier 1 | Standards/Contracts | TourOps_Canonical_Schema_v2_0.md | No (version in header) | Todd only |
| Tier 2 | Production Behavior | VAI_Production_Prompt_V6.md | Yes | Todd (or delegated) |
| Tier 3 | Operating Docs | SOPs, checklists, logs | Yes | Mike / Tim |

**Tier 0/1:** No version in filename. Version in header only. Overwrite. Never duplicate.
**Tier 2/3:** Version in filename required. Rollback matters.

---

## Decision Authority

| Decision Type | Authority | Escalates To |
|--------------|-----------|--------------|
| Tier 0/1 doc changes | Todd only | N/A |
| Tier 2 doc changes | Todd or delegated | Todd if disputed |
| Tier 3 doc changes | Mike / Tim | Todd if disputed |
| Schema changes (any) | Todd only | N/A |
| New operator onboarding | Todd approval required | N/A |
| Prompt deployment | Todd sign-off required | N/A |
| GHL agency-level changes | Todd only | N/A |
| Rollback execution | Mike (notifies Todd immediately) | Todd |

---

## Operator Overlay — Persona Configuration

Each operator may define a custom agent persona via their operator profile. The Platform layer is name-agnostic. All persona values live in the operator overlay only.

**Operator overlay header block (OP_Profile.md):**

```
Agent_Name: [Operator-defined agent name, e.g. "Hope", "Jade", "Alex"]
Agent_Tone: [e.g. "Friendly and professional"]
Agent_Intro: [e.g. "Hi, I'm [Agent_Name] with [Company]!"]
```

No agent name, tone, or intro may be hardcoded in any Platform-layer file. All persona references in prompts must use the `Agent_Name` variable from the operator overlay.

---

## TourOps-Specific Non-Negotiables

These rules are absolute. They cannot be overridden by any operator, project, or individual.

1. **`tourops_work_state` is the authoritative AI suppression control.** Tags are visibility-only. Any build that uses tags for AI suppression is non-compliant.
2. **Transfer Bot is banned.** All intent handling occurs within a single bot via Router + Module architecture.
3. **Bot Goals action toggles (Stop Bot, Human Handover) are banned.** Escalation is handled via field writes only.
4. **Enum values are case-sensitive and closed-set.** No value may be used that is not explicitly listed in the current Schema Contract. Enum mismatch blocks deployment.
5. **Disposition writes are required at the end of every module path.** No conversation ends without stamped fields.
6. **Hardcoded operator names/URLs in flow logic are banned.** All operator-specific values live in Custom Values only.
7. **19/19 regression tests required before any production deployment.** Non-negotiable.
8. **Agent persona (name, tone, intro) is defined in the operator overlay only.** Never hardcoded in Platform files.

---

## Work Continuity Rule

- Every project must contain a Current_State.md.
- Unfinished work logged before ending any session.
- No work resumes without reviewing Current_State.md first.
- Current_State.md older than 14 days = governance audit flag.
- Open loops not closed in 14 days → Todd decides immediately.
