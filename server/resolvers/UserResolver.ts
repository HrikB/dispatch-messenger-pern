import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Users } from "../entity";
import { registerSchema } from "../helpers";
import bcrypt from "bcrypt";
import { UserInputError } from "apollo-server-express";

@Resolver()
class UserResolver {
  @Query(() => [Users])
  users() {
    return Users.find();
  }
  @Mutation(() => Boolean)
  async registerUser(
    @Arg("first_name") firstName: string,
    @Arg("last_name") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirm_password") confirmPassword: string
  ) {
    const validation = await registerSchema.validateAsync({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    const existingUser = await Users.findOne({ email: validation.email });

    if (existingUser) throw new UserInputError("email already exists");
    // return {
    //   errors: [
    //     {
    //       path: "email",
    //       message: "already in use",
    //     },
    //   ],
    // };

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.insert({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return true;
  }
}

export default UserResolver;
