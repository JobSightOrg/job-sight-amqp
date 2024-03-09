import amqpClientConnectionSingleton from "../../connection/amqp";
import amqp from "amqplib";

export class PublisherService {
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

  async publish(queue: string, message: string) {
    if (!this.channel) await this.init();

    await this.channel!.assertQueue(queue, {
      durable: true,
      autoDelete: false,
    });
    this.channel!.sendToQueue(queue, Buffer.from(message));
  }
}
