import {Command} from "./Command";
import {CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {Emoji} from "../emoji";
import {RoleEntity} from "../db/entities/RoleEntity";

export class RemoveCommand extends Command {
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

    async run(message: CommandMessage, {emoji}: { emoji: Emoji }): Promise<Message | Message[]> {

        const roleEntity = await RoleEntity.createQueryBuilder("role").leftJoinAndSelect("role.guild", "guild")
            .where("guild.guildId = :guildId", {guildId: message.guild.id})
            .andWhere("role.emojiData = :emojiData", {emojiData: emoji.data}).getOne();

        if (roleEntity == undefined) {
            return message.say(`No assignment with ${emoji.toMessage()} found.`);
        }

        await roleEntity.remove();
        return message.say(`${emoji.toMessage()} assignment removed.`);

    }
}
