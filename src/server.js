import express from "express";
import path from "path";
import http from "http";
import ws from "ws";
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (req, res)=>{
    res.render("home");
});
const server = http.createServer(app);
const wsServer = new ws.Server({server});
server.listen(3000, () => console.log("Listening On: http://localhost:3000\nListening On: ws://localhost:3000"));