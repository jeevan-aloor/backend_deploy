const express = require("express");
const { connection } = require("./conflict/db");
const { userRouter } = require("./router/userrouter");
const { noteRouter } = require("./router/noterouter");
const { varify } = require("./middleware/varify");
const cors=require("cors")

// var decoded = jwt.verify(token, 'masai');

const app = express();
app.use(cors({
  origin:"*"
}))
app.use(express.json());

app.use("/user", userRouter);
app.use(varify);

app.use("/note", noteRouter);

app.listen(8000, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  console.log("server is running in 8000");
});
