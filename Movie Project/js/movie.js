const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_VIDEOS = "https://kinopoiskapiunofficial.tech/api/v2.2/films";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

async function fetchTrailer(filmId) {
  const resp = await fetch(`${API_URL_VIDEOS}/${filmId}/videos`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  const trailer = respData.items.find((item) => item.site === "YOUTUBE");
  return trailer ? trailer.url : null;
}

async function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  for (const movie of data.films) {
    const rating = movie.rating ? movie.rating : "0.0";
    const trailerUrl = await fetchTrailer(movie.filmId); 
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
          <img src="${movie.posterUrlPreview}" alt="${movie.nameRu}" class="movie__cover">
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map((genre) => genre.genre).join(", ")}</div>
          <div class="movie__average movie__average--${getClassByRate(rating)}">${rating}</div>
          ${trailerUrl
        ? `<a href="${trailerUrl}" class="movie__trailer" target="_blank">Смотреть трейлер</a>`
        : `<div class="movie__trailer--not-found">Трейлер недоступен</div>`
      }
        </div>
      `;
    moviesEl.appendChild(movieEl);
  }
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});







