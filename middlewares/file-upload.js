
const multer = require('multer');
const path = require('path');


const imageStorage = multer.diskStorage({
    //destination mp3 files
    destination: 'podcasts',
    filename: (req, file, cb) => {
        const now = Date.now();
        req.imageURL = now + path.extname(file.originalname);
        req.podcastId = now;
        cb(null, req.imageURL);
    }
});

const imageUpload = multer({
    storage:imageStorage,
    // limits:{
    //     fileSize: 1000000 // 1MB
    // },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(mp3|mp4)$/)) { 
           // upload only png and jpg format
           return cb(new Error('Please upload a Image'))
         }
       cb(undefined, true)
    }
});

module.exports = imageUpload;