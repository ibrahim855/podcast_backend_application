const express = require('express');
const router = express.Router();

const { likePodcast, unlikePodcast, getLikes } = require('../controllers/likes');
const Authentication = require('../middlewares/auth');


router.get('/:podcastId', getLikes);
router.post('/:podcastId/like',Authentication, likePodcast );

module.exports = router;