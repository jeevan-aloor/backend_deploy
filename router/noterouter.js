const express = require("express");
const { NoteModel } = require("../conflict/notemodel");

const noteRouter = express.Router();

noteRouter.get("/", async (req, res) => {
  try {
    const data = await NoteModel.find();
    res.send(data);
    // res.send("all note");
  } catch (error) {
    console.log(error);
    console.log("something wrong");
    res.send("something wrong");
  }
  
});
noteRouter.post("/create", async (req, res) => {
  payload = req.body;                               
  try {
    const notedata = new NoteModel(payload);
    await notedata.save();
  } catch (error) {
    console.log(error);
    console.log("something wrong");
    res.send("something wrong");
  }
  res.send("added note");
});
noteRouter.patch("/update/:id", async(req, res) => {
  const ID=req.params.id;
  payload = req.body;
  const note=await NoteModel.findOne({"_id":ID})
  const userId_note=note.userID
  // const userId_making_req=
  try {
    await NoteModel.findByIdAndUpdate({id:ID},payload)
    res.send("updated")
    
  } catch (error) {
    console.log(error);
    console.log("something wrong");
    res.send("something wrong");
    
  }
  
});
noteRouter.delete("/delete/:id",async (req, res) => {
  const ID=req.params.id;
  try {
    await  NoteModel.findByIdAndDelete({_id:ID})
    res.send("delted")
    
  } catch (error) {
    console.log(error);
    console.log("something wrong");
    res.send("something wrong");
    
  }
  
});

module.exports = {
  noteRouter,
};
