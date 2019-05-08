import React, {Component} from "react"
import IdeaItem from "../components/IdeaListItem"
import { getUserByName } from "../api/apiHandler";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: this.props.match.params.name,
      user_page: {},
			current_user: this.setLoggedUser(),
      isMyProfile: this.setMyProfile(),
      upvoted_ideas: [],
    }
  }
  
  // see if current user (browsing) is the user 
  setLoggedUser() {
    return this.props.loggedUser ? this.props.loggedUser : {}
  }

  setMyProfile() {
    if (this.props.loggedUser) return this.props.loggedUser.name === this.props.match.params.name ? true : false;
    return false
  }

  // GET user from API (database)
  // getPageUser(name) {
  //   getUserByName(name)
  //     .then(res => {
  //       console.log("res.data: ", res.data)
  //       return res.data})
  //     .catch(err => {
  //       console.log(err.response);
  //       return {};
  //     });	
  // }

  getUpvotedIdeas() {
    
  }

  componentDidMount() {
		getUserByName(this.state.user_name)
      .then(res => {
        this.setState({ 
          user_page: res.data,
        });
      })
      .catch(err => {
        console.log(err.response);
      });	
  }

  render() {
    console.log("state ", this.state)

    return (
    <div id="private-profile-container">
			<div className="profileDetails">
				<h2 className="profileName">{this.state.user_name}</h2>
        {this.state.isMyProfile && <p>this is my profile!</p>}
        {!this.state.isMyProfile && <p>this is not my profile</p>}
			</div>
      {this.state.isMyProfile &&
        <div id="profile-drafts">
          <h3 className="profileHeader">DRAFTS</h3>
        </div>
      }
      <h3 className="profileHeader">UPVOTES</h3>
      {this.state.user_page.upvotedIdeas && this.state.user_page.upvotedIdeas.length > 0 ? 
        <div id="profile-upvoted">
          <p>here are the upvoted:{this.state.user_page.upvotedIdeas[0]} </p>
          {this.state.user_page.upvotedIdeas.map( (idea, index) => (
            <IdeaItem key={index} {...idea} />
          ))}
        </div>
        : <p>no upvoted ideas yet... browse some!</p>
      }
    </div>
  )}
}

export default Home