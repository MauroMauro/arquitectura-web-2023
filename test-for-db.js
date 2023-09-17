const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node test-for-db.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://MauroGerman:${password}@cluster0.jjysamj.mongodb.net/meetings?retryWrites=true&w=majority`

mongoose.connect(url)

const meetingSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: String,
  userId: String,
  message: String,
  summary: String,
  url: String,
  users: String
})

const Meeting = mongoose.model('Meeting', meetingSchema)

const meeting = new Meeting({
  title: 'meeting 1',
  description: "description meeting 1",
  time: '11hs',
  userId: 'user1',
  message: 'exmaple message',
  summary: 'example summary',
  url: 'https://google.com',
  users: ''
})

meeting.save().then(result => {
  console.log('meeting saved!')
  mongoose.connection.close()
})