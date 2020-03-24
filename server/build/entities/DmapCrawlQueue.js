"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let DmapCrawlQueue = class DmapCrawlQueue extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "project_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "keyword_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "depth1_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "depth2_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapCrawlQueue.prototype, "depth3_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapCrawlQueue.prototype, "start_dt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapCrawlQueue.prototype, "end_dt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapCrawlQueue.prototype, "reg_dt", void 0);
DmapCrawlQueue = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'tb_crawl_queue' })
], DmapCrawlQueue);
exports.DmapCrawlQueue = DmapCrawlQueue;
