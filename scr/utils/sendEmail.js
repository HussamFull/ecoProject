import nodemailer from "nodemailer";


export async function sendEmail(to, subject, html){
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });
  
    const info = await transporter.sendMail({
      from: `T-Shop" <${process.env.SENDER_EMAIL}>`, // sender address
      to, // list of receivers
      subject, // Subject Line
      html, // html body
    });
  }