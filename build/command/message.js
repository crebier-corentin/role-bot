"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildEntity_1 = require("../db/entities/GuildEntity");
const Command_1 = require("./Command");
const RoleEntity_1 = require("../db/entities/RoleEntity");
const utils_1 = require("../utils");
class MessageCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "message",
            group: "config",
            memberName: "message",
            description: "Send a message in the active channel",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"]
        });
    }
    async run(message, { text }) {
        const guildEntity = await GuildEntity_1.GuildEntity.findOrCreate(message.guild.id);
        if (guildEntity.channelId == null) {
            return message.say("No active channel. Please use `channel` to set the active channel.");
        }
        const channel = message.guild.channels.resolve(guildEntity.channelId);
        if (channel == undefined) {
            return message.say("Unable to find active channel. Please use `channel` to set the active channel.");
        }
        //Messages
        const [normal, toggle] = utils_1.partition(guildEntity.roles, role => role.type == RoleEntity_1.RoleType.Normal);
        for (const roles of utils_1.chunkArray(normal, 20)) {
            await this.sendMessage(channel, roles, "Normal roles");
        }
        for (const roles of utils_1.chunkArray(toggle, 20)) {
            await this.sendMessage(channel, roles, "Toggle roles");
        }
        return message.say(`Active message sent in ${channel}!`);
    }
    async sendMessage(channel, roles, title) {
        //Build text
        let text = "";
        for (const role of roles) {
            text += `${role.emoji().toMessage()} -> ${channel.guild.roles.cache.get(role.roleId)}\n`;
        }
        //Send message
        const activeMessage = await channel.send("", {
            embed: {
                title: title,
                description: text
            }
        });
        //Roles reactions
        for (const role of roles) {
            await activeMessage.react(role.emoji().toReact());
        }
    }
}
exports.default = MessageCommand;
//# sourceMappingURL=message.js.map