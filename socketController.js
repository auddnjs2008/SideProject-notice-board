import User from "./models/User";
import app from "./app";

const socketController = async (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const user = await User.findById(app.locals.loginUser);

  // front에서  chat message를 치면 서버쪽에서  이벤트를 듣고  메세지를 가져온다. 그리고
  // 다른 유저들에게 브로드 캐스트를 해준다.
  socket.on("newMessage", ({ message }) =>
    broadcast("newMessage", {
      message,
      name: user.name,
      avatarUrl: user.avatarUrl,
    })
  );

  socket.on("newUser", () =>
    broadcast("newUser", {
      message: `${user.name} entered in chat room `,
    })
  );
};

export default socketController;
