import { qS, qSA, cE } from "./utils.js";
import { GET } from "./api.js";

const modalOverlay = qS(".overlay");
const modalEl = qS(".modal");
const API_KEY = "AIzaSyBbhGMRk2-ENtj9YbvGRzMYRwYU6_h3T9k";
let rating = 0;

function scrollToTop() {
  const scrollDuration = 400;
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  function animateScroll() {
    window.scrollBy(0, scrollStep);
    if (window.scrollY > 0) {
      window.requestAnimationFrame(animateScroll);
    }
  }
  animateScroll();
}

const youtubeSearch = (movieTitle, container) => {
  const searchQuery = movieTitle.replaceAll(" ", "+") + "+trailer+film+ita";
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${API_KEY}`
  )
    .then((response) => {
      if (response.status >= 400) {
        const youtubeIFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/watch?v=qEVUtrk8_B4" alt="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`;
        container.innerHTML = youtubeIFrame;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const youtubeIFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1&showinfo=0&controls=0" alt="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`;
      container.innerHTML = youtubeIFrame;
    });
};

const getModal = () => {
  const movieEls = qSA(".movie_card");

  movieEls.forEach((movie) =>
    movie.addEventListener("click", () =>
      GET("movie", movie.id).then((selectedMovie) => {
        scrollToTop();
        modalEl.appendChild(modalGen(selectedMovie));
        modalEl.style.display = "flex";
        modalEl.style.zIndex = "10";
      })
    )
  );
};

const getModalButton = () => {
  const buttonDetails = qS(".button_detail_main");
  const mainMovieEl = qS(".main_movie_card");
  buttonDetails.addEventListener("click", () =>
    GET("movie", mainMovieEl.id).then((selectedMovie) => {
      scrollToTop();
      modalEl.appendChild(modalGen(selectedMovie));
      modalEl.style.display = "flex";
      modalEl.style.zIndex = "10";
    })
  );
};

const modalGen = (data) => {
  const modalMovieEl = cE("div");
  const modalContainerVideo = cE("div");
  const modalMovieVideo = cE("div");
  const overlay = cE("div");
  const wrapperTextEl = cE("div");
  const titleEl = cE("h2");
  const buttonPlay = cE("button");
  const genresEl = cE("p");
  const releaseDateEl = cE("p");
  const overviewEl = cE("p");
  const voteAverageEl = cE("p");
  const closeButton = cE("button");

  modalMovieEl.className = "movie-modal";
  modalContainerVideo.className = "movie-container-video";
  modalMovieVideo.className = "movie-modal-video";
  buttonPlay.className = "button_modal";
  wrapperTextEl.className = "wrapper_text_el";
  overlay.className = "overlay_modal";

  titleEl.textContent = data.title;
  buttonPlay.textContent = "Watch now";
  genresEl.innerHTML = data.genres
    .map((item) => item.name)
    .join('<span class="separator"> • </span>');

  overviewEl.textContent = data.overview;
  releaseDateEl.textContent = data.release_date;

  voteAverageEl.className = "stars";
  rating = data.vote_average / 2;
  voteAverageEl.style = `--rating: ${rating}`;

  closeButton.textContent = "X";
  closeButton.className = "close_button";

  youtubeSearch(data.title, modalMovieVideo);

  closeButton.addEventListener("click", () => {
    modalEl.style.display = "none";
    modalMovieEl.remove();
  });
  modalContainerVideo.append(modalMovieVideo, overlay);
  wrapperTextEl.append(
    titleEl,
    buttonPlay,
    releaseDateEl,
    genresEl,
    overviewEl,
    voteAverageEl
  );
  modalMovieEl.append(modalContainerVideo, wrapperTextEl, closeButton);
  console.log(data);
  return modalMovieEl;
};

const overlayFunction = () => {
  modalOverlay.addEventListener("click", () => {
    const modalMovieEl = qS(".movie-modal");

    modalEl.style.display = "none";
    modalMovieEl.remove();
  });
};

export { getModal, modalGen, getModalButton, overlayFunction };
