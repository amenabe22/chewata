import { verify } from "jsonwebtoken";
import { JWT_KEY } from "../constants";
import { User } from "../entity/User";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";
import { AppDataSource } from "../data-source";

export const isAuthed: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const token = context.req.cookies["JWT"];
  // check if auth header is set
  if (!token) {
    throw new Error("Not Authenticated");
  }
  try {
    const payload: any = verify(token, JWT_KEY!);
    const user = await AppDataSource.manager.findOne(User, {
      where: { id: payload?.userId },
    });

    if (!user) {
      throw new Error("Invalid user");
    }
    context.user = user;
  } catch (err) {
    console.log(err);
    throw new Error("Not Authenticated");
  }
  return next();
};
