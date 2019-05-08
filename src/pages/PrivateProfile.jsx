import React, {Component} from "react"
import IdeaItem from "../components/IdeaListItem"
import { getOneUser } from "../api/apiHandler";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
			user: null
    }
  }
  
  // GET ideas from API (database)
  componentDidMount() {
    // getOneUser()
    //   .then(res => {
    //     this.setState({ 
    //       user: res.data.user}, console.log("state: ")
    //     );
    //   })
    //   .catch(err => {
    //     console.log(err.response);
    //   });
  }

  render() {
    console.log("props: ", this.props)
    return (
    <div id="private-profile-container">
			<div className="profileDetails">
				<h2 className="profileName">username</h2>
			</div>
      <h2 className="profileHeader">DRAFTS</h2>
      <h2 className="profileHeader">UPVOTES</h2>
    </div>
  )}
}

export default Home