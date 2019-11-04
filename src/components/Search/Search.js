import React from 'react'

const Search = (props) => (
  <div>
    <input type="text" onChange={props.change} value={props.value} />
    <button onClick={props.search}>Search</button>
  </div>
)


export default Search