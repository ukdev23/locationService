const { kafkaProducer, kafkaConsumer } = require('../config/kafka');

async function sendMessageToKafka(topic, message) {
  await kafkaProducer.send({
    topic,
    messages: [{ value: message }]
  });
}

module.exports = { sendMessageToKafka };
