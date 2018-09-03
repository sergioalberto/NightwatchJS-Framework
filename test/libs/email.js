

/**
 * @description Class to send emails
 * @author Sergio Gonzalez Q <sergioalbertogq@gmail.com>
 * @source https://nodemailer.com/about/
 *         https://www.w3schools.com/nodejs/nodejs_email.asp
 *         https://github.com/eleith/emailjs
 * @place Cartago, Costa Rica
 * @date Jun 2018
 */

const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(emailTarget, password) {
    this.from = emailTarget;

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.from,
        pass: password,
      },
    });
  }

  sendEmail(toEmail, subject, bodyText, bodyHtml = '') {
    const mailOptions = {
      from: this.from,
      to: toEmail,
      subject,
      text: bodyText,
      html: bodyHtml, // html body
    };

    console.log('Sending ...');
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(`Error to send the email: ${error}`);
      } else {
        console.log(`Email sent: ${info.response}`);
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        this.transporter.close();
      }
    });
  }

  sendAttachmentEmail(toEmail, subject, bodyText, attachments, bodyHtml = '') {
    const mailOptions = {
      from: this.from,
      to: toEmail,
      subject,
      text: bodyText,
      html: bodyHtml, // html body
      attachments,
    };

    console.log('Sending ...');
    this.transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(`Error to send the email: ${error}`);
      } else {
        console.log(`Email sent: ${info.response}`);
        // console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        this.transporter.close();
      }
    });
  }
};

// var email = new Email("", "");
// email.sendEmail("", "Sending Email using Node.js", "That was easy!")
