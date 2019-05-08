import React, { Component }  from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router-dom";
import NavMain from "./components/NavMain";

import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CreateIdea from "./pages/CreateIdea"
import IdeaPage from "./pages/IdeaPage"

class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      loggedIn: false,
      loggedUser: null
    };
  }

  getUser= (userObj) => {
    this.setState({
      loggedIn: true,
      loggedUser: userObj
    }, () => {
      console.log("User is logged in! state: ", this.state)
    })
  }

  render() {
    return (
      <div className="App">
        <NavMain loggedIn={this.state.loggedIn} />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <Signup getUser={this.getUser}/>} />
            <Route exact path="/login" render={() => (this.loggedIn ? (<Redirect to="/" />) : (<Login getUser={this.getUser}/>))} />
            <Route exact path="/create-idea" component={CreateIdea} />
            <Route path="/idea/:id" component={IdeaPage} loggedUser={this.state.loggedUser} exact />
          </Switch>
        </main>
      </div>
  )};
}

export default App;
