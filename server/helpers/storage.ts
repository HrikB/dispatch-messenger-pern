import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "eastern-augury-343821",
  keyFilename: "key.json",
});

const bucket = storage.bucket("dispatch-files");

export default bucket;
