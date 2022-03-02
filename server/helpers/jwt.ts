import JWT, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signAccessToken = (userId: string) => {
  return new Promise((resolve, reject) => {
    const payload = {
      sub: userId, //user info
      iss: process.env.URL, //issuer of the token
      aud: process.env.URL, //whom the token is issued for
    };

    const options = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    };

    if (!process.env.ACCESS_TOKEN_SECRET) return;

    JWT.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      options,
      (err, token) => {
        if (err) {
          reject(); //TODO: throw new error
        }

        resolve(token);
      }
    );
  });
};
