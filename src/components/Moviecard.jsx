import React from 'react'

function Moviecard(props) {
  return (
    <div className="movie-card">
        <img 
            src=
            {props.movie.poster_path?`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`: `./No-Poster.png`} 
            alt={props.movie.title}
        />
        <div className="mt-4">
            <h3 className="text-white">
                {props.movie.title}
            </h3>
            <div className="content">
                <div className="rating">
                    <img src="./star.png" alt="star"/>
                    <p>{props.movie.vote_average?props.movie.vote_average.toFixed(1):'N/A'}</p>
                </div>
                <span>•</span>
                <p>{props.movie.original_language}</p>
                <span>•</span>
                <p>{props.movie.release_date?props.movie.release_date.split("-")[0]:'N/A'}</p>
                

            </div>
        </div>
        
    </div>
  )
}

export default Moviecard