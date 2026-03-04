# TourOps Documentation

**Last Updated:** 2026-03-03
**System Owner:** Todd Abrams
**Source of Truth:** This directory. When in doubt, these files win.

---

## Document Map

### Governance — Rules & Authority
| File | Purpose |
|------|---------|
| [governance/master_rules.md](governance/master_rules.md) | Constitution. Operating principles, document tiers, decision authority. Read this first. |
| [governance/change_control.md](governance/change_control.md) | Approval paths for all change types. Who approves what. |
| [governance/conflicts.md](governance/conflicts.md) | Active conflicts register. Version misalignments, blockers. |
| [governance/file_registry.md](governance/file_registry.md) | Master index, bloat prevention rules, auto-archive criteria. |

### System — Architecture & Technical Specs
| File | Purpose |
|------|---------|
| [system/canonical_schema.md](system/canonical_schema.md) | **Schema Contract 3.** All canonical field names, enum values, versioning rules. The authoritative contract. |
| [system/technical_spec.md](system/technical_spec.md) | Architecture: dual AI channels, persona architecture, workflow definitions, platform integrations. |
| [system/conversation_design.md](system/conversation_design.md) | Behavioral specification for all AI conversation systems. Intent buckets, script plays, standards. |
| [system/prompt_compiler.md](system/prompt_compiler.md) | Prompt Compiler v1.1. Generates operator-specific prompts from intake data. |
| [system/n8n_spec.md](system/n8n_spec.md) | GHL → n8n → Airtable data flow. Reusable template architecture, Airtable schema, flow logic. |
| [system/ghl_platform_notes.md](system/ghl_platform_notes.md) | Running log of GHL UI changes, navigation paths, feature notes. |

### Product — Build, Roadmap & Tracking
| File | Purpose |
|------|---------|
| [product/build_contract.md](product/build_contract.md) | Project charter. Scope, KPIs, non-negotiables, standing architecture decisions. |
| [product/roadmap.md](product/roadmap.md) | 90-day roadmap Q1–Q3 2026. Major releases, dependencies, capacity limits. |
| [product/backlog.md](product/backlog.md) | Prioritized build backlog (P1–P3) with KPI linkage and WIP limits. |
| [product/build_log.md](product/build_log.md) | Append-only deployment history. Every change, risk level, rollback status. |
| [product/product_gap_tracker.md](product/product_gap_tracker.md) | Feature readiness matrix. Tier 1–3 features vs. current build state. |

### Operations — Running the System
| File | Purpose |
|------|---------|
| [operations/operations_manual.md](operations/operations_manual.md) | Core SOPs: daily escalation review, weekly QA, callbacks, new operator QA, prompt monitoring. |
| [operations/escalation_playbook.md](operations/escalation_playbook.md) | Escalation handling by priority (P0 safety, P0b legal, DayOf, Human Request, Standard). |
| [operations/quality.md](operations/quality.md) | **Quality standard + scoring rubric combined.** 6-category 1–5 rubric, thresholds, red flags, prompt triggers. |
| [operations/training_guide.md](operations/training_guide.md) | New QA team member onboarding. 5-step training with pass criteria. |
| [operations/weekly_review.md](operations/weekly_review.md) | Weekly review template (Mike, completed Wednesdays). KPIs, friction points, initiatives. |
| [operations/performance_dashboard.md](operations/performance_dashboard.md) | Weekly performance metrics dashboard template. Primary KPI, lagging/leading indicators. |
| [operations/issues_log.md](operations/issues_log.md) | Recurring issues log (2+ occurrence rule). Categories, severity, monthly metrics. |

### QA & Testing
| File | Purpose |
|------|---------|
| [qa-testing/regression_test_suite.md](qa-testing/regression_test_suite.md) | 19-test Voice AI regression suite. Required 19/19 before any production deploy. |
| [qa-testing/testing_protocol.md](qa-testing/testing_protocol.md) | Pre-deployment testing checklist. Schema compliance, AI controls, persona compliance, auto-fail conditions. |

### Operators — Onboarding & Deployment
| File | Purpose |
|------|---------|
| [operators/onboarding_plan.md](operators/onboarding_plan.md) | Complete 8-phase operator onboarding pipeline (Day 0 → 30-day impact report). |
| [operators/deployment_playbook.md](operators/deployment_playbook.md) | Deployment playbooks A (prompt), B (new operator), C (schema). Includes rollback procedures. |
| [operators/barley_bus.md](operators/barley_bus.md) | Barley Bus operator file. Profile, AI system config, current live state. Single source of truth for BB. |

### Prompts
| File | Purpose |
|------|---------|
| [prompts/vai_production_prompt.md](prompts/vai_production_prompt.md) | Hope V5.0 production Voice AI prompt (legacy, pre-Schema v2). Migration to Compiler v1.1 planned Q2 2026. |

### State
| File | Purpose |
|------|---------|
| [state/active_state.md](state/active_state.md) | Current system snapshot. Open loops, conflicts, build/governance state. Update at session start/end. |

### Reference
| File | Purpose |
|------|---------|
| [reference/deep_research_report.md](reference/deep_research_report.md) | Vertical SaaS research. 35+ platforms, 7 verticals, Tour Operator OS positioning and strategy. |
| [reference/launch_brief.md](reference/launch_brief.md) | Landing page technical launch plan. GHL tracking, Vercel deployment, soft launch strategy. |
| [reference/ai_command_center.md](reference/ai_command_center.md) | User guide for Claude AI Command Center (Tim/Mike). Use cases, ground rules, quick reference. |
| [reference/mockups.html](reference/mockups.html) | UI mockups for GHL-integrated TourOps platform (5 views). |

---

## What Was Consolidated

45 source files → 34 organized files. Eliminated:

| Removed | Reason |
|---------|--------|
| `tourops_operator_onboarding_plan__1_.md` | Exact duplicate of onboarding_plan.md |
| `to_deployment_playbook__1_.md` | Superseded by v2 (deployment_playbook.md) |
| `compass_artifact_wf-bf168f43-...md` | Duplicate of deep_research_report.md (UUID-named Claude artifact export) |
| `bb_profile.md` | Merged into operators/barley_bus.md |
| `bb_ai_system.md` | Merged into operators/barley_bus.md |
| `bb_current_state__2_.md` | Merged into operators/barley_bus.md |
| `quality_scoring_rubric__1_.md` | Merged into operations/quality.md |
| `to_run_quality_standard.md` | Merged into operations/quality.md |
| `Architecture_Decision_n8n_Reusability.md` | Merged into system/n8n_spec.md |
| 5 × .docx / .pdf investor docs | Investor/research artifacts — not operational docs |

---

## Authority Hierarchy

```
Tier 0 — Constitution
  governance/master_rules.md

Tier 1 — System Contracts
  system/canonical_schema.md
  product/build_contract.md

Tier 2 — Production Behavior
  system/conversation_design.md
  system/technical_spec.md
  prompts/vai_production_prompt.md
  operators/barley_bus.md

Tier 3 — QA & Operations
  qa-testing/regression_test_suite.md
  operations/quality.md
  operations/operations_manual.md
  (all other ops files)
```

When files conflict, higher tier wins. All changes require Todd Abrams approval per [governance/change_control.md](governance/change_control.md).
