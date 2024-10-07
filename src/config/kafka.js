const { Kafka } = require('kafkajs');
const kafka = new Kafka({ clientId: 'uber-app', brokers: ['localhost:9092'] });

const kafkaProducer = kafka.producer();
const kafkaConsumer = kafka.consumer({ groupId: 'location-group' });

async function runKafka() {
  await kafkaProducer.connect();
  await kafkaConsumer.connect();

  kafkaConsumer.subscribe({ topic: 'location_updates', fromBeginning: false });
  kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

runKafka().catch(console.error);

module.exports = { kafkaProducer, kafkaConsumer };
