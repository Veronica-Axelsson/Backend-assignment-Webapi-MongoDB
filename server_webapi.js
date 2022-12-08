require('dotenv').config()
const cors = require('cors')

const port = process.env.WEBAPI_PORT || 7000
// Nytt Mongodb
const mongoDB_Init = require('./server_mongodb')


const express = require('express')
const app = express()

// middleware. Ändrad -> app.use(express.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// Routes
app.use('/api/products',require('./controllers/productsController'))

// Gamla varianten som kräver 2 rader
// const productsController = require('./controllers/productsController')
// app.use('/api/products', productsController)


// initialize. båda 2 raderna nedan
mongoDB_Init()
//  Start web api.
app.listen(port, () => console.log(`Webapi is running on http://localhost:${port}`))







// const productsController = require('./controllers/productsController')
// app.use('/api/products', productsController)

// const usersController = require('./controllers/usersController')
// app.use('/api/users', usersController)



// const cors = require('cors')
// const bodyParser = require('body-parser')






