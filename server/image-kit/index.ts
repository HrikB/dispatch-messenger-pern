import ImageKit from "imagekit";

export default new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC || "",
  privateKey: process.env.IMAGE_KIT_PRIVATE || "",
  urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGE_KIT_ID}/`,
});
