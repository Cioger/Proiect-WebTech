const express = require('express');

const bodyParser = require('body-parser');

const connection = require('./models').connection;
const router = require('./routes');

const passport = require('passport');
const session = require('express-session');

const db = require('./config/db')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json())
app.use(cors()) 

require('./config/passport')(passport);

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.listen(port, console.log('Serverul e pe portul ' + port));

app.use('/api', router);
