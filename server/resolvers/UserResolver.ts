import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Users } from "../entity";

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
    @Arg("password") password: string
  ) {
    await Users.insert({ firstName, lastName, email, password });
    return true;
  }
}

export default UserResolver;
