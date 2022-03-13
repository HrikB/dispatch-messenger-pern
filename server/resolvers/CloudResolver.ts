import { Resolver, Query } from "type-graphql";
import { bucket } from "../helpers";
import { v4 } from "uuid";
import { GetSignedUrlConfig } from "@google-cloud/storage";

@Resolver()
class CloudResolver {
  @Query(() => String)
  async getSignedURL() {
    const writeOptions: GetSignedUrlConfig = {
      version: "v4" as "v4",
      action: "write" as "write",
      expires: Date.now() + 30 * 60 * 1000, // forward 30 minutes
      contentType: "application/octet-stream",
    };

    // const readOptions = { ...writeOptions, action: "read" as "read" };

    const [writeUrl] = await bucket
      .file(`images/${v4()}.png`)
      .getSignedUrl(writeOptions);

    return writeUrl;
  }
}

export default CloudResolver;
