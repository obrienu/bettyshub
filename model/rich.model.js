const mongoose = require("mongoose");

const richSchema = mongoose.Schema({
  name: { type: String, required: true },
  shop: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

richSchema.pre("save", function(next) {
  const upper = str => {
    return str
      .split(" ")
      .map(a => {
        return a[0].toUpperCase() + a.substring(1);
      })
      .join(" ");
  };
  this.name = upper(this.name);
  next();
});

module.exports = mongoose.model("Rich", richSchema);
