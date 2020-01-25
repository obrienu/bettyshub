const mongoose = require("mongoose");

const accessoriesSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

accessoriesSchema.pre("save", function(next) {
  this.category = this.category.toLowerCase();
  const upper = str => {
    return str
      .split(" ")
      .map(a => {
        return a[0].toUpperCase() + a.substring(1);
      })
      .join(" ");
  };
  this.name = upper(this.name);
  this.description =
    this.description.substring(0, 1).toUpperCase() +
    this.description.substring(1);
  next();
});

module.exports = mongoose.model("Accessories", accessoriesSchema);
