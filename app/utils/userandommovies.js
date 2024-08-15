import { useState, useEffect } from "react";
import { fetchMovieData } from "../api/movieapi"; 

export function useRandomMovies() {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMovies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY;

      try {
        const randomPage = Math.floor(Math.random() * 10) + 1;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${randomPage}`
        );
        const data = await response.json();
        const selectedMovies = await Promise.all(
          data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 10) // Change this number to fetch more or fewer movies
            .map(async (movie) => {
              const movieData = await fetchMovieData(movie.id);
              return `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;
            })
        );

        setBackgroundImages(selectedMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRandomMovies();
  }, []);

  return { backgroundImages, loading, error };
}
