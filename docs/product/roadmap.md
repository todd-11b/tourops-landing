# TO_Build_Roadmap.md

**Current Quarter:** Q1 2026 (Jan–Mar)
**Last Updated:** 2026-02-28
**Owner:** Todd Abrams
**Review Frequency:** Every 90 days

---

## Current Quarter Focus (Q1 2026)

1. **Stabilize Schema Contract 3** — Grader fields fully operational across Barley Bus. Validate scoring accuracy over 30 days.
2. **QA infrastructure complete** — VAI Grader + CAI Grader both active and writing scores. Weekly QA reviews using scored data, not manual estimates.
3. **Founder Cohort pipeline ready** — Snapshot v1.2 + Prompt Compiler v1.1 validated and ready to deploy first non-BB operator.
4. **Platform name-agnostic** — Agent persona fully separated from Platform layer. All operators deploying with OP_Profile.md persona overlays.
5. **Airtable data infrastructure live** — GHL → n8n → Airtable QA data flow deployed as reusable template. Per-operator setup under 20 minutes. See n8n_build_spec.md.

---

## Major Releases Planned

| Release | Description | Target Date | KPI Impact | Dependencies |
|---------|-------------|-------------|------------|--------------|
| **Grader v1.0 Full Validation** | Confirm VAI + CAI Grader accuracy over first 30 days of live scoring. Tune scoring rubric if needed. | 2026-03-22 | Quality Score | 30 days of grader data post-2026-02-22 deploy |
| **Founder Cohort Operator #1** | First new operator deployed end-to-end on Schema Contract 3 + Snapshot v1.2 + Prompt Compiler v1.1 + OP_Profile.md. Data infrastructure inherited from reusable n8n template — setup under 20 min. | 2026-03-31 | Call-to-Book Rate (operator) | Operator Custom Values approved, OP_Profile.md submitted, KB built, 19/19 regression pass, Airtable operator row added |
| **BB → Schema Contract 3 Migration** | Migrate Barley Bus from legacy prompt (pre-Schema v2) to Schema Contract 3 compliance. Align all fields, add grader fields to BB production. Create BB OP_Profile.md for persona separation. | **2026-03-03 (within 1 week)** | Quality Score + All BB KPIs | Migration plan written + tested rollback + 19/19 regression pass |

---

## Q2 2026 Pipeline (Preview)

| Release | Description | KPI Impact | Blocked By |
|---------|-------------|------------|-----------|
| BB Schema Migration | Legacy cleanup — BB fully on Contract 3 | All BB KPIs | Q1 grader validation |
| Founder Cohort #2 | Second operator through pipeline. Data infrastructure setup: under 20 min (reusable n8n template — no new build required). | Operator KPIs | Operator #1 complete |
| CORP Conversation AI Module | Handle B2B/corporate intent before human handoff | Escalation Rate | Design approval |

> **Q2 Capacity Note:** The reusable n8n architecture decision (2026-02-28) materially improves deployment velocity. Data layer setup per new operator has dropped from a multi-hour custom build to under 20 minutes. The operator onboarding bottleneck is now GHL snapshot deployment and regression testing — not data infrastructure. Reassess the 1-operator-per-4-week-cycle capacity limit at the start of Q2 with this in mind. See Architecture_Decision_n8n_Reusability.md.

---

## Q3 2026 Pipeline (Horizon)

| Release | Description | KPI Impact |
|---------|-------------|------------|
| Automated Regression Harness | Conv AI API-based test automation (replace manual SMS testing) | Quality Score (velocity) |
| Voice → SMS Channel Handoff | Warm handoff from Voice AI to Conv AI mid-conversation | SMS Engagement Rate |
| Operator #3–5 | Scale founder cohort | Multi-operator KPIs |

---

## Technical Debt Targets

| Debt Item | KPI Impact of Resolving | Priority | Target Quarter |
|-----------|------------------------|----------|----------------|
| BB legacy prompt (pre-Schema v2) | Quality Score (grader can't run accurately), Schema integrity | High | Q1 2026 (2026-03-03) |
| Manual regression testing (19 tests by hand) | Quality Score velocity — slow iteration cycle | Med | Q3 2026 |
| `tourops_handoff_active` mirror field (may be deprecated) | Schema simplicity — reduce redundant fields | Low | Q4 2026 review |

---

## Dependencies

- GHL platform stability (no breaking changes to Voice AI or Conv AI APIs)
- Anthropic API availability for grader calls
- Operator Custom Values document completion (operator-dependent for new deployments)
- OP_Profile.md submission per operator (required before prompt compilation)
- Todd availability for all approval gates (schema, prompt, new operator sign-offs)
- Airtable base stability + n8n reusable template active (required for new operator data infrastructure)

---

## Capacity Limits (Q1 2026)

- Mike: ~60% capacity available for build (remainder on BB_Run QA)
- Todd: Approval-only on builds; strategic decisions + schema design
- New operators: Max 1 per 4-week cycle given current manual test overhead. **Reassess at Q2 start** — n8n reusability removes data infrastructure as a constraint. Remaining constraint is regression testing overhead.
