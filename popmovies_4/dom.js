import { GET } from "./api.js";
import { qS, qSA, cE, topRatedCardGen } from "./utils.js";
import { getModal, getModalButton, overlayFunction } from "./modal.js";
import { searchFunction } from "./search.js";

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
  const menuTopRated = qS(".menu_top_rated");
  const menuHome = qS(".menu_home");

  menuTopRated.addEventListener("click", () => {
    mainContainer.remove();
    menuTopRated.classList.add("active");
    menuHome.classList.remove("active");
    const mainSecondPage = cE("div");
    mainSecondPage.className = "main_second";

    GET("movie", "top_rated")
      .then((data) => {
        data.results.map((movie) =>
          mainSecondPage.append(topRatedCardGen(movie))
        );
      })
      .then(() => {
        getModal();
        searchFunction();
      })
      .catch((error) => console.error(error));
    document.body.append(mainSecondPage);
  });
  menuHome.addEventListener("click", () => {
    location.reload(true);
    window.scrollTo(0, 0);
  });
};

export { stickyHeader, changePage };
