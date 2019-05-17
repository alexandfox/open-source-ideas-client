import React, { Component } from "react";
import { getOneIdea } from "../api/apiHandler";
import Moment from 'react-moment';
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
      <div className="ideaPageContainer">
        <section className="ideaTitleInfos">
          <p className="ideaPageCat">CATEGORY / <span className="ideaPageCatName">{idea.category}</span></p>
          <h1 className="ideaMainTitle">{idea.title}</h1>
          <div className="ideaCreatorInfos">
            <p className="ideaPageCreator">{idea.creator && idea.creator.name}</p>
            <Moment className="ideaPageDate" date={idea.created_at} format="MMMM Do YYYY"/>
          </div>
        </section>
        <section className="ideaInfos">
          <UpvoteTest orientation="horizontal" idea={idea} loggedUser={this.props.loggedUser} />
          <div className="ideaPageDescription">
            <p>{idea.description}</p>
          </div>
          <div className="ideaTags">
          <h3 className="ideaSecHeading">Tags</h3>
          <p>{idea.tags && idea.tags.map((tag, index) =>
            <span className="tagItem" key={index}><Link to={`/search?tags=${tag}`}>{tag}</Link></span>
          )}</p>
        </div>
        </section>
        
        <Comments ideaObj={this.state.idea} {...this.props} />
      </div>
    );
  }
}

export default IdeaPage;
