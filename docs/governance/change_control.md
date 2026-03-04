# TO_Governance_Change_Control_Policy.md

**Tier:** Tier 1 — No version in filename. Version in header only.
**Version:** v1.1
**Last Updated:** 2026-02-26
**Owner:** Todd Abrams
**Change Authority:** Todd Abrams only

---

## Purpose

This document governs how changes get approved and deployed across the TourOps Voice AI system. Every change type has a defined approval path. No exceptions.

---

## Approval Requirements

| Change Type | Approval Required | Process | Risk Level |
|------------|------------------|---------|------------|
| Schema field add/modify | Todd only | Design → approve → BUILD implements → 19/19 regression → deploy | High |
| Schema enum change | Todd only | Design → approve → audit all usages → update test suite → deploy | High |
| Prompt change (any operator) | Todd sign-off | BUILD builds → regression 19/19 → Todd approves → deploy | Med |
| Workflow change (GHL) | Todd review | BUILD builds → test → Todd reviews → deploy | Med |
| New operator deployment | Todd sign-off | Operator intake → KB build → snapshot → compiler → 19/19 → Todd sign-off → go live | Med |
| Snapshot update | Todd approval | BUILD designs → tests → Todd approves → exports new snapshot | Med |
| KB content change | Mike (operator-level) | Operator submits → Mike reviews → update → spot-check | Low |
| Tier 3 doc update | Mike / Tim | Update → flag if changes SOP behavior | Low |
| Tier 2 doc update | Todd or delegated | Update → re-upload to project knowledge | Med |
| Tier 0/1 doc update | Todd only | Update → re-upload → notify team | High |
| GHL agency-level change | Todd only | Flag in Governance → approve → deploy | High |

---

## Schema Change Protocol (Highest Risk)

Schema changes are breaking changes by definition. Follow exactly:

1. **Design phase:** Todd drafts proposed field/enum change with rationale and KPI justification
2. **Impact analysis:** Which workflows, prompts, and tests are affected? Document all.
3. **Test suite update:** Update regression tests to reflect new schema BEFORE deploying
4. **Rollback plan written and tested** in sandbox (required — no exceptions)
5. **Build_Log.md entry created** before any production change
6. **Deploy:** Fields first → workflows second → prompts last
7. **Verify:** Run 19/19 regression suite post-deploy
8. **Schema doc updated:** TourOps_Canonical_Schema_v2_0.md updated in header + re-uploaded to project knowledge
9. **Version Governance Matrix updated:** TourOps_Version_Governance_Matrix_v1_0.md updated to reflect new compatible versions
10. **Todd sign-off:** "Schema Contract [N] active in production — [date]"

**Schema Contract Increment Rules:**
- Adding new fields → increment Contract number (Contract 3 → Contract 4)
- Modifying existing enum values → increment Contract number
- Editorial/clarification changes → increment Doc revision (r06 → r07)
- Removing deprecated fields → increment Contract number + 30-day deprecation notice to operators

---

## Prompt Change Protocol

1. BUILD drafts prompt change with before/after text
2. Run regression suite (19/19 required) on sandbox with new prompt
3. Mike notifies Todd via GHL internal chat: "Prompt [version] ready for review — 19/19 pass"
4. Todd reviews and approves in writing
5. Deploy per Deployment_Playbook.md (Playbook A)
6. Mike monitors first 5 live conversations, reports to Todd at 24h and 48h

---

## Decision Expiry Policy

- Every decision in the Decision_Log must have a review date
- Past review date without Keep/Kill/Adjust resolution → escalate to Governance
- No decision stays open indefinitely
- Todd resolves all expired decisions within 48 hours of flag

---

## Priority WIP Limits

| Layer | WIP Limit | Rule |
|-------|-----------|------|
| TO_Build P1 items | Max 3 active | No new P1 without closing one |
| TO_Run improvement initiatives | Max 3 active | No 4th without pausing one |
| TO_Lead strategic initiatives | Max 3 active | Adding 4th requires killing or pausing one |
| Active experiments (TO_Lead) | Max 3 | No new experiment without one closing or dying |

---

## Change Freeze Periods

- **Peak booking weekends** (operator-defined, typically Fri–Sun): No prompt or schema changes during active tour days. Emergency rollbacks only.
- **New operator go-live week:** No changes to shared platform components (schema, snapshot) during a new operator's first 7 days live.

---

## Auto-Archive Rule

Any file not referenced in Current_State.md, Build_Log.md, Run_Weekly_Review.md, or a logged decision in 45 days → rename to `ARCHIVE_CANDIDATE_[filename]`. Todd reviews within 14 days: archive, restore, or delete.

---

## Template Freeze Rule

TO_Governance project templates change only via:
1. Logged governance decision in Governance Current_State.md
2. Explicit Todd approval
3. Version increment in the file header

No edits outside this process.

---

## TourOps-Specific Change Control Rules

### Anti-Pattern Ban List (Immutable)
These cannot be introduced via any change, regardless of rationale:
- Transfer Bot usage in any Conv AI flow
- Tags as AI suppression mechanism
- Bot Goals action toggles (Stop Bot, Human Handover) for escalation control
- Hardcoded operator names/URLs in flow logic
- Hardcoded agent persona (name, tone, intro) in any Platform-layer file
- Any field outside TourOps_Canonical_Schema_v2_0.md without schema change approval

If a proposed change would require any of the above → rejected without review.

### Operator Custom Extensions
Operators may extend SMS templates using the `OPERATOR__` prefix.
Operators may define agent persona (name, tone, intro) via `Agent_Name:` in their OP_Profile.md.
Operators may NOT:
- Add custom fields to the schema
- Create new enum values
- Modify workflow logic outside their KB content
- Override canonical field behavior
- Hardcode persona values into Platform-layer prompt templates

All operator customization lives in Custom Values and OP_Profile.md only.
