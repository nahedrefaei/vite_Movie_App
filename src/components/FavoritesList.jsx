import React, { useState, useEffect } from "react";
import { useFavorites } from "./contexts/FavoritesContext";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function FavoritesList() {
  const { favorites } = useFavorites(); // this should store IDs
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState([]);
  const [movie, setMovie] = useState({});

  // Fetch details for all favorite IDs
  useEffect(() => {
    const fetchAllFavorites = async () => {
      try {
        const requests = favorites.map((favId) =>
          axios.get(
            `https://api.themoviedb.org/3/movie/${favId}?api_key=d45997149e386fb1c844587424fd31bd`
          )
        );
        const responses = await Promise.all(requests);
        setMovieDetails(responses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    if (favorites.length > 0) {
      fetchAllFavorites();
    }
  }, [favorites]);

  // Fetch single movie details if `id` is in URL
  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=d45997149e386fb1c844587424fd31bd`
      )
      .then((res) => setMovie(res.data))
      .catch((err) => console.error("Error fetching movie:", err));
  }, [id]);

  if (favorites.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No favorites yet! Add some movies.
      </p>
    );
  }
  localStorage.getItem("favorites");
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Favorite Movies
      </h2>

      {/* Grid of favorite movies */}
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movieDetails.map((fav) => (
          <Link
            key={fav.id}
            to={`/favorites/${fav.id}`}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${fav.poster_path}`}
              alt={fav.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-3">
              <h3 className="text-lg font-semibold truncate">{fav.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {fav.overview}
              </p>
            </div>
          </Link>
        ))}
      </div>

   
    </div>
  );
}
