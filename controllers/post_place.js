const db_place = require('../models/place')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			console.log('decoded', decoded)
			req.body.author = decoded._id
			db_place.create(req.body).then((data) => {
				db_place.findById(data._id)
					.populate({
						path: 'author',
						select: 'id name'
					}).then((place) => {
						res.send(place)
					}).catch((err) => {
						res.send(err)
					})
			}).catch((err) => {
				res.send(err)
			})
		}
	})
}
