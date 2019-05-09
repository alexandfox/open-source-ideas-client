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
        downvotes: res.data.idea.downvotes
      });
    })
    .catch(err => {
      console.log(err.response);
    });
  }

  componentDidMount(){
    this.printIdea();
  }

  checkIfAlreadyUpvoted = (userId, ideaId, evt) => {
    // 1. Get clicked idea_id (evt.target.idea_id / this.state.ideaId)
    // 2. Get User_id 
    // 3. Check if ideaId is in user upvoted array. ((userId.upvoted.includes(ideaId))

  }

  checkIfAlreadydownvoted = (userId, ideaId, evt) => {
    // 1. Get clicked idea_id (evt.target.idea_id)
    // 2. Get User_id 
    // 3. Check if ideaId is in user downvoted array. ((userId.downvoted.includes(ideaId))
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

  render(){
    const {idea} = this.state;
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
      </React.Fragment>
    )
  }
}

export default IdeaPage