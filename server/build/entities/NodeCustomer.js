"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let NodeCustomer = class NodeCustomer extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], NodeCustomer.prototype, "seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], NodeCustomer.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], NodeCustomer.prototype, "comment", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], NodeCustomer.prototype, "use_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], NodeCustomer.prototype, "reg_dt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], NodeCustomer.prototype, "upd_dt", void 0);
NodeCustomer = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'tb_customer' })
], NodeCustomer);
exports.NodeCustomer = NodeCustomer;
