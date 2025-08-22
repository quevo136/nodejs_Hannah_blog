require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express(); 


const MONGO_URI = process.env.MONGO_URI;
async function connect(){
    try {
        // await mongoose.connect('mongodb://127.0.0.1/Hannah_education_dev');
        await mongoose.connect(MONGO_URI);
        console.log('Connect Successfully!!')
    } catch (error) {
        console.log("Fail")
    }

}
app.get('/', (req, res) => {
  res.render('home');
});
//const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`App listening on port http://localhost:${PORT}`);
// });


module.exports = {connect};