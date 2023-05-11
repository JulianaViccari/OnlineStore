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
const mysql2_1 = __importDefault(require("mysql2"));
class OrderMysqlRepository {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.conn = this.openConnection();
                const query = "insert into orders (id, client_cpf, status) values(?, ?, ?)";
                return new Promise((resolve, reject) => {
                    var _a;
                    (_a = this.conn) === null || _a === void 0 ? void 0 : _a.query(query, [order.getId(), order.getClientCpf(), "created"], (error, _) => {
                        if (error) {
                            return reject(error);
                        }
                        else {
                            resolve();
                        }
                    });
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield this.closeConnection();
            }
        });
    }
    getById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.conn = this.openConnection();
                const query = "select id, client_cpf, status from orders where id = ?";
                return new Promise((resolve, reject) => {
                    var _a;
                    (_a = this.conn) === null || _a === void 0 ? void 0 : _a.query(query, [orderId], function (error, results, fields) {
                        if (error) {
                            return reject(error);
                        }
                        else {
                            console.log(results);
                            return resolve(undefined);
                        }
                    });
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield this.closeConnection();
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.conn = this.openConnection();
                const query = "select id, client_cpf, status from orders";
                return new Promise((resolve, reject) => {
                    var _a;
                    (_a = this.conn) === null || _a === void 0 ? void 0 : _a.query(query, (error, results) => {
                        if (error) {
                            return reject(error);
                        }
                        else {
                            return resolve(undefined);
                        }
                    });
                });
            }
            catch (error) {
                throw new Error(error.message);
            }
            finally {
                yield this.closeConnection();
            }
        });
    }
    openConnection() {
        try {
            return mysql2_1.default.createConnection({
                host: "127.0.0.1",
                user: "app_user",
                password: "123",
                database: "online_store",
                port: 3306,
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    closeConnection() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.end();
        });
    }
}
exports.default = OrderMysqlRepository;
//# sourceMappingURL=order_mysql_repository.js.map