const WebSocket = require('ws');

const WS_URL = 'ws://localhost:8080'; // Your WebSocket server URL
const NUM_USERS = 1000; // Number of simulated users
const INTERVAL_MS = 1000; // Time interval to send location updates (1 second)

// Simulate users with WebSocket connections
function simulateUser(userId) {
  const ws = new WebSocket(`${WS_URL}?token=your_jwt_token_for_${userId}`);

  ws.on('open', () => {
    console.log(`User ${userId} connected`);

    // Send location update every INTERVAL_MS
    setInterval(() => {
      const locationUpdate = {
        userId,
        lat: (Math.random() * 180 - 90).toFixed(6), // Simulated latitude
        lng: (Math.random() * 360 - 180).toFixed(6), // Simulated longitude
        type: userId % 2 === 0 ? 'driver' : 'rider' // Alternate between driver and rider
      };
      ws.send(JSON.stringify(locationUpdate));
    }, INTERVAL_MS);
  });

  ws.on('message', (message) => {
    console.log(`User ${userId} received message: ${message}`);
  });

  ws.on('close', () => {
    console.log(`User ${userId} disconnected`);
  });

  ws.on('error', (err) => {
    console.error(`User ${userId} encountered an error: ${err.message}`);
  });
}

// Simulate multiple users
for (let i = 1; i <= NUM_USERS; i++) {
  simulateUser(i);
}
