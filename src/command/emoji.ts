import {Command} from "./Command";
import {Message, Role} from "discord.js";
import {RoleEntity, RoleType} from "../db/entities/RoleEntity";
import {GuildEntity} from "../db/entities/GuildEntity";
import {Emoji} from "../emoji";
import {CommandMessage} from "discord.js-commando";

async function setRole(message: CommandMessage, role: Role, emoji: Emoji, type: RoleType): Promise<Message | Message[]> {

    //Check for duplicate
    const existingRole = await RoleEntity.createQueryBuilder("role").leftJoinAndSelect("role.guild", "guild")
        .where("guild.guildId = :guildId", {guildId: message.guild.id})
        .andWhere("role.emojiData = :emojiData", {emojiData: emoji.data}).getOne();

    if (existingRole != undefined) {
        return message.say(`Assigned ${emoji.toMessage()} is already assigned to ${message.guild.roles.get(existingRole.roleId)} (${RoleType[existingRole.type]})`);
    }

    const roleEntity = new RoleEntity();
    roleEntity.emojiData = emoji.data;
    roleEntity.emojiType = emoji.type;
    roleEntity.roleId = role.id;
    roleEntity.type = type;
    roleEntity.guild = await GuildEntity.findOrCreate(message.guild.id);

    await roleEntity.save();

    return message.say(`Assigned ${emoji.toMessage()} to ${role}.`);
}

export class NormalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "normal",
            group: "role",
            memberName: "normal",
            description: "Assign an emoji to a role",
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: "role",
                    prompt: "What role?",
                    type: "role",
                },
                {
                    key: "emoji",
                    prompt: "What emoji?",
                    type: "emoji"
                }
            ],
        });

    }


    run(message, {role, emoji}: { role: Role; emoji: Emoji }): Promise<Message | Message[]> {
        return setRole(message, role, emoji, RoleType.Normal);
    }
}

export class ToggleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "toggle",
            group: "role",
            memberName: "toggle",
            description: "Assign an emoji to a role",
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: "role",
                    prompt: "What role?",
                    type: "role",
                },
                {
                    key: "emoji",
                    prompt: "What emoji?",
                    type: "emoji"
                }
            ],
        });

    }

    run(message, {role, emoji}: { role: Role; emoji: Emoji }): Promise<Message | Message[]> {
        return setRole(message, role, emoji, RoleType.Toggle);
    }
}
