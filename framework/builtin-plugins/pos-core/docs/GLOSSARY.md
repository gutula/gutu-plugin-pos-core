# POS Core Glossary

| Term | Meaning |
| --- | --- |
| POS Core | Retail session, till state, receipt journals, cashier shifts, and offline-tolerant POS execution surfaces that settle into inventory and accounting through explicit handoff. |
| pos.sessions | Capability published by this plugin manifest. |
| pos.receipts | Capability published by this plugin manifest. |
| pos.reconciliation | Capability published by this plugin manifest. |
| pos.sessions.open | Open POS Session |
| pos.receipts.record | Record POS Receipt |
| pos.sessions.close | Close POS Session |
| pos.sessions.hold | Place Record On Hold |
| pos.sessions.release | Release Record Hold |
| pos.sessions.amend | Amend Record |
| pos.sessions.reverse | Reverse Record |
| pos.projections.refresh | Job definition queued on `pos-projections`. |
| pos.reconciliation.run | Job definition queued on `pos-reconciliation`. |
| pos-session-lifecycle | Open, trade, reconcile, sync, and close POS sessions. |
| POS Session | Declared domain entity owned or governed by POS Core. |
| Receipt Journal | Declared domain entity owned or governed by POS Core. |
| Offline Sync Record | Declared domain entity owned or governed by POS Core. |
| Shift Close | Declared domain entity owned or governed by POS Core. |
| Cashier Variance | Declared domain entity owned or governed by POS Core. |
| Tender Reconciliation | Declared domain entity owned or governed by POS Core. |
| POS Shift Summary | Operational or reconciliation report surface tracked for POS Core. |
| POS Closing Summary | Operational or reconciliation report surface tracked for POS Core. |
| Offline Sync Exceptions | Operational or reconciliation report surface tracked for POS Core. |
| Sessions | Primary focus area for POS Core. |
| Receipt journals | Primary focus area for POS Core. |
| Sync reconciliation | Primary focus area for POS Core. |
