const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
const Grid = require("gridfs-stream");

// --------------CONNECTION-----------------
require('dotenv').config()
const url = process.env.MONGO_URI
const conn = mongoose.createConnection(url)

//---------------STORAGE---------------------

const crypto = require("crypto");
const path = require("path");

let gfs
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  gfs = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "uploads"
  });
  // console.log(bucket);
});


// Storage Engine
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads"
      };
      resolve(fileInfo);
      
    })
  }
})
const upload = multer({ storage })

// POST IMAGE
router.post('/', upload.single('image'), async (req, res) => {
  if (req.file.contentType === 'image/jpeg' ||
    req.file.contentType === 'image/jpg' ||
    req.file.contentType === 'image/png') {
    return res.json({ id: req.file.id })
  }
  else {
    return res.json({ msg: 'Invalid Image' })
  }
})
// GET IMAGE ROUTE
router.get('/:id', ({ params: { id } }, res) => {
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  const _id = new mongoose.Types.ObjectId(id);
  gfs.find({ _id }).toArray((err, files) => {
    if (!files || files.length === 0)
      return res.status(400).send('no files exist');
    gfs.openDownloadStream(_id).pipe(res);
  });
});
  


module.exports = router