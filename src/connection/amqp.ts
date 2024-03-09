import amqp from "amqplib";

let amqpConnection: Promise<amqp.Connection>;

const amqpClientConnectionSingleton = async () => {
  if (!amqpConnection) {
    amqpConnection = amqp.connect(process.env.AMQP_URL!);
  }
  return await amqpConnection;
};

export default amqpClientConnectionSingleton;
