const db = require('../db')
const mongoose = require('mongoose')

const db_place = db.model('places', {
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
		required: [true, ' Author is required']
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category',
		required: [true, ' Category is required']
	},
	date: {
		type: Date,
		default: Date.now()
	},
	address: {
		type: String,
		required: [true, ' Address is required']
	},
	description: {
		type: String,
		required: [true, ' Description is required']
	},
	likes: {
		type: Number,
		required: false
	},
	dislikes: {
		type: Number,
		required: false
	}
})

module.exports = db_place
