import { Resolver, Query } from "type-graphql";

@Resolver()
class UserResolver {
  @Query(() => String)
  hello() {
    return "world";
  }
}

export default UserResolver;
