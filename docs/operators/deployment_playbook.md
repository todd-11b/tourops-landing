# TO_Deployment_Playbook.md

**Last Updated:** 2026-03-02
**Owner:** Todd Abrams
**Rule:** Follow exactly. No improvising. If a step cannot be completed, stop and escalate to Todd before proceeding.

---

## Deployment Types

| Type | Description | Who Executes | Approval Required |
|------|-------------|--------------|-------------------|
| **Prompt Change** | Modification to Primary Voice Agent prompt or Conv AI module | Mike (builds) → Todd (approves) | Todd sign-off |
| **Schema Change** | Adding/modifying canonical fields or enums | Todd (designs) → Mike (implements) | Todd sign-off |
| **Workflow Change** | GHL automation modification | Mike (builds) → Todd (reviews) | Todd sign-off |
| **New Operator Deploy** | Full onboarding pipeline — see Operator Onboarding Plan | Todd (owns pipeline) → Mike (executes build) | Todd sign-off |
| **Snapshot Update** | Update to Voice Master Snapshot | Todd (designs) → Mike (implements) | Todd sign-off |

---

## Order of Operations (All Deployments)

1. Schema first (if schema is changing)
2. Workflows second (if workflows depend on schema)
3. Prompt last (prompt references fields that must already exist)

Never deploy a prompt that references a field that doesn't exist in production yet.

---

## PLAYBOOK A: Prompt Change Deployment

### Pre-Deploy
1. Build_Log.md entry created with risk level and rollback plan
2. New prompt reviewed against TourOps_Conversation_Design_Standard_v1_0.md
3. Confirm operator OP_Profile.md is on file and Agent_Name is defined
4. Confirm prompt compiler is injecting Agent_Name from OP_Profile.md (not hardcoded)
5. Run regression test suite (19/19 required) on sandbox/staging using new prompt
6. Mike notifies Todd via GHL internal chat: "Prompt [version] ready for review — 19/19 pass"
7. Todd reviews and approves in writing: "Approved to deploy [version]"

### Deploy
8. In GHL Voice AI settings: update prompt to new version
9. Save and activate
10. Verify the agent is live with a single test call (BOT TESTER contact)
11. Confirm disposition fields write correctly after test call

### Post-Deploy
12. Mike logs deployment result in Build_Log.md
13. Mike monitors first 5 live customer calls within 24 hours
14. Mike notifies Todd: "Deployed [version]. Monitoring in progress."
15. Run abbreviated regression (Tests 16–19 minimum) within 48 hours on live system

### If Issues Found
16. Immediately revert to previous prompt version (see Rollback Steps)
17. Log rollback in Build_Log.md
18. Notify Todd immediately via GHL

---

## PLAYBOOK B: New Operator Deployment

For new operator deployments, follow the **Operator Onboarding Plan** (tourops_operator_onboarding_plan.md). That document owns the full pipeline from signature through 30-day impact report, including build phases, regression, data infrastructure, compliance, and go-live.

This playbook retains Playbooks A and C for prompt changes and schema changes, which apply to both new and existing operators.

---

## PLAYBOOK C: Schema Change Deployment

**Note:** Schema changes are High risk by default. Rollback must be written AND tested before any schema change goes live.

### Pre-Deploy
1. Schema change designed in TourOps_Canonical_Schema_v2_0.md (draft)
2. Todd approves schema design
3. Impact analysis: which workflows, prompts, and tests are affected?
4. Rollback plan written and tested in sandbox
5. Regression tests updated to reflect new schema fields/enums
6. Build_Log.md entry created

### Deploy
7. Create new custom fields in GHL sub-account(s)
8. Update workflows to write new fields
9. Deploy updated prompt (if prompt references new fields)
10. Run full regression suite (19/19 required)
11. Update schema doc version in header + deploy updated schema doc to project knowledge

### Post-Deploy
12. Monitor disposition field writes on first 10 conversations
13. Verify no enum drift (check GHL field values match schema)
14. Confirm grader is writing scores correctly
15. Todd signs off: "Schema Contract [N] active in production"

---

## Rollback Steps

### Prompt Rollback (< 15 minutes)
1. Open GHL Voice AI settings
2. Replace current prompt with previous version (keep archived copies in VAI_Version_Archive.md)
3. Save and activate
4. Make test call (BOT TESTER) to confirm prior behavior is restored
5. Log rollback in Build_Log.md with reason

### Schema Rollback
1. Revert custom fields to prior values (do not delete — set to prior defaults)
2. Revert workflows to prior version
3. Run regression suite to confirm prior behavior restored
4. Log rollback in Build_Log.md
5. Notify Todd immediately

---

## Communication Plan

| Event | Notify | Channel | Timing |
|-------|--------|---------|--------|
| Deployment ready for review | Todd | GHL Internal Chat | Before deploy |
| Deployment approved | Mike | GHL Internal Chat | Before deploy |
| Deployment complete | Todd | GHL Internal Chat | Within 1 hour of deploy |
| Issue found post-deploy | Todd | GHL Internal Chat | Immediately |
| Rollback executed | Todd | GHL Internal Chat | Immediately |

---

## Post-Deploy Monitoring Window

| Deployment Type | Monitoring Period | What to Watch | Who Monitors |
|----------------|-------------------|---------------|--------------|
| Prompt change | 48 hours | First 10 live calls scored, escalation logic, field writes | Mike |
| New operator | 7 days | First 10 calls scored, grader firing, no critical failures, Airtable record coverage | Mike |
| Schema change | 72 hours | Enum values in GHL, grader scores, disposition accuracy | Mike + Todd |
| Workflow change | 48 hours | Trigger firing, field write accuracy, no stuck states | Mike |
