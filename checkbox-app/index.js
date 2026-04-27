import { createServer } from "node:http";
import path from "node:path";

import { Server } from "socket.io";
import express from "express";

const CHECKBOX_SIZE = 100;

//handling state in backend
const state = {
  checkboxes: new Array(CHECKBOX_SIZE).fill(false),
};

async function main() {
  const PORT = 8080;

  const app = express();
  const server = createServer(app);

  const io = new Server();
  io.attach(server);

  //socket IO handlers
  io.on("connection", (socket) => {
    console.log(`socket connected`, { id: socket.id });

    //agar koi bhi socket yh event deta hain to hum print karlenge

    socket.on(`client:checkbox:change`, (data) => {
      console.log(`[Socket:${socket.id}]:client:checkbox:change`, data);

      //socket server has to relay this to event
      io.emit("server:checkbox:change", data);
      state.checkboxes[data.index] = data.checked;
    });
  });

  //express handlers
  app.use(express.static(path.resolve("./public")));
  app.get("/health", (req, res) => {
    res.json({ message: "health chcked" });
  });

  //FRONTEND KO API CHAHIYE JISSE VO BACKEND STATE CHECK KAR PAAYE
  app.get("/checkboxes", (req, res) => {
    return res.json({ checkboxes: state.checkboxes });
  });

  server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
}

main();
