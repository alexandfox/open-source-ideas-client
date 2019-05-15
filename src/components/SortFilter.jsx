import React, {Component} from "react"

class filterSort extends Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	handleChange = (e) => {
		console.log("sort e.target.value: ", e.target.value)
		this.props.updateSort(e.target.value)
	}

	render() {
		return(
			<select id="select-sort" onChange={(e) => this.handleChange(e)}>
				<option value="upvotes">popular</option>
				<option value="created_at">newest</option>
				<option value="netvotes">controversial</option>
			</select>
		)
	}
}

export default filterSort