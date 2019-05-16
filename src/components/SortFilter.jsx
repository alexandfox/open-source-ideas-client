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
			<div className="sortOptions">
				<label>SORT BY:</label>
				<select className="sortOptionsDropdown outlineButton" onChange={(e) => this.handleChange(e)}>
					<option value="upvotes">Popular</option>
					<option value="created_at">Newest</option>
					<option value="netvotes">Controversial</option>
				</select>
			</div>
		)
	}
}

export default filterSort