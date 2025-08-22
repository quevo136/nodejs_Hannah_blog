require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const authRoutes = require('./routes/auth');
const youtubeRoutes = require('./routes/youtubeRoutes');
const { auth } = require('googleapis/build/src/apis/abusiveexperiencereport');

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'dev_secret'],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
  })
);

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/auth', auth);
app.use('/api', youtubeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});