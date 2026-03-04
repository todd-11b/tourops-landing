# TO_Governance_File_Registry.md

**Tier:** Tier 1 — No version in filename. Version in header only.
**Version:** v1.2
**Last Updated:** 2026-02-28
**Owner:** Todd Abrams
**Audit Frequency:** Monthly
**Purpose:** Master index of every file in the TourOps Voice AI project. Single source of truth for what exists, what's current, and what's required.

---

## Bloat Prevention Rules

- Optional file cap: Max 2 optional files per project. 3rd requires Todd approval.
- Auto-archive: Any file not referenced in Current_State.md, Build_Log.md, Run_Weekly_Review.md, or a decision in 45 days → rename to `ARCHIVE_CANDIDATE_[filename]` until reviewed.
- One doc per concept. If two files cover the same topic → flag conflict → consolidate.

---

## Project Registry

| Project | Template | Required Files | Optional Cap | Primary User | Last Audited |
|---------|----------|---------------|--------------|--------------|--------------|
| TO_Build | TEMPLATE_BUILD | Build_Contract, Technical_Spec, Build_Backlog, Build_Log, Testing_Protocol, Deployment_Playbook, Build_Roadmap, Current_State | 2 max | Todd / Mike | 2026-02-28 |
| TO_Run | TEMPLATE_RUN | Operations_Manual, Quality_Standard, Issues_Log, Performance_Dashboard, Escalation_Playbook, Training_Guide, Run_Weekly_Review, Current_State | 2 max | Mike / Tim | 2026-02-28 |
| TO_Lead | TEMPLATE_LEAD | KPI_Scorecard, Decision_Log, Strategic_Priorities, Growth_Plan, Risk_Register, Constraint_Log, Current_State | 2 max | Todd | 2026-02-28 |
| TO_Governance | TEMPLATE_GOVERNANCE | Master_Rules, File_Registry, Change_Control_Policy, Open_Loops_Register, Conflicts_Register, Current_State | Templates only | Todd | 2026-02-28 |

---

## Production Document Registry

All files that govern TourOps system behavior. These are the files that matter for operations — separate from project management files above.

### Tier 1 — System Contracts (Todd Only)

| File | Current Version | Tier | Purpose | Last Updated |
|------|----------------|------|---------|-------------|
| TourOps_Canonical_Schema_v2_0.md | Contract 3, Doc r06 | Tier 1 | **MASTER DATA CONTRACT** — all field names, enums, allowed values, disposition write rules | 2026-02-22 |
| TourOps_Conversation_Design_Standard_v1_0.md | Doc r07 | Tier 1 | Behavioral backbone — how all AI channels talk to customers | Current |
| TourOps_GHL_Platform_Capabilities_v1_0.md | Doc r06 | Tier 1 | Platform constraint ledger — validated capabilities and anti-patterns | 2026-02-17 |
| TourOps_Escalation_Playbook_v2.md | Doc r02 | Tier 1 | Escalation lifecycle, SLAs, operator actions, closure automation | 2026-02-14 |

### Tier 2 — Production Behavior (Todd Approval Required)

| File | Current Version | Purpose | Last Updated | Status |
|------|----------------|---------|-------------|--------|
| VAI_Production_Prompt_BB.md | Current BB version | Live Voice AI prompt — Barley Bus | Legacy (pre-Schema v2) | ⚠️ Migration pending |
| TourOps_Voice_Master_Snapshot_Build_Guide_v1_2.md | v1.2 | **PRIMARY BUILD GUIDE** — snapshot build | 2026-02-17 | ✅ Current |
| TourOps_Prompt_Compiler_v1_1.md | Doc r04 | Generates operator-specific prompts (name-agnostic; persona injected via OP_Profile.md) | 2026-02-20 | ✅ Current |
| TourOps_Version_Governance_Matrix_v1_0.md | Doc r01 | Compatibility matrix — schema/snapshot/prompt versions | 2026-02-14 | ⚠️ Needs update for Schema Contract 3 (due 2026-03-07) |
| Operator_Custom_Values_Template_v1_2.md | v1.4 | Operator intake template | 2026-02-22 | ✅ Current |
| Operator_Playbook_BarleyBus_v2.md | v2 | BB-specific operational guide | Current | ✅ Active |
| OP_Profile_Template.md | v1.0 | Operator overlay — defines Agent_Name, Agent_Tone, Agent_Intro per operator | 2026-02-26 | ✅ Current |
| n8n_build_spec.md | v1.1 | GHL → n8n → Airtable QA data flow. Defines n8n flow logic, Airtable schema (Operators, Conversations, Errors tables), critical failure alerting, and reusability verification requirements. Todd approval required to change. | 2026-02-28 | ✅ Current |
| Architecture_Decision_n8n_Reusability.md | v1.0 | Standing architecture decision — n8n flow is a reusable template; operator name passed as variable, never hardcoded. Governs all new operator deployments. Todd approval required to change. | 2026-02-28 | ✅ Current |

