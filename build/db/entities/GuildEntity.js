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
var GuildEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEntity = void 0;
const typeorm_1 = require("typeorm");
const RoleEntity_1 = require("./RoleEntity");
let GuildEntity = GuildEntity_1 = class GuildEntity extends typeorm_1.BaseEntity {
    static async findOrCreate(guildId) {
        const guild = await GuildEntity_1.findOne({ where: { guildId }, relations: ["roles"] });
        if (guild != undefined)
            return guild;
        //Create
        const newGuild = new GuildEntity_1();
        newGuild.guildId = guildId;
        return await newGuild.save();
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], GuildEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], GuildEntity.prototype, "guildId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null }),
    __metadata("design:type", String)
], GuildEntity.prototype, "channelId", void 0);
__decorate([
    typeorm_1.OneToMany(() => RoleEntity_1.RoleEntity, role => role.guild),
    __metadata("design:type", Array)
], GuildEntity.prototype, "roles", void 0);
GuildEntity = GuildEntity_1 = __decorate([
    typeorm_1.Entity()
], GuildEntity);
exports.GuildEntity = GuildEntity;
//# sourceMappingURL=GuildEntity.js.map