const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let events = {
  '1': { id: '1', rsvpCount: 5 },
  '2': { id: '2', rsvpCount: 3 },
};

app.post('/rsvp/:id', (req, res) => {
  const id = req.params.id;
  if (!events[id]) events[id] = { id, rsvpCount: 0 };
  events[id].rsvpCount += 1;
  io.emit('rsvp:update', { id, rsvpCount: events[id].rsvpCount });
  res.json({ ok: true, rsvpCount: events[id].rsvpCount });
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('disconnect', () => console.log('socket disconnected', socket.id));
});

const PORT = process.env.PORT || 4000;
server.listenPORT, () => console.log

