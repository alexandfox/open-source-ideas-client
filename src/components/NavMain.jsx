import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class NavMain extends Component {
  constructor(props){
    super(props)
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

  // handleNavLinkClick = () => {
  //   var expandingNav = document.querySelector(".expandingNav");
  //   expandingNav.classList.toggle("visibleNav");
  // }

  render(){
    return (
      <React.Fragment>
      <nav className="mainNav">
        <NavLink className="navLogo" onClick={this.activeBurger} activeClassName="is-active" to="/" exact>OpenSource&mdash;Ideas</NavLink>
        <div id="container" className="burgerMenu" onClick={this.activeBurger}>
          <div class="burgerItem bar1"></div>
          <div class="burgerItem bar2"></div>
          <div class="burgerItem bar3"></div>
        </div>
      </nav>
      <div className="expandingNav">
          {!this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to="/signup" exact>Signup</NavLink>}
          {!this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to="/login" exact>Login</NavLink>}
          <NavLink className="navLinkExpanded" onClick={this.activeBurger} to="/create-idea" >Share an Idea</NavLink>
          {this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to={`/@${this.props.loggedUser.name}`} exact>Profile</NavLink>}
          {this.props.loggedIn && <NavLink className="navLinkExpanded" onClick={this.activeBurger} activeClassName="is-active" to="/signout" exact>Logout</NavLink>}
      </div>
      </React.Fragment>
    )
  }
}

export default NavMain
