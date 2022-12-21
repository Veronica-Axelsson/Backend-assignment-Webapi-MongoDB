require('dotenv').config()
const cors = require('cors')
const port = process.env.WEBAPI_PORT || 7000
const mongoDB_Init = require('./server_mongodb')
const express = require('express')
const app = express()

// middleware.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/products',require('./controllers/productsController'))

// initialize. båda 2 raderna nedan
mongoDB_Init()
//  Start web api.
app.listen(port, () => console.log(`Webapi is running on http://localhost:${port}`))