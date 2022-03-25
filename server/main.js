const { EventEmitter } = require("events");
const { Server } = require("ws");
const spawn = require('child_process').spawn;
const ls = spawn('python', ['process.py']);
const express = require("express");
const cors = require("cors");
const mongo = require("./db/mongo");
const patient = require("./db/Patient");
let server = express();

server.use(cors());
mongo.run();

server.get("/Readings", (req, res) => {
    let startTime = req.query.startTime;
    let endTime = req.query.EndTime;
    db.selectReadingsBetween(startTime, endTime).then(data => {
        res.send(data);
    });
});


server = server.listen(process.env.PORT || 3000, () => console.log(`Listening on ${process.env.PORT || 3000}`));

const ws = new Server({ server });
const bus = new EventEmitter();

const subscribers = [];
let publisher = null;

let currentData = {
    HeartRate: null,
    Location: null
}
ls.stdout.on('data', (predictedValue) => {
    currentData.Location = predictedValue.toString();
    // add reading to dataBase
    patient.InserReading(currentData.HeartRate,currentData.Location);
    subscribers.forEach((sub) => {
        sub.send(JSON.stringify(currentData), { binary: false });
    });
});

bus.on("update", (data) => {
    if (data.toString()) {
        let records = JSON.parse(data.toString());
        console.log("heartRate : " + records["heartrate"] + " | " + "strengths : " + records["Strengths"]);
        ls.stdin.write(records["Strengths"].toString() + "\n", () => { });
        currentData.HeartRate = records["heartrate"];
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
    console.log("child process exited with code ${code}");
});

// setInterval(() => {
//     ls.stdin.setEncoding('utf-8');
//     // ls.stdout.pipe(process.stdout);
//     ls.stdin.write("console.log('Hello from PhaxntomJS')\n");
//     // ls.stdin.end(); /// this call seems necessary, at least with plain node.js executable
// }, 1000);