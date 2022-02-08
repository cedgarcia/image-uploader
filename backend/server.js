const express =require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const imageRoutes = require('./routes/imageRoutes')

const app = express();

dotenv.config()
connectDB()


app.use(express.json());

app.use('/api/imageRoutes',imageRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening on port ${PORT}`))