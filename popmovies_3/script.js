import { GET } from "./api.js";
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
import {
  getModal,
  modalGen,
  getModalButton,
  overlayFunction,
} from "./modal.js";
import { searchFunction } from "./search.js";

const mainFilmEl = qS(".main_film");
const topRatedEl = qS(".top_rated");
const topRatedContainer = qS(".top_rated_container");
const comedyEl = qS(".comedy");
const comedyContainer = qS(".comedycontainer");
const thrillerEl = qS(".thriller");
const thrillerContainer = qS(".thriller_container");
const horrorContainer = qS(".horror_container");
const horrorEl = qS(".horror");

//* scroll sticky header
var lastScrollTop = 0;
let projectContainer = document.querySelector(".main");

window.addEventListener(
  "scroll",
  function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      // downscroll code
      document.getElementById("header").classList.add("sticky-header");
    } else {
      // upscroll code
      document.getElementById("header").classList.remove("sticky-header");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

Promise.all([
  GET("movie", "popular"),
  GET("movie", "top_rated"),
  GET("movie", "popular"),
])
  .then((data) => {
    data[0].results
      .slice(0, 1)
      .map((movie, index) => mainFilmEl.appendChild(mainMovieCard(movie)));
    data[1].results
      .slice(0, 10)
      .map((movie) => topRatedEl.append(topRatedCardGen(movie)));
    data[2].results.map((movie) => {
      if (movie.genre_ids.includes(35)) comedyEl.append(movieCardGen(movie));
      if (movie.genre_ids.includes(53)) thrillerEl.append(movieCardGen(movie));
      if (movie.genre_ids.includes(27)) horrorEl.append(movieCardGen(movie));
    });
  })
  .then(() => {
    numberFuntion();
    scrollFunction(topRatedEl, topRatedContainer);
    // scrollFunction(comedyEl, comedyContainer);
    scrollFunction(thrillerEl, thrillerContainer);
    scrollFunction(horrorEl, horrorContainer);
    getModal();
    getModalButton();
    searchFunction();
  })
  .catch((error) => console.error(error));

overlayFunction();
