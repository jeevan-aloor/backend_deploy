const mongoose=require("mongoose")

const dataschema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const DataModel=mongoose.model("authdata",dataschema)

module.exports={
    DataModel
}