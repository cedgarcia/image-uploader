const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const multer = require('multer')
// const Grid = require('gridfs-stream')
const GridFsStorage = require('multer-gridfs-storage')

// --------------CONNECTION-----------------
require('dotenv').config()
const url = process.env.MONGO_URI
const conn = mongoose.createConnection(url, {
})

//---------------STORAGE---------------------

const crypto = require("crypto");
const path = require("path");

let gfs
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  }

  )
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








module.exports = router