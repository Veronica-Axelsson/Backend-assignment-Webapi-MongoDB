const moongose = require('mongoose')

const mongoDB_Init = async() => {
    const conn = await moongose.connect(process.env.MONGODB_URI)
    console.log(`Mongo DB is running at ${conn.connection.host}`)
}

module.exports = mongoDB_Init