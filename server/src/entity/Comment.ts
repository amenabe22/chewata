import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  commentId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  message: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ nullable: true, type: "boolean" })
  isReply: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, default: 0 })
  likes: number;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post" })
  post: Post;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "user" })
  user: User;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "reply_to" })
  reply_to: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
