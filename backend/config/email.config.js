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
};

export const sendAccountDetails = async (receiverEmail, accountDetails) => {
  const mailOptions = {
    from : "FTSol" `${process.env.sender_email}`,
    to : receiverEmail,
    subject : 'Account Information',
    text : 'This is to inform you about your account details',
    html : `${accountDetails}`
  };
  try {
    transport.sendMail(mailOptions).then(() => console.log(`Email sent successfully to ${receiverEmail}`))
  } catch (error) {
    console.error(error.message)
  }
}