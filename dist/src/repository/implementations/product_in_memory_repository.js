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
const product_1 = __importDefault(require("../../entities/product"));
class ProductInMemoryRepository {
    constructor() {
        this.productsDB = [
            new product_1.default("1", "Dove", "shampoo", 17.0, 8, 20, 20, 300),
            new product_1.default("2", "Siege", "shampoo", 48.0, 8, 20, 20, 1),
            new product_1.default("3", "Dove", "condicionador", 22.0, 8, 20, 20, 300),
            new product_1.default("4", "Lux", "sabonete", 2.0, 8, 20, 20, -3),
        ];
    }
    get(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productsDB.filter((p) => p.getId() === productId)[0];
        });
    }
}
exports.default = ProductInMemoryRepository;
//# sourceMappingURL=product_in_memory_repository.js.map