import { Resolver, Query } from "type-graphql";
import { bucket } from "../helpers";

@Resolver()
class CloudResolver {
  @Query(() => String)
  async getSignedURL() {
    const options = {
      version: "v4" as "v4",
      action: "write" as "write",
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType: "application/octet-stream",
    };

    const [url] = await bucket.file("photo").getSignedUrl(options);

    return url;
  }
}

export default CloudResolver;
