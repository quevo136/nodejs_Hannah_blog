const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: [
        'email',
        'profile',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      const photo = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null;
      done(null, {
        id: profile.id,
        username: profile.displayName,
        photo: photo
      });
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.username); // Use a unique identifier if available
});

// Deserialize user from session
passport.deserializeUser((username, done) => {
  // Replace with user lookup logic if you have a user database
  done(null, { username });
});

module.exports = passport;
