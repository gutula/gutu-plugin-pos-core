# POS Core

<p align="center">
  <img src="./docs/assets/gutu-mascot.png" alt="Gutu mascot" width="220" />
</p>

Retail session, till state, receipt journals, cashier shifts, and offline-tolerant POS execution surfaces that settle into inventory and accounting through explicit handoff.

![Maturity: Hardened](https://img.shields.io/badge/Maturity-Hardened-2563eb) ![Verification: Build+Typecheck+Lint+Test+Contracts+Migrations+Integration](https://img.shields.io/badge/Verification-Build%2BTypecheck%2BLint%2BTest%2BContracts%2BMigrations%2BIntegration-2563eb) ![DB: postgres+sqlite](https://img.shields.io/badge/DB-postgres%2Bsqlite-2563eb) ![Integration Model: Actions+Resources+Jobs+Workflows+UI](https://img.shields.io/badge/Integration%20Model-Actions%2BResources%2BJobs%2BWorkflows%2BUI-2563eb)

## Part Of The Gutu Stack

| Aspect | Value |
| --- | --- |
| Repo kind | First-party plugin |
| Domain group | Operational Data |
| Default category | Business / POS & Retail |
| Primary focus | sessions, receipt journals, sync reconciliation |
| Best when | You need a governed domain boundary with explicit contracts and independent release cadence. |
| Composes through | Actions+Resources+Jobs+Workflows+UI |

- Gutu keeps plugins as independent repos with manifest-governed boundaries, compatibility channels, and verification lanes instead of hiding everything behind one giant mutable codebase.
- This plugin is meant to compose through explicit actions, resources, jobs, workflows, and runtime envelopes, not through undocumented hook chains.

## What It Does Now

Owns POS sessions, receipt journals, and sync or closeout exception state while handing settled stock and finance effects downstream explicitly.

- Exports 7 governed actions: `pos.sessions.open`, `pos.receipts.record`, `pos.sessions.close`, `pos.sessions.hold`, `pos.sessions.release`, `pos.sessions.amend`, `pos.sessions.reverse`.
- Owns 3 resource contracts: `pos.sessions`, `pos.receipts`, `pos.reconciliation`.
- Publishes 2 job definitions with explicit queue and retry policy metadata.
- Publishes 1 workflow definition with state-machine descriptions and mandatory steps.
- Adds richer admin workspace contributions on top of the base UI surface.
- Ships explicit SQL migration or rollback helpers alongside the domain model.
- Documents 6 owned entity surface(s): `POS Session`, `Receipt Journal`, `Offline Sync Record`, `Shift Close`, `Cashier Variance`, `Tender Reconciliation`.
- Carries 4 report surface(s) and 3 exception queue(s) for operator parity and reconciliation visibility.
- Tracks ERPNext reference parity against module(s): `Accounts`, `Selling`.
- Operational scenario matrix includes `register-open-to-close`, `offline-sale-replay`, `refund-or-exchange`, `cashier-close-reconciliation`.
- Governs 3 settings or policy surface(s) for operator control and rollout safety.

## Maturity

**Maturity Tier:** `Hardened`

This tier is justified because unit coverage exists, contract coverage exists, integration coverage exists, migration coverage exists, job definitions are exported, and workflow definitions are exported.

## Verified Capability Summary

- Domain group: **Operational Data**
- Default category: **Business / POS & Retail**
- Verification surface: **Build+Typecheck+Lint+Test+Contracts+Migrations+Integration**
- Tests discovered: **5** total files across unit, contract, integration, migration lanes
- Integration model: **Actions+Resources+Jobs+Workflows+UI**
- Database support: **postgres + sqlite**

## Dependency And Compatibility Summary

| Field | Value |
| --- | --- |
| Package | `@plugins/pos-core` |
| Manifest ID | `pos-core` |
| Repo | [gutu-plugin-pos-core](https://github.com/gutula/gutu-plugin-pos-core) |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `sales-core`, `pricing-tax-core`, `inventory-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.pos`, `events.publish.pos` |
| Provided Capabilities | `pos.sessions`, `pos.receipts`, `pos.reconciliation` |
| Runtime | bun>=1.3.12 |
| Database | postgres, sqlite |
| Integration Model | Actions+Resources+Jobs+Workflows+UI |

## Capability Matrix

| Surface | Count | Details |
| --- | --- | --- |
| Actions | 7 | `pos.sessions.open`, `pos.receipts.record`, `pos.sessions.close`, `pos.sessions.hold`, `pos.sessions.release`, `pos.sessions.amend`, `pos.sessions.reverse` |
| Resources | 3 | `pos.sessions`, `pos.receipts`, `pos.reconciliation` |
| Jobs | 2 | `pos.projections.refresh`, `pos.reconciliation.run` |
| Workflows | 1 | `pos-session-lifecycle` |
| UI | Present | base UI surface, admin contributions |
| Owned Entities | 6 | `POS Session`, `Receipt Journal`, `Offline Sync Record`, `Shift Close`, `Cashier Variance`, `Tender Reconciliation` |
| Reports | 4 | `POS Shift Summary`, `Cashier Variance`, `POS Closing Summary`, `Offline Sync Exceptions` |
| Exception Queues | 3 | `offline-sync-conflicts`, `cashier-variance-review`, `duplicate-receipt-replay` |
| Operational Scenarios | 4 | `register-open-to-close`, `offline-sale-replay`, `refund-or-exchange`, `cashier-close-reconciliation` |
| Settings Surfaces | 3 | `POS Settings`, `POS Profile`, `Mode of Payment` |
| ERPNext Refs | 2 | `Accounts`, `Selling` |

## Quick Start For Integrators

Use this repo inside a **compatible Gutu workspace** or the **ecosystem certification workspace** so its `workspace:*` dependencies resolve honestly.

```bash
# from a compatible workspace that already includes this plugin's dependency graph
bun install
bun run build
bun run test
bun run docs:check
```

```ts
import { manifest, openPosSessionAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/pos-core";

console.log(manifest.id);
console.log(openPosSessionAction.id);
console.log(BusinessPrimaryResource.id);
```

Use the root repo scripts for day-to-day work **after the workspace is bootstrapped**, or run the nested package directly from `framework/builtin-plugins/pos-core` if you need lower-level control.

## Current Test Coverage

- Root verification scripts: `bun run build`, `bun run typecheck`, `bun run lint`, `bun run test`, `bun run test:contracts`, `bun run test:unit`, `bun run test:integration`, `bun run test:migrations`, `bun run docs:check`
- Unit files: 1
- Contracts files: 1
- Integration files: 1
- Migrations files: 2

## Known Boundaries And Non-Goals

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.
- Cross-plugin composition should use Gutu command, event, job, and workflow primitives. This repo should not be documented as exposing a generic WordPress-style hook system unless one is explicitly exported.

## Recommended Next Milestones

- Deepen offline replay, cashier variance, and settlement controls before broader retail deployment.
- Add stronger loyalty, payment, and omnichannel bridge guidance once the session boundary stabilizes.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `POS Profile`, `POS Settings`, `POS Opening Entry`.

## More Docs

See [DEVELOPER.md](./DEVELOPER.md), [TODO.md](./TODO.md), [SECURITY.md](./SECURITY.md), [CONTRIBUTING.md](./CONTRIBUTING.md). The internal domain sources used to build those docs live under:

- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/AGENT_CONTEXT.md`
- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/BUSINESS_RULES.md`
- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/EDGE_CASES.md`
- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/FLOWS.md`
- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/GLOSSARY.md`
- `plugins/gutu-plugin-pos-core/framework/builtin-plugins/pos-core/docs/MANDATORY_STEPS.md`
