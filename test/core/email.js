'use strict';

/**
 * @description Class to send emails
 * @author Sergio Gonzalez Q <squiros@growthaccelerationpartners.com>
 * @source https://nodemailer.com/about/
 *         https://www.w3schools.com/nodejs/nodejs_email.asp
 * @place Cartago, Costa Rica
 * @date Jun 2018
 */

let nodemailer = require('nodemailer');

module.exports = class Email{

    constructor(emailTarget, password){
        this.from = emailTarget;

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.from,
                pass: password
            }
        });

    }

    sendEmail(toEmail, subject, bodyText, bodyHtml=""){

        let mailOptions = {
            from: this.from,
            to: toEmail,
            subject: subject,
            text: bodyText,
            html: bodyHtml // html body
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // only needed when using pooled connections
                this.transporter.close();
            }
        });

    }

    sendAttachmentEmail(toEmail, subject, bodyText, attachments, bodyHtml=""){

        let mailOptions = {
            from: this.from,
            to: toEmail,
            subject: subject,
            text: bodyText,
            html: bodyHtml, // html body
            attachments: attachments
        };

        this.transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                //console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // only needed when using pooled connections
                this.transporter.close();
            }
        });

    }

};
