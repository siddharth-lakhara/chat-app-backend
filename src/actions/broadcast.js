const userList = require('./usersList');

const broadcast = msg => Object.keys(userList).map(elem => userList[elem].send(msg));

module.exports = broadcast;
