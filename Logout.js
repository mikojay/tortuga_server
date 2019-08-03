import React, {Component} from 'react'

class Logout extends Component {
	// Data

//Function
logout() {
	localStorage.removeItem('token')
	window.location.reload()
}

	// Render
	render() {
		return (
			<button className="btn btn-danger" type="button" onClick={this.logout}>Logout</button>
		)
	}
}

export default Logout
