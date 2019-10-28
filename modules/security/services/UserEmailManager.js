require('dotenv').config();
import nodemailer from "nodemailer"

const Email = require('email-templates');

class UserEmailManager {

    constructor() {

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: process.env.SMTP_SECURE, // SSL
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    recovery(to, url, user) {
        var email = new Email({
            transport: this.transporter,
            send: true,
            preview: false,
        });

        email.send({
            template: 'recovery',
            message: {
                from: process.env.APP_NAME + "<" + process.env.SMTP_USER + ">",
                to: to,
            },
            locals: {
                appName: process.env.APP_NAME,
                name: user.name,
                url,
                username: user.username
            },
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    activation(to, url, user) {

        var email = new Email({
            transport: this.transporter,
            send: true,
            preview: false,
        });

        email.send({
            template: 'activation',
            message: {
                from: process.env.APP_NAME + "<" + process.env.SMTP_USER + ">",
                to: to,
            },
            locals: {
                appName: process.env.APP_NAME,
                name: user.name,
                url,
                username: user.username
            },
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }


    async sendmail({from, to, subject, text, html}) {
        let info = await this.transporter.sendMail({
            from: from,
            to: to, //LIST  1,2,3
            subject: subject,
            text: text,
            html: html
        });

        console.log(info)
        return info;
    }

}

module.exports = new UserEmailManager();