import { Notifications } from "../entity/Notification";
import { Arg, Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { AppDataSource } from "../data-source";
import { isAuthed } from "../decorators";
import { MyContext, PaginatedNotificationsResponse } from "../types";
import { paginator } from "../utils/paginator";
import { PaginationInputType } from "../inputs";

@Resolver(Notifications)
export class NotificationsResolver {
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
    return paginator(notifications, pagination.page, pagination.pageSize);
  }
}
