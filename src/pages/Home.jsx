import React from "react"
import Search from "../components/SearchBar"
import {NavLink} from "react-router-dom"

function Home() {
  return (
    <div id="home-container">
      <h1>Hello this is the home</h1>
      <Search />
      <NavLink to="/idea/5cd2ce4fad6d8b6de05f87d1">Test purpose idea</NavLink>
    </div>
  )
}

export default Home