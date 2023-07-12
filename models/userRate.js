const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")



const userRateSchema = mongoose.Schema({
    userId: {type:String, required:true, unique:true},
    grade: {type:Number, required:true}
})


userRateSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserRate", userRateSchema);