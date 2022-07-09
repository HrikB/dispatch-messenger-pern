import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
} from "type-graphql";
import { Users } from "../entity";
import { loginSchema, registerSchema, signAccessToken } from "../helpers";
import bcrypt from "bcrypt";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { MyContext } from "../types";
import { v4 } from "uuid";
import crypto from "crypto";
import { UnpublishedOutlined } from "@mui/icons-material";

@ObjectType()
class SignatureData {
  @Field()
  token: string;
  @Field()
  expire: number;
  @Field()
  signature: string;
}

@Resolver()
class UserResolver {
  @Query(() => [Users])
  users() {
    return Users.find();
  }

  @Query(() => SignatureData)
  getSignatureData() {
    const token = v4();
    const expire = parseInt((Date.now() / 1000).toString()) + 120;
    const signature = crypto
      .createHmac("sha1", process.env.IMAGE_KIT_PRIVATE || "")
      .update(token + expire)
      .digest("hex");

    return {
      token,
      expire,
      signature,
    };
  }

  @Mutation(() => Users)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req, res }: MyContext
  ) {
    const validation = await loginSchema.validateAsync({ email, password });
    const user = await Users.findOne({ email: validation.email });
    if (!user)
      throw new AuthenticationError("user not registered", {
        exception: {
          details: [
            {
              message: "user not registered",
              path: ["email"],
            },
          ],
        },
      });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new AuthenticationError("username/password incorrect", {
        exception: {
          details: [
            {
              message: "username/password incorrect",
              path: ["none"],
            },
          ],
        },
      });
    const accessToken = await signAccessToken(user.id);
    res.cookie("accessToken", accessToken, {
      sameSite: "strict",
      httpOnly: true,
    });
    return user;
  }

  @Mutation(() => Boolean)
  async registerUser(
    @Arg("first_name") firstName: string,
    @Arg("last_name") lastName: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("confirm_password") confirmPassword: string
  ) {
    const validation = await registerSchema.validateAsync({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    const existingUser = await Users.findOne({ email: validation.email });

    if (existingUser)
      throw new UserInputError("email already exists", {
        exception: {
          details: [
            {
              message: "email already exists",
              path: ["email"],
            },
          ],
        },
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.insert({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return true;
  }
}

export default UserResolver;
