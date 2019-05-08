import React, { Component } from 'react';
import { getOneIdea, updateOneIdea } from "../api/apiHandler";

class IdeaPage extends Component{
  constructor(props){
    super(props)
    this.state={
      ideaId: props.match.params.id,
      idea: {},
      hasUpvoted: false,
      hasDownvoted: false,
    }
  }

  //This method is to print the idea on screen and will be recalled each time we'll update idea
  printIdea = () => {
    getOneIdea(this.state.ideaId)
    .then(res => {
      this.setState({ 
        idea: res.data.idea,
        upvotes: res.data.idea.upvotes,
        downvotes: res.data.idea.downvotes,
        user: null
      });
    })
    .catch(err => {
      console.log(err.response);
    });
  }

  componentDidMount(){
    this.printIdea();
    console.log("here i am in componentDidMount")
  }

  checkIfAlreadyUpvoted = (userId, idea) => {
    var upvotedUsers = idea.upvotedUsers
    if (!upvotedUsers) return false
    return upvotedUsers.includes(userId)
  }

  checkIfAlreadydownvoted = (userId, idea) => {
    var downvotedUsers = idea.downvotedUsers
    if (!downvotedUsers) return false
    return downvotedUsers.includes(userId)
  }

  handleUpvote = (evt) => {
    this.state.upvotes ? this.setState(prevState => {return {upvotes: prevState.upvotes +1}}) : this.setState({upvotes: 1})

    console.log(this.state.upvotes)
    
    updateOneIdea(this.state.ideaId, this.state)
    // .then(res => {
    //   this.printIdea();
    // })
    // .catch(err => {
    //   console.log(err.response);
    // });
  }

  render() {
    const {idea} = this.state;
    var user = null
    console.log("user: ", this.state.user)

    if (this.props.loggedUser) {
      user = this.props.loggedUser;}
    return(
      <React.Fragment>
        <h1>{idea.title}</h1>
        <h2>{idea.creator && idea.creator.name}</h2> {/* TODO : Populate creator in request */}

        <h3>Date</h3>
        <p>{idea.created_at}</p>

        <h3>Description</h3>
        <p>{idea.description}</p>

        <h3>Votes</h3>
        <p>Upvotes:{idea.upvotes}<button onClick={this.handleUpvote}>upvote!</button></p>
        <p>Downvotes:{idea.downvotes}<button onClick={this.handleDownvote}>downvote!</button></p>
        {/* TODO : button should be a component */}
        
        <h3>Tags</h3>
        {/* TODO : map the tags array and create tags */}
        
        <h3>Comments</h3>
        {/* TODO : map the comment array and create comments */}

        {/* <h3>Upvotes test</h3>
        {this.checkIfAlreadyUpvoted(user._id, idea) && <p>yes, i've upvoted!</p>}
        {!this.checkIfAlreadyUpvoted(user._id, idea) && <p>no, not upvoted.</p>} */}
      </React.Fragment>
    )
  }
}

export default IdeaPage