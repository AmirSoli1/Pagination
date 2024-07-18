require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

//Routers
const noteRouter = require("./Routes/noteRouter");
const userRouter = require("./Routes/userRouter");
const loginRouter = require("./Routes/loginRouter");

//Middlewares
const logger = require("./middlewares/logger");

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/notes", noteRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

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
