# TO_Build_Log.md

**Purpose:** Permanent record of every change. Never delete. Append only.
**Owner:** Todd Abrams
**Rule:** Every deployment, schema change, prompt change, and workflow change gets a log entry before it goes live.

---

| Date | Change Made | Reason | Risk Level | Tests Run | KPI Impacted | Rollback Plan Written | Rollback Tested | Result |
|------|-------------|--------|------------|-----------|--------------|----------------------|-----------------|--------|
| 2026-03-03 | **Hope V6.0 drafted — PENDING DEPLOY.** Path architecture (A–G) replacing MODE/URGENCY model. KB-only URL enforcement (removed all hardcoded URLs from prompt). Consultation booking flow added. Private tour path overhauled. Personality section consolidated into prompt. V5.0 remains live until 19/19 pass + Todd sign-off. | Cleaner intent routing, KB-only URL compliance, improved private tour and consultation handling. | Med | ❌ Not yet run — 19/19 required before deploy | Voice AI Quality Score | Y — rollback = restore V5.0 | N — required before deploy | 🟡 DRAFT. Awaiting regression test run. |
| 2026-02-26 | **Platform name-agnostic refactor.** Removed all hardcoded agent persona references (name, tone, intro) from Platform-layer files. Created OP_Profile_Template.md for operator persona overlays. Agent_Name, Agent_Tone, Agent_Intro now defined per operator in OP_Profile.md only. Prompt Compiler v1.1 confirmed as injection point. | Increase portability across operators. Eliminate persona-based prompt forks. Reduce operator setup time. | Low | N/A — documentation change only | Deployment Consistency / Operator Onboarding Time | N/A | N/A | ✅ Complete. All Platform files updated. OP_Profile_Template.md created. BB operator OP_Profile.md pending (due 2026-03-03). |
| 2026-02-24 | **Accepted risk: Schema Contract 3 rollback plans not sandbox-tested.** All Contract 3 deployments (2026-02-14 through 2026-02-22) have written rollback plans but none were tested in sandbox prior to deployment. Todd acknowledges this is a policy exception. Rollback must be tested before any Contract 4 or future schema change proceeds. | Formal risk acceptance — closes policy gap identified during governance audit | High | N/A | Schema integrity | Y | N — Risk Accepted | ✅ Risk logged. Rollback testing required for all future High risk schema changes. No Contract 4 work begins without tested rollback. |
| 2026-02-22 | Added QA Grader Fields to Schema Contract 3: `tourops_last_score`, `tourops_last_review_date`, `tourops_issue_count` | Enable automated per-conversation quality scoring across all operators | Med | Schema audit + field verification in BB production | Quality Score | Y | N | ✅ Fields active in production (BB). Grader workflows writing scores. |
| 2026-02-22 | Deployed VAI Grader Workflow v1.0 | Automate Voice AI quality scoring post-call | Med | Manual trigger test + score verification | Quality Score | Y | N | ✅ Scoring active. Issue_count alert logic confirmed. |
| 2026-02-22 | Deployed CAI Grader Workflow v1.0 | Automate Conversation AI quality scoring post-session | Med | Manual trigger test + score verification | Quality Score | Y | N | ✅ Scoring active. |
| 2026-02-17 | Added Narrative Memory Fields (Section 5a of Schema): `tourops_voiceai_summary`, `tourops_conversationai_summary` | Enable cross-channel memory continuity (Voice → SMS and vice versa) | Med | Field existence check + memory injection test in Conv AI | Context Awareness Score | Y | N | ✅ Both fields writing. Cross-channel context confirmed working in BB. |
| 2026-02-17 | Enabled GHL Auto-Summaries — "TourOps — Conv AI — Summary to Notes" workflow | Write Conv AI session summaries to contact notes as permanent audit trail | Low | End-to-end session test with 5+ messages | Context Awareness Score | Y | N | ✅ Active in BB production. Summaries appending to notes. |
| 2026-02-17 | Voice Master Snapshot Build Guide updated to v1.2 | Supersedes v1.1 — incorporates all Schema Contract 3 fields and grader workflow setup | Low | Checklist review vs. production BB configuration | Deployment Speed | N/A | N/A | ✅ Authoritative build guide updated. |
| 2026-02-17 | Prompt Compiler updated to v1.1 | Align compiler output with Schema Contract 3 and Design Standard v1.0 | Low | Compiler output reviewed against schema | Deployment Consistency | N/A | N/A | ✅ New operators use v1.1 compiler. |
| 2026-02-14 | Canonical Schema Contract 2 published | Replace route/module/action model with intent_bucket/script_play/outcome/next_best_action lifecycle model. work_state becomes authoritative AI suppression control. | High | Schema audit + BB workflow review | All KPIs | Y | Y | ✅ Schema Contract 2 active. Regression suite rewritten to match. |
| 2026-02-14 | Voice AI Regression Test Suite v1.0 published (19 tests) | Standardize pre-deployment validation. No more manual ad hoc testing. Test #19 (Stuck-State) added to require auto-remediation validation. | Low | N/A (suite itself is the test artifact) | Quality Score | N/A | N/A | ✅ 19 RACE-format tests created. Used for all future deployments. |
| 2026-02-14 | Schema Contract 3 / Doc r06 — QA Grader Fields | Added Section 5b, 3 grader fields, ops_manager_user_id and tourops_admin_user_id custom values | Med | Pre-deployment checklist verified | Quality Score | Y | N | ✅ Schema updated. Downstream docs flagged for update. |

---

**Next Entry:** Add row above this line when next build is logged.

**Note on historical entries:** Entries dated 2026-02-14 through 2026-02-22 reference "Hope" prompt versions (e.g., Hope V5.0) in the original build record. These are retained as-is for historical accuracy. All new entries use Platform-layer naming (Primary Voice Agent, VAI, operator-specific names via OP_Profile.md).

**Rollback Tested = Y required for all High risk builds before deployment.**
