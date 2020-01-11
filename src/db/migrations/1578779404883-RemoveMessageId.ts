import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveMessageId1578779404883 implements MigrationInterface {
    name = 'RemoveMessageId1578779404883'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guild_entity` DROP COLUMN `messageId`", undefined);
        await queryRunner.query("ALTER TABLE `guild_entity` CHANGE `channelId` `channelId` varchar(255) NULL DEFAULT null", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `guild_entity` CHANGE `channelId` `channelId` varchar(255) NULL", undefined);
        await queryRunner.query("ALTER TABLE `guild_entity` ADD `messageId` varchar(255) NULL", undefined);
    }

}
