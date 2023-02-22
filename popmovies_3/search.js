import { qS, qSA, cE } from "./utils.js";

const searchForm = qS(".search-form");
const searchInput = qS(".search-input");
const searchBtn = qS(".search-btn");

const searchFunction = () => {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchForm.classList.toggle("show");
  });
};

export { searchFunction };
