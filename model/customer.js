const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  contact: { type: String, required: true },
  contact_details: { type: String, required: true },
  enquiry: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

customerSchema.pre("save", function(next) {
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

module.exports = mongoose.model("Customer", customerSchema);
