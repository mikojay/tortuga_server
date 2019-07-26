const db_user = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
	// console.log('search for headers',req);
	console.log('reqhead', req.headers);
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			console.log('decoded', decoded)
			res.send(decoded)
		}
	})
}
