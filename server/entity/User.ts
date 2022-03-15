import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { string } from "joi";

@Entity()
@ObjectType()
class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn({ type: "date", onUpdate: new Date().toDateString() })
  updatedAt = new Date();

  @Field(() => String)
  @Column({ type: "varchar" })
  firstName: string;

  @Field(() => String)
  @Column({ type: "varchar" })
  lastName: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ type: "varchar", nullable: true })
  profilePic: string | null;

  @Field(() => [String])
  @Column("varchar", { array: true, default: [] })
  friendsList: string[];
}

export default Users;
