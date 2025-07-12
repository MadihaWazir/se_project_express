const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes/index");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorhandler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");

const app = express();
app.use(express.json());
app.use(cors());
app.use(requestLogger);
app.use(errorLogger);
app.use(routes);

app.post("/signin", login);
app.post("/signup", createUser);

app.get("/items", require("./controllers/clothingItem").getItems);

app.use(auth);

app.use("/", routes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server" : message,
  });
  next();
});

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("This is working");
});
