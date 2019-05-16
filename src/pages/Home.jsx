import React, {Component} from "react"
import Search from "../components/SearchBar"
// import {NavLink} from "react-router-dom"
import IdeaItem from "../components/IdeaListItem"
import { getAllIdeas } from "../api/apiHandler";
import FilterSort from "../components/SortFilter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allIdeas : [],
      filteredIdeas: [],
      topIdeas: [],
      logout: false,
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
          topIdeas: res.data.ideas 
        });
        // console.log("get ideas res: ", res)
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.location.logout === true && this.state.logout === false) {
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

  // RENDER
  render() {
    const { topIdeas } = this.state;
    return (
    <div id="home-container">
      <div className="titleContainer">
        <h3 className="mainTagline">Great ideas worth sharing.</h3>
        <h1 className="mainTitle">Open source ideas<br/>in every field you<br/>could possibly think of</h1>
      </div>
      <Search updateResults={(term) => this.searchFilter(term)}/>
      <div className="trendingIdeasContainer">
        {/* <div className="trendingTitleContainer">
          <FontAwesomeIcon icon="trophy" className="trendingTitleIcon"/>
          <h2 className="trendingIdeasTitle">Trending Ideas</h2>
        </div> */}
        <div className="trendingItemWrapper">
          <div className="trendingItem">
            {/* <p className="trendingItemUpvotes">{this.state.allIdeas[1] && this.state.allIdeas[1].upvotedUsers.length} upvotes</p> */}
            <FontAwesomeIcon icon="trophy" className="trendingTitleIcon"/>
            <h3 className="trendingItemTitle">
              <Link to={`/idea/${topIdeas[1] && topIdeas[1]._id}`}>{topIdeas[1] && topIdeas[1].title}</Link>
            </h3>
            <p className="trendingItemCreator">{topIdeas[1] && topIdeas[1].creator.name}</p>
          </div>
          <div className="trendingItem">
            {/* <p className="trendingItemUpvotes">{this.state.allIdeas[0] && this.state.allIdeas[0].upvotedUsers.length} upvotes</p> */}
            <FontAwesomeIcon icon="trophy" className="trendingTitleIcon"/>
            <h3 className="trendingItemTitle">
              <Link to={`/idea/${topIdeas[0] && topIdeas[0]._id}`}>{topIdeas[0] && topIdeas[0].title}</Link>
            </h3>
            <p className="trendingItemCreator">{topIdeas[0] && topIdeas[0].creator.name}</p>
          </div>
          <div className="trendingItem">
            {/* <p className="trendingItemUpvotes">{this.state.allIdeas[2] && this.state.allIdeas[2].upvotedUsers.length} upvotes</p> */}
            <FontAwesomeIcon icon="trophy" className="trendingTitleIcon"/>
            <h3 className="trendingItemTitle">
              <Link to={`/idea/${topIdeas[2] && topIdeas[2]._id}`}>{topIdeas[2] && topIdeas[2].title}</Link>
            </h3>
            <p className="trendingItemCreator">{topIdeas[2] && topIdeas[2].creator.name}</p>
          </div>
        </div>
      </div>
      <FilterSort updateSort={(sort) => this.updateSort(sort)} />
      <div className="ideaListContainer">
          {
            this.state.filteredIdeas.map( (idea, index) => (
              (idea.isPublic && !idea.isArchived) &&
              <IdeaItem key={index} loggedUser={this.props.loggedUser} {...idea} isMine={false} />
            ))
          }
      </div>
    </div>
  )}
}

export default Home