# POS Core Developer Guide

Retail session, till state, receipt journals, cashier shifts, and offline-tolerant POS execution surfaces that settle into inventory and accounting through explicit handoff.

**Maturity Tier:** `Hardened`

## Purpose And Architecture Role

Owns POS sessions, receipt journals, and sync or closeout exception state while handing settled stock and finance effects downstream explicitly.

### This plugin is the right fit when

- You need **sessions**, **receipt journals**, **sync reconciliation** as a governed domain boundary.
- You want to integrate through declared actions, resources, jobs, workflows, and UI surfaces instead of implicit side effects.
- You need the host application to keep plugin boundaries honest through manifest capabilities, permissions, and verification lanes.

### This plugin is intentionally not

- Not a full vertical application suite; this plugin only owns the domain slice exported in this repo.
- Not a replacement for explicit orchestration in jobs/workflows when multi-step automation is required.

## Repo Map

| Path | Purpose |
| --- | --- |
| `package.json` | Root extracted-repo manifest, workspace wiring, and repo-level script entrypoints. |
| `framework/builtin-plugins/pos-core` | Nested publishable plugin package. |
| `framework/builtin-plugins/pos-core/src` | Runtime source, actions, resources, services, and UI exports. |
| `framework/builtin-plugins/pos-core/tests` | Unit, contract, integration, and migration coverage where present. |
| `framework/builtin-plugins/pos-core/docs` | Internal domain-doc source set kept in sync with this guide. |
| `framework/builtin-plugins/pos-core/db/schema.ts` | Database schema contract when durable state is owned. |
| `framework/builtin-plugins/pos-core/src/postgres.ts` | SQL migration and rollback helpers when exported. |

## Manifest Contract

| Field | Value |
| --- | --- |
| Package Name | `@plugins/pos-core` |
| Manifest ID | `pos-core` |
| Display Name | POS Core |
| Domain Group | Operational Data |
| Default Category | Business / POS & Retail |
| Version | `0.1.0` |
| Kind | `plugin` |
| Trust Tier | `first-party` |
| Review Tier | `R1` |
| Isolation Profile | `same-process-trusted` |
| Framework Compatibility | ^0.1.0 |
| Runtime Compatibility | bun>=1.3.12 |
| Database Compatibility | postgres, sqlite |

## Dependency Graph And Capability Requests

| Field | Value |
| --- | --- |
| Depends On | `auth-core`, `org-tenant-core`, `role-policy-core`, `audit-core`, `workflow-core`, `sales-core`, `pricing-tax-core`, `inventory-core`, `traceability-core` |
| Requested Capabilities | `ui.register.admin`, `api.rest.mount`, `data.write.pos`, `events.publish.pos` |
| Provides Capabilities | `pos.sessions`, `pos.receipts`, `pos.reconciliation` |
| Owns Data | `pos.sessions`, `pos.receipts`, `pos.cashier-shifts`, `pos.reconciliation` |

### Dependency interpretation

- Direct plugin dependencies describe package-level coupling that must already be present in the host graph.
- Requested capabilities tell the host what platform services or sibling plugins this package expects to find.
- Provided capabilities and owned data tell integrators what this package is authoritative for.

## Public Integration Surfaces

| Type | ID / Symbol | Access / Mode | Notes |
| --- | --- | --- | --- |
| Action | `pos.sessions.open` | Permission: `pos.sessions.write` | Open POS Session<br>Idempotent<br>Audited |
| Action | `pos.receipts.record` | Permission: `pos.receipts.write` | Record POS Receipt<br>Non-idempotent<br>Audited |
| Action | `pos.sessions.close` | Permission: `pos.sessions.write` | Close POS Session<br>Non-idempotent<br>Audited |
| Action | `pos.sessions.hold` | Permission: `pos.sessions.write` | Place Record On Hold<br>Non-idempotent<br>Audited |
| Action | `pos.sessions.release` | Permission: `pos.sessions.write` | Release Record Hold<br>Non-idempotent<br>Audited |
| Action | `pos.sessions.amend` | Permission: `pos.sessions.write` | Amend Record<br>Non-idempotent<br>Audited |
| Action | `pos.sessions.reverse` | Permission: `pos.sessions.write` | Reverse Record<br>Non-idempotent<br>Audited |
| Resource | `pos.sessions` | Portal disabled | Store or register session lifecycle with cashier and shift metadata.<br>Purpose: Own high-speed retail session truth without collapsing stock and finance into the till runtime.<br>Admin auto-CRUD enabled<br>Fields: `title`, `recordState`, `approvalState`, `postingState`, `fulfillmentState`, `updatedAt` |
| Resource | `pos.receipts` | Portal disabled | Receipt and retail transaction journals for settled POS activity.<br>Purpose: Persist front-counter execution safely before downstream settlement applies.<br>Admin auto-CRUD enabled<br>Fields: `label`, `status`, `requestedAction`, `updatedAt` |
| Resource | `pos.reconciliation` | Portal disabled | Offline replay, duplicate prevention, and cashier reconciliation queues.<br>Purpose: Expose POS sync and closeout exceptions instead of hiding them in local device state.<br>Admin auto-CRUD enabled<br>Fields: `severity`, `status`, `reasonCode`, `updatedAt` |

