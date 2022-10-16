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

export enum CommunityType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum CommunityMemberStatus {
  SUSPENDED = "suspended",
  BANNED = "banned",
}

export enum MembershipType {
  OWNER = "owner",
  ADMIN = "admin",
  MEMBER = "member",
  EDITOR = "editor",
}

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  catId: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@ObjectType()
@Entity()
export class Community {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Generated("uuid")
  communityId: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  slug: string;

  @Field(() => String)
  @Column({ type: "text" })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  logo: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  cover: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    nullable: true,
    enum: CommunityType,
  })
  type: string;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "category" })
  category: Category;

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

@ObjectType()
@Entity()
export class CommunityMember {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "user" })
  user: User;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: "boolean", nullable: true })
  sendNotification: boolean;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    nullable: true,
    enum: CommunityMemberStatus,
  })
  status: string;

  @Field(() => Community, { nullable: true })
  @ManyToOne(() => Community, { onDelete: "CASCADE", eager: true })
  @JoinColumn({ name: "community" })
  community: Community;

  @Field(() => String, { nullable: true })
  @Column({
    type: "enum",
    nullable: true,
    enum: MembershipType,
    default: MembershipType.MEMBER,
  })
  memberType: string;

  @Field(() => String)
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