### Tier 3 — QA & Operations (Mike / Tim)

| File | Current Version | Purpose | Last Updated | Status |
|------|----------------|---------|-------------|--------|
| Quality_Scoring_Rubric.md | (1) | 6-category 1–5 scoring rubric | Stable | ✅ Current |
| Weekly_Review_Checklist.md | (1) | Monday QA review process | Stable | ✅ Current |
| VAI_Issues_Log_v1_0.md | v1.0 | Recurring issues log (2+ occurrences) | 2026-02-12 | ✅ Active |
| TourOps_Build_Test_Log_v1_1.md | v1.1 | Build history, deployment decisions, test results | 2026-02-22 | ✅ Active |
| VAI_Operational_Rules_v2.md | Doc r01 | Non-negotiable Primary Voice Agent behavior rules | 2026-02-14 | ✅ Active |

### Testing

| File | Current Version | Purpose | Status |
|------|----------------|---------|--------|
| TourOps_Voice_AI_Regression_Test_Suite_v1_0.md | Doc r01 | 19 RACE-format Voice AI tests | ✅ Current |
| TourOps_Regression_Test_Suite_v2.md | v2 | 19 Conversation AI tests | ✅ Current |
| TourOps_AI_Build_Testing_Rules_v2.md | v2 | Testing methodology and protocols | ✅ Current |

### Version History

| File | Purpose |
|------|---------|
| VAI_Version_Archive.md | Historical record of all Voice AI prompt versions |
| Prompt_Changelog_UPDATED.md | Change log for Voice AI prompts |

### Deprecated

| File | Status | Retain Until |
|------|--------|-------------|
| TourOps_Canonical_Schema_v1_DEPRECATED.md | Deprecated | Q3 2026 (after BB migration confirms v2 working) |
| TourOps_Voice_Master_Snapshot_Build_Guide_v1_1.md | Superseded by v1.2 | Can archive now |
| TourOps_Prompt_Compiler_v1_0.md | Superseded by v1.1 | Can archive now |
| VAI_Version_Archive.md | Superseded by VAI_Version_Archive.md | Retain for historical reference until BB migration confirmed |
| Hope_Issues_Log_v1_0.md | Superseded by VAI_Issues_Log_v1_0.md | Can archive now |
| Hope_Operational_Rules_v2.md | Superseded by VAI_Operational_Rules_v2.md | Can archive now |
| ARCHIVE_CANDIDATE_to_gov_conflicts_v1_1.md | Superseded by to_gov_conflicts.md v1.2 | Can delete — conflict resolved 2026-02-28 |

---

## Monthly Audit Prompt

Run this every 30 days:

*"Audit the TO_Governance_File_Registry. For each project: confirm required files exist, flag unapproved files, flag stale files (Current_State.md older than 14 days, any file not referenced in 45 days), identify conflicts, flag missing files."*

### Audit Checklist

**Schema Compliance**
- [ ] TourOps_Canonical_Schema_v2_0.md matches production field configuration in GHL
- [ ] No unauthorized fields found in GHL sub-accounts during audit
- [ ] All enum values in GHL match schema exactly (case-sensitive check)
- [ ] Airtable Conversations table fields in n8n_build_spec.md cross-checked against Canonical Schema

**Version Currency**
- [ ] TourOps_Version_Governance_Matrix_v1_0.md updated for Schema Contract 3 (due 2026-03-07)
- [ ] VAI_Production_Prompt_BB.md — BB migration to Schema Contract 3 on track (target 2026-03-03)
- [ ] All Tier 2 files updated in last 30 days (or flagged as stable)

**Project Files**
- [ ] All Current_State.md files updated within 14 days
- [ ] No project exceeds optional file cap (2 max)
- [ ] Open_Loops_Register has no loops past 14 days
- [ ] Conflicts_Register has no unresolved conflicts past 7 days

**Persona Compliance**
- [ ] No agent name, tone, or intro hardcoded in any Platform-layer file
- [ ] All active operators have an OP_Profile.md with Agent_Name defined
- [ ] Prompt Compiler v1.1 confirmed to inject persona from OP_Profile.md only

**n8n / Airtable Compliance**
- [ ] n8n flow verified: no hardcoded operator names in any node
- [ ] Airtable Operators table has a row for every active operator
- [ ] Critical failure alerting confirmed active (GHL Task created within 60 seconds of trigger)

**Deprecated Files**
- [ ] Deprecated files are renamed with ARCHIVE_CANDIDATE or DEPRECATED suffix
- [ ] No deprecated files referenced in active SOPs or prompts
