import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			"input" : "",
		}
	}

	handleSearch = (event) => {
		this.setState( {"input" : event.target.value}, () => {
			this.props.updateHome(this.state.input)
		})
	}

	render() {
		return(
			<div className="searchContainer">
				<label htmlFor="searchBar">Search</label>
				<input type="search" className="searchBar" value={this.state.input} onChange={(e) => this.handleSearch(e)} />
			</div>
		)
	}
}

export default Search;