import React, { useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import {useState} from 'react';
import Moviecard from './components/Moviecard';
import { useDebounce } from 'react-use';

const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie"
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method:"GET",
    headers:{
      accept:'application/json',
      Authorization:`Bearer ${API_KEY}`
    }
}

export default function App(){
  const [searchTerm,setsearchTerm] = useState('');
  const [errorMessage,seterrorMessage] = useState('');
  const [movieList,setmovieList] = useState([]);
  const [isLoading,setisLoading] = useState(false);
  const [debouncedsearchTerm,setdebouncedsearchTerm] = useState('');
  useDebounce(()=>setdebouncedsearchTerm(searchTerm),500,[searchTerm])
  const fetchMovies = async(query='')=>{
    setisLoading(true);
    seterrorMessage('');
    try{
      const endpoint = query? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`:
      `${API_BASE_URL}?sort_by=popularity.desc`;
      const response = await fetch(endpoint,API_OPTIONS);
     // alert(response);
     if(!response.ok){
       throw new Error(`Error fetching movies: ${response.status}`)
     }
     const data = await response.json();
     console.log(data)
     if (data.response===false){
      throw new Error(data.message)
      setmovieList([])
      return;
     }
     setmovieList(data.results)

    }catch(e){
      seterrorMessage(`Error fetching movies: ${e}`)
      console.log(`Error fetching movies: ${e}`)
    }finally{
      setisLoading(false);
    }
  }
  useEffect(()=>{
    if(debouncedsearchTerm){
      fetchMovies(debouncedsearchTerm);
    }
    else{
      fetchMovies();
    }

  },[debouncedsearchTerm])
  


  return(
    <main>
    <div className="pattern"></div>
    <div className="wrapper">
      <header className="relative h-1/2 flex flex-col items-center justify-center">
      {!searchTerm &&(
        <>
        <img src="./hero-img.png" alt="hero-banner" className="h-72 w-auto mb-2"/>
      <h1><span className="text-gradient">iGUDDA</span>.com</h1>
      </>
      )}
      <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
      <h1 className="text-white-base">{searchTerm}</h1>
      </header>
      <section className="allMovies">
        <h2 className="mt-[40px]">All Movies.</h2>
        {errorMessage && <p className="text-red">{errorMessage}</p>}
        {isLoading?(
          <Spinner/>
        )
        :errorMessage?(<p className="text-red">{errorMessage}</p>)
        :(<ul className ="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {movieList.map((movie)=>(
            <Moviecard key={movie.id} movie={movie}/>
          ))}
          
        </ul>)}
      </section>
    </div>
    </main>
  )
}