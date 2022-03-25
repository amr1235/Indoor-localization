const mongoose = require("mongoose");

// Connection URI
const uri = "mongodb://localhost:27017/Indoor";

async function run() {
    // Connect the client to the server
    await mongoose.connect(uri).then(() => {
        console.log("DataBase Connected successfully to server");
    }).catch(() => {
        console.log("DataBase Connection failed");
    });
}

module.exports = {
    run
}