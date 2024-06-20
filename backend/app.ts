require("dotenv").config();
require("express-async-errors");

const express = require("express");

const connectDB = require("./db/connect");

const noteRouter = require("./Routes/noteRouter");

const app = express();

const cors = require("cors");

const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

const logStream = fs.createWriteStream(path.join("log.txt"), {
  flags: "a",
});
app.use(morgan("combined", { stream: logStream }));

app.use("/api/v1/notes", noteRouter);

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
