const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const image = require('./routes/image')

const app = express();

dotenv.config()
connectDB()

app.use(express.json());
app.use('/image', image)
// app.use('/',(req,res)=>{
//   res.send('api is running')
// })


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}`))