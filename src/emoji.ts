import {isUnicodeEmoji} from "./utils";
import {Argument, ArgumentType, CommandoMessage, CommandoClient} from "discord.js-commando";

export enum EmojiType {
    Unicode,
    Discord
}

export class Emoji {

    type: EmojiType;
    data: string;

    constructor(type: EmojiType, data: string) {
        this.type = type;
        this.data = data;
    }

    toReact(): string {
        return this.type === EmojiType.Unicode ? decodeURI(this.data) : this.data.substring(1, this.data.length - 1);
    }

    toMessage(): string {
        return this.type === EmojiType.Unicode ? decodeURI(this.data) : this.data;
    }

    static parse(str: string): Emoji | null {
        //Discord emoji
        if (str.startsWith("<")) {
            return new Emoji(EmojiType.Discord, str);
        }

        //Unicode emoji
        if (isUnicodeEmoji(str)) {
            return new Emoji(EmojiType.Unicode, encodeURI(str));
        }

        return null;

    }

}

export class EmojiArgumentType extends ArgumentType {

    constructor(client: CommandoClient) {
        super(client, "emoji");
    }

    validate(value: string, msg: CommandoMessage, arg: Argument): boolean | string {
        //Discord emoji
        if (msg.guild.emojis.cache.find(e => e.toString() === value)) {
            return true;
        }

        //Unicode emoji
        if (isUnicodeEmoji(value)) {
            return true;
        }

        return "Invalid emoji.";
    }

    parse(value: string, msg: CommandoMessage, arg: Argument): Emoji {
        return Emoji.parse(value);
    }
}
