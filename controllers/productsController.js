const express = require('express')
const controller = express.Router()

const ProductSchema = require('../schemas/productSchema')

//  Nytt ---------------------------------------------------------------------------------------------------
// Unsecured routes
controller.route('/').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find()
    
    if(list) {
        for (let product of list) {
            products.push({
                articleNumber: product._id,
                tag: product.tag,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                rating: product.rating,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

// http://localhost:5000/api/products/featured. Produkter visas efter vilken tag man valt.
controller.route('/:tag').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find({ tag: req.params.tag})
    
    if(list) {
        for (let product of list) {
            products.push({
                articleNumber: product._id,
                tag: product.tag,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                rating: product.rating,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})


// http://localhost:5000/api/products/featured/2. Man kan ta ut visst antal produkter från en viss tag grupp.
controller.route('/:tag/:take').get(async(req, res) => {
    const products = []
    const list = await ProductSchema.find({ tag: req.params.tag}).limit(req.params.take)
    
    if(list) {
        for (let product of list) {
            products.push({
                articleNumber: product._id,
                tag: product.tag,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                rating: product.rating,
                imageName: product.imageName
            })
        }
        res.status(200).json(products)
    } else
        res.status(400).json()
})

// http://localhost:5000/api/products/product/details/6391b634dc47888719d4e0a6. Visar produkt med hjälp av artikelnummer.
controller.route('/product/details/:articleNumber').get(async(req, res) => {
    const product = await ProductSchema.findById(req.params.articleNumber)
    
    if(product) {
        res.status(200).json({
            articleNumber: product._id,
            tag: product.tag,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            rating: product.rating,
            imageName: product.imageName
        })
    } else
        res.status(404).json()
})



// Secured routes







module.exports = controller

// Nytt slut----------------------------------------------------------------------------------------------------------

// controller.param("articleNumber", (req, res, next, articleNumber) => {
//     req.product = products.find(x => x.articleNumber == articleNumber)
//     next()
// })

// controller.param("tag", (req, res, next, tag) => {
//     req.products = products.filter(x => x.tag == tag)
//     next()
// })

// controller.route('/details/:articleNumber').get((req, res) => {
//     if(req.product != undefined)
//         res.status(200).json(req.products)
//     else
//         res.status(404).json()
// })

// controller.route('/:tag').get((req, res) => {
//     if(req.product != undefined)
//         res.status(200).json(req.products)
//     else
//         res.status(404).json()
// })

// controller.route('/:tag/:take').get((req, res) => {
    // let list = []

    // for (let i = 0;  i < Number(req.params.take); i++)
    //     list.push(req.products[i])

    //     res.status(200).json(list)
// })


// controller.route('/').get((req, res) => {
//     res.status(200).json(products)
// })
