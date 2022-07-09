import ImageKit from "imagekit";

export const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC || "",
  privateKey: process.env.IMAGE_KIT_PRIVATE || "",
  urlEndpoint: `https://ik.imagekit.io/${process.env.IMAGE_KIT_ID}/`,
});

export default imageKit;
