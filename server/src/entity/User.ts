import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Generated,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  userId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  pushToken: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  socialIdtoken: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  totalLikes: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
