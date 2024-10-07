const { updateLocation } = require('./controllers/locationController');

const initWebSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Listen for location updates from drivers
    socket.on('locationUpdate', async (data) => {
      const { driverId, location } = data;
      await updateLocation(driverId, location);
      // Broadcast the updated location to other users (e.g., passengers)
      io.emit('locationBroadcast', { driverId, location });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = { initWebSocket };
