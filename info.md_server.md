##get_likes
const db_place = require('../models/place')

module.exports = (req, res) => {
	db_place.find({},{'likes': 1, 'name': 1, '_id': 0, 'address': 1, 'description': 1}).sort('-likes').limit(5).populate({
		path: 'places',
		selct: 'id name address description'}).then((data) => {
		res.send(data)
	}).catch((err) => {
		res.send(err)
	})
}

##get_dislikes
const db_place = require('../models/place')

module.exports = (req, res) => {
	db_place.find({},{'dislikes': 1, 'name': 1, '_id': 0, 'address': 1, 'description': 1}).sort('-dislikes').limit().populate({
		path: 'places',
		selct: 'id name address description'}).then((data) => {
		res.send(data)
	}).catch((err) => {
		res.send(err)
	})
}

##api index
//likes
app.get('/api/likes', require('./controllers/get_likes'))
