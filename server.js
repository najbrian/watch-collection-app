const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');

const authController = require('./controllers/auth.js');
const watchesController = require('./controllers/watches.js')
const collectionsController = require('./controllers/collections.js')

const port = process.env.PORT ? process.env.PORT : '3000'

const path = require('path')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn)
app.use('/users/:userId/watches', watchesController)
app.use('/collections', collectionsController)

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
