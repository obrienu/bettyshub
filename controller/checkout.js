const mailer = require("../middleware/mailer");

exports.checkout = async (req, res) => {
  try {
    await mailer.postCheckoutEnquiry(req.body);
    return res.json("Your enquiries has been sent");
  } catch (err) {
    res.status(400).json("Enquiries not sent, please try again");
  }
};
