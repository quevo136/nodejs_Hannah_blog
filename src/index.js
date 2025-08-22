require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const { google } = require('googleapis');
const axios = require('axios');
const getYoutubeData = require('./util/getYouTubeData');
//const baseApiUrl = "https://www.googleapis.com/youtube/v3";
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

require('./strategies/google');

const authRoutes = require('./routes/auth');
const app = express();
const port = process.env.PORT;
const apiKey = process.env.APIKEY;
const route = require('./routes');
const db = require('./config/db');

// export async function getYoutubeData() {
//   const res= await fetch(`${baseApiUrl}?part=sippet&playlistId=RDJI4B8pj5G1M&maxResult=10&key=${process.env.APIKEY}`);
//   const data = await res.json();
//   return {
//     prop:{
//       data
//     }
//   }
// }

//connect to db
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(
  express.urlencoded({
    extended: true,
  }),
  passport.initialize()
);
app.use(express.json());
app.use(methodOverride('_method'))

///neu cde ko chay// app.use('/api/auth', authRoutes);
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers:{
      sum:(a,b) => a+b
    }
  }),
);
app.set('view engine', 'hbs');



//console.log('PATH; ',path.join(__dirname, 'resources/views'))
app.set('views', path.join(__dirname, 'resources/views'));
console.log('PATH: ', path.join(__dirname, 'resources/views'));

route(app);
app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`),
);
