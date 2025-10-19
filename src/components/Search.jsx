import React from 'react'

function Search(props) {
  return (
    <div className="search">
        <div>
            <img src="./search.svg" alt="search"/>
            <input
            type="text"
            placeholder="Search from thousands of movies...."
            value = {props.searchTerm}
            onChange={(event)=>props.setsearchTerm(event.target.value)}
            />
        </div>
    </div>
  )
}

export default Search