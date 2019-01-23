const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

wss.on('connection', (ws) => {
  ws.on('message', (msg)=>{
    console.log('msg rcvd');
    console.log(msg);
    console.log('***');
  })

  console.log('connection open');
  ws.send('ack from server');
});