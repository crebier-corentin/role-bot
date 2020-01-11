//This is need to add properties missing in discord.js-commando types declaration file
import {Command as DiscordCommand, CommandInfo, CommandoClient} from "discord.js-commando";
import {PermissionResolvable} from "discord.js";

export class Command extends DiscordCommand {
    constructor(client: CommandoClient, info: CommandInfo & { userPermissions: PermissionResolvable[] }) {
        super(client, info);
    }
}
