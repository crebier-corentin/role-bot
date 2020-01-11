import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {GuildEntity} from "./GuildEntity";
import {Emoji, EmojiType} from "../../emoji";

export enum RoleType {
    Normal,
    Toggle
}

@Entity()
export class RoleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: string;

    @Column()
    emojiType: EmojiType;

    @Column()
    emojiData: string;

    @Column()
    type: RoleType;

    @ManyToOne(() => GuildEntity, guild => guild.roles)
    guild: GuildEntity;

    emoji(): Emoji {
        return new Emoji(this.emojiType, this.emojiData);
    }

}



