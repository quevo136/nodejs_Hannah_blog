const express = require('express');
const router = express.Router();

const courseController = require('../app/CourseController');
const authController = require('../app/AuthController');
const youtubeController = require('../app/YoutubeController');
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:slug', courseController.show);
router.put('/:id', courseController.update);
router.delete('/:id', courseController.destroy);
router.get('/:id/edit', courseController.edit);
//router.get('/auth', courseController.auth);


router.get('/api/auth/google', authController.googleAuth);
router.get('/api/auth/google/callback', authController.googleCallback);
router.post('/logout', authController.logout);


router.post('/comment', youtubeController.comment);
router.post('/like', youtubeController.like);

module.exports = router;
