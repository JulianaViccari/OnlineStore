"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coupon_1 = __importDefault(require("../../entities/coupon"));
class CouponInMemoryRepository {
    constructor() {
        this.couponsDB = [
            new coupon_1.default("discount10", 10, 15, new Date(2023, 3, 24, 23, 47, 0, 0)),
            new coupon_1.default("discount20", 20, 15, new Date(2023, 6, 24, 23, 47, 0, 0)),
            new coupon_1.default("discount5", 5, 15, new Date(2023, 0, 24, 23, 47, 0, 0)),
        ];
    }
    get(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.couponsDB.filter((c) => c.getCode() === code)[0];
        });
    }
}
exports.default = CouponInMemoryRepository;
//# sourceMappingURL=coupon_in_memory_repository.js.map