const express = require('express');
const routes = require('./routes');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const hbs = require('handlebars');

mongoose.connection.on('connected', () => {
 console.log('Connected to MongoDb!');
});
mongoose.connect(process.env.MONGODB_URI);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//set view engine
app.set('views', path.join(__dirname, 'forms'));
app.set('view engine', 'hbs');

app.use('/api', routes);

app.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on Port 8080!');
  }
});
