import React from 'react';

function Button(props){
  return(
    <button className={props.className} onClick={props.onClick}>{props.button_name}</button>
  )
}

export default Button