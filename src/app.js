const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./utils/db');
// const userRoutes = require('./routes/userRoutes');
const { verifyToken } = require('./config/auth');
const { startWebSocketServer } = require('./config/websocket');

const app = express();
app.use(bodyParser.json());

// Routes
// app.use('/api/users', userRoutes);

// WebSocket Server
startWebSocketServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
