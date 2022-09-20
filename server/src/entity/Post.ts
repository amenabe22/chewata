import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  likes: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user" })
  user: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
