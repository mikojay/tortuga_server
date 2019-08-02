const db_place = require('../models/place')

module.exports = (req, res) => {

	// sort
	let sort = '-date'
	if (req.query.sort) {
		sort = req.query.sort
	}
	// filter
	let filter = {}
	if (!req.query.sort) {
		filter = req.query
	}

	db_place.find(filter).sort(sort).populate({
		path: 'category'
	}).populate({
		path: 'author',
		select: 'id name'
	}).then((data) => {
		console.log('data', data);
		res.send(data)
	}).catch((err) => {
		res.send(err)
	})

	// db_place.find({},{'name':1}).sort({'name': 1}).limit(3).populate({
	// 	path: 'category'
	// }).populate({
	// 	path: 'author',
	// 	select: 'id name'
	// }).then((data) => {
	// 	res.send(data)
	// }).catch((err) => {
	// 	res.send(err)
	// })
}
