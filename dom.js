import { GET } from "./api.js";
import { qS, qSA, cE, topRatedCardGen } from "./utils.js";
import { getModal, getModalButton, overlayFunction } from "./modal.js";
import { searchFunction } from "./search.js";

let listaProdotti;
const select = document.querySelector("#categorySelect");
const select2 = document.querySelector("#categorySelect2");
const main = qS(".main");
const wrapper = qS(".wrapper");
const footer = qS(".footer");
const searchInput = qS("#search-input");
const searchForm = qS("#search");
const loader = document.querySelector(".loader");
const logoEl = document.querySelector("#logo");
const logo2El = document.querySelector("#logo2");
const menu = document.querySelector(".menu");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

const stickyHeader = () => {
  let lastScrollTop = 0;
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
};

const changePage = () => {
  const mainContainer = qS(".main");
  const wrapper = qS(".wrapper");
  const menuTopRated = qS(".menu_top_rated");
  const menuTopRated2 = qS("#top-rated-menu");
  const menuHome = qS(".menu_home");
  const menuCategory = qS(".categorySelect");
  const menuCategory2 = qS("#categorySelect2");
  const searchDiv = cE("div");
  searchDiv.className = "searchDiv";
  const movieSearched = cE("div");
  movieSearched.className = "movieSearched";
  const titleSearchedMovie = cE("h3");
  titleSearchedMovie.className = "search_title";

  menuHome.addEventListener("click", () => {
    location.reload(true);
    window.scrollTo(0, 0);
  });
  logoEl.addEventListener("click", () => {
    location.reload(true);
    window.scrollTo(0, 0);
  });
  logo2El.addEventListener("click", () => {
    location.reload(true);
    window.scrollTo(0, 0);
  });

  searchForm.addEventListener("click", () => {
    loader.style = "display: flex";
    menuTopRated.classList.remove("active");
    menuHome.classList.remove("active");
    mainContainer.remove();
    const mainSecondPage = qS(".main_second");
    if (mainSecondPage) mainSecondPage.remove();
    const fileredWrapper = qS(".filtered_wrapper");
    if (fileredWrapper) fileredWrapper.remove();
    if (wrapper) wrapper.innerHTML = "";
    titleSearchedMovie.textContent = "All popular movies";
    searchDiv.append(titleSearchedMovie, movieSearched);
    wrapper.append(searchDiv);
    GET("movie", "popular")
      .then((data) => {
        loader.style = "display: none";
        data.results.map((movie) =>
          movieSearched.append(topRatedCardGen(movie))
        );
      })
      .then(() => {
        getModal();
      });
  });

  searchInput.addEventListener("input", (e) => {
    const cardEl = qSA(".movie_card");
    cardEl.forEach((card) => card.remove());

    const searchedValue = e.target.value;
    const searchedValue2 =
      searchedValue.charAt(0).toUpperCase() + searchedValue.slice(1);

    titleSearchedMovie.textContent = searchedValue2;
    if (searchedValue2.length === 0)
      titleSearchedMovie.textContent = "All popular movies";

    GET("movie", "popular")
      .then((data) => {
        data.results.map((movie) => {
          if (movie.title.includes(searchedValue2)) {
            console.log(searchedValue);
            movieSearched.append(topRatedCardGen(movie));
          }
        });
      })
      .then(() => {
        getModal();
      });
  });
  searchDiv.append(titleSearchedMovie, movieSearched);
  wrapper.append(searchDiv);

  // end input
  menuTopRated.addEventListener("click", () => {
    loader.style = "display: flex";
    const categoryOption = document.querySelector("#categoryOption");
    categoryOption.setAttribute("selected", true);
    mainContainer.remove();
    const fileredWrapper = qS(".filtered_wrapper");
    if (fileredWrapper) fileredWrapper.remove();
    if (wrapper) wrapper.innerHTML = "";
    footer.style.display = "flex";
    menuTopRated.classList.add("active");
    menuHome.classList.remove("active");
    const mainSecondPage = cE("div");
    mainSecondPage.className = "main_second";

    GET("movie", "top_rated")
      .then((data) => {
        loader.style = "display: none";
        data.results.map((movie) =>
          mainSecondPage.append(topRatedCardGen(movie))
        );
      })
      .then(() => {
        getModal();
      })
      .catch((error) => console.error(error));
    document.body.append(mainSecondPage);
  });
  menuTopRated2.addEventListener("click", () => {
    loader.style = "display: flex";
    const categoryOption = document.querySelector("#categoryOption");
    categoryOption.setAttribute("selected", true);
    mainContainer.remove();
    const fileredWrapper = qS(".filtered_wrapper");
    if (fileredWrapper) fileredWrapper.remove();
    if (wrapper) wrapper.innerHTML = "";
    footer.style.display = "flex";
    menuTopRated.classList.add("active");
    menuHome.classList.remove("active");
    const mainSecondPage = cE("div");
    mainSecondPage.className = "main_second";

    GET("movie", "top_rated")
      .then((data) => {
        loader.style = "display: none";
        data.results.map((movie) =>
          mainSecondPage.append(topRatedCardGen(movie))
        );
      })
      .then(() => {
        getModal();
      })
      .catch((error) => console.error(error));
    document.body.append(mainSecondPage);
  });

  menuCategory.addEventListener("click", () => {
    menuTopRated.classList.remove("active");
    menuHome.classList.remove("active");
    footer.style.display = "none";

    GET("movie", "popular")
      .then((data) => {
        listaProdotti = data.results;
      })
      .catch((error) => console.error(error));
  });

  const metodoGetCat = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ee68d518251174f25fc47831550de7e4"
    )
      .then((res) => res.json())
      .then((data) => {
        creazioneSelectCategories(data.genres);
      })
      .catch((e) => console.log("Questo è il mio errore: ", e));
  };
  metodoGetCat();
  const creazioneSelectCategories = (arrayCat) => {
    arrayCat.forEach((item) => {
      const optionValue = document.createElement("option");
      optionValue.textContent = item.name;
      optionValue.setAttribute("value", item.id);
      select.appendChild(optionValue);
    });
  };

  select.addEventListener("change", (e) => {
    main.remove();
    const mainSecondPage = qS(".main_second");
    if (mainSecondPage) mainSecondPage.remove();
    wrapper.innerHTML = "";
    filterByCategory(select.value);
    const filteredMovie = qSA(".filtered_movie");
    filteredMovie.innerHTML = "";
    if (filteredMovie.length === 0) {
      const footer = qS(".footer");
      const textFilteredProducts = cE("p");
      textFilteredProducts.textContent = "No movies in this category.";
      textFilteredProducts.style.color = "white";
      textFilteredProducts.style.padding = "50px";
      wrapper.append(textFilteredProducts);
    }
    getModal();
  });

  // category mobile
  menuCategory2.addEventListener("click", () => {
    menuTopRated2.classList.remove("active");
    // menuHome2.classList.remove("active");
    footer.style.display = "none";

    GET("movie", "popular")
      .then((data) => {
        listaProdotti = data.results;
      })
      .catch((error) => console.error(error));
  });

  const metodoGetCatMobile = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=ee68d518251174f25fc47831550de7e4"
    )
      .then((res) => res.json())
      .then((data) => {
        creazioneSelectCategoriesMobile(data.genres);
      })
      .catch((e) => console.log("Questo è il mio errore: ", e));
  };
  metodoGetCatMobile();
  const creazioneSelectCategoriesMobile = (arrayCat) => {
    arrayCat.forEach((item) => {
      const optionValue = document.createElement("option");
      optionValue.textContent = item.name;
      optionValue.setAttribute("value", item.id);
      select2.appendChild(optionValue);
    });
  };

  select2.addEventListener("change", (e) => {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    main.remove();
    const mainSecondPage = qS(".main_second");
    if (mainSecondPage) mainSecondPage.remove();
    wrapper.innerHTML = "";
    filterByCategory(select2.value);
    const filteredMovie = qSA(".filtered_movie");
    filteredMovie.innerHTML = "";
    if (filteredMovie.length === 0) {
      const footer = qS(".footer");
      const textFilteredProducts = cE("p");
      textFilteredProducts.textContent = "No movies in this category.";
      textFilteredProducts.style.color = "white";
      textFilteredProducts.style.padding = "50px";
      wrapper.append(textFilteredProducts);
    }
    getModal();
  });

  const filterByCategory = (idCat) => {
    const fileredWrapper = cE("div");
    fileredWrapper.className = "filtered_wrapper";

    let fiteredProducts = listaProdotti.filter((movie) => {
      if (movie.genre_ids.includes(parseInt(idCat))) {
        const fileredMovie = cE("div");
        fileredMovie.className = "filtered_movie";
        fileredMovie.append(topRatedCardGen(movie));
        fileredWrapper.append(fileredMovie);
      }
    });
    wrapper.append(fileredWrapper);
  };
};

export { stickyHeader, changePage };
