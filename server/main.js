const { EventEmitter } = require("events");
const { Server } = require("ws");
const express = require("express")
const cors = require("cors");
const http = require("http");
let server = express();

server.use(cors());

server = server.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`));
const ws = new Server({ server });
const bus = new EventEmitter();

const subscribers = [];
let publisher = null;
bus.on("update", async (data) => {
    let parsedData = JSON.parse(data);
    let features = Object.values(parsedData);
    
    subscribers.forEach((sub) => {
        sub.send(data, { binary: false });
    })
});
bus.on("command", (cmd) => {
    type = String(cmd);
    if (publisher) {
        publisher.send(cmd, { binary: false });
    }
});
ws.on("connection", (socket, req) => {
    switch (req.url) {
        case "/sensor":
            publisher = socket;
            socket.on("message", (msg) => {
                bus.emit("update", msg);
            });
            break;
            case "/client":
            subscribers.push(socket);
            socket.on("message", (cmd) => {
                bus.emit("command", cmd);
            });
            break
            default:
                break;
    }
});