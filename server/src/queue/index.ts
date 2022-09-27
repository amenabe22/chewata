import { Queue as QueueMQ, Worker } from "bullmq";
import { AppDataSource } from "../data-source";
import { Notifications } from "../entity/Notification";
import { redisConig } from "../config.redis";
import { sendPushNotification } from "../utils/core";

// const sleep = (t: any) =>
//   new Promise((resolve) => setTimeout(resolve, t * 1000));

export async function setupBullMQProcessor(queueName: string) {
  new Worker(queueName, async (job) => {
    if (job.data.type == "notification") {
      //   console.log("Bitch", job.data.type);
      const notification_query = await AppDataSource.manager.find(
        Notifications,
        {
          where: {
            entityId: job.data.entityId,
            user: {
              id: job.data.user.id,
            },
            target: {
              id: job.data.target.id,
            },
          },
        }
      );
      if (!notification_query.length) {
        await AppDataSource.manager.save(Notifications, {
          target: job.data.target,
          user: job.data.user,
          message: job.data.annotation,
          cover: job.data.cover,
          link: job.data.link,
          entityId: job.data.entityId,
          notificationType: job.data.notificationType,
        });
        console.log(job.data, "DATA");
        await sendPushNotification(
          job.data.target.pushToken,
          job.data.annotation,
          job.data.annotation,
          job.data.cover,
          job.data.link
        );
        console.log(job.data.user.pushToken, "Token");
        console.log("Reached worker", job.data.annotation);
      } else {
        console.log("Notification already sent");
      }
    }
    return { jobId: `This is the return value of job (${job.id})` };
  });
}

export const createQueueMQ = (name: string) =>
  new QueueMQ(name, {
    connection: redisConig as any,
  });

export const coreBullQ = createQueueMQ("BullMQ");
// export const notificationQueue = createQueueMQ("NotificationQueue");
