const express = require('express')
const app = express()
require('dotenv').config()

const Meeting = require('./models/meeting')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())



app.get('/', (request, response) => {
    response.send('<h1>Meetings app</h1><p>Mauricio German Benitez</p>')
})

app.get('/api/v1/meetings', (request, response) => {
    Meeting.find({}).then(meetings => {
        response.json(meetings)
    })
})


app.post('/api/v1/meetings', (request, response) => {

    const body = request.body 
    console.log('==> body: ', body )
       

    if (body === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const meeting = new Meeting({
        title: body.title,
        description: body.description,
        time: body.time,
        userId: body.userId,
        message: body.message,
        summary: body.summary,
        url: body.url,
        users: body.users
    })


    meeting.save().then(savedMeeting => {
        response.json(savedMeeting)
    })
})

app.get('/api/v1/meetings/:id', (request, response) => {
    Meeting.findById(request.params.id).then(meeting => {
        response.json(meeting)
    })
})

app.delete('/api/v1/meetings/:id', (request, response) => {
    Meeting.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})




app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
