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

  async consume(queue: string) {
    if (!this.channel) await this.init();

    await this.channel!.consume(
      queue,
      (message: ConsumeMessage | null): void => {
        if (message !== null) {
          const contentString = message.content.toString();

          console.log("Received message:", contentString);
          this.channel?.ack(message);
        }
      }
    );
  }
}
