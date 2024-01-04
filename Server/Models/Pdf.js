const mongoose = require("mongoose");
const {Schema} = mongoose;

const pdfSchema = new Schema({
  pdfName: String,
  status: {
    type: String,
    enum: ["Approved", "Pending", "Modify", "Reject"],
    default: "Pending",
  },
  comments: [
    {
      text: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Pdf = mongoose.model("Pdf", pdfSchema);

module.exports = Pdf;
