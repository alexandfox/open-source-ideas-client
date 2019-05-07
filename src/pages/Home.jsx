import React, {Component} from "react"
import Search from "../components/SearchBar"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      allIdeas : [],
      filteredIdeas: []
    }
  }
  
  componentDidMount() {
    getAllIdeas()
      .then(res => {
        this.setState({ allIdeas: res.data.ideas}, 
        );
      })
      .catch(err => {
        console.log(err.response);
      });
  }

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

  
  searchFilter(searchTerm) {
		// var filteredItems = this.state.ideas.filter( idea => 
		// 	this.objectContainsString(searchTerm, idea)
		// )
		// this.setState({"ideas" : filteredideas},
		// )
    console.log("here i am in home, searchTerm: ", searchTerm)
	}

  render() {
    return (
    <div id="home-container">
      <h1>Hello this is the home</h1>
      <Search updateHome={(term) => this.searchFilter(term)} />
      {
				this.state.allIdeas.map( (idea, index) => (
          <IdeaItem key={index} {...idea} />
				))
			}
      
    </div>
  )}
}

export default Home