import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1578770562900 implements MigrationInterface {
    name = "InitialMigration1578770562900"

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `role_entity` (`id` int NOT NULL AUTO_INCREMENT, `roleId` varchar(255) NOT NULL, `emojiType` int NOT NULL, `emojiData` varchar(255) NOT NULL, `type` int NOT NULL, `guildId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `guild_entity` (`id` int NOT NULL AUTO_INCREMENT, `guildId` varchar(255) NOT NULL, `channelId` varchar(255) NULL DEFAULT null, `messageId` varchar(255) NULL DEFAULT null, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `role_entity` ADD CONSTRAINT `FK_1ec17e958a23bb83e1655f0a3e1` FOREIGN KEY (`guildId`) REFERENCES `guild_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `role_entity` DROP FOREIGN KEY `FK_1ec17e958a23bb83e1655f0a3e1`", undefined);
        await queryRunner.query("DROP TABLE `guild_entity`", undefined);
        await queryRunner.query("DROP TABLE `role_entity`", undefined);
    }

}
