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
			this.setState({current_user: this.props.loggedUser}, 
        (this.current_user.name === this.user_name) ? 
          this.setState({isMyProfile: true, user_page: this.current_user}) :
          console.log("current user is not the page user: ", this.current_user.name)
      )
		} else {
			getUserByName(this.state.user_name)
      .then(res => {
        console.log("here is the result: ", res)
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
    console.log("state ", this.state)
    console.log("props: ", this.props)
    return (
    <div id="private-profile-container">
			<div className="profileDetails">
				<h2 className="profileName">{this.state.user_page.name}</h2>
			</div>
      <h3 className="profileHeader">DRAFTS</h3>
      <h3 className="profileHeader">UPVOTES</h3>
    </div>
  )}
}

export default Home