import axios from 'axios';

export async function searchMovies(query) {
  const apiKey = process.env.NEXT_PUBLIC_THEMOVIEDB_API_KEY;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    if (response.data.results.length === 0) {
      throw new Error('No movies found');
    }

    const topResult = response.data.results[0]; // Get the top search result
    return topResult;
  } catch (error) {
    console.error('Failed to search movies:', error);
    throw new Error('Failed to search movies');
  }
}

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

export async function retrieveDocument(query) {
  try {
    // Search for the most relevant movie
    const movie = await searchMovies(query);

    // Fetch detailed movie data using the movie ID
    const movieData = await fetchMovieData(movie.id);

    return {
      title: movieData.title,
      content: `Title: ${movieData.title}\nOverview: ${movieData.overview}\nRelease Date: ${movieData.release_date}`,
    };
  } catch (error) {
    console.error('Error in retrieveDocument:', error);
    throw new Error('Failed to retrieve document');
  }
}
