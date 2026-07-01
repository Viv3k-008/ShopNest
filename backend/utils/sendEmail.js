const nodeMailer = require("nodemailer");

 const sendEmail = async (to, subject, message) => {
   try {
     const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        family: 4, // force IPv4 to avoid Render's IPv6 ENETUNREACH issue
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
     });
     const mailOptions = {
       from: process.env.EMAIL_USER,
       to,
       subject,
       text: message
     };
     await transporter.sendMail(mailOptions);
   } catch (error) {
     console.error("Error sending email:", error);
     throw error;
   }
 };

 module.exports = sendEmail;