const WebSocket = require('ws');
const { verifyToken } = require('./config/auth');
const { processLocationUpdate } = require('./controller/locationUpdateController');
const { kafkaProducer } = require('./config/kafka');

let clients = new Map();

function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws, req) => {
    const token = req.url.split('?token=')[1];
    
    // Only allow connection if token is valid
    verifyToken(token)
      .then(user => {
        clients.set(user.id, ws);
        ws.on('message', (data) => processLocationUpdate(user.id, data));
      })
      .catch(() => ws.close());

    ws.on('close', () => {
      clients.delete(user.id);
    });
  });

  console.log('WebSocket server running on port 8080');
}

module.exports = { startWebSocketServer };
