import React, {Component} from "react"
import Search from "../components/SearchBar"
// import {NavLink} from "react-router-dom"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";
import FilterSort from "../components/SortFilter";
import Signup from "./Signup"
import Modal from "../components/Modal"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIdeas : [],
      filteredIdeas: [],
      logout: false,
      showModal : false,
    }
    console.log("home props: ", props)
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

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.loggedUser !== prevProps.loggedUser) {
  //     this.setState({
  //       logout : true,
  //     })
  //   }
  // }

  // SORT FUNCTIONS
  updateSort(sortMethod) {
    // ?tags=design
    // window.history.pushState("", "", `/?sort=${sortMethod}`)
    var queryString = window.location.search;
    queryString ? queryString = queryString + `&sort=${sortMethod}` : queryString = `?sort=${sortMethod}`

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

  handleModalClick = () => {
    this.setState({showModal: true})
    console.log("modal clicked")
  }

  handleCloseModal = () => this.setState({showModal: false})

  // RENDER
  render() {
    // console.log("state: ", this.state)
    return (
    <div id="home-container">
      <div className="titleContainer">
        <h3 className="mainTagline">Great ideas worth sharing.</h3>
        <h1 className="mainTitle">Open source ideas<br/>in every field you<br/>could possibly think of</h1>
      </div>
      <Search updateResults={(term) => this.searchFilter(term)}/>
      <FilterSort updateSort={(sort) => this.updateSort(sort)} />
      <div className="ideaListContainer">
        {
          this.state.filteredIdeas.map( (idea, index) => (
            (idea.isPublic && !idea.isArchived) &&
            <IdeaItem key={index} loggedUser={this.props.loggedUser} {...idea} isMine={false} />
          ))
        }
      </div>

      <button onClick={this.handleModalClick}>
        Show Secret Modal
      </button>
      {this.state.showModal ? (
        <Modal onClose={this.handleCloseModal}>
          This is the secret modal message!
        </Modal>
      ) : null}
    </div>
  )}
}

export default Home