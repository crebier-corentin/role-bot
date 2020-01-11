"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const channel_1 = require("./command/channel");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const discord_js_commando_1 = require("discord.js-commando");
const message_1 = require("./command/message");
const RoleEntity_1 = require("./db/entities/RoleEntity");
const reacter_1 = require("./reacter");
const emoji_1 = require("./emoji");
const emoji_2 = require("./command/emoji");
const list_1 = require("./command/list");
const remove_1 = require("./command/remove");
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
    await typeorm_1.createConnection();
    const client = new discord_js_commando_1.CommandoClient({
        commandPrefix: process.env.PREFIX
    });
    client.registry.registerDefaults()
        .registerType(emoji_1.EmojiArgumentType)
        .registerGroups([
        ["config"],
        ["role"]
    ])
        .registerCommands([channel_1.default, message_1.default, list_1.ListCommand, remove_1.RemoveCommand, emoji_2.NormalCommand, emoji_2.ToggleCommand]);
    //Reacters
    const reacters = new Map([
        [RoleEntity_1.RoleType.Normal, reacter_1.NormalReacter],
        [RoleEntity_1.RoleType.Toggle, reacter_1.ToggleReacter],
    ]);
    client.on("raw", async (packet) => {
        if (!["MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE"].includes(packet.t))
            return;
        const emoji = emoji_1.Emoji.parse(packet.d.emoji.id ? `<:${packet.d.emoji.name}:${packet.d.emoji.id}>` : packet.d.emoji.name);
        const roleEntity = await RoleEntity_1.RoleEntity.createQueryBuilder("role")
            .leftJoinAndSelect("role.guild", "guild")
            .where("guild.channelId = :channelId", { channelId: packet.d.channel_id })
            .andWhere("role.emojiData = :emojiData", { emojiData: emoji.data })
            .getOne();
        if (roleEntity == undefined)
            return;
        //Message sent by this bot
        const channel = client.channels.get(packet.d.channel_id);
        const message = await channel.fetchMessage(packet.d.message_id);
        if (message.author.id !== client.user.id)
            return;
        const member = client.guilds.get(packet.d.guild_id).member(packet.d.user_id);
        if (member.user.bot)
            return;
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
//# sourceMappingURL=index.js.map