import MovieCard from "./card";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
    const [movies,setMovies]=useState([]);
    const [searchQuery,setSearchQuery]=useState("");

    const handleSearch=()=>{
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d45997149e386fb1c844587424fd31bd&query=${searchQuery}`)
        .then((response)=>{
            setMovies(response.data.results);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return (
       <div className="container">
         <div className="container flex justify-between">
            <h1 className="text-2xl font-bold mt-8 text-white ">Movie App</h1>
        <div className=" flex justify-end items-center gap-2 mt-8">
            <input type="text" placeholder="Search" className="w-100 p-2 border border-gray-300 rounded text-white focus:outline-none focus:border-blue-500" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
            <button onClick={handleSearch} className="p-2 bg-slate-500 text-white rounded">Search</button>
        </div>
        </div>
        <div className="container grid grid-cols-4 gap-4">
            {movies.map((movie)=>(
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
       </div>
    )   
}