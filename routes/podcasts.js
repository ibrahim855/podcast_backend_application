const express = require('express');
const router = express.Router();

//IMAGE UPLOAD MIDDLEWARE
const imageUpload = require('../middlewares/file-upload');
const Authentication = require('../middlewares/auth');
//CONTROLLERS
const { addPodcast, getPodcasts, listenPodcast, deletePodcast } = require('../controllers/podcasts');

router.get('/', getPodcasts);

router.post('/add-podcast',Authentication, imageUpload.single('image'), addPodcast); 

router.get('/:podcastId/listen', listenPodcast);

router.delete('/:podcastId/delete-podcast', Authentication, deletePodcast);

module.exports = router;