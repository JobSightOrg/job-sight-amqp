import dotenv from "dotenv";
dotenv.config();
import fastify from "fastify";
import { pubRoutes } from "./api/routes/pub-route";
import { subRoutes } from "./api/routes/sub-route";

const server = fastify();

server.register(pubRoutes, { prefix: "/api" });
server.register(subRoutes, { prefix: "/api" });

server.listen({ port: 8090 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
