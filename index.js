const express = require('express')
const app = express()

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(express.json())

let meetings = [
    {
        id: 1,
        title: 'meeting 1',
        description: "description meeting 1",
        time: '11hs',
        userId: 'user1',
        message: 'exmaple message',
        summary: 'example summary',
        url: 'https://google.com',
        users: ''
    },
    {
        id: 2,
        title: 'meeting2',
        description: "description meeting2",
        time: '12hs',
        userId: 'user2',
        message: 'exmaple message',
        summary: 'example summary',
        url: 'https://google.com',
        users: ''
    },
    {
        id: 3,
        title: 'meeting 3',
        description: "description meeting 3",
        time: '13hs',
        userId: 'user3',
        message: 'exmaple message',
        summary: 'example summary',
        url: 'https://google.com',
        users: ''
    }
]


app.get('/', (req, res) => {
    res.send('<h1>Meetings app</h1><p>Mauricio German Benitez</p>')
})

app.get('/api/v1/meetings', (req, res) => {
    res.json(meetings)
})


const generateId = () => {
    const maxId = meetings.length > 0
        ? Math.max(...meetings.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/v1/meetings', (request, response) => {

    const body = request.body    

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const meeting = {
        id: generateId(),
        title: body.title,
        description: body.description,
        time: body.time,
        userId: body.userId,
        message: body.message,
        summary: body.summary,
        url: body.url,
        users: body.users
    }


    meetings = meetings.concat(meeting)

    response.json(meeting)
})

app.get('/api/v1/meetings/:id', (request, response) => {
    const id = Number(request.params.id)
    const meeting = meetings.find(meeting => meeting.id === id)

    if (meeting) {
        response.json(meeting)
    } else {
        response.status(404).end()
    }

})

app.delete('/api/v1/meetings/:id', (request, response) => {
    const id = Number(request.params.id)
    meetings = meetings.filter(note => note.id !== id)

    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
