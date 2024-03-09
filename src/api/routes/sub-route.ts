import { FastifyInstance } from "fastify";
import { SubscriberController } from "../controllers/sub-controller";

const responseSchema = {
  response: {
    200: {
      properties: {
        result: { type: "boolean" },
      },
    },
  },
};

const subscriberController = new SubscriberController();

export async function subRoutes(server: FastifyInstance) {
  server.post(
    "/subscribe",
    { schema: responseSchema },
    subscriberController.consumeMessage
  );
}