### Job Catalog

| Job | Queue | Retry | Timeout |
| --- | --- | --- | --- |
| `pos.projections.refresh` | `pos-projections` | Retry policy not declared | No timeout declared |
| `pos.reconciliation.run` | `pos-reconciliation` | Retry policy not declared | No timeout declared |


### Workflow Catalog

| Workflow | Actors | States | Purpose |
| --- | --- | --- | --- |
| `pos-session-lifecycle` | `cashier`, `store-manager`, `controller` | `draft`, `pending_approval`, `active`, `reconciled`, `closed`, `canceled` | Keep store execution, cashier variance, and replay-safe settlement explicit. |


### UI Surface Summary

| Surface | Present | Notes |
| --- | --- | --- |
| UI Surface | Yes | A bounded UI surface export is present. |
| Admin Contributions | Yes | Additional admin workspace contributions are exported. |
| Zone/Canvas Extension | No | No dedicated zone extension export. |

## Hooks, Events, And Orchestration

This plugin should be integrated through **explicit commands/actions, resources, jobs, workflows, and the surrounding Gutu event runtime**. It must **not** be documented as a generic WordPress-style hook system unless such a hook API is explicitly exported.

- No standalone plugin-owned lifecycle event feed is exported today.
- Job surface: `pos.projections.refresh`, `pos.reconciliation.run`.
- Workflow surface: `pos-session-lifecycle`.
- Recommended composition pattern: invoke actions, read resources, then let the surrounding Gutu command/event/job runtime handle downstream automation.

## Storage, Schema, And Migration Notes

- Database compatibility: `postgres`, `sqlite`
- Schema file: `framework/builtin-plugins/pos-core/db/schema.ts`
- SQL helper file: `framework/builtin-plugins/pos-core/src/postgres.ts`
- Migration lane present: Yes

The plugin ships explicit SQL helper exports. Use those helpers as the truth source for database migration or rollback expectations.

## Failure Modes And Recovery

- Action inputs can fail schema validation or permission evaluation before any durable mutation happens.
- If downstream automation is needed, the host must add it explicitly instead of assuming this plugin emits jobs.
- There is no separate lifecycle-event feed to rely on today; do not build one implicitly from internal details.
- Schema regressions are expected to show up in the migration lane and should block shipment.

## Mermaid Flows

### Primary Lifecycle

```mermaid
flowchart LR
  caller["Host or operator"] --> action["pos.sessions.open"]
  action --> validation["Schema + permission guard"]
  validation --> service["POS Core service layer"]
  service --> state["pos.sessions"]
  service --> jobs["Follow-up jobs / queue definitions"]
  service --> workflows["Workflow state transitions"]
  state --> ui["Admin contributions"]
```

### Workflow State Machine

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_approval
  draft --> active
  draft --> reconciled
  draft --> closed
  draft --> canceled
```


## Integration Recipes

### 1. Host wiring

```ts
import { manifest, openPosSessionAction, BusinessPrimaryResource, jobDefinitions, workflowDefinitions, adminContributions, uiSurface } from "@plugins/pos-core";

export const pluginSurface = {
  manifest,
  openPosSessionAction,
  BusinessPrimaryResource,
  jobDefinitions,
  workflowDefinitions,
  adminContributions,
  uiSurface
};
```

Use this pattern when your host needs to register the plugin’s declared exports without reaching into internal file paths.

### 2. Action-first orchestration

```ts
import { manifest, openPosSessionAction } from "@plugins/pos-core";

console.log("plugin", manifest.id);
console.log("action", openPosSessionAction.id);
```

- Prefer action IDs as the stable integration boundary.
- Respect the declared permission, idempotency, and audit metadata instead of bypassing the service layer.
- Treat resource IDs as the read-model boundary for downstream consumers.

### 3. Cross-plugin composition

- Register the workflow definitions with the host runtime instead of re-encoding state transitions outside the plugin.
- Drive follow-up automation from explicit workflow transitions and resource reads.
- Pair workflow decisions with notifications or jobs in the outer orchestration layer when humans must be kept in the loop.

## Test Matrix

| Lane | Present | Evidence |
| --- | --- | --- |
| Build | Yes | `bun run build` |
| Typecheck | Yes | `bun run typecheck` |
| Lint | Yes | `bun run lint` |
| Test | Yes | `bun run test` |
| Unit | Yes | 1 file(s) |
| Contracts | Yes | 1 file(s) |
| Integration | Yes | 1 file(s) |
| Migrations | Yes | 2 file(s) |

### Verification commands

- `bun run build`
- `bun run typecheck`
- `bun run lint`
- `bun run test`
- `bun run test:contracts`
- `bun run test:unit`
- `bun run test:integration`
- `bun run test:migrations`
- `bun run docs:check`

## Current Truth And Recommended Next

### Current truth

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

### Current gaps

- No extra gaps were discovered beyond the plugin’s declared boundaries.

### Recommended next

- Deepen offline replay, cashier variance, and settlement controls before broader retail deployment.
- Add stronger loyalty, payment, and omnichannel bridge guidance once the session boundary stabilizes.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `POS Profile`, `POS Settings`, `POS Opening Entry`.

### Later / optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
