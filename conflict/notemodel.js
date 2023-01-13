const mongoose=require("mongoose")

const noteschema=mongoose.Schema({
    title:String,
    category:String,
    prize:Number,
    author:String,
    userID:String

})

const NoteModel=mongoose.model("notes",noteschema)

module.exports={
    NoteModel
}