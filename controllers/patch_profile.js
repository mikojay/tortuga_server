const db_user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')


module.exports = (req, res) => {
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			bycrypt.hash(req.body.password, 10, (err, encrypted) => {
				req.body.password = encrypted;
				console.log('id',decoded._id);
				console.log(req.body);
			db_user.findByIdAndUpdate(decoded._id, req.body, {new: true}).then((user) => {
				if (user) {
				// send token
					let token = jwt.sign(user.toObject(), process.env.SECRET)
					res.status(200).json({
						message: 'User updated',
						token: token
					})
				} else {
					res.send('User update failed')
				}
			}).catch((err) => {
				res.status(300).send(err)
			})
			})
		}
	})


	//
	// 	console.log(req.body)
	// 	// 1. decode token
	// 	// get id

}
