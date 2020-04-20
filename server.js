require('dotenv').config()
require('rootpath')();
require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const http = require("http");
const stripe = require('stripe')('sk_test_jDy80L1uA93YpCZfv3pMULEB00FRbRlj8r');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ecommercefire-a116c.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

setInterval(function () {
  http.get("https://ecommerce-appp.herokuapp.com");
}, 300000); // every 5 minutes


app.post('/api/doPayment/', (req, res) => {
  const token = req.body.tokenId
  const description = req.body.description
  const amount = req.body.amount
  const currency = req.body.currency
  stripe.charges.create({
    amount: amount,
    currency: currency,
    source: token,
    description: description,
  }, function (err, customer) {
    console.log('customer error', err)
    if (err) {
      res.send({
        success: false,
        message: 'Your card was declined. Your request was in test mode, but used a non test (live) card.'
      });
    }
    else {
      res.send({
        success: true,
        data: customer
      });
      // res.status(200).json(subscription)
    }
  }
  );
});


app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);

function snapshotToArray(snapshot) {
  return Object.entries(snapshot).map(e => Object.assign(e[1], { uid: e[0] }));
}
