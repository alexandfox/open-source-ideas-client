import React, {Component} from "react"
import Search from "../components/SearchBar"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler"
import FilteringTag from "../components/FilteringTag"

// PROPS:
// should accept "all ideas" from parent

class searchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIdeas : [],
      filteredIdeas: [],
      filteringTag: window.location.search ? window.location.search.slice(1).split("=")[1] : "",
    }
  }
  
	// CHANGE:
	// if query string --> get all ideas; if no query string --> take props from parent
  // GET ideas from API (database)
  componentDidMount() {
    const queryString = window.location.search;
    getAllIdeas(queryString || "")
      .then(res => {
        this.setState({ 
          allIdeas: res.data.ideas,
          filteredIdeas: res.data.ideas }, 
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // SEARCH FUNCTIONS
  exactMatch(string, object) {
    var compString = string.toLowerCase()

		for (var key in object) {
			if (typeof(object[key]) !== "string" ) console.log("not a string.")
			else {
				var compObjectValue = object[key].toLowerCase()
				if (compObjectValue.includes(compString)) return true;
		}}

		return false;
  }

  tagsMatch(string, object) {
    var compString = string.toLowerCase()
    for (let i=0; i<object.tags.length; i++) {
      var tag = object.tags[i];
      var tagString = tag.toLowerCase()
      if (tagString.includes(compString)) return true;
    }
  }

  // SEARCH UPDATE (dynamic)  
  searchFilter(searchTerm) {
		var filteredIdeas = this.state.allIdeas.filter( idea => 
			this.exactMatch(searchTerm, idea) || this.tagsMatch(searchTerm, idea)
		)
		this.setState({"filteredIdeas" : filteredIdeas})
  }

  handleChildrenClick = () => {
    getAllIdeas("")
      .then(res => {
        this.setState({ 
          allIdeas: res.data.ideas,
          filteredIdeas: res.data.ideas,
          filteringTag: "" 
        }, 
      );
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // RENDER
  render() {
    return (
    <div id="results-container">
      <Search updateResults={(term) => this.searchFilter(term)}/>
      {this.state.filteringTag ? <FilteringTag filteringTag={this.state.filteringTag} handleClick={this.handleChildrenClick}{...this.props}/> : ""}
      {
				this.state.filteredIdeas.map( (idea, index) => (
					idea.isPublic &&
          <IdeaItem key={index} loggedUser={this.props.loggedUser} {...idea} isMine={false} />
				))
			}
    </div>
  )}
}

export default searchResults