import {Command} from "./Command";
import {CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildEntity} from "../db/entities/GuildEntity";
import {RoleType} from "../db/entities/RoleEntity";

export class ListCommand extends Command {
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

    async run(message: CommandMessage): Promise<Message | Message[]> {

        const guildEntity = await GuildEntity.findOrCreate(message.guild.id);

        let text = "";
        for (const role of guildEntity.roles) {
            text += `${role.emoji().toMessage()} -> ${message.guild.roles.get(role.roleId)} (${RoleType[role.type]})\n`;
        }

        return message.say(text);
    }
}
