const axios = require('axios');
const { kafkaProducer } = require('../config/kafka');
const { riderServiceUrl, driverServiceUrl } = require('../config/externalServices');

async function processLocationUpdate(userId, locationData, token) {

  const headers = {
    Authorization: `Bearer ${token}`,  // Pass token in the Authorization header
  };

  console.log(userId)
  const { latitude, longitude, type } = JSON.parse(locationData); // Assuming type is 'rider' or 'driver'
  console.log(type)
  
  if (type === 'driver') {
    const driverId = userId
    // Send location data to external Driver Service
    console.log(driverId)
    await axios.post(`${driverServiceUrl}/drivers/locationUpdate`, { driverId, latitude, longitude },{headers});
  } else if (type === 'rider') {
    // Send location data to external Rider Service
    await axios.post(`${riderServiceUrl}/rider/updateLocation`, { userId, latitude, longitude },{headers});
  }

  // Optionally publish location data to Kafka
  await kafkaProducer.send({
    topic: `${userId}_location_updates`,
    messages: [{ value: JSON.stringify({ userId, latitude, longitude, type }) }],
  });
}

module.exports = { processLocationUpdate };
