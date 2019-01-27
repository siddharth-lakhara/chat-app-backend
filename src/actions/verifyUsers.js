const userList = require('./usersList');

const verifyUsers = userName => userList.hasOwnProperty(userName);

module.exports = verifyUsers;
