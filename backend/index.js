const express = require('express');
const mongoConnect = require('./config/mongoConnect.js');
const { signupRouter } = require('./routes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.static('./views'))
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use('/signup', signupRouter);


app.listen(PORT, () => {
    console.log(`app available on http://localhost:${PORT}`);
    mongoConnect();
});
  