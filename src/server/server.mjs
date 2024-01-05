import clientPromise from "../lib/mongodb.mjs";
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer((req, res) => {
  // Handle HTTP requests if needed
});

const io = new Server(server, { cors: { origin : '*',}});
const client = await clientPromise;
const db = client.db('test-db1');

io.on('connection', (socket) => {
  console.log('A user connected');

  // // Handle chat messages
  // socket.on('chat message', (message) => {
  //   io.emit('chat message', message); // Broadcast the message to all connected clients
  // });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3001, async () => {
  const votesCollection = await db.collection('votes');
  const votes = await votesCollection.find({}).toArray();
  const changeStream = votesCollection.watch();

  changeStream.on('change', next => {
    const { operationType, fullDocument } = next || {};
    console.log({ operationType, fullDocument });
    io.emit('change-event', JSON.stringify({ operationType,  fullDocument}));
  });

  console.log('WebSocket server listening on port 3001');
});
