export const exceptionQueueDefinitions = [
  {
    "id": "offline-sync-conflicts",
    "label": "Offline Sync Conflicts",
    "severity": "medium",
    "owner": "cashier",
    "reconciliationJobId": "pos.reconciliation.run"
  },
  {
    "id": "cashier-variance-review",
    "label": "Cashier Variance Review",
    "severity": "medium",
    "owner": "cashier",
    "reconciliationJobId": "pos.reconciliation.run"
  },
  {
    "id": "duplicate-receipt-replay",
    "label": "Duplicate Receipt Replay",
    "severity": "medium",
    "owner": "cashier",
    "reconciliationJobId": "pos.reconciliation.run"
  }
] as const;
