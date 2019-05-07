import React from "react"
import { NavLink } from "react-router-dom";


function NavMain() {
  return (
    <nav>
      <NavLink className="link home" activeClassName="is-active" to="/" exact>
        Home
      </NavLink>
      {/* <NavLink className="link home" activeClassName="is-active" to="/login" exact>
        Login
      </NavLink> */}
      <NavLink  to="/create-idea" >
        Share an Idea
      </NavLink>
    </nav>
  )
}

export default NavMain