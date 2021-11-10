const Like = require('../models/Like');
const Podcast = require('../models/Podcast');

// like and unlike actions handled here

exports.likePodcast = async (req, res) => {
    const podcastId = req.params.podcastId;
    const username = req.username;
    // here we can see if we need to like or unlike the podcast.
    const oldLike = await Like.findOne({author:username});

    if(oldLike) {
        const removedLike = await Like.findOneAndDelete({author:username});
         const likeee = await Podcast.updateOne({podcastId: oldLike.podcastId}, {$inc: { likeCount:  -1}});
         res.status(201).json({
                            message:'Like tolto a questo post'
                        });
    } else {
                const like = new Like({
                        author:username,
                        date: "" + Date.now(),
                        podcastId:podcastId
                    });
             const liked = await like.save();
             const likeeee = await Podcast.updateOne({ podcastId: podcastId}, { $inc: { likeCount: 1}});
               res.status(200).json({
            message:'Hai messo like a questo podcast.'
    });
    }

  
   
    
  
};

exports.getLikes = async (req, res) => {
    const podcastId = req.params.podcastId;

    const likes = await Like.find({podcastId:podcastId});
    res.status(200).json(likes);
};
