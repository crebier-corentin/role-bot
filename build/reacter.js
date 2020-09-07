"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleReacter = exports.NormalReacter = void 0;
const RoleEntity_1 = require("./db/entities/RoleEntity");
exports.NormalReacter = {
    async add(member, roleEntity) {
        await member.roles.add(roleEntity.roleId);
    },
    async remove(member, roleEntity) {
        await member.roles.remove(roleEntity.roleId);
    }
};
exports.ToggleReacter = {
    async add(member, roleEntity) {
        const toggleableRoles = await RoleEntity_1.RoleEntity.createQueryBuilder("role")
            .leftJoin("role.guild", "guild")
            .where("guild.id = :id", { id: roleEntity.guild.id })
            .andWhere("role.type = :type", { type: RoleEntity_1.RoleType.Toggle })
            .getMany();
        await member.roles.remove(toggleableRoles.map(r => r.roleId));
        await member.roles.add(roleEntity.roleId);
    },
    async remove(member, roleEntity) {
        await member.roles.remove(roleEntity.roleId);
    }
};
//# sourceMappingURL=reacter.js.map