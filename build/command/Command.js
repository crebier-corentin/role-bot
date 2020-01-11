"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//This is need to add properties missing in discord.js-commando types declaration file
const discord_js_commando_1 = require("discord.js-commando");
class Command extends discord_js_commando_1.Command {
    constructor(client, info) {
        super(client, info);
    }
}
exports.Command = Command;
//# sourceMappingURL=Command.js.map