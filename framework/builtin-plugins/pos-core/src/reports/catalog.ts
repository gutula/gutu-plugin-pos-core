export const reportDefinitions = [
  {
    "id": "pos-core.report.01",
    "label": "POS Shift Summary",
    "owningPlugin": "pos-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "offline-sync-conflicts",
      "cashier-variance-review",
      "duplicate-receipt-replay"
    ]
  },
  {
    "id": "pos-core.report.02",
    "label": "Cashier Variance",
    "owningPlugin": "pos-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "offline-sync-conflicts",
      "cashier-variance-review",
      "duplicate-receipt-replay"
    ]
  },
  {
    "id": "pos-core.report.03",
    "label": "POS Closing Summary",
    "owningPlugin": "pos-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "offline-sync-conflicts",
      "cashier-variance-review",
      "duplicate-receipt-replay"
    ]
  },
  {
    "id": "pos-core.report.04",
    "label": "Offline Sync Exceptions",
    "owningPlugin": "pos-core",
    "source": "erpnext-parity",
    "exceptionQueues": [
      "offline-sync-conflicts",
      "cashier-variance-review",
      "duplicate-receipt-replay"
    ]
  }
] as const;
