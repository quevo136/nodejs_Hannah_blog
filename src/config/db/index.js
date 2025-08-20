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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});


module.exports = {connect};