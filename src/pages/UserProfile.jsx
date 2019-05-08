import React, {Component} from "react"
import IdeaItem from "../components/IdeaListItem"
import { getUserByName } from "../api/apiHandler";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_name: this.props.match.params.name,
      user_page: {},
			current_user: {},
      isMyProfile: false,
    }
  }
  
  // GET user from API (database)
  // see if current user (browsing) is the user 
  componentDidMount() {
		if (this.props.loggedUser) {
			this.setState({current_user: this.props.loggedUser}, () => {
        this.props.loggedUser.name == this.props.match.params.name ? 
          this.setState({isMyProfile: true, user_page: this.props.loggedUser}) :
          console.log("current user is not the page user")
      })
		} else {
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
  }

  render() {
    // console.log("state ", this.state)

    return (
    <div id="private-profile-container">
			<div className="profileDetails">
				<h2 className="profileName">{this.state.user_name}</h2>
        {this.state.isMyProfile && <p>this is my profile!</p>}
        {!this.state.isMyProfile && <p>this is not my profile</p>}
			</div>
      <h3 className="profileHeader">DRAFTS</h3>
      <h3 className="profileHeader">UPVOTES</h3>
    </div>
  )}
}

export default Home