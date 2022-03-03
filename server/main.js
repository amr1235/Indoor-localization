const { EventEmitter } = require("events");
const { Server } = require("ws");
const { spawn } = require('child_process');
const ls = spawn('python', ['process.py']);
const express = require("express")
const cors = require("cors");
let server = express();

server.use(cors());

server = server.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`));
const ws = new Server({ server });
const bus = new EventEmitter();

const subscribers = [];
let publisher = null;

ls.stdout.on('data', (predictedValue) => {
    console.log("Prediction: " + predictedValue.toString());
    subscribers.forEach((sub) => {
        sub.send(predictedValue, { binary: false });
    });
});

bus.on("update", (data) => {
    if (data.toString()) {
        console.log("Reading : " + data.toString());
        ls.stdin.write(data.toString(), () => { });
    }
});
bus.on("command", (cmd) => {
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




ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
ls.on('close', (code) => {
    // console.log(child process exited with code ${code});
});

// setInterval(() => {
//     ls.stdin.write("3", () => { });
// }, 2000);