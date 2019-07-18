model place.js

const db = require('../db')
const mongoose = require('mongoose')

const db_place = db.model('places', {
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, 'Message Author is required']
	},
	date: {
		type: Date,
		default: Date.now()
	},
	description: {
		type: String,
		required: [true, 'Message Description is required']
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category',
		required: [true, 'Message Category is required']
	}
})

module.exports = db_place
-----------------------

const db_place = require('../models/place')

module.exports = (req, res) => {

// let q = {}
// if (req.query && req.query.category) {
// 	q.category = req.query.category
// }
	db_place.find().sort('-date').populate({
		path: 'category'
	}).populate({
		path: 'author',
		select: 'id name'
	}).then((data) => {
		res.send(data)
	}).catch((err) => {
		res.send(err)
	})
}
