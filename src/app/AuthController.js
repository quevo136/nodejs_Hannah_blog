const Course = require('./models/User.js');
const path = require('path');
const oauth2Client = require('../config/db/googleClient');

const YT_SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];

// login
exports.googleAuth = (req, res) => {
  const state = Buffer.from(JSON.stringify({ r: req.query.r || '/' })).toString('base64');

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: YT_SCOPES,
    state,
  });

  res.redirect(url);
};

// callback
exports.googleCallback = async (req, res) => {
  const { code, state } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens;

    let returnTo = '/';
    if (state) {
      try {
        returnTo = JSON.parse(Buffer.from(state, 'base64').toString('utf8')).r || '/';
      } catch {}
    }
    return res.redirect(returnTo);
  } catch (err) {
    console.error('OAuth error:', err);
    return res.status(500).send('OAuth failed');
  }
};

// logout
exports.logout = (req, res) => {
  req.session = null;
  res.json({ ok: true, message: 'Signed out' });
};
