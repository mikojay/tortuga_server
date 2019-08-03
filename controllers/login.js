const db_user = require('../models/user')
//encryption module
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
//console.log(req.body)
// check existense of email in databse
	db_user.findOne({email: req.body.email}).then((user)=>{
		if(user){
			bycrypt.compare(req.body.password,user.password, (err,match)=>{
				if(match){
					//Create a token
					let token = jwt.sign(user.toObject(),process.env.SECRET)
					//send token back to user
					//console.log(req.body)
					res.status(200).json({
						message: 'Super granted you are loggedin',
						token: token
					})
				//res.send('Granted!! You are logged-in')
				}else{
					res.send('INVALID PASSWORD')
				}
			})
		}else{
			res.send('Sorry email not found')
		}
	}).catch((err)=>{
		res.status(300).send(err)
	})
}





// const db_user = require('../models/user')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
//
// module.exports = (req, res) => {
// 	console.log(req.body)
// 	// 1. Check if email exists in db
// 	db_user.findOne({email: req.body.email}).then((user) => {
// 		if (user) {
// 			// 2. If email found, match passwords
// 			bcrypt.compare(req.body.password, user.password, (err, match) => {
// 				if (match) {
// 					// 4. If passwords match, res OK
// 					let token = jwt.sign(user.toObject(), process.env.SECRET)
// 					res.status(200).json({
// 						message: 'You are logged in',
// 						token: token
// 					})
// 				} else {
// 					res.send('Sorry, invalid password')
// 				}
// 			})
// 		} else {
// 			res.send('Sorry, email not found')
// 		}
// 	}).catch((err) => {
// 		res.status(300).send(err)
// 	})
//
// }
