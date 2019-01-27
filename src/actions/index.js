const usersList = require('./usersList');
const verifyUsers = require('./verifyUsers');

const actionsLookUp = {
  ADD_USERS: (params, ws) => {
    const { userName } = params;
    if (!usersList.hasOwnProperty(userName)) {
      // add user
      usersList[userName] = ws;
      return {
        success: true,
        msg: 'user added successfully',
        userName,
      };
    }
    // user is already present
    return {
      success: false,
      msg: 'username already taken',
    };
  },

  SEND_MSG: (params, ws) => {
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
