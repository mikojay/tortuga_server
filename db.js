const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tortuga', {useNewUrlParser: true}, (err) => {
	if (err) {
		console.log('Error:', err)
	} else {
		console.log('Connected to MongoDB')
	}
})

module.exports = mongoose
