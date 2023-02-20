const qS = (type) => document.querySelector(type);
const qSA = (type) => document.querySelectorAll(type);
const cE = (element) => document.createElement(element);

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

const mainMovieCard = (data) => {
  const mainCardEl = cE("div");
  const mainImgEl = cE("img");
  const overlayEl = cE("div");
  const mainDetails = cE("div");
  const titleEl = cE("h2");
  const voteAverageEl = cE("div");
  const buttonMainEl = cE("div");
  const buttonWatch = cE("button");
  const buttonDetails = cE("button");
  const overviewEl = cE("p");
  let rating = 0;

  mainCardEl.setAttribute("id", data.id);
  mainCardEl.className = "main_movie_card";

  if (data.backdrop_path) {
    mainImgEl.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/original/${data.backdrop_path}`
    );
  } else {
    mainImgEl.setAttribute(
      "src",
      "https://troianiortodonzia.it/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
    );
  }
  mainImgEl.setAttribute("alt", data.title);

  overlayEl.className = "overlay_card";
  mainDetails.className = "main_detail";

  titleEl.className = "title_card";
  titleEl.textContent = data.title;

  voteAverageEl.className = "stars";
  rating = data.vote_average / 2;
  voteAverageEl.style = `--rating: ${rating}`;

  buttonMainEl.className = "button_main_card";
  buttonWatch.textContent = "Watch now";
  buttonDetails.textContent = "Details";

  overviewEl.textContent = data.overview;

  buttonMainEl.append(buttonWatch, buttonDetails);
  mainDetails.append(titleEl, overviewEl, voteAverageEl, buttonMainEl);
  mainCardEl.append(mainImgEl, overlayEl, mainDetails);
  return mainCardEl;
};

const topRatedCardGen = (data) => {
  const cardEl = cE("div");
  const imgEl = cE("img");
  // const voteAverageEl = cE("span");
  // const titleEl = cE("h4");
  // const runtimeEl = cE("p");

  cardEl.setAttribute("id", data.id);
  cardEl.className = "movie_card";

  if (data.backdrop_path) {
    imgEl.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    );
  } else {
    imgEl.setAttribute(
      "src",
      "https://troianiortodonzia.it/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
    );
  }
  imgEl.setAttribute("alt", data.title);

  // voteAverageEl.className = "vote_card";
  // voteAverageEl.textContent = data.vote_average;

  // titleEl.className = "title_card";
  // titleEl.textContent = data.title;

  // //! perchè non funziona?
  // runtimeEl.className = "runtime_card";
  // runtimeEl.textContent = data.runtime;

  cardEl.append(imgEl);
  return cardEl;
};

const movieCardGen = (data) => {
  const cardEl = cE("div");
  const imgEl = cE("img");
  const voteAverageEl = cE("span");
  const titleEl = cE("h4");

  cardEl.setAttribute("id", data.id);
  cardEl.className = "movie_card";

  if (data.backdrop_path) {
    imgEl.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
    );
  } else {
    imgEl.setAttribute(
      "src",
      "https://troianiortodonzia.it/wp-content/uploads/2016/10/orionthemes-placeholder-image.png"
    );
  }
  imgEl.setAttribute("alt", data.title);

  voteAverageEl.className = "vote_card";
  voteAverageEl.textContent = data.vote_average;

  titleEl.className = "title_card";
  titleEl.textContent = data.title;

  cardEl.append(imgEl, titleEl, voteAverageEl);
  return cardEl;
};

export { qS, qSA, cE, numbers, mainMovieCard, topRatedCardGen, movieCardGen };
