// Made for testing server functionalities

const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  ws.send(JSON.stringify({
    type: 'ADD_USERS',
    userName: 'swayam',
  }));
  setTimeout(() => ws.send(
    JSON.stringify({
      type: 'SEND_MSG',
      from: 'siddharth',
      to: 'user2',
      data: 'some msg',
    }),
  ), 3000);
});

ws.on('message', (data) => {
  console.log('rcvd message at client siddharth');
  console.log(data);
});
