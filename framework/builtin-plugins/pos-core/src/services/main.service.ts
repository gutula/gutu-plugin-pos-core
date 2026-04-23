import {
  createBusinessDomainStateStore,
  createBusinessOrchestrationState,
  createBusinessPluginService,
  type BusinessAdvancePrimaryRecordInput,
  type BusinessCreatePrimaryRecordInput,
  type BusinessFailPendingDownstreamItemInput,
  type BusinessReconcilePrimaryRecordInput,
  type BusinessReplayDeadLetterInput,
  type BusinessResolvePendingDownstreamItemInput
} from "@platform/business-runtime";

import { type ExceptionRecord, type PrimaryRecord, type SecondaryRecord } from "../model";

export type CreatePrimaryRecordInput = BusinessCreatePrimaryRecordInput;
export type AdvancePrimaryRecordInput = BusinessAdvancePrimaryRecordInput;
export type ReconcilePrimaryRecordInput = BusinessReconcilePrimaryRecordInput;
export type ResolvePendingDownstreamItemInput = BusinessResolvePendingDownstreamItemInput;
export type FailPendingDownstreamItemInput = BusinessFailPendingDownstreamItemInput;
export type ReplayDeadLetterInput = BusinessReplayDeadLetterInput;

function seedState() {
  return {
    primaryRecords: [
      {
        id: "pos-core:seed",
        tenantId: "tenant-platform",
        title: "POS Core Seed Record",
        counterpartyId: "party:seed",
        companyId: "company:primary",
        branchId: "branch:head-office",
        recordState: "active",
        approvalState: "approved",
        postingState: "unposted",
        fulfillmentState: "none",
        amountMinor: 125000,
        currencyCode: "USD",
        revisionNo: 1,
        reasonCode: null,
        effectiveAt: "2026-04-23T00:00:00.000Z",
        correlationId: "pos-core:seed",
        processId: "pos-session-lifecycle:seed",
        upstreamRefs: [],
        downstreamRefs: [],
        updatedAt: "2026-04-23T00:00:00.000Z"
      }
    ] satisfies PrimaryRecord[],
    secondaryRecords: [] satisfies SecondaryRecord[],
    exceptionRecords: [] satisfies ExceptionRecord[],
    orchestration: createBusinessOrchestrationState()
  };
}

const store = createBusinessDomainStateStore({
  pluginId: "pos-core",
  sqlite: {
    primaryTable: "pos_core_primary_records",
    secondaryTable: "pos_core_secondary_records",
    exceptionTable: "pos_core_exception_records",
    dbFileName: "business-runtime.sqlite"
  },
  postgres: {
    schemaName: "pos_core"
  },
  seedStateFactory: seedState
});

const service = createBusinessPluginService({
  pluginId: "pos-core",
  displayName: "POS Core",
  primaryResourceId: "pos.sessions",
  secondaryResourceId: "pos.receipts",
  exceptionResourceId: "pos.reconciliation",
  createEvent: "pos.session-opened.v1",
  advanceEvent: "pos.receipt-recorded.v1",
  reconcileEvent: "pos.session-closed.v1",
  projectionJobId: "pos.projections.refresh",
  reconciliationJobId: "pos.reconciliation.run",
  advanceActionLabel: "Record POS Receipt",
  orchestrationTargets: {
  "create": [],
  "advance": [
    "traceability.links.record"
  ],
  "reconcile": [
    "accounting.billing.post",
    "traceability.reconciliation.queue"
  ]
},
  store
});

export const {
  listPrimaryRecords,
  listSecondaryRecords,
  listExceptionRecords,
  listPublishedMessages,
  listPendingDownstreamItems,
  listDeadLetters,
  listProjectionRecords,
  getBusinessOverview,
  createPrimaryRecord,
  advancePrimaryRecord,
  reconcilePrimaryRecord,
  resolvePendingDownstreamItem,
  failPendingDownstreamItem,
  replayDeadLetter
} = service;
