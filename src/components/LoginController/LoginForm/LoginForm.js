import React from 'react'
import classes from './LoginForm.module.css'

const LoginForm = (props) => {
  const error = <p className={classes.Error}>{props.error}</p>

  return (
    <div>
      <h1>Log In</h1>
      <div className={classes.Form}>
        <p>Please login to view customer data</p>

        <label>Username
          <input type="text" onChange={props.usernameChange} />
        </label>
        <label>Password
          <input type="password" onChange={props.passwordChange} />
        </label>
        {props.error == "" ? null : error}

        <button onClick={props.click}>Login</button>
      </div>


    </div>
  )
}

export default LoginForm