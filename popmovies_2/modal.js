import { qS, qSA, cE } from "./utils.js";
import { GET } from "./api.js";

const modalOverlay = qS(".overlay");
const modalEl = qS(".modal");

const getModal = () => {
  const movieEls = qSA(".movie_card");
  movieEls.forEach((movie) =>
    movie.addEventListener("click", () =>
      GET("movie", movie.id).then((selectedMovie) => {
        modalEl.appendChild(modalGen(selectedMovie));
        modalEl.style.display = "flex";
      })
    )
  );
};

const modalGen = (data) => {
  const modalMovieEl = cE("div");
  const imgEl = cE("img");
  const wrapperTextEl = cE("div");
  const titleEl = cE("h2");
  const overviewEl = cE("p");
  const releaseDateEl = cE("p");
  const voteAverageEl = cE("p");
  const closeButton = cE("button");

  modalMovieEl.className = "movie-modal";
  imgEl.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  imgEl.alt = data.title;
  wrapperTextEl.className = "wrapper_text_el";
  titleEl.textContent = data.title;
  overviewEl.textContent = data.overview;
  releaseDateEl.textContent = data.release_date;
  voteAverageEl.textContent = data.vote_average;
  closeButton.textContent = "X";
  closeButton.className = "close_button";

  closeButton.addEventListener("click", () => {
    modalEl.style.display = "none";
    modalMovieEl.remove();
  });

  wrapperTextEl.append(titleEl, overviewEl, releaseDateEl, voteAverageEl);
  modalMovieEl.append(imgEl, wrapperTextEl, closeButton);
  return modalMovieEl;
};

const overlayFunction = () => {
  modalOverlay.addEventListener("click", () => {
    const modalMovieEl = qS(".movie-modal");

    modalEl.style.display = "none";
    modalMovieEl.remove();
  });
};

export { getModal, modalGen, overlayFunction };
