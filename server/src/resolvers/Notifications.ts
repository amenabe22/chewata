import {
  Arg,
  Ctx,
  ObjectType,
  Query,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { AppDataSource } from "../data-source";
import { Notifications } from "../entity/Notification";
import { isAuthed } from "../decorators";
import {
  MyContext,
  NotificationResponse,
  PaginatedNotificationsResponse,
} from "../types";
import { paginator } from "../utils/paginator";
import { PaginationInputType } from "../inputs";

@ObjectType()
export class MessageResponseType {
  item: String;
  // @Field(() => Message)
  // mes: Message;

  // @Field(() => User)
  // target: User;
}

@Resolver(Notifications)
export class NotificationsResolver {
  @Query(() => [Notifications])
  @UseMiddleware(isAuthed)
  async latestNotifications(@Ctx() { user }: MyContext) {
    const count = 5;
    const notifications = await AppDataSource.manager.find(Notifications, {
      where: {
        target: {
          id: user.id,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
    return notifications.slice(0, count);
  }

  @Query(() => PaginatedNotificationsResponse)
  @UseMiddleware(isAuthed)
  async notifications(
    @Arg("pagination") pagination: PaginationInputType,
    @Ctx() { user }: MyContext
  ) {
    const notifications = await AppDataSource.manager.find(Notifications, {
      where: {
        target: {
          id: user.id,
        },
      },
      order: {
        createdAt: "DESC",
      },
    });
    notifications.forEach(async (nt: Notifications) => {
      await AppDataSource.manager.update(Notifications, nt.id, { read: true });
    });
    return paginator(notifications, pagination.page, pagination.pageSize);
  }

  // notification listener subscription
  @Subscription({
    topics: "NOTIFICATION_ADDED",
    filter: async ({ context, payload }: any) => {
      // handle direct interactions
      if(payload.notification.target.id == context.user.id){
        return true
      }
      return false;
    },
  })
  notificationAdded(
    @Root() response: NotificationResponse
  ): NotificationResponse {
    return response;
  }
}
