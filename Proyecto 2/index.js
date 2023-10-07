const express = require('express')
const app = express()
require('dotenv').config()

const Product = require('./models/product')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())



app.get('/', (request, response) => {
    response.send('<h1>CRM app</h1><p>Mauricio German Benitez</p>')
})

app.get('/api/products', (request, response) => {
    Product.find({}).then(products => {
        response.json(products)
    })
})


app.post('/api/products', (request, response) => {

    const body = request.body 
    console.log('==> body: ', body )
       

    if (body === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const product = new Product({
        name: body.name,
        description: body.description,
        expiration: body.expiration,
        type: body.type
    })


    product.save().then(savedProduct => {
        response.json(savedProduct)
    })
})

app.get('/api/products/:id', (request, response) => {
    Product.findById(request.params.id).then(product => {
        response.json(product)
    })
})

app.delete('/api/products/:id', (request, response) => {
    Product.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})


app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
