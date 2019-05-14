import React, {Component} from "react"
import Search from "../components/SearchBar"
// import {NavLink} from "react-router-dom"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";
import FilterSort from "../components/SortFilter"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIdeas : [],
      filteredIdeas: [],
    }
  }
  
  // GET ideas from API (database)
  componentDidMount() {
    const queryString = window.location.search;

    getAllIdeas(queryString || "")
      .then(res => {
        this.setState({ 
          allIdeas: res.data.ideas,
          filteredIdeas: res.data.ideas, 
        });
        // console.log("get ideas res: ", res)
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // SORT FUNCTIONS
  updateSort(sortMethod) {
    console.log("here i am in the parent sort")
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

  // RENDER
  render() {
    // console.log("state: ", this.state)
    return (
    <div id="home-container">
      <h1>Hello this is the home</h1>
      <Search updateResults={(term) => this.searchFilter(term)}/>
      <FilterSort updateSort={(sort) => this.updateSort(sort)} />
      {
				this.state.filteredIdeas.map( (idea, index) => (
          idea.isPublic &&
          <IdeaItem key={index} loggedUser={this.props.loggedUser} {...idea} isMine={false} />
				))
			}
    </div>
  )}
}

export default Home