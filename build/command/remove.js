"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
const Command_1 = require("./Command");
const RoleEntity_1 = require("../db/entities/RoleEntity");
class RemoveCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "remove",
            group: "role",
            memberName: "remove",
            description: "Remove an emoji assignment",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
            args: [
                {
                    key: "emoji",
                    prompt: "Which emoji to remove?",
                    type: "emoji"
                }
            ],
        });
    }
    async run(message, { emoji }) {
        const roleEntity = await RoleEntity_1.RoleEntity.createQueryBuilder("role").leftJoinAndSelect("role.guild", "guild")
            .where("guild.guildId = :guildId", { guildId: message.guild.id })
            .andWhere("role.emojiData = :emojiData", { emojiData: emoji.data }).getOne();
        if (roleEntity == undefined) {
            return message.say(`No assignment with ${emoji.toMessage()} found.`);
        }
        await roleEntity.remove();
        return message.say(`${emoji.toMessage()} assignment removed.`);
    }
}
exports.RemoveCommand = RemoveCommand;
//# sourceMappingURL=remove.js.map