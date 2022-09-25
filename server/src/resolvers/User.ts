import { User } from "../entity/User";
import { auth } from "firebase-admin";
import { UserResponse } from "./types";
import { AppDataSource } from "../data-source";
import { sign } from "jsonwebtoken";
import {
  Resolver,
  Mutation,
  Query,
  Arg,
  UseMiddleware,
  Ctx,
} from "type-graphql";
import { JWT_KEY } from "../constants";
import { isAuthed } from "../decorators";
import { MyContext } from "../types";

export const signCookie = (user: User) => {
  return sign(
    {
      userId: user.id,
    },
    JWT_KEY!
  );
};

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async newQuery() {
    return "Hello Niggaz";
  }
  // update user push notification token Id
  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(isAuthed)
  async updateUserPushToken(
    @Arg("token") token: string,
    @Ctx() { user }: MyContext
  ) {
    await AppDataSource.manager
      .getRepository(User)
      .update(user.id, { pushToken: token });
    return true;
  }

  @Mutation(() => UserResponse, { nullable: true })
  async socialMediaLoginGoogle(
    @Ctx() { res }: MyContext,
    @Arg("input") token: string
  ) {
    const decodedToken = await auth().verifyIdToken(token);

    const socialUsr = decodedToken;
    console.log(socialUsr, "USER");
    const user = await AppDataSource.manager.findOne(User, {
      where: {
        socialIdtoken: socialUsr.uid,
      },
    });
    if (!user) {
      // create new account for the user if they don't exist
      const user = AppDataSource.manager.create(User, {
        fullName: socialUsr.name,
        email: socialUsr.email,
        socialIdtoken: socialUsr.uid,
        photo: socialUsr.picture,
        totalLikes: 0,
      });
      await AppDataSource.manager.save(user);
      const signedToken = signCookie(user);
      res.cookie("JWT_COOKIE", signedToken, {
        maxAge: 800 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return {
        user: user,
        token: signedToken,
      };
    }
    const signedToken = signCookie(user);
    res.cookie("JWT", signedToken, {
      maxAge: 800 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return {
      user: user,
      token: sign(
        {
          userId: user.id,
        },
        JWT_KEY!
      ),
    };
  }

  @Query(() => User)
  @UseMiddleware(isAuthed)
  async me(@Ctx() { user }: MyContext) {
    return user;
  }

  @Query(() => User)
  @UseMiddleware(isAuthed)
  async userPublic(@Arg("user") uid: string) {
    const user = await AppDataSource.manager.findOne(User, {
      where: { userId: uid },
    });
    if (!user) {
      throw Error("user not found");
    }
    return user;
  }
  // remove jwt cookie
  @Mutation(() => Boolean)
  @UseMiddleware(isAuthed)
  async logout(@Ctx() { res }: MyContext) {
    res.clearCookie("JWT");
    return true;
  }
}
