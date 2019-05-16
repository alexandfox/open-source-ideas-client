import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Search extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input : "",
		}
	}
	
	handleSearch = (event) => {
		this.setState( {"input" : event.target.value}, () => {
			this.props.updateResults(this.state.input)
		})
	}

	handleClickInInput = () => {
		var searchIcon = document.querySelector(".searchIcon");
		searchIcon.classList.add("highlightedIcon");
	}

	handleClickOutInput = () => {
		var searchIcon = document.querySelector(".searchIcon");
		searchIcon.classList.remove("highlightedIcon");
	}

	render() {
		return(
			<div className="searchContainer">
				{/* <label htmlFor="searchBar">Search</label> */}
				<input type="text" className="searchBarInput" onBlur={this.handleClickOutInput} onClick={this.handleClickInInput} placeholder="Start browsing ideas now" value={this.state.input} onChange={(e) => this.handleSearch(e)} />
				<span className="searchBarUnderline"></span>
				<FontAwesomeIcon icon="search" className="searchIcon"/>
			</div>
		)
	}
}

export default Search;