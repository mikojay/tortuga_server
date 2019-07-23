const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({credentials:true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require('./db')


// app.post('/api/messages', require('./controllers/post_message'))
// app.get('/api/messages', require('./controllers/get_messages'))
//
// app.post('/api/channels', require('./controllers/post_channel'))
// app.get('/api/channels', require('./controllers/get_channels'))
//
//USERS
app.get('/api/users', require('./controllers/get_users'))

//SIGNUP & LOGIN
app.post('/api/signup', require('./controllers/signup'))
app.post('/api/login', require('./controllers/login'))

//CATEGORIES
app.get('/api/categories', require('./controllers/get_categories'))

//PLACES
app.get('/api/places', require('./controllers/get_places'))
app.post('/api/places', require('./controllers/post_place'))

//likes

//dislikes


app.listen(process.env.PORT, (err) => {
	if (err) {
		console.log('ERROR:', err)
	} else {
		console.log(`Ready on port ${process.env.PORT}`)
	}
})
