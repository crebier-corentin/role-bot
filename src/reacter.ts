import {RoleEntity, RoleType} from "./db/entities/RoleEntity";
import {GuildMember} from "discord.js";

export interface Reacter {
    add(member: GuildMember, roleEntity: RoleEntity): Promise<void>;

    remove(member: GuildMember, roleEntity: RoleEntity): Promise<void>;
}

export const NormalReacter: Reacter = {
    async add(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.roles.add(roleEntity.roleId);
    },

    async remove(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.roles.remove(roleEntity.roleId);
    }
};

export const ToggleReacter: Reacter = {
    async add(member: GuildMember, roleEntity: RoleEntity): Promise<void> {

        const toggleableRoles = await RoleEntity.createQueryBuilder("role")
            .leftJoin("role.guild", "guild")
            .where("guild.id = :id", {id: roleEntity.guild.id})
            .andWhere("role.type = :type", {type: RoleType.Toggle})
            .getMany();

        await member.roles.remove(toggleableRoles.map(r => r.roleId));

        await member.roles.add(roleEntity.roleId);
    },

    async remove(member: GuildMember, roleEntity: RoleEntity): Promise<void> {
        await member.roles.remove(roleEntity.roleId);
    }
};
