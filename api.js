const API_KEY = "ee68d518251174f25fc47831550de7e4";
const BASE_URL = "https://api.themoviedb.org/3/";

const GET = async (type = "movie", resource = "550") => {
  const res = await fetch(`${BASE_URL}${type}/${resource}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export { GET };

// https://api.themoviedb.org/3/genre/movie/list?api_key=ee68d518251174f25fc47831550de7e4
// GET /genre/movie/list  ->  per ottenere tutte le diverse categorie
