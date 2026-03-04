# TO_Build_Contract.md

**Version:** v1.1
**Last Updated:** 2026-02-26
**Owner:** Todd Abrams (System Owner)
**Change Authority:** Todd Abrams only
**Tier:** Tier 1 — No version in filename. Version in header only. Overwrite, never duplicate.

---

## System Name
TourOps Voice AI — Build Project

## Primary KPI Owned by This Project
**Voice AI Conversation Quality Score ≥ 4.0 average across all operators**

Every build decision must tie back to this KPI. If it doesn't, it doesn't belong here.

---

## Scope

This system owns the design, build, testing, and deployment of:

- Voice AI prompt architecture (Primary Voice Agent and operator variants)
- Conversation AI Flow Builder modules and routing logic
- Canonical Schema (tourops_* fields, enums, lifecycle states)
- GHL workflow automation (During Call, After Call, Grader, Disposition, Escalation)
- Snapshot architecture (Voice Master Snapshot)
- Prompt Compiler tooling
- QA Grader workflows (VAI Grader, CAI Grader)
- Regression test suite and testing infrastructure
- Operator onboarding build pipeline
- OP_Profile.md template (operator persona overlay)

---

## Explicit Non-Scope

- Day-to-day QA reviews and weekly scoring → redirect to TO_Run
- KPI decisions, strategic priorities, and roadmap choices → redirect to TO_Lead
- Operator business decisions (tour types, pricing, policies) → operator's responsibility
- GHL agency-level configuration (requires OAW_Governance escalation)
- BarleyBus-specific production changes → BB_Build, not TO_Build

---

## Non-Negotiables

**Data integrity:** All fields must conform to TourOps_Canonical_Schema_v2_0.md (current contract). No unauthorized fields, no enum drift.

**Versioning:** All Tier 2+ files require version number in filename. Breaking changes increment major version (v2.0). Additive changes increment minor (v1.1). Fixes increment patch (v1.0.1).

**Testing:** Nothing deploys without passing the current regression test suite (TourOps_Voice_AI_Regression_Test_Suite_v1_0.md — 19/19 required). No exceptions.

**Schema Authority:** TourOps_Canonical_Schema_v2_0.md is the system contract. All builds must implement its enums, field names, and values exactly. Case-sensitive. No exceptions.

**Approval:** All prompt changes require Todd Abrams sign-off before deployment. All schema changes require Todd Abrams sign-off before any build begins.

**Rollback:** Every High-risk deployment requires a written and tested rollback plan before deployment begins.

**Persona:** Agent name, tone, and intro are never hardcoded in Platform-layer files. All persona values are injected via OP_Profile.md at the operator level.

---

## Constraint Policy

No feature may be added if it increases system complexity without reducing an existing bottleneck. Every addition must remove or reduce something. Adding a workflow requires retiring or consolidating an existing workflow where possible.

---

## Dependencies

- GHL (GoHighLevel) — primary platform (Voice AI, Conversation AI, workflows, contacts, SMS)
- n8n — automation and processing layer
- Google Sheets — data ledger and QA tracking
- Claude AI Command Center — QA review, test generation, prompt analysis
- Anthropic API — grader AI calls (via webhook)
- TourOps_Canonical_Schema_v2_0.md — system data contract (must match production at all times)
- TourOps_Conversation_Design_Standard_v1_0.md — behavioral standard for all AI modules
- TourOps_GHL_Platform_Capabilities_v1_0.md — platform constraint ledger (must be consulted before building any new automation)
- OP_Profile_Template.md — operator persona overlay (required for all new operator deployments)

---

## Standing Architecture Decisions

| Decision | Rationale | Date |
|----------|-----------|------|
| `tourops_work_state` is authoritative AI suppression control | Tags proved unreliable; field-level control is deterministic | 2026-02-14 |
| Schema enums are case-sensitive and closed-set | Prevents routing failures from casing drift | 2026-02-14 |
| Disposition writes happen at end of every module path | Ensures no contact leaves a conversation without stamped state | 2026-02-14 |
| Narrative memory fields (summaries) are context-only, not authoritative | Prevents summary drift from overriding accurate canonical state | 2026-02-17 |
| Regression suite must be 19/19 before any production deployment | Zero tolerance for known regressions | 2026-02-14 |
| Agent persona is operator-defined via OP_Profile.md only | Keeps Platform name-agnostic; enables multi-operator persona differentiation without prompt forks | 2026-02-26 |
