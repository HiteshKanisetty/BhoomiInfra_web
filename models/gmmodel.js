const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  mobile: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true },
  guidance: { type: String },

  employeeid: {
    type: String,
    unique: true,
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
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const GeneralMangers = mongoose.model("GeneralMangers", userSchema);
    const count = await GeneralMangers.countDocuments();
    this.employeeid = `BIR${String(count + 1).padStart(3, "0")}`;
  }
  next();
});
module.exports = mongoose.model("GeneralMangers", userSchema);
