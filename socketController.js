import User from "./models/User";
import app from "./app";

let sockets = [];
const socketController = async (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superbroadcast = (event, data) => io.emit(event, data);
  const user = await User.findById(app.locals.loginUser);
  const sendPlayerUpdate = () => {
    superbroadcast("chatUserUpdate", { sockets });
  };

  // front에서  chat message를 치면 서버쪽에서  이벤트를 듣고  메세지를 가져온다. 그리고
  // 다른 유저들에게 브로드 캐스트를 해준다.
  socket.on("newMessage", async ({ message }) => {
    broadcast("newMessage", {
      message,
      name: user ? user.name : "",
      avatarUrl: user ? user.avatarUrl : "",
    });
  });

  socket.on("newUser", ({ id }) => {
    if (!socket.handshake.session.userdata) {
      socket.handshake.session.userdata = id;
      socket.handshake.session.save();
    }

    const socketId = socket.handshake.session.userdata;
    if (sockets.filter((aSocket) => aSocket.id === socketId).length === 0) {
      sockets.push({
        id: socketId,
        name: user ? user.name : "",
        avatarUrl: user ? user.avatarUrl : "",
      });
      superbroadcast("newUser", {
        message: user ? `${user.name} entered in chat room ` : "",
        sockets,
      });
    }
    sendPlayerUpdate();
  });

  socket.on("disconnect", () => {
    sendPlayerUpdate();
  });

  socket.on("LogOut", () => {
    sockets = sockets.filter(
      (aSocket) => aSocket.id !== socket.handshake.session.userdata
    );
    //sendPlayerUpdate();
    socket.broadcast.emit("chatUserUpdate", {
      sockets,
      message: user ? `${user.name} logged out` : "",
    });
  });

  socket.on("seeHome", () => {
    sockets = sockets.filter(
      (aSocket) => aSocket.id !== socket.handshake.session.userdata
    );
    //sendPlayerUpdate();
    socket.broadcast.emit("chatUserUpdate", {
      sockets,
    });
  });
};

export default socketController;
