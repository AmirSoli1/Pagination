require("dotenv").config();

const express = require("express");

const connectDB = require("./db/connect");

const noteRouter = require("./Routes/noteRouter");

const app = express();

const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const cors = require("cors");
app.use(cors());
app.use(express.json());

const logStream = fs.createWriteStream(path.join("log.txt"), {
  flags: "a",
});

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan("[:date[clf]] :method :url :body", {
    stream: logStream,
  })
);

app.use("/notes", noteRouter);

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_CONNECTION_URL);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
