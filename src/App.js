import React, { Component } from 'react';
import './styles/scss/main.scss';
import { Switch, Route, Redirect } from "react-router-dom";
import NavMain from "./components/NavMain";
import AuthService from './api/auth-service';

// import { ModalContainer, ModalRoute } from 'react-router-modal';
// import { BrowserRouter, Link } from 'react-router-dom';
// import 'react-router-modal/css/react-router-modal.css';


import Home from "./pages/Home"
import Signup from "./pages/Signup"
import CreateIdea from "./pages/CreateIdea"
import IdeaPage from "./pages/IdeaPage"
import UserProfile from "./pages/UserProfile"
import SearchResults from "./pages/SearchResults"
import EditProfile from "./pages/EditProfile"
import ProfileArchives from "./pages/ProfileArchives"
import Page404 from "./pages/Page404"

import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faTwitter, faProductHunt } from '@fortawesome/free-brands-svg-icons'
import { faPoo, faHeart, faMapMarkerAlt, faSearch, faComment, faTrophy} from '@fortawesome/free-solid-svg-icons'
library.add(faPoo, faHeart, faMapMarkerAlt, faLinkedin, faProductHunt, faTwitter, faSearch, faTrophy, faComment)


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      loggedUser: null,
      archivedIdeas: [],
    };
    this.service = new AuthService();
  }

  fetchUser = () => {
    if( this.state.loggedUser === null ){
      this.service.loggedin()
        .then(response =>{
          this.setState({
            loggedIn: true,
            loggedUser:  response
          }, console.log("fetched user: ", response)) 
        })
        .catch( err =>{
          this.setState({
            loggedUser:  null
          }) 
        })
    }
    // console.log("fetch called.")
  }

  getUser = (userObj) => {
    this.setState({
      loggedIn: this.state.loggedIn ? false : true,
      loggedUser: userObj,
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.loggedUser !== prevProps.loggedUser) {
  //     this.setState({
  //       hello: "hi",
  //     })
  //   }
  // }

  render() {
    this.fetchUser()
    return (
      <div className="App">
      <NavMain {...this.state} getUser={this.getUser} />
        <main id="main">
          <Switch>
            <Route exact path="/" render={(props) => <Home loggedUser={this.state.loggedUser} {...props} />} />
            
            <Route path="/search" render={(props) => <SearchResults loggedUser={this.state.loggedUser} {...props} />} />

            <Route exact path="/signup" render={() => <Signup getUser={this.getUser} />} />

            <Route exact path="/@:name" render={(props) => <UserProfile loggedUser={this.state.loggedUser} {...props} />} />
            <Route exact path="/@:name/edit" render={(props) => <EditProfile loggedUser={this.state.loggedUser} {...props} />} />
            <Route exact path="/@:name/archive" render={(props) => <ProfileArchives loggedUser={this.state.loggedUser} {...props} />} />

            <Route exact path="/create-idea/" render={(props) => (this.state.loggedIn ? (<CreateIdea loggedUser={this.state.loggedUser} {...props} updateApp={this.fetchUser} />) : (<Signup getUser={this.getUser} />))} />

            <Route exact path="/create-idea/:id" render={(props) => <CreateIdea loggedUser={this.state.loggedUser} {...props} />} />
            <Route exact path="/idea/:id" render={(props) => <IdeaPage loggedUser={this.state.loggedUser} {...props} />} />
            <Route path="/*" render={() => <Page404 loggedUser={this.state.loggedUser} />} />
          </Switch>
        </main>
      </div>
    )
  };
}

export default App;
