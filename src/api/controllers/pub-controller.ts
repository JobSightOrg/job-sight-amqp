import { PublisherService } from "../services/pub-service";
import { FastifyReply, FastifyRequest } from "fastify";

type RequestBody = {
  queue: string;
  payload: string;
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
      const { queue, payload } = req.body as RequestBody;

      await this.PublisherService.publish(queue, payload);
      res.status(200).send("Payload published successfully");
    } catch (error) {
      console.error("Error publishing payload:", error);
      res.status(500).send("Error publishing payload");
    }
  };
}
