const db_place = require('../models/place')
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

const create_place = (body) => {
	return new Promise(function(resolve, reject) {
		console.log('body', body)
		db_place.create(body).then((data) => {
			db_place.findById(data._id)
				.populate({
					path: 'author',
					select: 'name email'
				}).then((place) => {
					console.log('place', place)
					resolve(place)
				}).catch((err) => {
					reject(err)
				})
		}).catch((err) => {
			reject(err)
		})
	})
}

module.exports = (req, res) => {
	console.log('reqbody',JSON.stringify(req.body, false, 2))
	console.log('reqfile',req.file)
	// token
	let token = req.headers.authorization.split(' ')[1]
	jwt.verify(token, process.env.SECRET, (err, decoded) => {
		if (decoded) {
			console.log('decoded', decoded)
			req.body.author = decoded._id
			console.log('req.body', req.body)
			// file
			if (req.file && req.file != null) {
				console.log('about to upload')
				upload_file(req.file).then((file) => {
					console.log('uploaded file', file)
					req.body.file = file.url
					// place with file
					console.log('req.body with url', req.body)
					create_place(req.body).then((place) => {
						console.log('place', place)
						res.send(place)
					}).catch((err) => {
						res.send(err)
					})
				}).catch((err) => {
					console.log('err upload_file', err)
					res.send(err)
				})
			} else {
				// message no file
				delete req.body.file
				console.log('req.body', req.body)
				create_place(req.body).then((place) => {
					res.send(place)
				}).catch((err) => {
					res.send(err)
				})
			}
		}
	})
}
