"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCommand = void 0;
const Command_1 = require("./Command");
const GuildEntity_1 = require("../db/entities/GuildEntity");
const RoleEntity_1 = require("../db/entities/RoleEntity");
class ListCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "list",
            group: "role",
            memberName: "list",
            description: "List emoji assignments",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"]
        });
    }
    async run(message) {
        const guildEntity = await GuildEntity_1.GuildEntity.findOrCreate(message.guild.id);
        let text = "";
        for (const role of guildEntity.roles) {
            text += `${role.emoji().toMessage()} -> ${message.guild.roles.cache.get(role.roleId)} (${RoleEntity_1.RoleType[role.type]})\n`;
        }
        return message.say(text);
    }
}
exports.ListCommand = ListCommand;
//# sourceMappingURL=list.js.map