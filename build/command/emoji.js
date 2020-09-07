"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleCommand = exports.NormalCommand = void 0;
const Command_1 = require("./Command");
const RoleEntity_1 = require("../db/entities/RoleEntity");
const GuildEntity_1 = require("../db/entities/GuildEntity");
async function setRole(message, role, emoji, type) {
    //Check for duplicate
    const existingRole = await RoleEntity_1.RoleEntity.createQueryBuilder("role").leftJoinAndSelect("role.guild", "guild")
        .where("guild.guildId = :guildId", { guildId: message.guild.id })
        .andWhere("role.emojiData = :emojiData", { emojiData: emoji.data }).getOne();
    if (existingRole != undefined) {
        return message.say(`Assigned ${emoji.toMessage()} is already assigned to ${message.guild.roles.cache.get(existingRole.roleId)} (${RoleEntity_1.RoleType[existingRole.type]})`);
    }
    const roleEntity = new RoleEntity_1.RoleEntity();
    roleEntity.emojiData = emoji.data;
    roleEntity.emojiType = emoji.type;
    roleEntity.roleId = role.id;
    roleEntity.type = type;
    roleEntity.guild = await GuildEntity_1.GuildEntity.findOrCreate(message.guild.id);
    await roleEntity.save();
    return message.say(`Assigned ${emoji.toMessage()} to ${role}.`);
}
class NormalCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "normal",
            group: "role",
            memberName: "normal",
            description: "Assign an emoji to a role",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
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
    run(message, { role, emoji }) {
        return setRole(message, role, emoji, RoleEntity_1.RoleType.Normal);
    }
}
exports.NormalCommand = NormalCommand;
class ToggleCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "toggle",
            group: "role",
            memberName: "toggle",
            description: "Assign an emoji to a role",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
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
    run(message, { role, emoji }) {
        return setRole(message, role, emoji, RoleEntity_1.RoleType.Toggle);
    }
}
exports.ToggleCommand = ToggleCommand;
//# sourceMappingURL=emoji.js.map