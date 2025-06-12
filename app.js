const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/index");



const { PORT = 3001 } = process.env;
const { login, createUser } = require("./controllers/users");

const app = express();
app.use(express.json());
app.use(cors());


app.post('/signin', login);
app.post('/signup', createUser);

app.use("/", mainRouter);



app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'An error has occurred on the server'
      : message,
  });
});







mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("This is working");
});
