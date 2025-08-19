const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const routes = require("./routes/index");

const errorHandler = require("./middlewares/errorhandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const {
  validateLogin,
  validateCreateUser,
} = require("./middlewares/validation");
const { login, createUser } = require("./controllers/users");
const { PORT = 3001 } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Clothing Items API" });
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.get("/items", require("./controllers/clothingItem").getItems);

app.use(require("./middlewares/auth"));

app.use(routes);

app.use(errorLogger);
app.use(errors()); // Celebrate error handler
app.use(errorHandler); // Custom error handler

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
