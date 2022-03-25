const { EventEmitter } = require("events");
const { WebSocketServer } = require("ws");
const express = require("express");
const cors = require("cors");
let server = require('http').createServer();
let app = express();

app.use(cors());

server.on("request", app);
const ws = new WebSocketServer({ server });
const bus = new EventEmitter();

const subscribers = [];
let publisher = null;

bus.on("update", (data) => {
    
});

bus.on("command", (cmd) => {
    if (publisher) {
        publisher.send(cmd, { binary: false });
    }
});
ws.on("listening", () => {
    console.log("listen");
})
ws.on("error", (err) => {
    console.log(err);
})
ws.on("close", () => {
    console.log("close");
})
ws.on("connection", (socket, req) => {
    switch (req.url) {
        case "/sensor":
            publisher = socket;
            socket.on("message", (msg) => {
                console.log(msg);
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


server.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`));

// setInterval(() => {
//     ls.stdin.setEncoding('utf-8');
//     // ls.stdout.pipe(process.stdout);
//     ls.stdin.write("console.log('Hello from PhaxntomJS')\n");
//     // ls.stdin.end(); /// this call seems necessary, at least with plain node.js executable
// }, 1000);