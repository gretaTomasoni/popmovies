import {
  qS,
  qSA,
  cE,
  topRatedCardGen,
  movieCardGen,
  playFunction,
} from "./utils.js";
import { GET } from "./api.js";

const modalOverlay = qS(".overlay");
const modalEl = qS(".modal");
const API_KEY = "AIzaSyCprJ_YMJ9tl7_JiQV8FD1vtngxGPpckvk";
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
      if (response.status === 403) {
        const youtubeFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/watch?v=qEVUtrk8_B4" alt="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`;
        container.innerHTML = youtubeFrame;
      } else {
        return response.json();
      }
    })
    .then((data) => {
      const youtubeFrame = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${data.items[0].id.videoId}?autoplay=1&showinfo=0&controls=0" alt="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;" allowfullscreen></iframe>`;
      container.innerHTML = youtubeFrame;
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
        modalEl.style.zIndex = "1000";
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
  const similarContainer = cE("div");
  const similarMovies = cE("div");
  const titleSimilarEl = cE("p");
  const youtubeFrame = qS(".youtubeFrame");

  modalMovieEl.className = "movie-modal";
  modalContainerVideo.className = "movie-container-video";
  modalMovieVideo.className = "movie-modal-video";
  buttonPlay.className = "button_modal";
  wrapperTextEl.className = "wrapper_text_el";
  overlay.className = "overlay_modal";
  similarMovies.className = "similarMovies";
  titleSimilarEl.className = "titleSimilarEl";
  titleSimilarEl.textContent = "Not so popular but similar:";
  titleSimilarEl.style.margin = "0px 0px 20px 50px";
  titleSimilarEl.style.color = "#9aa8cd";

  titleEl.textContent = data.title;
  buttonPlay.textContent = "Watch now";
  buttonPlay.addEventListener("click", () => {
    playFunction();
    const modalMovieEl = qS(".movie-modal");

    modalEl.style.display = "none";
    modalMovieEl.remove();
  });

  genresEl.innerHTML = `<span class="separator"> Genres: </span> ${data.genres
    .map((item) => item.name)
    .join('<span class="separator"> • </span>')}`;

  overviewEl.textContent = data.overview;
  releaseDateEl.innerHTML = `<span class="separator"> Release date: </span> ${data.release_date}`;

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

  fetch(
    `https://api.themoviedb.org/3/movie/${data.id}/similar?api_key=ee68d518251174f25fc47831550de7e4`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => similarMovies.append(topRatedCardGen(movie)));
      if (similarMovies.hasChildNodes())
        similarContainer.append(titleSimilarEl, similarMovies);
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

  modalMovieEl.append(
    modalContainerVideo,
    wrapperTextEl,
    similarContainer,
    closeButton
  );
  return modalMovieEl;
};

const overlayFunction = () => {
  modalOverlay.addEventListener("click", () => {
    const modalMovieEl = qS(".movie-modal");

    modalEl.style.display = "none";
    modalMovieEl.remove();
  });
};

// const playFunction = (modalEl) => {
//   const playModal = document.createElement("div");
//   playModal.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/LW2x7w3DkzA?autoplay=1&showinfo=0&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//   playModal.className = "full-movie-modal";

//   const movieOverlay = document.createElement("div");
//   movieOverlay.className = "full-movie-overlay";

//   const movieOverlayBottom = document.createElement("div");
//   movieOverlayBottom.className = "full-movie-overlay-bottom";

//   const closeBtn = document.createElement("button");
//   closeBtn.className = "close_button";
//   closeBtn.textContent = "X";
//   movieOverlay.appendChild(closeBtn);

//   closeBtn.addEventListener("click", () => {
//     playModal.innerHTML = "";
//     playModal.classList.remove("show");
//     const modalMovieEl = qS(".movie-modal");

//     modalEl.style.display = "none";
//     modalMovieEl.remove();
//   });

//   playModal.appendChild(movieOverlay);
//   playModal.appendChild(movieOverlayBottom);
//   document.body.appendChild(playModal);
//   playModal.classList.add("show");

//   setTimeout(() => {
//     playModal.innerHTML = "";
//     playModal.classList.remove("show");
//   }, 25000);
// };

export { getModal, modalGen, getModalButton, overlayFunction };
