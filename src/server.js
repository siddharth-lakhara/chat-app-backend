const WebSocket = require('ws');
const actionsLookUp = require('./actions');
const usersList = require('./actions/usersList');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  let userName = '';
  ws.on('message', (msg) => {
    const msgObj = JSON.parse(msg);
    const { type, ...rest } = msgObj;
    const action = actionsLookUp[type];
    const results = action(rest);
    console.log(results.msg);

    if (results.userName) {
      userName = results.userName;
    }
  });

  ws.on('close', () => {
    console.log('disconnecting user', userName);
    const index = usersList.indexOf(userName);
    usersList.splice(index, 1);
  });
});
