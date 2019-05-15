import React, { Component } from "react";
import { getOneIdea } from "../api/apiHandler";
import Moment from 'react-moment';
import UpvoteDownvote from "../components/UpvoteDownvote";
import { Link } from "react-router-dom";
import Comments from "./../components/Comments"
import UpvoteTest from "../components/UpvoteTest"


class IdeaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ideaId: props.match.params.id,
      idea: {},
    };
  }

  async componentDidMount() {
    var thisIdea = await getOneIdea(this.props.match.params.id)
    thisIdea = thisIdea.data.idea
    this.setState({
      idea: thisIdea
    })
  }

  render() {
    const { idea } = this.state;
    console.log("state: ", this.state)
    return (
      <React.Fragment>
        <h1>{idea.title}</h1>
        <h2>Creator: {idea.creator && idea.creator.name}</h2>

        <h3>Category</h3>
        <p>{idea.category}</p>

        <h3>Date</h3>
        <Moment date={idea.created_at} format="MMMM Do YYYY" />

        <h3>Description</h3>
        <p>{idea.description}</p>

        <h3>Votes</h3>
        {/* <UpvoteDownvote ideaId={this.state.ideaId} loggedUser={this.props.loggedUser} /> */}
        <UpvoteTest idea={idea} loggedUser={this.props.loggedUser} />
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
