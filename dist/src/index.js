"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const assert_1 = __importDefault(require("assert"));
const __1 = require("..");
describe("adding numbers", () => {
    it("should add two numbers", () => {
        assert_1.default.equal((0, __1.add)(2, 3), 5);
    });
});
