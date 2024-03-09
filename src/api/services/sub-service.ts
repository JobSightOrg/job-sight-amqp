import amqpClientConnectionSingleton from "../../connection/amqp";
import amqp, { ConsumeMessage } from "amqplib";

export class SubscriberService {
  private channel?: amqp.Channel;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const connection = await amqpClientConnectionSingleton();
      this.channel = await connection.createChannel();
    } catch (err) {
      console.error(err);
    }
  }

  async consume(
    queue: string,
    callback: (message: ConsumeMessage | null) => void
  ) {
    if (!this.channel) await this.init();

    this.channel!.consume(queue, callback);
  }
}
