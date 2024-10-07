const WebSocket = require('ws');
const { verifyToken } = require('./auth');
const { processLocationUpdate } = require('../controller/locationController');

let clients = new Map();

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });

  wss.on('connection', async (ws, req) => {
    // const token = req.url.split('?token=')[1];
   
    const token = req.headers.authorization
    console.log(token)
  

    // Authenticate user via JWT token
    try {
      const user = await verifyToken(token);
      // Handle incoming messages
      ws.on('message', (message) => {
        processLocationUpdate(user.user.userId, message, token); // Process location data
        console.log(user)
       
      });

      ws.on('close', () => {
        clients.delete(user.id);
        console.log(`User ${user.id} disconnected`);
      });
    } catch (error) {
      ws.close(4001, 'Invalid token'); // Close connection if token verification fails
    }
  });

  console.log(`WebSocket server running on port ${process.env.WS_PORT || 8080}`);
}

module.exports = { startWebSocketServer };
