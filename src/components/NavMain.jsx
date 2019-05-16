import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import AuthService from '../api/auth-service';

class NavMain extends Component {
  constructor(props){
    super(props);
    this.service = new AuthService();
  }

  activeBurger = () => {
    var bar1, bar2, bar3, expandingNav, mainNav;
    bar1 = document.querySelector(".bar1");
    bar3 = document.querySelector(".bar3");
    bar2 = document.querySelector(".bar2");
    expandingNav = document.querySelector(".expandingNav");
    mainNav = document.querySelector(".mainNav");
    bar1.classList.toggle("croix");
    bar3.classList.toggle("croix");
    bar2.classList.toggle("croix");
    expandingNav.classList.toggle("visibleNav");
    mainNav.classList.toggle("noBorderBottom");
  }

  logoutUser = () =>{
    this.activeBurger();
    this.service.logout()
    .then(() => {
      // this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    }, this.props.history.push(`/`))
  }

  render(){
    return (
      <React.Fragment>
      <nav className="mainNav">
        <NavLink className="navLogo" onClick={this.activeBurger} activeClassName="is-active" to="/" exact>OpenSource&mdash;Ideas</NavLink>
        <div id="container" className="burgerMenu" onClick={this.activeBurger}>
          <div className="burgerItem bar1"></div>
          <div className="burgerItem bar2"></div>
          <div className="burgerItem bar3"></div>
        </div>
      </nav>
      <div className="expandingNav">
          {!this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to="/signup" exact>Signup</NavLink>}
          {!this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to="/login" exact>Login</NavLink>}
          <NavLink className="navLinkExpanded" onClick={this.activeBurger} to="/create-idea" >Share an Idea</NavLink>
          {this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to={`/@${this.props.loggedUser.name}`} exact>Profile</NavLink>}
          {this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.logoutUser} activeClassName="is-active" to={{
            pathname : "/",
            logout : true,}} 
            exact>Logout</NavLink>}
      </div>
      </React.Fragment>
    )
  }
}

export default NavMain
