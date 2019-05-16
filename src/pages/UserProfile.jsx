import React, { Component } from "react"
import IdeaItem from "../components/IdeaListItem"
import { getUserByName, getOneIdea, updateAvatar } from "../api/apiHandler";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faMapMarkerAlt, faHeart } from '@fortawesome/free-solid-svg-icons'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      edit: false,
      user_name: this.props.match.params.name,
      user_page: {},
      current_user: this.setLoggedUser(),
      isMyProfile: this.setMyProfile(),
      upvoted_ideas: [],
      myIdeas: [],
      draft_ideas: [],
      public_ideas: [],
      avatar: null,
      archived_ideas: [],
    }
    this.fileInput = React.createRef();
  }
  // see if current user (browsing) is the user 
  setLoggedUser() {
    return this.props.loggedUser ? this.props.loggedUser : {}
  }

  setMyProfile() {
    if (this.props.loggedUser) return this.props.loggedUser.name === this.props.match.params.name ? true : false;
    return false
  }

  getUserPage() {
    getUserByName(this.props.match.params.name)
      .then(res => {
        // console.log("in getUserPage; res: ", res)
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  addIdeaFromId(id, array) {
    getOneIdea(id)
      .then(res => {
        array.push(res.data.idea);
        this.setState({ hi: "hi" });
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  editProfile = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true,
      edit: true,
    })
    // return <Redirect to={`/@${this.props.loggedUser.name}/edit`}/>
  }

  // add avatar feature 
  fileSelectedHandler = (e) => {
    console.log(e.target.files[0])
    this.setState({
      avatar: e.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const formData = new FormData()
    console.log(this.state.avatar)
    formData.append(this.state.current_user._id ,this.state.avatar)
    console.log(formData)
    updateAvatar(formData)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  buttonAvatarUpload = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.fileInput.current.click();
  }

  async componentDidMount() {
    var user_page = await getUserByName(this.state.user_name)
    user_page = user_page.data

    var upvoted_ideas = []
    user_page.upvotedIdeas.forEach(id => {
      this.addIdeaFromId(id, upvoted_ideas)
    })

    var myIdeas = user_page.myIdeas

    this.setState({
      user_page,
      upvoted_ideas : upvoted_ideas,
      myIdeas : myIdeas,
      draft_ideas : myIdeas.filter( idea => !idea.isPublic ),
      public_ideas : myIdeas.filter( idea => (idea.isPublic && !idea.isArchived)),
      archived_ideas : myIdeas.filter(idea => idea.isArchived),
    })
  }

  async removeDeletedDrafts(e) {
    // triggers a setState to refresh for the deleted
    var user_page = await getUserByName(this.state.user_name)
    var myIdeas = user_page.data.myIdeas

    this.setState({
      myIdeas : myIdeas,
      draft_ideas : myIdeas.filter( idea => !idea.isPublic ),
      public_ideas : myIdeas.filter( idea => (idea.isPublic && !idea.isArchived)),
    })
  }

  render() {
    // console.log("user profile state: ", this.state)
    console.log("user profile props: ", this.props)
    var page = this.state.user_page

    if (this.state.redirect && this.state.edit) { return <Redirect to={`/@${this.props.loggedUser.name}/edit`} /> }

    return (
      <div id="profileContainer">
        <div className="userProfile childContainer">
          {/* user informations container start */}
          <section className="userInfosContainer">
            <div className="userInfos">
              {page.social && page.social.contact_name && <h2 className="titleName">{page.social.contact_name}</h2>}
              <h4 className="userName">@{this.state.user_name}</h4>
              {page.bio && <p className="userBio">{page.bio}</p>}
              {page.social &&
                <div id="userSubInfos">
                  <div className="links">
                    {page.social.twitter &&
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://twitter.com/${page.social.twitter}`}
                        className="socialLink">
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="profileIcon social" />
                      </a>}
                    {page.social.linkedIn &&
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.linkedin.com/in/${page.social.linkedIn}`}
                        className="socialLink">
                        <FontAwesomeIcon icon={['fab', 'linkedin']} className="profileIcon social" />
                      </a>}
                    {page.social.productHunt &&
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.producthunt.com/@${page.social.productHunt}`}
                        className="socialLink">
                        <FontAwesomeIcon icon={['fab', 'product-hunt']} className="profileIcon social" />
                      </a>}
                    {page.location &&
                      <div className="locationContainer">
                        <FontAwesomeIcon icon="map-marker-alt" className="locationIcon" />
                        <span className="locationText">{page.location}</span>
                      </div>}
                    {page.social.website &&
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={page.social.website}
                        className="socialLink">{page.social.website}
                      </a>}
                  </div>
                </div>
              }
              {this.state.isMyProfile &&
                <button className="outlineButton" onClick={this.editProfile}>Edit infos</button>}
            </div>

            <div className="avatar">
              <img src={this.state.avatar} alt="avatar" className="img" />
              {this.state.isMyProfile &&
                <div>
                  <input type="file" onChange={this.fileSelectedHandler} ref={this.fileInput} className="uploadInput" />
                  <button className="outlineButton" onClick={this.buttonAvatarUpload}>Pick file</button>
                  <button className="outlineButton" onClick={this.fileUploadHandler}>Upload</button>
                </div>
              }
            </div>

          </section>
          {/* user informations container end */}
          {/* {!this.state.isMyProfile && <p>this is not my profile</p>} */}

          <section>
            {this.state.isMyProfile && (
              <div id="draftIdeas">
                <h3 className="profileHeader smallCapTitle">DRAFTS</h3>
                {this.state.draft_ideas && this.state.draft_ideas.length > 0 ? <div className="draftsContainer">
                  {this.state.draft_ideas.map((idea, index) => (
                    <IdeaItem key={index} {...idea} loggedUser={this.props.loggedUser} onDelete={(e) => this.removeDeletedDrafts(e)} />
                  ))}
                </div>
                  : <p>nothing in progress... share an idea!</p>}
              </div>)

            }
          </section>
          {/* show "Shared Ideas", on public or private */}


          <section>
            {this.state.public_ideas && this.state.public_ideas.length > 0 &&
              (<div id="shared-ideas">
                <h3 className="profileHeader smallCapTitle">SHARED IDEAS</h3>
                <div className="myIdeasContainer">
                  {this.state.public_ideas.map((idea, index) => (
                    <IdeaItem key={index} {...idea} loggedUser={this.props.loggedUser} onDelete={(e) => this.removeDeletedDrafts(e)} />
                  ))}
                </div>
              </div>
              )}
          </section>
          <section>
            {this.state.isMyProfile && this.state.public_ideas && this.state.public_ideas.length === 0 && (
              <div id="shared-ideas">
                <h3 className="profileHeader smallCapTitle">SHARED IDEAS</h3>
                <p>nothing shared yet... share an idea!</p>
              </div>
            )}
          </section>


          <section>
            <h3 className="smallCapTitle">UPVOTES</h3>
            {page.upvotedIdeas && page.upvotedIdeas.length > 0 ?
              <div id="">
                {this.state.upvoted_ideas.map((idea, index) => (
                  <IdeaItem key={index} {...idea} loggedUser={this.props.loggedUser} />
                ))}
              </div> : <p>no upvoted ideas yet... browse some!</p>
            }
          </section>
        {this.props.loggedUser && <Link to={{
        pathname : `/@${this.props.loggedUser.name}/archive`,
        archives : this.state.archived_ideas,
        loggedUser : this.state.current_user,
      }}>Archived Ideas</Link>}
        </div>
        {/* show upvoted ideas */}

      </div>
    )
  }
}

export default Home