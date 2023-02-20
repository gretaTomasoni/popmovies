import { GET } from "./api.js";
import {
  qS,
  qSA,
  cE,
  mainMovieCard,
  topRatedCardGen,
  movieCardGen,
} from "./utils.js";

const mainFilmEl = qS(".main_film");
const topRatedEl = qS(".top_rated");
const comedyEl = qS(".comedy");
const thrillerEl = qS(".thriller");
const horrorEl = qS(".horror");

const numbers = [
  "./img/1.png",
  "./img/2.png",
  "./img/3.png",
  "./img/4.png",
  "./img/5.png",
  "./img/6.png",
  "./img/7.png",
  "./img/8.png",
  "./img/9.png",
  "./img/10.png",
];

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
    const bests = topRatedEl.querySelectorAll(".movie_card");
    bests.forEach((item, index) => {
      const numberEl = cE("img");
      numberEl.src = numbers[index];
      numberEl.className = "number_card";
      item.insertBefore(numberEl, item.children[0]);
    });
  })
  .catch((error) => console.error(error));
