import { describe, expect, it } from "vitest";
import { stSum } from "./math";
describe("对stSum求和函数进行测试", () => {
  it("should return 3 with 1+2", () => {
    expect(stSum(1, 2)).toBe(3);
  });
  it("should return 0 with 0+0", () => {
    expect(stSum(0, 0)).toBe(0);
  });
  it("should return null with 2+null", () => {
    expect(stSum(2, null as any)).toBe(null);
  });
});
