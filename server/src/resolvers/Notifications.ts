import { Notifications } from "../entity/Notification";
import { Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuthed } from "../decorators";
import { AppDataSource } from "../data-source";

@Resolver(Notifications)
export class NotificationsResolver {
  @Query(() => [Notifications])
  //   @UseMiddleware(isAuthed)
  async notifications() {
    const notifications = await AppDataSource.manager.find(Notifications);
    return notifications;
  }
}
