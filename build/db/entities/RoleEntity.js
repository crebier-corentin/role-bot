"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEntity = exports.RoleType = void 0;
const typeorm_1 = require("typeorm");
const GuildEntity_1 = require("./GuildEntity");
const emoji_1 = require("../../emoji");
var RoleType;
(function (RoleType) {
    RoleType[RoleType["Normal"] = 0] = "Normal";
    RoleType[RoleType["Toggle"] = 1] = "Toggle";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
let RoleEntity = class RoleEntity extends typeorm_1.BaseEntity {
    emoji() {
        return new emoji_1.Emoji(this.emojiType, this.emojiData);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoleEntity.prototype, "roleId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "emojiType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RoleEntity.prototype, "emojiData", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => GuildEntity_1.GuildEntity, guild => guild.roles),
    __metadata("design:type", GuildEntity_1.GuildEntity)
], RoleEntity.prototype, "guild", void 0);
RoleEntity = __decorate([
    typeorm_1.Entity()
], RoleEntity);
exports.RoleEntity = RoleEntity;
//# sourceMappingURL=RoleEntity.js.map