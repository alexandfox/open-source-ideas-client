import React from 'react';
import {Link} from "react-router-dom";

function Page404(props){
  return(
    <h2>
      Hello {props.loggedUser ? props.loggedUser.name : "friend"}! Looks like you're lost.<br/>
      <Link to="/">Take me back to a safe place :)</Link>
    </h2>
  )
}

export default Page404