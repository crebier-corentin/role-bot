import {Message, TextChannel} from "discord.js";
import {GuildEntity} from "../db/entities/GuildEntity";
import {Command} from "./Command";
import {RoleEntity, RoleType} from "../db/entities/RoleEntity";
import {chunkArray, partition} from "../utils";

export default class MessageCommand extends Command {
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

    async run(message, {text}: { text: string }): Promise<Message | Message[]> {

        const guildEntity = await GuildEntity.findOrCreate(message.guild.id);
        if (guildEntity.channelId == null) {
            return message.say("No active channel. Please use `channel` to set the active channel.")
        }

        const channel = message.guild.channels.find(c => c.id == guildEntity.channelId) as TextChannel;
        if (channel == undefined) {
            return message.say("Unable to find active channel. Please use `channel` to set the active channel.")
        }

        //Messages
        const [normal, toggle] = partition(guildEntity.roles, role => role.type == RoleType.Normal);
        for(const roles of chunkArray(normal, 20)) {
            await this.sendMessage(channel, roles, "Normal roles");
        }

        for(const roles of chunkArray(toggle, 20)) {
            await this.sendMessage(channel, roles, "Toggle roles");
        }

        return message.say(`Active message sent in ${channel}!`);
    }

    private async sendMessage(channel: TextChannel, roles: RoleEntity[], title: string): Promise<void> {

        //Build text
        let text = "";
        for (const role of roles) {
            text += `${role.emoji().toMessage()} -> ${channel.guild.roles.get(role.roleId)}\n`;
        }

        //Send message
        const activeMessage = await channel.send("", {
            embed: {
                title: title,
                description: text
            }
        }) as Message;

        //Roles reactions
        for (const role of roles) {
            await activeMessage.react(role.emoji().toReact());
        }
    }
}
