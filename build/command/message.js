"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildEntity_1 = require("../db/entities/GuildEntity");
const Command_1 = require("./Command");
class MessageCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "message",
            group: "config",
            memberName: "message",
            description: "Send a message in the active channel",
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: "text",
                    prompt: "What will the message be?",
                    type: "string",
                },
            ],
        });
    }
    async run(message, { text }) {
        const guildEntity = await GuildEntity_1.GuildEntity.findOrCreate(message.guild.id);
        if (guildEntity.channelId == null) {
            return message.say("No active channel. Please use `channel` to set the active channel.");
        }
        const channel = message.guild.channels.find(c => c.id == guildEntity.channelId);
        if (channel == undefined) {
            return message.say("Unable to find active channel. Please use `channel` to set the active channel.");
        }
        const activeMessage = await channel.send("", {
            embed: {
                title: "React to this message!",
                description: text
            }
        });
        guildEntity.messageId = activeMessage.id;
        await guildEntity.save();
        //Roles reactions
        for (const role of guildEntity.roles.sort((a, b) => a.type - b.type)) {
            await activeMessage.react(role.emoji().toReact());
        }
        return message.say(`Active message sent in ${channel}!`);
    }
}
exports.default = MessageCommand;
//# sourceMappingURL=message.js.map