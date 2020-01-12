"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoleEntity_1 = require("./db/entities/RoleEntity");
exports.NormalReacter = {
    async add(member, roleEntity) {
        await member.addRole(roleEntity.roleId);
    },
    async remove(member, roleEntity) {
        await member.removeRole(roleEntity.roleId);
    }
};
exports.ToggleReacter = {
    async add(member, roleEntity) {
        const toggleableRoles = await RoleEntity_1.RoleEntity.createQueryBuilder("role")
            .leftJoin("role.guild", "guild")
            .where("guild.id = :id", { id: roleEntity.guild.id })
            .andWhere("role.type = :type", { type: RoleEntity_1.RoleType.Toggle })
            .getMany();
        await member.removeRoles(toggleableRoles.map(r => r.roleId));
        await member.addRole(roleEntity.roleId);
    },
    async remove(member, roleEntity) {
        await member.removeRole(roleEntity.roleId);
    }
};
//# sourceMappingURL=reacter.js.map