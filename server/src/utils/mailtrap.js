const nodemail = require('nodemailer')
require('dotenv').config()

exports.transporterEmail = async() => {

  const secureIs = process.env.MAIL_TRAP_PORT === 465

  const transporter = nodemail.createTransport({
    host: process.env.MAIL_TRAP_HOST,
    port: process.env.MAIL_TRAP_PORT,
    secure: secureIs,
    auth: {
      user: process.env.MAIL_TRAP_USER,
      pass: MAIL_TRAP_PASSWORD,
    }
  })

  return transporter
}

exports.sendEmail = async(emailFrom, emailTo, subject, text, templateHMTL, transporterEmail) => {

  if (typeof(transporterEmail) !== 'function') {
    
  }

  const infoEmail = await transporterEmail.sendEmail({
    from: emailFrom,
    to: emailTo,
    subject,
    text,
    html: templateHMTL,
  })

  return infoEmail
}