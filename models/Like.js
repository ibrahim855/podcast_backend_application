const mongoose = require('mongoose');

const Like = new mongoose.Schema({
    author:String,
    date:String,
    podcastId:String
});

module.exports = mongoose.model('likes', Like);