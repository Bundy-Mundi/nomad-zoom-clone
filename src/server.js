import express from "express";
import path from "path";
import http from "http";
import SocketIO from "socket.io";
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (req, res)=>res.render("home"));
app.get("/*", (req, res)=>res.redirect("/"));

const server = http.createServer(app);
const io = SocketIO(server);
io.on("connection", (socket) => {
    console.log("Client connected");
    socket.emit("server-connection", "Server is alive");
    socket.on("enter_room", ({roomName}, done) => {
        socket.join(roomName);
        socket.to(roomName).emit("new_user");
        console.log(socket.rooms);
        done();
    });
});

/* WebSocket */
//const wsServer = new ws.Server({server});
/*wsServer.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Client connected.");
    socket.on("close", () => console.log("Client Disconnected"));
    socket.on("message", (message) => {
        sockets.forEach(s => s.send(message));
        console.log(message.toString());
    })
    socket.send("You are connected to the server.")
});*/

server.listen(3000, () => console.log("Listening On: http://localhost:3000\nListening On: ws://localhost:3000"));