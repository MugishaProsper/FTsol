import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host : process.env.mailtrap_host,
  port : process.env.mailtrap_port,
  auth : {
    user : process.env.mailtrap_user,
    pass : process.env.mailtrap_pass
  }
});

export const sendVerificationCode = async (receiverEmail, verificationCode) => {
  const mailOptions = {
    from : `"FTsol" <${process.env.sender_email}>`,
    to : receiverEmail,
    subject : "Verification Code",
    text : "This is to verify your email",
    html : `<div>${verificationCode}</div>`
  };

  try {
    transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
}