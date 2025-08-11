import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Details() {
    const {id}=useParams();
    const [movie,setMovie]=useState({});
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d45997149e386fb1c844587424fd31bd`)
        .then((response)=>{
            setMovie(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[id]);
    return (
        <>
        <div className="container bg-slate-900 min-h-screen py-10 px-4">
        <div className="max-w-3xl bg-slate-800 rounded-2xl shadow-lg overflow-hidden text-white p-6 ">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-300 mb-6">{movie.overview}</p>
      
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg shadow-md"
            />
      
            <div className="flex-1 space-y-3">
              <p className="text-lg">
                <span className="font-semibold text-gray-400">Release Date:</span> {movie.release_date}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-400">Rating:</span> ⭐ {movie.vote_average}
              </p>
      
              <button
                onClick={() => window.history.back()}
                className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-200"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        </div>
      </>
      
    )   
}