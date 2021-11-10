const mongoose = require('mongoose');


const Podcast = new mongoose.Schema({
    podcastId:String,
    author:String,
    date:String,
    description:String,
    url: String,
    likeCount: Number,
    viewCount:Number
});

module.exports = mongoose.model('podcasts', Podcast);