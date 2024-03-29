const nodemailer = require("nodemailer");
const enums = require("./utils/enums.json");
require("dotenv").config();

async function SendMail(req, res, email, message, successMsg) {
     try {
          const transporter = nodemailer.createTransport({
               host: process.env.SMTP_HOST,
               port: process.env.SMTP_PORT,
               secure: false,
               auth: {
                    user: process.env.SMTP_MAIL,
                    pass: process.env.SMTP_PASSWORD,
               },
          });

          const mailOptions = {
               from: process.env.SMTP_MAIL,
               to: email,
               subject: "about scholarsphere",
               html: `
                <div style="padding:10px;border-style: ridge">
                    <h3>You have a new mail from ScholarSphere.</h3>
                    <p>${message}</p>
                </div>
            `,
          };

          const info = await transporter.sendMail(mailOptions);

          console.log("Message sent: %s", info.messageId);

          return res
               .status(enums.HTTP_CODE.OK)
               .json({ success: true, message: successMsg });
     }
     catch (error) {
          console.error("Error sending mail:", error);

          return res
               .status(enums.HTTP_CODE.INTERNAL_SERVER_ERROR)
               .json({ success: false, message: "Mail could not be sent" });
     }
}

module.exports = SendMail;
