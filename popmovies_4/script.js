import { GET } from "./api.js";
import { stickyHeader, changePage } from "./dom.js";
import {
  qS,
  qSA,
  cE,
  numbers,
  mainMovieCard,
  topRatedCardGen,
  numberFuntion,
  movieCardGen,
  scrollFunction,
} from "./utils.js";
import { getModal, getModalButton, overlayFunction } from "./modal.js";
import { searchFunction } from "./search.js";

const mainFilmEl = qS(".main_film");
const topRatedEl = qS(".top_rated");
const topRatedContainer = qS(".movie_container_topRated");
const comedyEl = qS(".comedy");
const comedyContainer = qS(".movie_container_comedy");
const thrillerEl = qS(".thriller");
const thrillerContainer = qS(".movie_container_thriller");
const horrorContainer = qS(".movie_container_horror");
const horrorEl = qS(".horror");
const popularContainer = qS(".movie_container_popular");
const popularEl = qS(".popular");

changePage();
stickyHeader();
overlayFunction();
// footerCreate();

function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

Promise.all([
  GET("movie", "popular"),
  GET("movie", "top_rated"),
  GET("movie", "popular"),
])
  .then((data) => {
    let item =
      data[0].results[Math.floor(Math.random() * data[0].results.length)];
    mainFilmEl.appendChild(mainMovieCard(item));
    data[1].results
      .slice(0, 10)
      .map((movie) => topRatedEl.append(topRatedCardGen(movie)));
    data[2].results.map((movie) => {
      if (movie.genre_ids.includes(35)) comedyEl.append(movieCardGen(movie));
      if (movie.genre_ids.includes(53)) thrillerEl.append(movieCardGen(movie));
      if (movie.genre_ids.includes(27)) horrorEl.append(movieCardGen(movie));
      popularEl.append(movieCardGen(movie));
    });
  })
  .then(() => {
    numberFuntion();
    scrollFunction(topRatedEl, topRatedContainer);
    scrollFunction(comedyEl, comedyContainer);
    scrollFunction(thrillerEl, thrillerContainer);
    scrollFunction(horrorEl, horrorContainer);
    scrollFunction(popularEl, popularContainer);
    getModal();
    getModalButton();
    searchFunction();
  })
  .catch((error) => console.error(error));
