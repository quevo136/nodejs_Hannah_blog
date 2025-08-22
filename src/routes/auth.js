const express = require('express');
const router = express.Router();
const passport = require('passport')


router.get('/google', passport.authenticate('google'), (req, res) => res.send(200));
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/'));




module.exports = router;