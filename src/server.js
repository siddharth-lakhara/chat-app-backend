const WebSocket = require('ws');
const actionsLookUp = require('./actions');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    const msgObj = JSON.parse(msg);
    const { type, ...rest } = msgObj;
    const action = actionsLookUp[type];
    const results = action(rest);
    console.log(results.msg);
  });

  console.log('connection open');
});
