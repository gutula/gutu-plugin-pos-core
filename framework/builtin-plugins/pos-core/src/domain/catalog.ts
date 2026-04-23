export const domainCatalog = {
  "erpnextModules": [
    "Accounts",
    "Selling"
  ],
  "erpnextDoctypes": [
    "POS Profile",
    "POS Settings",
    "POS Opening Entry",
    "POS Closing Entry",
    "POS Invoice",
    "Cashier Closing"
  ],
  "ownedEntities": [
    "POS Session",
    "Receipt Journal",
    "Offline Sync Record",
    "Shift Close",
    "Cashier Variance",
    "Tender Reconciliation"
  ],
  "reports": [
    "POS Shift Summary",
    "Cashier Variance",
    "POS Closing Summary",
    "Offline Sync Exceptions"
  ],
  "exceptionQueues": [
    "offline-sync-conflicts",
    "cashier-variance-review",
    "duplicate-receipt-replay"
  ],
  "operationalScenarios": [
    "register-open-to-close",
    "offline-sale-replay",
    "refund-or-exchange",
    "cashier-close-reconciliation"
  ],
  "settingsSurfaces": [
    "POS Settings",
    "POS Profile",
    "Mode of Payment"
  ],
  "edgeCases": [
    "offline duplicate prevention",
    "cashier close while central unavailable",
    "multi-tender refund",
    "delayed stock settlement"
  ]
} as const;
