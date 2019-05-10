import React from "react"
import { NavLink, Route } from "react-router-dom";


function NavMain(props) {
  return (
    <nav id="main-nav">
      <NavLink className="navLink home" activeClassName="is-active" to="/" exact>Home</NavLink>

      {!props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to="/signup" exact>Signup</NavLink>}
      {!props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to="/login" exact>Login</NavLink>}

      <NavLink className="navLink" to="/create-idea" >Share an Idea</NavLink>
      {props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to={`/@${props.loggedUser.name}`} exact>Profile</NavLink>}

    </nav>
  )
}

export default NavMain