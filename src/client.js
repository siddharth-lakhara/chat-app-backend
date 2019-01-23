// Made for testing server functionalities

const WebSocket = require('ws');

ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
  ws.send('client send Hi');
});

ws.on('message', (data) => {
  console.log('rcvd message at client');
  console.log(data);
})

ws.on('open', ()=>{
  ws.send('client says Hi again');
  ws.send('client says Hi once again');
});
