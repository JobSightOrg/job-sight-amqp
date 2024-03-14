import { Connection, ConsumeMessage } from "amqplib";
import queueName from "../config";

type contentMessage = {};

export default async function redisCache(connection: Connection) {
  const channel = await connection.createChannel();
  const queue = queueName.REDIS_CACHE;

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (msg) {
      const content = msg.content.toString();

      channel.ack(msg);
    }
  });
}
