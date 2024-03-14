import amqpClientConnectionSingleton from "../connection/amqp";
import { FastifyInstance } from "fastify";
import redisCache from "./consumers/redis-cache";
import { Connection } from "amqplib";

export default async function amqpConsumerPlugin(fastify: FastifyInstance) {
  const connection = await amqpClientConnectionSingleton();

  /**
   * All consumers are stored here.
   * @param {Connection} connection - AMQP server connection
   */
  await redisCache(connection);
}
