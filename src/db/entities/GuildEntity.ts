import {
    BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn,
} from "typeorm";
import {RoleEntity} from "./RoleEntity";


@Entity()
export class GuildEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    guildId: string;

    @Column({nullable: true, default: null})
    channelId: string | null;

    @Column({nullable: true, default: null})
    messageId: string | null;

    @OneToMany(() => RoleEntity, role => role.guild)
    roles: RoleEntity[];

    static async findOrCreate(guildId: string): Promise<GuildEntity> {
        const guild = await GuildEntity.findOne({where: {guildId}, relations: ["roles"]});
        if (guild != undefined) return guild;

        //Create
        const newGuild = new GuildEntity();
        newGuild.guildId = guildId;
        return await newGuild.save();
    }

}


