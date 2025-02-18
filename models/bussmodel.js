const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  employeeid: { type: String, required: true },
  layoutname: { type: String, required: true },
  plotssold: { type: Number, required: true },
  guidance: { type: String, required: true },
  image: { type: String },
  //   media_uploaded: [
  //     {
  //       type: String,
  //     },
  //   ],
  uploaddocs: [
    {
      doc: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("BussinessAssociates", userSchema);
