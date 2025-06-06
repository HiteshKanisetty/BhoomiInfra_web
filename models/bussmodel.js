const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  employeeid: { type: String, required: true },

  guidance: { type: String, required: true },
  image: { type: String },
  layouts: [
    {
      name: { type: String, required: true },
      plotsSold: { type: Number, required: true },
    },
  ],
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
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("BussinessAssociates", userSchema);
