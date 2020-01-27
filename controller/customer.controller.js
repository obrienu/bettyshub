const Customer = require("../model/customer");
const mailer = require("../middleware/mailer");

exports.postCustomer = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      contact,
      contact_details,
      enquiry,
      details
    } = req.body;

    const customer = new Customer({
      name,
      city,
      state,
      contact,
      contact_details,
      enquiry,
      details
    });

    let sentMail = await mailer.postEnquiry(customer);
    let savedCustomer = await customer.save();
    return res.json("Your enquires has been sent");
  } catch (err) {
    res.status(400).json(err);
  }
};
