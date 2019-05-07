import React, { Component } from 'react';
import { getOneIdea, updateOneIdea } from "../api/apiHandler";

class IdeaPage extends Component{
  constructor(props){
    super(props)
    this.state={
      ideaId: props.match.params.id, // Validate with data structure
      idea: {}
    }
  }

  componentDidMount(){
    getOneIdea(this.state.ideaId)
    .then(res => {
      this.setState({ idea: res.data.idea}); //Validate with data structure
      // console.log(this.state.idea);
    })
    .catch(err => {
      console.log(err.response);
    });
  }

  handleUpvote = () => {
    // Do we need a custom method in apiHandler to update just the upvotes or downvotes for this ?
    updateOneIdea(this.state.ideaId, this.state)
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
        <p>Downvotes:{idea.downvotes}<button onClick={this.handleUpvote}>downvote!</button></p>
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