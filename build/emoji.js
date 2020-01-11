"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const discord_js_commando_1 = require("discord.js-commando");
var EmojiType;
(function (EmojiType) {
    EmojiType[EmojiType["Unicode"] = 0] = "Unicode";
    EmojiType[EmojiType["Discord"] = 1] = "Discord";
})(EmojiType = exports.EmojiType || (exports.EmojiType = {}));
class Emoji {
    constructor(type, data) {
        this.type = type;
        this.data = data;
    }
    toReact() {
        return this.type === EmojiType.Unicode ? decodeURI(this.data) : this.data.substring(1, this.data.length - 1);
    }
    toMessage() {
        return this.type === EmojiType.Unicode ? decodeURI(this.data) : this.data;
    }
    static parse(str) {
        //Discord emoji
        if (str.startsWith("<")) {
            return new Emoji(EmojiType.Discord, str);
        }
        //Unicode emoji
        if (utils_1.isUnicodeEmoji(str)) {
            return new Emoji(EmojiType.Unicode, encodeURI(str));
        }
        return null;
    }
}
exports.Emoji = Emoji;
class EmojiArgumentType extends discord_js_commando_1.ArgumentType {
    constructor(client) {
        super(client, "emoji");
    }
    validate(value, msg, arg) {
        //Discord emoji
        if (msg.guild.emojis.find(e => e.toString() === value)) {
            return true;
        }
        //Unicode emoji
        if (utils_1.isUnicodeEmoji(value)) {
            return true;
        }
        return "Invalid emoji.";
    }
    parse(value, msg, arg) {
        const tmp = Emoji.parse(value);
        return tmp;
    }
}
exports.EmojiArgumentType = EmojiArgumentType;
//# sourceMappingURL=emoji.js.map