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
