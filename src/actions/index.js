const usersList = require('./usersList');

const actionsLookUp = {
  ADD_USERS: (params) => {
    const { userName } = params;
    if (usersList.indexOf(userName) === -1) {
      // add user
      usersList.push(userName);
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
};

module.exports = actionsLookUp;
