const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

productsRouter.get('/', async (request, response) => {
    const products = await Product.find({})
    response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
    const product = await Product.findById(request.params.id)
    if (!product) {
        response.status(404).end()
    }
    response.json(product)
})


productsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    if (token === null){return response.status(401).json({ error: 'token null, you must login' })}
    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!body.name) {
        return response.status(400).json({
            error: 'Body content `name` missing'
        })
    }

    if (!body.type) {
        return response.status(400).json({
            error: 'Body content `type` missing'
        })
    }

    if (!user) {
        return response.status(400).json({
            error: 'no user with the given id ' + request.body.user
        })
    }



    const product = new Product({
        name: body.name,
        description: body.description,
        expiration: body.expiration,
        type: body.type
    })

    const savedProduct = await product.save()
    await user.save()
    response.status(201).json(savedProduct)
})


productsRouter.delete('/:id', async (request, response) => {
    const token = getTokenFrom(request)
    if (token === null){return response.status(401).json({ error: 'token null, you must login' })}
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const product = await Product.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

     

    if (user) {
        await Product.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).end()
    }

})

productsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    if(!(await Product.findById(request.params.id))){
        response.status(404).end()
    }

    const product = {
        name: body.name,
        description: body.description,
        expiration: body.expiration,
        type: body.type
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(request.params.id, product, { new: true })
    response.status(200).json({
        success: 'Updated product'
    })
})


module.exports = productsRouter