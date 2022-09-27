import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum NotificationType {
  LIKE = "like",
  POST = "post",
  CAMPAIGN = "campaign",
  ANNOUNCEMENT = "announcement",
  VOTE = "vote",
  ACCOUNT = "account",
  COMMENT = "comment",
}

@ObjectType()
@Entity()
export class Notifications {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  notificationId: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    nullable: true,
    enum: NotificationType,
  })
  notificationType: string;

  @Field(() => String)
  @Column()
  entityId: string;

  @Field(() => String)
  @Column()
  message: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "user" })
  user: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "target" })
  target: User;

  @Field(() => String, { nullable: true })
  @Column()
  link: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
