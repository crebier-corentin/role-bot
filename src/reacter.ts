import {RoleEntity, RoleType} from "./db/entities/RoleEntity";
import {GuildMember} from "discord.js";

export interface Reacter {
    add(member: GuildMember, roleEntity: RoleEntity): Promise<void>;

    remove(member: GuildMember, roleEntity: RoleEntity): Promise<void>;
}

export const NormalReacter: Reacter = {
    async add(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.addRole(roleEntity.roleId);
    },

    async remove(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.removeRole(roleEntity.roleId);
    }
};

export const ToggleReacter: Reacter = {
    async add(member: GuildMember, roleEntity: RoleEntity): Promise<void> {

        const toggleableRoles = await RoleEntity.createQueryBuilder("role")
            .leftJoin("role.guild", "guild")
            .where("guild.id = :id", {id: roleEntity.guild.id})
            .andWhere("role.type = :type", {type: RoleType.Toggle})
            .getMany();

        for (const role of toggleableRoles) {
            if (member.roles.has(role.roleId)) {
                await member.removeRole(role.roleId);
            }
        }

        await member.addRole(roleEntity.roleId);
    },

    async remove(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.removeRole(roleEntity.roleId);
    }
};
