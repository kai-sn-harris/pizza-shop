const mongoose = require("mongoose");
const express = require("express");
const app = express();

const api_router = require("./routers/api_router");

function connect(url) {
    mongoose.connect(url)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log(err));    
}

connect("mongodb://127.0.0.1:27017/barbalus");

app.use(express.json());
app.use("/api", api_router);

app.listen(3000, () => console.log("Listening on port 3000"));