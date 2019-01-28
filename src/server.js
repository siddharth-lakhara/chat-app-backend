const WebSocket = require('ws');
const actionsLookUp = require('./actions');
const usersList = require('./actions/usersList');
const broadcast = require('./actions/broadcast');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  let userName = '';
  ws.on('message', (msg) => {
    const msgObj = JSON.parse(msg);
    const { type, ...rest } = msgObj;
    try {
      const action = actionsLookUp[type];
      const results = action(rest, ws);
      console.log(results.msg);

      if (results.userName) {
        userName = results.userName;
      }
    } catch (e) {
      console.log('invalid command: ', type);
    }
  });

  ws.on('close', () => {
    console.log('disconnecting user', userName);
    delete usersList[userName];
    broadcast(JSON.stringify({
      type: 'USERS_UPDATE',
      usersList: Object.keys(usersList),
    }));
  });
});
