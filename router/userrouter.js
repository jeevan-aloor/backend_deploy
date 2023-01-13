const express = require("express");
const { DataModel } = require("../conflict/model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.get("/getting", async (req, res) => {
  try {
    const data = await DataModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, secure_password) => {
      // Store hash in your password DB.
      if (err) {
        res.send(err);
      } else {
        const user = new DataModel({
          name,
          email,
          pass: secure_password,
          age,
        });
        await user.save();
        res.send("added");
        console.log(user);
      }
    });
    // const user = new DataModel({name,email,pass,age});
    //       await user.save();
    //       res.send("added");
    //       console.log(user);
  } catch (error) {
    console.log(error);
    console.log("error");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const data = await DataModel.find({ email });
    let values = data[0].pass;
    console.log(values);

    // JSON.stringify(localStorage.setItem("token",token))
    console.log("idddd",data[0]._id);

    if (data.length > 0) {
      console.log("jeevan");

      bcrypt.compare(pass, values, (err, result) => {
        if (pass == values) {
          const token=jwt.sign({userID:"backend"},'masai')
          // const token = jwt.sign({ course: "backend"}, "masai");
         
          console.log(token);
          
          
          res.send("login done");
        } else {
          res.send("wrong things");
        }
      });
    } else {
      res.send("failed");
    }
    console.log(data);
  } catch (error) {
    console.log(error);
    console.log("error");
  }
});

module.exports = {
  userRouter
};
