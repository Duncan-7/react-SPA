import React, { Component } from 'react'
import classes from './User.module.css'
import axios from 'axios'

class User extends Component {
  state = {
    user: this.props.user,
    fullUser: null,
    showAll: false
  }

  toggleShowAll = () => {
    axios.get('https://frozen-cliffs-92291.herokuapp.com/customers/' + this.state.user.guid, this.props.config)
      .then(response => {
        const user = response.data;

        this.setState((prevState) => {
          return {
            showAll: !prevState.showAll,
            fullUser: user
          }
        });
      })
  }

  render() {

    let fullUser = []
    if (this.state.showAll) {
      fullUser = Object.keys(this.state.fullUser)

      fullUser = fullUser.map(property => {
        if (property === "isActive") {
          return <tr key={property}><td className={classes.categories} >{property}</td><td>{this.state.fullUser[property] ? "Yes" : "No"}</td></tr>
        } else {
          return <tr key={property}><td className={classes.categories} >{property}</td><td>{this.state.fullUser[property]}</td></tr>
        }
      })
    }
    const table =
      <table>
        <tbody>
          {fullUser.slice(0, -2)}
        </tbody>
      </table>

    return (
      <div className={classes.User} >
        <p className={classes.expand} onClick={this.toggleShowAll}>{this.props.user.name}</p>
        {this.state.showAll ? table : null}
      </div >
    )
  }
}

export default User