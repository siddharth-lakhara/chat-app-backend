Websocket server
=====================

Functionalities:
1. ADD_USER
  - update user_list
  - broadcast to all connected user
2. REMOVE_USER (websocket disconnect)
  - remove user from the list
  - broadcast
3. BROADCAST
  - iterate over present connected websockets (user_list)
  - send the message
4. SEND_MSG
  - identify the 'to' user
  - send message
  - send success or failure message to sender

