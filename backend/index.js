const express = require('express');
const mongoConnect = require('./config/mongoConnect.js');
const session = require('express-session');
const routes = require('./routes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const SECRET = process.env.SECRET


app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
  }));
app.use('/signup', routes.signupRouter);
app.use('/login', routes.loginRouter);


app.listen(PORT, () => {
    console.log(`app available on http://localhost:${PORT}`);
    mongoConnect();
});
  