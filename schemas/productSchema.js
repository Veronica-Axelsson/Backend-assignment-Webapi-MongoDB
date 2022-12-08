const moongose = require('mongoose')

const productSchema = moongose.Schema({
    id: {type: moongose.Schema.Types.ObjectId},
    tag: {type: String},
    name: {type: String, required: true},
    description: {type: String},
    category: {type: String},
    price: {type: Number, required: true},
    rating: {type: Number},
    imageName: {type: String}
})

module.exports = moongose.model("products", productSchema)