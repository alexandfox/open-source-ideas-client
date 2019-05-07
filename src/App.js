import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import CreateIdea from "./pages/CreateIdea"

function App() {
  return (
    <div className="App">
      <NavMain />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/create-idea" component={CreateIdea} exact />
        </Switch>
      </main>
    </div>

  );
}

export default App;
