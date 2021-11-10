const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const Podcast = require('../models/Podcast');


exports.addPodcast = (req,res) => {
    //DO STUFF
    const description = req.body.description;
    const date = new Date().getTime();  
    //create the podcast 
    const newPodcast  = new Podcast({
        podcastId: "" + req.podcastId,
        author:req.username,
        description:description,
        date:date,
        url: req.imageURL,
        likeCount:0,
        viewCount:0
    });

    newPodcast.save().then(podcast => {
        console.log(podcast);
        res.status(200).json({
            message:'podcast create con successo.'
        })
    }).catch(err => console.log(err));
}

exports.getPodcasts = async (req,res) => {
    const arr = await Podcast.find();
    res.status(200).json(arr);
};

exports.listenPodcast = (req, res) => {
    
    const range = req.headers.range;
    const podcastId = req.params.podcastId;


    if (!range) {
        // res.status(400).send("Requires Range header");
        res.sendFile(path.join(__dirname, '../podcasts', podcastId + ".mp3"));
        return;
    }

  // get video stats (about 61MB)
  const filePath = path.join(__dirname,'../podcasts', podcastId + ".mp3");
  const fileSize = fs.statSync(filePath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 2; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${fileSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp3",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const fileStreanm = fs.createReadStream(filePath, { start, end });

  // Stream the video chunk to the client
  fileStreanm.pipe(res);
};

exports.deletePodcast = (req,res) => {
    const username = req.username;
    const podcastId = req.params.podcastId;

    Podcast.findOne({podcastId:podcastId}).then(podcast => {
      if(podcast) {
 if(podcast.author !== username) {
            res.status(200).json({message:'Non Autorizzato ad eliminare questo podcast.'});
        } else {
             Podcast.findOneAndDelete({ podcastId:podcastId}).then(podcast => {
        //here now we remove the file
        fs.unlink(path.join(__dirname, '../podcasts', podcastId + ".mp3"), (err) => {
            if(err) {
                res.status(200).json({message:'Qualcosa e andato storto'});
            } else {
                res.status(200).json({ message: 'Podcast eliminato con successo.'});
            };
        });
    }).catch(err => console.log(err));
        }
      } else {
          res.status(404).json({message:'Podcast non trovato.'});
      }
       
    });
};