import React, {Component} from "react"
import FormCreateIdea from "../components/form-idea/FormCreateIdea"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CreateIdea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      category: "",
      creator_name: props.loggedUser ? props.loggedUser.name : "",
    }
  }

  updatePreview = (input) => {
    this.setState(input)
  }

  render() {
  return (
    <div className="creat-idea-page">
      <div className="create-Heading">
        <h1>have something great to share with the world?</h1>
        <h4>make it happen!</h4>
      </div>
      <div className="create-content">
        <FormCreateIdea {...this.props} updatePreview={this.updatePreview} sendToParent={this.props.updateApp} />
      <div className="ideaPreview">
        <div className="publicItem">
          <div className="publicItemInfos">
              <div className="publicItemInfosPrimary">
                <p className="publicItemCat">CATEGORY / <span className="publicItemCatName">{this.state.category}</span></p>
                <h2 className="publicItemTitle">{this.state.title.length > 35 ? this.state.title.slice(0,35)+"[...]" : this.state.title}</h2>
                <div className="publicItemDescription">{this.state.description.length > 75 ? this.state.description.slice(0,75)+" [...]" : this.state.description }</div>
              </div>
              <div className="publicItemInfosSecondary">
                <div>
                  <p className="publicItemCreator">{this.state.creator_name}</p>
                </div>
                <div className="publicItemInfosSecondaryRight">
                  <FontAwesomeIcon icon="comment" className="publicItemCommentIcon"/>
                  <p className="publicItemCommentsCount">4</p>
                </div>
              </div>
            </div>
            <div className="publicItemUpvote">
              {/* <UpvoteTest loggedUser={this.props.loggedUser} /> */}
            </div>
          </div>
      </div>
      </div>
    </div>
  )}
}

export default CreateIdea