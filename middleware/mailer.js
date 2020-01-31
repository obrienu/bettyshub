const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "obrientester@gmail.com",
    pass: "Tester2019#"
  }
});

exports.postEnquiry = async customerInfo => {
  const { name, contact, contact_details, enquiry, details } = customerInfo;
  const MailOption = {
    from: "obrientester@gmail.com", // sender address
    to: "lizmyangel48@gmail.com", // list of receivers
    subject: `Bettys Hub Enquiry Notification from ${name} `, // Subject line
    html: `<body>
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

exports.postCheckoutEnquiry = async info => {
  const { name, contact_details, contact, cartItems } = info;
  let commodity = "";
  for (let i = 0; i < cartItems.length; i++) {
    commodity += `<div
    style="width: 6rem; height: 9rem; margin: 1rem;"
  >
    <img
      style="width: 6rem; height: 8rem;"
      src="${cartItems[i].imageUrl[0]}"
      
    />
    <div
      style="width: 6rem; height: 1rem; "
    >
      <span>${cartItems[i].name}</span><span>#${cartItems[i].price}</span>
    </div>
  </div>`;
  }

  const MailOption = {
    from: "obrientester@gmail.com", // sender address
    to: "lizmyangel48@gmail.com", // list of receivers
    subject: `Bettys Hub Enquiry Notification from ${name} `, // Subject line
    html: `<body>
    <div style="width: 80%; margin: 0 auto;">
      <h3>Name: ${name}</h3>
      <h3>Contact Means: ${contact}</h3>
      <h3>Details: ${contact_details}</h3>
      <p>Is enquiring about the following items</p>
    </div>
  <div
    style="width: 80%; margin: 0 auto; display: flex; flex-flow: row wrap; justify-content: center;"
  >
  ${commodity}
  </div>
</body>`
  };

  return transporter.sendMail(MailOption);
};
