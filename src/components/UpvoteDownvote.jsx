import React, { Component } from 'react';
import { getOneIdea, updateOneIdea, updateOneUser } from "../api/apiHandler";

class UpvoteDownvote extends Component {
  constructor(props){
    super(props)
    this.state = {
      ideaId: props.ideaId,
      user: props.loggedUser,
      idea: {},
      hasUpvoted: false,
      hasDownvoted: false,
      upvotedIdeas: props.loggedUser && props.loggedUser.upvotedIdeas,
      downvotedIdeas: props.loggedUser && props.loggedUser.downvotedIdeas,
      upvotedUsers: [1],
      downvotedUsers: [],
    }
  }

  //This method is to print the idea on screen and will be recalled each time we'll update idea
  printIdea = () => {
    getOneIdea(this.state.ideaId)
      .then(res => {
        this.setState({
          idea: res.data.idea,
          upvotes: res.data.idea.upvotes,
          upvotedUsers: res.data.idea.upvotedUsers,
          downvotedUsers: res.data.idea.downvotedUsers,
          downvotes: res.data.idea.downvotes,
          hasUpvoted: (this.props.loggedUser && this.checkIfAlreadyUpvoted(this.state.user._id, res.data.idea)),
          hasDownvoted: (this.props.loggedUser && this.checkIfAlreadyDownvoted(this.state.user._id, res.data.idea))
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  componentDidMount(){
    this.printIdea();
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

  updateInDbAndRender = () => {
    updateOneUser(this.state.user._id, this.state)
    .then(res => {
        this.printIdea(); 
      })
      .catch(err => {
        console.log(err.response);
      });
    
     //Update User in db with new values from state
    updateOneIdea(this.state.ideaId, this.state) //Update Idea in db with new values from state
      .then(res => {
        this.printIdea(); // Rerender idea
      })
      .catch(err => {
        console.log(err.response);
      });
  } 

  handleUpvote = () => {
    if(!this.state.hasUpvoted && !this.state.hasDownvoted) {
      this.setState({ 
        upvotes: this.state.upvotes + 1, // Add 1 to idea upvotes in state
        upvotedUsers: [...this.state.upvotedUsers, this.state.user._id], //Add user to current idea's upvotedUsers array in state
        upvotedIdeas: [...this.state.upvotedIdeas, this.state.ideaId], //Add idea to current user's upvotedIdeas array in state
    }, this.updateInDbAndRender);
    } else if (this.state.hasUpvoted && !this.state.hasDownvoted){
      this.setState({ 
        upvotes: this.state.upvotes - 1, // Subtract 1 to idea upvotes in state
        upvotedUsers: this.state.upvotedUsers.filter(id => id !== this.state.user._id), //Remove user from current idea's upvotedUsers array in state
        upvotedIdeas: this.state.upvotedIdeas.filter(id => id !== this.state.ideaId), //Remove idea from current user's upvotedIdeas array in state
      }, this.updateInDbAndRender);
    } else if (!this.state.hasUpvoted && this.state.hasDownvoted){
      this.setState({ 
        upvotes: this.state.upvotes + 1, // Add 1 to idea upvotes in state
        downvotes: this.state.downvotes - 1, // Subtract 1 from idea downvotes in state
        upvotedUsers: [...this.state.upvotedUsers, this.state.user._id], //Add user to current idea's upvotedUsers array in state
        upvotedIdeas: [...this.state.upvotedIdeas, this.state.ideaId], //Add idea to current user's upvotedIdeas array in state
        downvotedUsers: this.state.downvotedUsers.filter(id => id !== this.state.user._id), //Remove user from current idea's downvotedUsers array in state
        downvotedIdeas: this.state.downvotedIdeas.filter(id => id !== this.state.ideaId), //Remove idea from current user's downvotedIdeas array in state
    }, this.updateInDbAndRender);
    }
  };

  handleDownvote = () => {
    if(!this.state.hasDownvoted && !this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes + 1, // Add 1 to idea downvotes in state
        downvotedUsers: [...this.state.downvotedUsers, this.state.user._id], //Add user to current idea's downvotedUsers array in state
        downvotedIdeas: [...this.state.downvotedIdeas, this.state.ideaId], //Add idea to current user's downvotedIdeas array in state
    }, this.updateInDbAndRender);
    } else if (this.state.hasDownvoted && !this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes - 1, // Subtract 1 to idea downvotes in state
        downvotedUsers: this.state.downvotedUsers.filter(id => id !== this.state.user._id), //Remove user from current idea's downvotedUsers array in state
        downvotedIdeas: this.state.downvotedIdeas.filter(id => id !== this.state.ideaId), //Remove idea from current user's downvotedIdeas array in state
      }, this.updateInDbAndRender);
    } else if (!this.state.hasDownvoted && this.state.hasUpvoted) {
      this.setState({ 
        downvotes: this.state.downvotes + 1, // Add 1 to idea downvotes in state
        upvotes: this.state.upvotes - 1, // Subtract 1 to idea upvotes in state
        downvotedUsers: [...this.state.downvotedUsers, this.state.user._id], //Add user to current idea's downvotedUsers array in state
        downvotedIdeas: [...this.state.downvotedIdeas, this.state.ideaId], //Add idea to current user's downvotedIdeas array in state
        upvotedUsers: this.state.upvotedUsers.filter(id => id !== this.state.user._id), //Remove user from current idea's upvotedUsers array in state
        upvotedIdeas: this.state.upvotedIdeas.filter(id => id !== this.state.ideaId), //Remove idea from current user's upvotedIdeas array in state
    }, this.updateInDbAndRender);
    }
  };

  suggestLogin = () => {
    alert("Oops! that option requires login :)")
  }

  render(){
    const { idea } = this.state;
    return (
      <React.Fragment>
      <p>
        Upvotes:{this.state.upvotedUsers.length}
        <button onClick={this.state.user ? this.handleUpvote : this.suggestLogin}>upvote!</button>
      </p>
      <p>
        Downvotes:{idea.downvotes}
        <button onClick={this.state.user ? this.handleDownvote : this.suggestLogin}>downvote!</button>
      </p>
    </React.Fragment>
    )
  }
}

export default UpvoteDownvote;

