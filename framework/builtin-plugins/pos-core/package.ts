import { definePackage } from "@platform/kernel";

export default definePackage({
  "id": "pos-core",
  "kind": "plugin",
  "version": "0.1.0",
  "contractVersion": "1.0.0",
  "sourceRepo": "gutu-plugin-pos-core",
  "displayName": "POS Core",
  "domainGroup": "Operational Data",
  "defaultCategory": {
    "id": "business",
    "label": "Business",
    "subcategoryId": "pos_retail",
    "subcategoryLabel": "POS & Retail"
  },
  "description": "Retail session, till state, receipt journals, cashier shifts, and offline-tolerant POS execution surfaces that settle into inventory and accounting through explicit handoff.",
  "extends": [],
  "dependsOn": [
    "auth-core",
    "org-tenant-core",
    "role-policy-core",
    "audit-core",
    "workflow-core",
    "sales-core",
    "pricing-tax-core",
    "traceability-core"
  ],
  "dependencyContracts": [
    {
      "packageId": "auth-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "org-tenant-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "role-policy-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "audit-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "workflow-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "sales-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "pricing-tax-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "traceability-core",
      "class": "required",
      "rationale": "Required for POS Core to keep its boundary governed and explicit."
    },
    {
      "packageId": "inventory-core",
      "class": "optional",
      "rationale": "Recommended with POS Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "accounting-core",
      "class": "optional",
      "rationale": "Recommended with POS Core for smoother production adoption and operator experience."
    },
    {
      "packageId": "crm-core",
      "class": "capability-enhancing",
      "rationale": "Improves POS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "procurement-core",
      "class": "capability-enhancing",
      "rationale": "Improves POS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "analytics-bi-core",
      "class": "capability-enhancing",
      "rationale": "Improves POS Core with deeper downstream automation, visibility, or workflow coverage."
    },
    {
      "packageId": "business-portals-core",
      "class": "integration-only",
      "rationale": "Only needed when POS Core must exchange data or actions with adjacent or external surfaces."
    }
  ],
  "recommendedPlugins": [
    "inventory-core",
    "accounting-core"
  ],
  "capabilityEnhancingPlugins": [
    "crm-core",
    "procurement-core",
    "analytics-bi-core"
  ],
  "integrationOnlyPlugins": [
    "business-portals-core"
  ],
  "suggestedPacks": [
    "sector-retail"
  ],
  "standaloneSupported": true,
  "installNotes": [
    "POS can operate without Inventory for limited service retail, but physical goods deployments should treat Inventory and Accounting as production recommendations."
  ],
  "optionalWith": [
    "inventory-core",
    "accounting-core"
  ],
  "conflictsWith": [],
  "providesCapabilities": [
    "pos.sessions",
    "pos.receipts",
    "pos.reconciliation"
  ],
  "requestedCapabilities": [
    "ui.register.admin",
    "api.rest.mount",
    "data.write.pos",
    "events.publish.pos"
  ],
  "ownsData": [
    "pos.sessions",
    "pos.receipts",
    "pos.cashier-shifts",
    "pos.reconciliation"
  ],
  "extendsData": [],
  "publicCommands": [
    "pos.sessions.open",
    "pos.receipts.record",
    "pos.sessions.close",
    "pos.sessions.hold",
    "pos.sessions.release",
    "pos.sessions.amend",
    "pos.sessions.reverse"
  ],
  "publicQueries": [
    "pos.shift-summary",
    "pos.sync-summary"
  ],
  "publicEvents": [
    "pos.session-opened.v1",
    "pos.receipt-recorded.v1",
    "pos.session-closed.v1"
  ],
  "domainCatalog": {
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
  },
  "slotClaims": [],
  "trustTier": "first-party",
  "reviewTier": "R1",
  "isolationProfile": "same-process-trusted",
  "compatibility": {
    "framework": "^0.1.0",
    "runtime": "bun>=1.3.12",
    "db": [
      "postgres",
      "sqlite"
    ]
  }
});
