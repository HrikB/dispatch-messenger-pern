import { Storage } from "@google-cloud/storage";

const storage = new Storage();

const bucket = storage.bucket("dispatch-files");

export default bucket;
