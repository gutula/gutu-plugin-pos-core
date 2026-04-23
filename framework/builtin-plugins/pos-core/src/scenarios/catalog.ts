export const scenarioDefinitions = [
  {
    "id": "register-open-to-close",
    "owningPlugin": "pos-core",
    "workflowId": "pos-session-lifecycle",
    "actionIds": [
      "pos.sessions.open",
      "pos.receipts.record",
      "pos.sessions.close"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "offline-sale-replay",
    "owningPlugin": "pos-core",
    "workflowId": "pos-session-lifecycle",
    "actionIds": [
      "pos.sessions.open",
      "pos.receipts.record",
      "pos.sessions.close"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "refund-or-exchange",
    "owningPlugin": "pos-core",
    "workflowId": "pos-session-lifecycle",
    "actionIds": [
      "pos.sessions.open",
      "pos.receipts.record",
      "pos.sessions.close"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  },
  {
    "id": "cashier-close-reconciliation",
    "owningPlugin": "pos-core",
    "workflowId": "pos-session-lifecycle",
    "actionIds": [
      "pos.sessions.open",
      "pos.receipts.record",
      "pos.sessions.close"
    ],
    "downstreamTargets": {
      "create": [],
      "advance": [
        "traceability.links.record"
      ],
      "reconcile": [
        "accounting.billing.post",
        "traceability.reconciliation.queue"
      ]
    }
  }
] as const;
