import {
  advancePrimaryRecord,
  createPrimaryRecord,
  reconcilePrimaryRecord,
  type AdvancePrimaryRecordInput,
  type CreatePrimaryRecordInput,
  type ReconcilePrimaryRecordInput
} from "../services/main.service";

export const businessFlowDefinitions = [
  {
    "id": "pos.sessions.open",
    "label": "Open POS Session",
    "phase": "create",
    "methodName": "openPosSession"
  },
  {
    "id": "pos.receipts.record",
    "label": "Record POS Receipt",
    "phase": "advance",
    "methodName": "recordPosReceipt"
  },
  {
    "id": "pos.sessions.close",
    "label": "Close POS Session",
    "phase": "reconcile",
    "methodName": "closePosSession"
  }
] as const;

export async function openPosSession(input: CreatePrimaryRecordInput) {
  return createPrimaryRecord(input);
}

export async function recordPosReceipt(input: AdvancePrimaryRecordInput) {
  return advancePrimaryRecord(input);
}

export async function closePosSession(input: ReconcilePrimaryRecordInput) {
  return reconcilePrimaryRecord(input);
}
