const db = require('../db')

const db_channel = db.model('channel', {
	name: String
})

module.exports = db_channel
