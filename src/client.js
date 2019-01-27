// Made for testing server functionalities

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'ADD_USERS',
    userName: 'siddharth',
  }));
});

ws.on('message', (data) => {
  console.log('rcvd message at client');
  console.log(data);
});
