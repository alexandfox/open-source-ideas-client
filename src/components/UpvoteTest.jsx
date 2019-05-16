import React, { Component } from 'react';
import { upvoteIdea, updateOneIdea } from "../api/apiHandler";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class UpvoteDownvote extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedUser: props.loggedUser,
      idea: props.idea,
			upvotes: props.idea.upvotes,
			downvotes: props.idea.downvotes,
      hasUpvoted: false,
      hasDownvoted: false,
      upvotedUsers: props.idea.upvotedUsers,
      downvotedUsers: props.idea.downvotedUsers,
    }
		// console.log("props: ", props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.idea !== prevProps.idea) {
      this.setState({
        idea: this.props.idea,
        upvotes: this.props.idea.upvotes,
			  downvotes: this.props.idea.downvotes,
        upvotedUsers: this.props.idea.upvotedUsers,
        downvotedUsers: this.props.idea.downvotedUsers,
        hasUpvoted: (this.props.loggedUser && this.checkIfAlreadyUpvoted(this.props.loggedUser._id, this.props.idea)),
			  hasDownvoted: (this.props.loggedUser && this.checkIfAlreadyDownvoted(this.props.loggedUser._id, this.props.idea))
      })
    }
  }

  componentDidMount(){
    this.setState({
			hasUpvoted: (this.props.loggedUser && this.checkIfAlreadyUpvoted(this.props.loggedUser._id, this.props.idea)),
			hasDownvoted: (this.props.loggedUser && this.checkIfAlreadyDownvoted(this.props.loggedUser._id, this.props.idea))
		});
  }  

  checkIfAlreadyUpvoted = (userId, idea) => {
    var upvotedUsers = idea.upvotedUsers
    if (!upvotedUsers) return false
    return upvotedUsers.includes(userId)
  }

  checkIfAlreadyDownvoted = (userId, idea) => {
    var downvotedUsers = idea.downvotedUsers
    if (!downvotedUsers) return false
    return downvotedUsers.includes(userId)
  }

  upvoteOne = () => {
    upvoteIdea(this.props.idea._id, this.state)
  } 

	downvoteOne = () => {
    updateOneIdea(this.props.idea._id, this.state)
  } 

  handleUpvote = () => {
    if(!this.state.hasUpvoted && !this.state.hasDownvoted) {
			this.setState({ 
        upvotes: this.state.upvotes + 1, 
        upvotedUsers: [...this.state.upvotedUsers, this.state.loggedUser._id], 
				hasUpvoted: true,
    	}, this.upvoteOne);
    } else if (this.state.hasUpvoted && !this.state.hasDownvoted){
      this.setState({ 
        upvotes: this.state.upvotes - 1, 
        upvotedUsers: this.state.upvotedUsers.filter(id => id !== this.state.loggedUser._id), 
				hasUpvoted: false,
      }, this.upvoteOne);
    } else if (!this.state.hasUpvoted && this.state.hasDownvoted){
      this.setState({ 
        upvotes: this.state.upvotes + 1, 
        downvotes: this.state.downvotes - 1, 
        upvotedUsers: [...this.state.upvotedUsers, this.state.loggedUser._id], 
				downvotedUsers: this.state.downvotedUsers.filter(id => id !== this.state.loggedUser._id),
				hasUpvoted: true,
				hasDownvoted: false,
    }, this.upvoteOne);
    }
  };

  handleDownvote = () => {
    if(!this.state.hasDownvoted && !this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes + 1, 
        downvotedUsers: [...this.state.downvotedUsers, 
				this.state.loggedUser._id],
				hasDownvoted: true,
    }, this.downvoteOne);
    } else if (this.state.hasDownvoted && !this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes - 1, 
        downvotedUsers: this.state.downvotedUsers.filter(id => id !== this.state.loggedUser._id),
				hasDownvoted: false
      }, this.downvoteOne);
    } else if (!this.state.hasDownvoted && this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes + 1, 
        upvotes: this.state.upvotes - 1,
        downvotedUsers: [...this.state.downvotedUsers, this.state.loggedUser._id],
        upvotedUsers: this.state.upvotedUsers.filter(id => id !== this.state.loggedUser._id),
				hasDownvoted: true,
				hasUpvoted: false,
    }, this.downvoteOne);
    }
  };

  suggestLogin = () => {
    alert("Oops! that option requires login :)")
  }

  render(){
    return (
      <div className={`upvDownvWrapper ${this.props.orientation}`}>
        <div className={`upvDownvComponent ${this.props.orientation} ${this.state.hasUpvoted ? "active" : ""}`} onClick={this.state.loggedUser ? this.handleUpvote : this.suggestLogin}>
          <FontAwesomeIcon icon="heart" className="upvoteIcon" />
          <p className={`upvoteCount ${this.props.orientation}`}>{this.state.upvotes}</p>
        </div>
        <div className={`upvDownvComponent ${this.props.orientation} ${this.state.hasDownvoted ? "active" : ""}`} onClick={this.state.loggedUser ? this.handleDownvote : this.suggestLogin}>
          <FontAwesomeIcon icon="poo" className="upvoteIcon" />
          <p className={`downvoteCount ${this.props.orientation}`}>{this.state.downvotes}</p>
        </div>
    </div>
    )
  }
}

export default UpvoteDownvote;

