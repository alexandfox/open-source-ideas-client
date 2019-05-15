import React from "react"
import { NavLink } from "react-router-dom";

function NavMain(props) {
  return (
    <React.Fragment>
    <nav className="mainNav">

      <NavLink className="navLink home" activeClassName="is-active" to="/" exact>OpenSource&mdash;Ideas</NavLink>

      {!props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to="/signup" exact>Signup</NavLink>}
      {!props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to="/login" exact>Login</NavLink>}

      <NavLink className="navLink" to="/create-idea" >Share an Idea</NavLink>
      {props.loggedIn && <NavLink className="navLink" activeClassName="is-active" to={`/@${props.loggedUser.name}`} exact>Profile</NavLink>}

    </nav>
    <div className="expandingNav">
      
    </div>
    </React.Fragment>
  )
}

export default NavMain