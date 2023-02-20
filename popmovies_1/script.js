import { GET } from "./api.js";
import {
  qS,
  qSA,
  cE,
  numbers,
  mainMovieCard,
  topRatedCardGen,
  movieCardGen,
} from "./utils.js";

const mainFilmEl = qS(".main_film");
const topRatedEl = qS(".top_rated");
const comedyEl = qS(".comedy");
const thrillerEl = qS(".thriller");
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
    const bests = topRatedEl.querySelectorAll(".movie_card");
    bests.forEach((item, index) => {
      const numberEl = cE("img");
      numberEl.src = numbers[index];
      numberEl.className = "number_card";
      item.insertBefore(numberEl, item.children[0]);
    });

    document.addEventListener("DOMContentLoaded", function () {
      // Imposta la larghezza del contenitore delle card
      let container = qS(".top_rated");

      // Aggiungi l'evento click per lo scroll a sinistra
      let scrollLeftBtn = qS(".scroll-left-btn");
      scrollLeftBtn.addEventListener("click", function () {
        container.scrollRight += 600;
      });

      // Aggiungi l'evento click per lo scroll a destra
      let scrollRightBtn = qS(".scroll-right-btn");
      scrollRightBtn.addEventListener("click", function () {
        container.scrollLeft += 600;
      });
    });
  })
  .catch((error) => console.error(error));
