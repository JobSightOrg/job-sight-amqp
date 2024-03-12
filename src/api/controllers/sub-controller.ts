import { ConsumeMessage } from "amqplib";
import { SubscriberService } from "../services/sub-service";
import { FastifyReply, FastifyRequest } from "fastify";

type RequestBody = {
  queue: string;
};

interface ISubscriberController {
  consumeMessage: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}

export class SubscriberController implements ISubscriberController {
  private SubscriberService: SubscriberService;

  constructor() {
    this.SubscriberService = new SubscriberService();
  }

  consumeMessage = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { queue } = req.body as RequestBody;

      await this.SubscriberService.consume(queue);
      res.status(200).send("payload subscribed successfully");
    } catch (error) {
      console.error("Error subscribing payload:", error);
      res.status(500).send("Error subscribing payload");
    }
  };
}
