import axios from 'axios';

export async function fetchMovieData(movieId) {
  const apiKey = process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY;

  if (!movieId) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    return response.data; // Return the movie data
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    throw new Error('Failed to fetch movie data');
  }
}
