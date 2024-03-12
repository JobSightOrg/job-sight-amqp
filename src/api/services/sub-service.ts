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
      (payload: ConsumeMessage | null): void => {
        if (payload !== null) {
          const contentString = payload.content.toString();

          console.log("Received payload:", contentString);
          this.channel?.ack(payload);
        }
      }
    );
  }
}
