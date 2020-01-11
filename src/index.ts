import * as dotenv from "dotenv";

dotenv.config();

import ChannelCommand from "./command/channel";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {CommandoClient} from "discord.js-commando"
import MessageCommand from "./command/message";
import {RoleEntity, RoleType} from "./db/entities/RoleEntity";
import {NormalReacter, Reacter, ToggleReacter} from "./reacter";
import {Emoji, EmojiArgumentType} from "./emoji";
import {NormalCommand, ToggleCommand} from "./command/emoji";
import {ListCommand} from "./command/list";
import {RemoveCommand} from "./command/remove";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {

    await createConnection();

    const client = new CommandoClient({
        commandPrefix: process.env.PREFIX
    });

    client.registry.registerDefaults()
        .registerType(EmojiArgumentType)
        .registerGroups([
            ["config"],
            ["role"]
        ])
        .registerCommands([ChannelCommand, MessageCommand, ListCommand, RemoveCommand, NormalCommand, ToggleCommand]);

    //Reacters
    const reacters = new Map<RoleType, Reacter>([
        [RoleType.Normal, NormalReacter],
        [RoleType.Toggle, ToggleReacter],
    ]);

    client.on("raw", async packet => {
        if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t)) return;

        const emoji = Emoji.parse(packet.d.emoji.id ? `<:${packet.d.emoji.name}:${packet.d.emoji.id}>` : packet.d.emoji.name);

        const roleEntity = await RoleEntity.createQueryBuilder("role")
            .leftJoinAndSelect("role.guild", "guild")
            .where("guild.messageId = :messageId", {messageId: packet.d.message_id})
            .andWhere("role.emojiData = :emojiData", {emojiData: emoji.data})
            .getOne();

        if (roleEntity == undefined) return;

        const member = client.guilds.get(packet.d.guild_id).member(packet.d.user_id);
        if (member.user.bot) return;

        const reacter = reacters.get(roleEntity.type);

        if (packet.t === "MESSAGE_REACTION_ADD") {
            reacter.add(member, roleEntity);
        }
        else if (packet.t === "MESSAGE_REACTION_REMOVE") {
            reacter.remove(member, roleEntity);
        }

    });

    client.on("ready", () => {
        console.log("Bot is ready");
    });

    client.login(process.env.DISCORD_TOKEN);

})();




