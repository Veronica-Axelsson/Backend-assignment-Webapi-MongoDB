const express = require('express')
const productSchema = require('../schemas/productSchema')
const controller = express.Router()

// Unsecured routes

// http://localhost:5000/api/products/. Hämtar alla produkter.
controller.route('/').get(async(req, res) => {
    const products = []
    const list = await productSchema.find()
    
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
    const list = await productSchema.find({ tag: req.params.tag})
    
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
    const list = await productSchema.find({ tag: req.params.tag}).limit(req.params.take)
    
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
    const product = await productSchema.findById(req.params.articleNumber)
    
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

// Hämta och skapa produkter.
controller.route('/').post(async(req, res) => {
   const {tag, name, description, category, price, rating, imageName} = req.body

    if (!name || !price)
        res.status(400).json({text: 'Name and price is required.'})


    const item_exists = await productSchema.findOne({name})
    if (item_exists)
        res.status(409).json({text: 'A product with the same name already exists.'})

    else {
        const product = await productSchema.create({
            tag, 
            name, 
            description, 
            category, 
            price, 
            rating, 
            imageName
        })
        if(product)
            res.status(201).json({test: `Product was created with article number ${product._id} successfully.`})
        else
            res.status(400).json({text: 'Something went wrong when we tried to create a product.'})
    }
})

// Uppdatera en produkt med hjälp av artikelnummer.
controller.route('/:articleNumber').put(async(req, res) => {

    if(!req.params.articleNumber) {
        res.status(400).json({text: 'No article number was specified.'})
    } else {
        const product = await productSchema.findById(req.params.articleNumber)

        if(product) {
            await productSchema.findByIdAndUpdate(req.params.articleNumber, req.body, { new: true})
       
            if(product)
                res.status(201).json({test: `Product was updated with article number ${product._id} successfully.`})
            else
                res.status(400).json({text: 'Something went wrong when we tried to update a product.'})
        } 
        
        else {
            res.status(400).json({text: 'Product with article number ${req.params.articleNumber} was not found.'})
        }
    }

})

// Ta bort en produkt med hjälp av artikelnummer.
controller.route('/:articleNumber').delete(async(req, res) => {
    if(!req.params.articleNumber) {
        res.status(400).json({text: 'No article number was specified.'})
    } else {
        const item = await productSchema.findById(req.params.articleNumber)
        if(item) {
            await productSchema.remove(item)
            res.status(200).json({test: `Product with article number ${req.params.articleNumber} was deleted successfully.`})
        } else {
            res.status(400).json({text: 'Product with article number ${req.params.articleNumber} was not found.'})
        }
    }
 })

module.exports = controller