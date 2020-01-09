"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let CollectCount = class CollectCount {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], CollectCount.prototype, "seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CollectCount.prototype, "customer_id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CollectCount.prototype, "keyword", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CollectCount.prototype, "doc_datetime", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CollectCount.prototype, "collect_type", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], CollectCount.prototype, "always_yn", void 0);
CollectCount = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'tb_collect_count' })
], CollectCount);
exports.CollectCount = CollectCount;
