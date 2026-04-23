import { defineJob } from "@platform/jobs";
import { z } from "zod";

export const jobDefinitionKeys = [
  "pos.projections.refresh",
  "pos.reconciliation.run"
] as const;

export const jobDefinitions = {
  "pos.projections.refresh": defineJob({
    id: "pos.projections.refresh",
    queue: "pos-projections",
    payload: z.object({
      tenantId: z.string().min(2),
      recordId: z.string().min(2)
    }),
    concurrency: 2,
    retryPolicy: {
      attempts: 3,
      backoff: "exponential",
      delayMs: 1_000
    },
    timeoutMs: 30_000,
    handler: () => undefined
  }),
  "pos.reconciliation.run": defineJob({
    id: "pos.reconciliation.run",
    queue: "pos-reconciliation",
    payload: z.object({
      tenantId: z.string().min(2),
      recordId: z.string().min(2)
    }),
    concurrency: 1,
    retryPolicy: {
      attempts: 4,
      backoff: "linear",
      delayMs: 1_500
    },
    timeoutMs: 45_000,
    handler: () => undefined
  })
} as const;
