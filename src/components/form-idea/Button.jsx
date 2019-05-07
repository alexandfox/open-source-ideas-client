import React from 'react';

function Button(props){
  return(
    <button onClick={props.onClick}>{props.button_name}</button>
  )
}

export default Button