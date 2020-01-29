const nodemailer = require("nodemailer");

exports.postEnquiry = async customerInfo => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "obrientester@gmail.com",
      pass: "Tester2019#"
    }
  });
  const { name, contact, contact_details, enquiry, details } = customerInfo;
  const MailOption = {
    from: "obrientester@gmail.com", // sender address
    to: "lizmyangel48@gmail.com", // list of receivers
    subject: `Bettys Hub Enquiry Notification from ${name} `, // Subject line
    html: `<body style="">
                <div>
                <h4>Bettys Hub enquiry from ${name}</h4>
                <p>${contact}: ${contact_details}</p>
                <p>Enquiry: ${enquiry} </p>
                <blockquote>${details} </blockquote>
                </div>
            </body>`
  };

  return transporter.sendMail(MailOption);
};
