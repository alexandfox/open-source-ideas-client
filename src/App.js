import React, { Component }  from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CreateIdea from "./pages/CreateIdea"

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
        <NavMain />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" render={() => <Signup getUser={this.getUser}/>} />
            <Route exact path="/login" render={() => <Login getUser={this.getUser}/>} />
            <Route exact path="/create-idea" component={CreateIdea} />
          </Switch>
        </main>
      </div>
  )};
}

export default App;
