import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Users } from "../entity";
import bcrypt from "bcrypt";

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
    @Arg("confirm_passwrd") confirm_password: string
  ) {
    if (password !== confirm_password)
      return {
        errors: [
          {
            path: "confirm_password",
            message: "Both password need to match",
          },
        ],
      };

    const existingUser = await Users.findOne({ email });

    if (existingUser)
      return {
        errors: [
          {
            path: "email",
            message: "already in use",
          },
        ],
      };

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
