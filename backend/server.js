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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}`))