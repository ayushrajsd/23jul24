const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config(); // process.env

const { SENDGRID_API_KEY } = process.env;

function replaceContent(content, creds) {
  // content is the email template
  const allKeysArr = Object.keys(creds); // {name:"Avinash", otp: 1234}
  allKeysArr.forEach((key) => {
    content = content.replace(`#{${key}}`, creds[key]); // #{name} => Avinash, #{otp} => 1234
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    const content = await fs.promises.readFile(templatePath, "utf-8");
    const emailDetails = {
      to: receiverEmail,
      from: "mrinal.bhattacharya@scaler.com",
      subject: "Mail from ScalerShows",
      text: `Hi ${creds.name} this is your reset otp ${creds.otp}`,
      html: replaceContent(content, creds),
    };
    const trasportDetails = {
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",
        pass: SENDGRID_API_KEY,
      },
    };

    const transporter = nodemailer.createTransport(trasportDetails);
    await transporter.sendMail(emailDetails);
  } catch (err) {
    console.log(err);
  }
}

module.exports = EmailHelper;
