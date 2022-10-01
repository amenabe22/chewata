import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
  OneToMany,
} from "typeorm";
import { Tag } from "./Core";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  postId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  slug: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, default: 0 })
  likes: number;

  @Field(() => Int, { nullable: true })
  comments: number;

  @Field(() => [Tag], { nullable: true })
  @OneToMany(() => Tag, (tag) => tag.post, {
    onDelete: "CASCADE",
    eager: true,
    nullable: true,
  })
  tags: [];

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
