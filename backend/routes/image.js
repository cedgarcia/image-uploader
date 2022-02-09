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
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");

})

// Storage Engine
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        }
        resolve(fileInfo)
      })
    })
  }
})
const upload = multer({ storage })



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

router.get("/:id", async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  gfs.files.findOne({ _id: id }, (err, file) => {
    if (!file) {
      return res.json({ msg: "Invalid image" });
    } else {
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png" ||
        file.contentType === "image/jpg"
      ) {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});





module.exports = router