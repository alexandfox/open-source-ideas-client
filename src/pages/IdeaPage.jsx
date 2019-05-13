import React, { Component } from "react";
import { getOneIdea } from "../api/apiHandler";
import Moment from 'react-moment';
import UpvoteDownvote from "../components/UpvoteDownvote";
import { Link } from "react-router-dom";
import Comments from "./../components/Comments"

class IdeaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaId: props.match.params.id,
      idea: {},
    };
  }

  //This method is to print the idea on screen and will be recalled each time we'll update idea
  printIdea = () => {
    getOneIdea(this.state.ideaId)
      .then(res => {
        this.setState({
          idea: res.data.idea,
        });
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  componentDidMount() {
    this.printIdea();
  }

  render() {
    const { idea } = this.state;
    return (
      <React.Fragment>
        <h1>{idea.title}</h1>
        <h2>{idea.creator && idea.creator.name}</h2>
        {/* TODO : Populate creator in request */}

        <h3>Date</h3>
        <Moment date={idea.created_at} format="MMMM Do YYYY" />

        <h3>Description</h3>
        <p>{idea.description}</p>

        <h3>Votes</h3>
        <UpvoteDownvote ideaId={this.state.ideaId} loggedUser={this.props.loggedUser} />

        <h3>Tags</h3>

        <p>{idea.tags && idea.tags.map((tag, index) =>
          <span key={index}><Link to={`/search?tags=${tag}`}>{tag}</Link></span>

        )}</p>

        <Comments ideaObj={this.state.idea} {...this.props} />
        {/* TODO : map the comment array and create comments */}
      </React.Fragment>
    );
  }
}

export default IdeaPage;