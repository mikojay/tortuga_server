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
	date: {
		type: Date,
		default: Date.now()
	},
	description: {
		type: String,
		required: [true, ' Description is required']
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'category',
		required: [true, ' Category is required']
	}
})

module.exports = db_place
