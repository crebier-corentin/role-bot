"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GuildEntity_1 = require("../db/entities/GuildEntity");
const Command_1 = require("./Command");
class ChannelCommand extends Command_1.Command {
    constructor(client) {
        super(client, {
            name: "channel",
            group: "config",
            memberName: "channel",
            description: "Set the active channel",
            guildOnly: true,
            userPermissions: ['ADMINISTRATOR'],
            args: [
                {
                    key: "channel",
                    prompt: "Which channel?",
                    type: "channel",
                },
            ],
        });
    }
    async run(message, { channel }) {
        const guildEntity = await GuildEntity_1.GuildEntity.findOrCreate(message.guild.id);
        guildEntity.channelId = channel.id;
        await guildEntity.save();
        return message.say(`${channel} is now the active channel!`);
    }
}
exports.default = ChannelCommand;
//# sourceMappingURL=channel.js.map