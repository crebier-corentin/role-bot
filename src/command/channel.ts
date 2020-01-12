import {Channel, Message} from "discord.js";
import {GuildEntity} from "../db/entities/GuildEntity";
import {Command} from "./Command";

export default class ChannelCommand extends Command {
    constructor(client) {
        super(client, {
            name: "channel",
            group: "config",
            memberName: "channel",
            description: "Set the active channel",
            guildOnly: true,
            userPermissions: ["ADMINISTRATOR"],
            args: [
                {
                    key: "channel",
                    prompt: "Which channel?",
                    type: "channel",
                },
            ],
        });

    }

    async run(message, {channel}: { channel: Channel }): Promise<Message | Message[]> {

        const guildEntity = await GuildEntity.findOrCreate(message.guild.id);
        guildEntity.channelId = channel.id;
        await guildEntity.save();

        return message.say(`${channel} is now the active channel!`);
    }
}
