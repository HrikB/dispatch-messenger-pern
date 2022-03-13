import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: "key.json",
});

const bucket = storage.bucket("dispatch-files");

export default bucket;
