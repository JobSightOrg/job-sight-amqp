import { PublisherService } from "../services/pub-service";
import { FastifyReply, FastifyRequest } from "fastify";

type RequestBody = {
  queue: string;
  message: string;
};

interface IPublisherController {
  publishMessage: (req: FastifyRequest, res: FastifyReply) => Promise<void>;
}

export class PublisherController implements IPublisherController {
  private PublisherService: PublisherService;

  constructor() {
    this.PublisherService = new PublisherService();
  }

  publishMessage = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { queue, message } = req.body as RequestBody;

      await this.PublisherService.publish(queue, message);
      res.status(200).send("Message published successfully");
    } catch (error) {
      console.error("Error publishing message:", error);
      res.status(500).send("Error publishing message");
    }
  };
}
