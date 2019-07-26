const db_place = require('../models/place')

module.exports = (req, res) => {

	x = '-date'
	if (req.query.sort) {
		x = req.query.sort
	}
	db_place.find({}).sort(x).populate({
		path: 'category'
	}).populate({
		path: 'author',
		select: 'id name'
	}).then((data) => {
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
