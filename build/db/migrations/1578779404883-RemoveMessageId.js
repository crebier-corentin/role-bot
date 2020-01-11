"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RemoveMessageId1578779404883 {
    constructor() {
        this.name = 'RemoveMessageId1578779404883';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `guild_entity` DROP COLUMN `messageId`", undefined);
        await queryRunner.query("ALTER TABLE `guild_entity` CHANGE `channelId` `channelId` varchar(255) NULL DEFAULT null", undefined);
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `guild_entity` CHANGE `channelId` `channelId` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `guild_entity` ADD `messageId` varchar(255) NULL", undefined);
    }
}
exports.RemoveMessageId1578779404883 = RemoveMessageId1578779404883;
//# sourceMappingURL=1578779404883-RemoveMessageId.js.map