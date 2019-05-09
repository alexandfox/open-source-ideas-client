import React, {Component} from "react"
import IdeaItem from "../components/IdeaListItem"
import { getUserByName, getOneIdea } from "../api/apiHandler";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: this.props.match.params.name,
      user_page: {},
			current_user: this.setLoggedUser(),
      isMyProfile: this.setMyProfile(),
      // upvoted_ideas: [],
    }
    console.log("user prof props: ", props)
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

  upvoted_ideas = [];

  pushUpvotedIdea(id) {
    getOneIdea(id)
    .then(res => {
      console.log("get one idea res: ", res)
      this.upvoted_ideas.push(res.data.idea);
      this.setState({});
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  componentDidMount() {
		getUserByName(this.state.user_name)
      .then(res => {
        this.setState({ 
          user_page: res.data,
        }, () => {
          res.data.upvotedIdeas.forEach( id => {
          console.log("here i am in res: ", id)
          this.pushUpvotedIdea(id)
        })}
        );
      })
      .catch(err => {
        console.log(err.response);
      });	
  }

  render() {
    console.log("state ", this.state)
    console.log("this.upvoted_ideas", this.upvoted_ideas)

    return (
    <div id="private-profile-container">
			<div className="profileDetails">
				<h2 className="profileName">{this.state.user_name}</h2>
        {this.state.isMyProfile && <p>this is my profile!</p>}
        {!this.state.isMyProfile && <p>this is not my profile</p>}
			</div>
      {this.state.isMyProfile && (
        <div id="profile-drafts">
        <h3 className="profileHeader">DRAFTS</h3>
        {this.state.user_page.drafts && this.state.user_page.drafts.length > 0 ?  <div className="draftsContainer">
            <p>here are the drafts:{this.state.user_page.drafts[0]} </p>
            {this.state.user_page.drafts.map( (idea, index) => (
              <IdeaItem key={index} {...idea} />
            ))}
          </div>
        : <p>no drafts yet... share an idea!</p>}
        </div>
        )
      }
      <h3 className="profileHeader">UPVOTES</h3>
      {this.state.user_page.upvotedIdeas && this.state.user_page.upvotedIdeas.length > 0 ? 
        <div id="profile-upvoted">
          <p>here are the upvoted:{this.upvoted_ideas} </p>
          {this.upvoted_ideas.map( (idea, index) => (
            <IdeaItem key={index} {...idea} />
          ))}
        </div>
        : <p>no upvoted ideas yet... browse some!</p>
      }
    </div>
  )}
}

export default Home