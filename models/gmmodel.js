const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  employeeid: {
    type: String,
    required: true,
    uppercase: true,
  },
  image: { type: String },
  layouts: [
    {
      name: { type: String },
      plotsSold: { type: Number },
    },
  ],
  associates: [
    {
      associate: {
        type: String,
      },
    },
  ],
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
  // media_uploaded: [
  //   {
  //     type: String,
  //   },
  // ],
});

userSchema.pre("save", function (next) {
  if (this.isModified("employeeid")) {
    this.employeeid = this.employeeid.toUpperCase();
  }
  next();
});

module.exports = mongoose.model("GeneralMangers", userSchema);
