require('dotenv').config()
const mongoose = require('mongoose');


const mongoConnect = () => {
  mongoose.connect(process.env.DATABASE_URL);
  mongoose.connection.once('open', () => {
    console.log('connected to db')
  }).on('error', (error)=> {
    console.log('error connecting to db', error.message)
  })
}

module.exports = mongoConnect;