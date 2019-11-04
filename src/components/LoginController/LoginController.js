import React, { Component } from 'react'
import LoginForm from './LoginForm/LoginForm'
import Users from '../Users/Users'
import axios from 'axios'

class LoginController extends Component {
  state = {
    authToken: "",
    loggedIn: false,
    username: "",
    password: "",
    error: ""
  }

  usernameChangeHandler = (e) => {
    this.setState({ username: e.target.value })
  }

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value })
  }

  loginClickHandler = () => {
    const loginDetails = {
      name: this.state.username,
      password: this.state.password
    }
    axios.post('https://frozen-cliffs-92291.herokuapp.com/login', loginDetails)
      .then(response => {
        if (response.status === 200) {
          this.setState({ authToken: response.data.auth_token, loggedIn: true })
        }

      })
      .catch(error => {
        this.setState({ error: "Username or password incorrect" })
      })
  }

  logoutClickHandler = () => {
    this.setState({
      authToken: "",
      loggedIn: false,
      error: ""
    })

  }

  render() {

    let content
    if (this.state.loggedIn) {
      content = <Users auth={this.state.authToken} logout={this.logoutClickHandler} />
    } else {
      content = <LoginForm
        usernameChange={this.usernameChangeHandler}
        passwordChange={this.passwordChangeHandler}
        click={this.loginClickHandler}
        error={this.state.error} />;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default LoginController 