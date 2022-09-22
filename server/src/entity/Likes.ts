import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";
import { Comment } from "./Comment";

export enum LikeType {
  POST = "post",
  COMMENT = "comment",
}

@ObjectType()
@Entity()
export class Likes {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  likeId: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    nullable: true,
    enum: LikeType,
  })
  likeType: string;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "post" })
  post: Post;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "comment" })
  comment: Comment;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  value: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "user" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
