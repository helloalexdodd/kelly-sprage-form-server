const express = require('express');
const { joiValidator, validate } = require('./formValidation.js');
const mailer = require('./mailer');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.post('/api/contact', validate(joiValidator), (req, res) => {
  const { name, email, message } = req.body;

  mailer({ email, name, text: message })
    .then(() => {
      res.send({ msg: 'success' });
    })
    .catch((err) => {
      res.send(err);
    });
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> App listening on port ${PORT}...`);
});

module.exports = server;
