import { describe, expect, it } from "bun:test";

import {
  buildPosCoreSqliteMigrationSql,
  buildPosCoreSqliteRollbackSql,
  getPosCoreSqliteLookupIndexName,
  getPosCoreSqliteStatusIndexName
} from "../../src/sqlite";

describe("pos-core sqlite helpers", () => {
  it("creates the business tables and indexes", () => {
    const sql = buildPosCoreSqliteMigrationSql().join("\n");

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core_primary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core_secondary_records");
    expect(sql).toContain("CREATE TABLE IF NOT EXISTS pos_core_exception_records");
    expect(sql).toContain(getPosCoreSqliteLookupIndexName("pos_core_"));
    expect(sql).toContain(getPosCoreSqliteStatusIndexName("pos_core_"));
  });

  it("rolls the sqlite tables back safely", () => {
    const sql = buildPosCoreSqliteRollbackSql({ tablePrefix: "pos_core_preview_" }).join("\n");
    expect(sql).toContain("DROP TABLE IF EXISTS pos_core_preview_exception_records");
  });
});
