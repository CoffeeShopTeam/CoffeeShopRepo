const express = require('express');
const mongoConnect = require('./config/mongoConnect.js');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());


app.listen(PORT, () => {
    console.log(`app available on http://localhost:${PORT}`);
    mongoConnect();
});
  