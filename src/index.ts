// index.ts
import assert from "assert";
import { add } from "..";

describe("adding numbers", () => {
    it("should add two numbers", () => {
        assert.equal(add(2, 3), 5);
    });
});