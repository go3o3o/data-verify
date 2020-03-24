"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let DmapProjectKeyword = class DmapProjectKeyword extends typeorm_1.BaseEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], DmapProjectKeyword.prototype, "seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "customer_id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "keyword", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "filter_keyword_use_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapProjectKeyword.prototype, "project_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "use_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "topics_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "related_words_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "emotions_yn", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "reg_dt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapProjectKeyword.prototype, "reg_account_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "upd_dt", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapProjectKeyword.prototype, "upd_account_seq", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], DmapProjectKeyword.prototype, "keyword_grp_name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], DmapProjectKeyword.prototype, "filter_crawl_use_yn", void 0);
DmapProjectKeyword = tslib_1.__decorate([
    typeorm_1.Entity({ name: 'tb_project_keyword' })
], DmapProjectKeyword);
exports.DmapProjectKeyword = DmapProjectKeyword;
