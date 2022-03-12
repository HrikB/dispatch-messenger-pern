import { Resolver, Query } from "type-graphql";
import { ref } from "firebase/storage";

@Resolver()
class CloudResolver {
  @Query(() => String)
  async getSignedURL() {
    return "the url";
  }
}

export default CloudResolver;
