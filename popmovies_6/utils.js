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

  titleEl.className = "main_title_card";
  titleEl.textContent = data.title;

  voteAverageEl.className = "stars";
  rating = data.vote_average / 2;
  voteAverageEl.style = `--rating: ${rating}`;

  buttonMainEl.className = "button_main_card";
  buttonWatch.textContent = "Watch now";
  buttonDetails.className = "button_detail_main";
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
  const voteAverageEl = cE("span");

  cardEl.setAttribute("id", data.id);
  cardEl.className = "movie_card";

  if (data.poster_path) {
    imgEl.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    );
  } else if (data.backdrop_path) {
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

  cardEl.append(imgEl, voteAverageEl);
  return cardEl;
};

const numberFuntion = () => {
  const topRatedEl = qS(".top_rated");
  const bests = topRatedEl.querySelectorAll(".movie_card");
  bests.forEach((item, index) => {
    const numberEl = cE("img");
    numberEl.src = numbers[index];
    numberEl.className = "number_card";
    item.insertBefore(numberEl, item.children[0]);
  });
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

const scrollFunction = (container, bigContainer) => {
  const movieCard = container.querySelectorAll(".movie_card");
  var movieCardArr = Array.from(movieCard);
  console.log(movieCardArr.length);
  if (movieCardArr.length >= 5) {
    const mostViewedBack = cE("button");
    const mostViewedForw = cE("button");
    mostViewedBack.className = "backward-btn";
    mostViewedForw.className = "forward-btn";

    mostViewedBack.textContent = "<";
    mostViewedForw.textContent = ">";

    let mostViewedScroll = 0;
    mostViewedBack.classList.add("disabled");

    mostViewedForw.addEventListener("click", () => {
      mostViewedScroll += 1200;
      container.scroll({
        top: 0,
        left: mostViewedScroll,
        behavior: "smooth",
      });
      if (mostViewedScroll > 0) {
        mostViewedBack.classList.remove("disabled");
      }
      if (mostViewedScroll >= container.scrollWidth - container.offsetWidth)
        mostViewedForw.classList.add("disabled");
    });

    mostViewedBack.addEventListener("click", () => {
      if (mostViewedScroll > 0) {
        mostViewedScroll -= 1200;
      }
      container.scroll({
        top: 0,
        left: mostViewedScroll,
        behavior: "smooth",
      });
      if (mostViewedScroll === 0) {
        mostViewedBack.classList.add("disabled");
        mostViewedForw.classList.remove("disabled");
      }
      if (mostViewedScroll <= container.scrollWidth - container.offsetWidth)
        mostViewedForw.classList.remove("disabled");
    });

    bigContainer.append(mostViewedBack, mostViewedForw);
  }
};

export {
  qS,
  qSA,
  cE,
  numbers,
  mainMovieCard,
  topRatedCardGen,
  numberFuntion,
  movieCardGen,
  scrollFunction,
};
