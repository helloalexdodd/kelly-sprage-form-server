/* eslint-disable arrow-body-style */
require('dotenv').config();
const nodemailer = require('nodemailer');

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'mail.hover.com',
  auth: {
    user,
    pass,
  },
});

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from,
    to: 'hello@kellysprague.ca',
    subject: `New message from ${from}`,
    text,
    replyTo: from,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => {
      return error ? reject(error) : resolve(info);
    });
  });
};

module.exports = send;
