import React from 'react'
// npm i classnames

import classnames from 'classnames'

function InputGroup(props) {
  return (
    <div className="mb-3">
                <label for="Email" className="form-label">{props.label}</label>
                <input type={props.type} className={(classnames("form-control",{"is-invalid": props.errors}))} name={props.name} onChange={props.onChangeHandler} value={props.value}/>
                {
                  props.errors && (<div class="invalid-feedback">{props.errors}</div>)
                }
    </div>
  )
}

export default InputGroup