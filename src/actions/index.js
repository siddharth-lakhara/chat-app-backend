const usersList = require('./usersList');
const verifyUsers = require('./verifyUsers');
const broadcast = require('./broadcast');

const actionsLookUp = {
  ADD_USERS: (params, ws) => {
    const { userName } = params;
    if (!usersList.hasOwnProperty(userName)) {
      // add user
      usersList[userName] = ws;
      const updateUsersPayload = {
        type: 'USERS_UPDATE',
        usersList: Object.keys(usersList),
      };
      ws.send(JSON.stringify({
        type: 'USER_LOGIN_SUCCESS',
        userName,
        msg: 'user added successfully',
      }));
      broadcast(JSON.stringify(updateUsersPayload));
      return {
        msg: 'user added successfully',
        userName,
      };
    }
    // user is already present
    ws.send(JSON.stringify({
      type: 'USER_LOGIN_FAIL',
      userName,
      msg: 'username already taken',
    }));
    return {
      msg: 'username already taken',
    };
  },

  SEND_MSG: (params) => {
    const { from, to, data } = params;
    console.log(Object.keys(usersList));
    if (verifyUsers(from) && verifyUsers(to)) {
      // send msg
      usersList[to].send(JSON.stringify({
        type: 'RCV_MSG',
        from,
        to,
        data,
      }));

      // ack to sender
      usersList[from].send(JSON.stringify({
        type: 'SEND_MSG_ACK',
        msg: 'Send message successfull',
      }));
      return ({
        success: true,
        msg: 'asdf',
      });
    }
    return ({
      success: false,
      msg: 'User not found',
    });
  },
};

module.exports = actionsLookUp;
