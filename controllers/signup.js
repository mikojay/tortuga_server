const db_user = require('../models/user')
//encryption module
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')
const Datauri = require('datauri')
const path = require('path')


const data_uri = new Datauri()
const create_uri = (file) => {
	return data_uri.format(path.extname(file.originalname).toString(), file.buffer)
}

cloudinary.config({
	cloud_name:process.env.CLAUDINARY_NAME,
	api_key:process.env.CLAUDINARY_KEY,
	api_secret:process.env.CLAUDINARY_SECRET
})

const upload_file = (file) => {
	return new Promise(function(resolve, reject) {
		console.log('upload_file file', file)
		let uri = create_uri(file).content
		console.log('uri', uri)
		cloudinary.uploader.upload(uri).then((saved) => {
			console.log('saved', saved)
			resolve(saved)
		}).catch((err) => {
			console.log('err', err)
			reject(err)
		})
	})
}

module.exports = (req, res) => {
	console.log('req.body', JSON.stringify(req.body, false, 2))
	console.log('req.file', JSON.stringify(req.file, false, 2))
	bycrypt.hash(req.body.password, 10, (err, encrypted) => {
		if (err) {
			res.send(err)
		} else {
			req.body.password = encrypted
			upload_file(req.file).then(c_file => {
				console.log('c_file', c_file)
				req.body.file = c_file.url
				db_user.create(req.body).then((user) => {
					let token = jwt.sign(user.toObject(), process.env.SECRET)
					res.send(token)
				}).catch((err) => {
					res.send(err)
				})
			})
		}
	})
}












// const db_user = require('../models/user')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
//
// module.exports = (req, res) => {
// 	bcrypt.hash(req.body.password, 10, (err, encrypted) => {
// 		if (err) {
// 			res.status(300).send('Error:', err)
// 		} else {
// 			req.body.password = encrypted
// 			db_user.create(req.body).then((user) => {
// 				let token = jwt.sign(user.toObject(), process.env.SECRET)
// 				res.status(200).json({
// 					message: 'You are signed up',
// 					token: token
// 				})
// 			}).catch((err) => {
// 				res.send(err)
// 			})
// 		}
// 	})
// }
