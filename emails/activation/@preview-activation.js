require('dotenv').config();
const Email = require('email-templates');

const email = new Email({
    message: {
        from: process.env.APP_NAME + "<" + process.env.SMTP_USER + ">",
        to: "yo",
    },
    send: false,
    preview: true
});

email.send({
    template: 'activation',
    message: {
        from: process.env.APP_NAME + "<" + process.env.SMTP_USER + ">",
        to: "me",
    },
    locals: {
        appName: process.env.APP_NAME,
        name:  "NAME",
        url: "URL",
        username: "USERNAME"
    }
}).then(console.log)
    .catch(console.error);