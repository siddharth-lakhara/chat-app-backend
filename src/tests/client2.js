const WebSocket = require('ws');

const ws2 = new WebSocket('ws://localhost:8080');

ws2.on('open', () => {
  ws2.send(JSON.stringify({
    type: 'ADD_USERS',
    userName: 'user2',
  }));
});

ws2.on('message', (data) => {
  console.log('rcvd message at client user2');
  console.log(data);
});
