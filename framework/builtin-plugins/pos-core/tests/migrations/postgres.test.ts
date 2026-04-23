import { describe, expect, it } from "bun:test";

import {
  buildPosCoreMigrationSql,
  buildPosCoreRollbackSql,
  getPosCoreLookupIndexName,
  getPosCoreStatusIndexName
} from "../../src/postgres";

describe("pos-core postgres helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPosCoreMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core.primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core.secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core.exception_records");
    expect(sql).toContain(getPosCoreLookupIndexName());
    expect(sql).toContain(getPosCoreStatusIndexName());
  });

  it("rolls the schema back safely", () => {
    const sql = buildPosCoreRollbackSql({ schemaName: "pos_core_preview", dropSchema: true }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS pos_core_preview.exception_records");
    expect(sql).toContain("DROP SCHEMA IF EXISTS pos_core_preview CASCADE");
  });
});
