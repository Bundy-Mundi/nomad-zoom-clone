import express from "express";
import path from "path";
const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));
app.use("/public", express.static(path.join(__dirname, "/public")));
app.get("/", (req, res)=>{
    res.render("home");
});

app.listen(3000, () => console.log("Listening On: http://localhost:3000"));