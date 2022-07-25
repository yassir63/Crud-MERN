import React from 'react'

function Alert(props) {
  return (
    <div class="alert alert-success" role="alert" style={{display: props.show ? "block": "none" }}>
    {props.message}
  </div>
  )
}

export default Alert