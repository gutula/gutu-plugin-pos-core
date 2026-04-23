# POS Core TODO

**Maturity Tier:** `Hardened`

## Shipped Now

- Exports 3 governed actions: `pos.sessions.open`, `pos.receipts.record`, `pos.sessions.close`.
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

## Current Gaps

- Repo-local documentation verification entrypoints were missing before this pass and need to stay green as the repo evolves.

## Recommended Next

- Deepen offline replay, cashier variance, and settlement controls before broader retail deployment.
- Add stronger loyalty, payment, and omnichannel bridge guidance once the session boundary stabilizes.
- Broaden lifecycle coverage with deeper orchestration, reconciliation, and operator tooling where the business flow requires it.
- Add more explicit domain events or follow-up job surfaces when downstream systems need tighter coupling.
- Convert more ERP parity references into first-class runtime handlers where needed, starting from `POS Profile`, `POS Settings`, `POS Opening Entry`.

## Later / Optional

- Outbound connectors, richer analytics, or portal-facing experiences once the core domain contracts harden.
