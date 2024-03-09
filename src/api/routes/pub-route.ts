import { FastifyInstance } from "fastify";
import { PublisherController } from "../controllers/pub-controller";

const responseSchema = {
  response: {
    200: {
      properties: {
        result: { type: "boolean" },
      },
    },
  },
};

const publisherController = new PublisherController();

export async function pubRoutes(server: FastifyInstance) {
  server.post(
    "/publish",
    { schema: responseSchema },
    publisherController.publishMessage
  );
}
