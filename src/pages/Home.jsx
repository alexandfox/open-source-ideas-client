import React, {Component} from "react"
import Search from "../components/SearchBar"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      ideas : []
    }
  }
  
  componentDidMount() {
    getAllIdeas()
      .then(res => {
        console.log("res.data.ideas: ", res.data.ideas)
        this.setState({ ideas: res.data.ideas}, 
          console.log("state.ideas ", this.state.ideas)
        );
      })
      .catch(err => {
        console.log(err.response);
      });
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
				this.state.ideas.map( (idea, index) => (
          <IdeaItem key={index} {...idea} />
				))
			}
      
    </div>
  )}
}

export default Home