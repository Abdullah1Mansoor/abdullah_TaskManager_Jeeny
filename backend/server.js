
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 

const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = 3001;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' },  
});

app.use(cors());
app.use(express.json());

app.locals.io = io;

app.use('/tasks', tasksRouter);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
