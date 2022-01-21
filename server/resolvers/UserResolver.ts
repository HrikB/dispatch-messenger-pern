import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entity";

@Resolver()
class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }
  @Mutation(() => Boolean)
  async registerUser(
    @Arg("first_name") firstName: string,
    @Arg("last_name") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    await User.insert({ firstName, lastName, email, password });
    return true;
  }
}

export default UserResolver;
