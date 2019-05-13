import React, {Component} from "react"
import Search from "../components/SearchBar"
// import {NavLink} from "react-router-dom"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIdeas : [],
      sortedIdeas: [],
      filteredIdeas: [],
    }
  }
  
  // GET ideas from API (database)
  componentDidMount() {
    const queryString = window.location.search;
    getAllIdeas(queryString || "")
      .then(res => {
        this.setState({ 
          allIdeas: this.sort(res.data.ideas, "upvotes"),
          sortedIdeas: this.sort(res.data.ideas, "upvotes"),
          filteredIdeas: this.sort(res.data.ideas, "upvotes"), 
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // SORT --> currently either for TRENDING (upvotes), or NEWEST (createdAt)
  compare(a, b, property) {
		var A = a[property];
		var B = b[property];

		if (A > B) return -1;
		else if (A === B) return 0;
		else return 1;
	}

	sort = ( array, property ) => {
		const sortedContacts = [...array]
		sortedContacts.sort( (a,b) => this.compare(a, b, property))
		return sortedContacts
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