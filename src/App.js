import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import CreateIdea from "./pages/CreateIdea";
import IdeaPage from "./pages/IdeaPage";

function App() {
  return (
    <div className="App">
      {/* <h1>hello</h1> */}
      <NavMain />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/create-idea" component={CreateIdea} exact />
          <Route path="/idea/:id" component={IdeaPage} exact />
        </Switch>
      </main>
    </div>

  );
}

export default App;
