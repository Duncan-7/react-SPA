import React, { Component } from 'react'
import axios from 'axios'
import User from './User/User'
import Search from '../Search/Search'

class Users extends Component {
  state = {
    users: [],
    searchInput: "",
    config: {
      headers: {
        "Authorization": this.props.auth
      }
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    axios.get('https://frozen-cliffs-92291.herokuapp.com/customers', this.state.config)
      .then(response => {

        const users = response.data;
        users.sort((a, b) => (a.name.split(" ")[1] > b.name.split(" ")[1] ? 1 : -1))
        this.setState({ users: users })
      })
  }

  searchChangeHandler = (e) => {
    this.setState({ searchInput: e.target.value })
  }

  searchClickHandler = () => {
    if (this.state.searchInput.length > 0) {
      let searchURL = this.state.searchInput.split(" ").join("%20").toLowerCase();
      axios.get('https://frozen-cliffs-92291.herokuapp.com/customers/search/' + searchURL, this.state.config)
        .then(response => {
          const users = response.data;
          users.sort((a, b) => (a.name.split(" ")[1] > b.name.split(" ")[1] ? 1 : -1))
          this.setState({ users: users })
        })
    } else {
      this.getData()
    }

  }

  render() {
    const users = this.state.users.map(user => {
      return <User
        key={user.id}
        user={user}
        config={this.state.config}
      />
    })

    return (
      <div>
        <h1>User List</h1>
        <Search
          change={this.searchChangeHandler}
          search={this.searchClickHandler}
          value={this.state.searchInput}
        />
        <p>Click a username for full details</p>
        <button onClick={this.props.logout}>Log Out</button>
        {users}
      </div>
    )
  }
}

export default Users