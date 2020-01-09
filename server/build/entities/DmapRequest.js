"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let DmapRequest = class DmapRequest extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapRequest.prototype, "customer_id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "project_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "keyword_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "source_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "depth1_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "depth2_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "depth3_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapRequest.prototype, "state", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapRequest.prototype, "pub_day", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapRequest.prototype, "pub_day_date", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapRequest.prototype, "keyword", void 0);
DmapRequest = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'tb_crawl_retroactive2' })
], DmapRequest);
exports.DmapRequest = DmapRequest;
