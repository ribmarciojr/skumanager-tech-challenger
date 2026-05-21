import { describe, it, expect } from "vitest";
import { validateForm, canEditField, isEditMode } from "./sku.rules";
import { ISkuData } from "@/interfaces/ISkuData";

const baseForm: ISkuData = {
  sku: "ABC123",
  descricaoComercial: "Produto Teste",
  descricao: "Descrição completa",
  status: "PRE_REGISTER",
};

describe("validateForm", () => {
  it("should return no errors when all editable fields are filled", () => {
    const errors = validateForm(baseForm, ["sku", "descricaoComercial"]);

    expect(errors.sku).toBe(false);
    expect(errors.descricaoComercial).toBe(false);
  });

  it("should return sku error when sku is empty and sku is editable", () => {
    const errors = validateForm({ ...baseForm, sku: "" }, ["sku"]);

    expect(errors.sku).toBe(true);
  });

  it("should return descricaoComercial error when field is empty and editable", () => {
    const errors = validateForm(
      { ...baseForm, descricaoComercial: "   " },
      ["descricaoComercial"],
    );

    expect(errors.descricaoComercial).toBe(true);
  });

  // FAILING: validateForm nunca seta errors.status = true,
  // mesmo quando "status" está em canEditFields e o valor está vazio.
  it("should return status error when status is empty and status is editable", () => {
    const errors = validateForm({ ...baseForm, status: "" }, ["status"]);

    expect(errors.status).toBe(true);
  });
});

describe("canEditField", () => {
  it("should allow edit for any field when not in edit mode", () => {
    expect(canEditField("sku", false)).toBe(true);
    expect(canEditField("status", false)).toBe(true);
  });

  it("should allow edit only for fields in canEditFields when in edit mode", () => {
    expect(canEditField("sku", true, ["sku", "descricao"])).toBe(true);
    expect(canEditField("status", true, ["sku", "descricao"])).toBe(false);
  });
});

describe("isEditMode", () => {
  it("should return false when no skuId is provided", () => {
    expect(isEditMode(undefined)).toBe(false);
  });

  it("should return true when a valid skuId is provided", () => {
    expect(isEditMode(42)).toBe(true);
  });
});
