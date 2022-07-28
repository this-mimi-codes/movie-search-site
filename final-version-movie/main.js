import { doc } from 'prettier';
import './style.css';
import javascriptLogo from './streaming.jpg'

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//  let button = document.getElementById("#submit");
//  button.onkeyup(apiInput)
// function apiInput() {
// loadJSON(apiKey)
// }

document.querySelector("#logo-header").innerHTML = `
<div class="logo-heading">
<a href="https://artistic-dot-homegrown.glitch.me/" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="streaming tv logo" />
    </a>
    <h1>Greetings, Movie Lovers!</h1>
    <h2>Not sure what to look for or want a curated list? Click the logo to visit the recommendation site!</h2>
</div>
`

// load movies from API
window.loadMovies = async function loadMovies(searchTerm) {  
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=${input}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response === 'True') displayMovieList(data.Search);
};

const input = import.meta.env.VITE_API_KEY;

window.findMovies = function findMovies() {
  const searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove('hide-search-list');
    loadMovies(searchTerm);
  } else {
    searchList.classList.add('hide-search-list');
  }
};

window.displayMovieList = function displayMovieList(movies) {
  searchList.innerHTML = '';
  for (let idx = 0; idx < movies.length; idx++) {
    const movieListItem = document.createElement('div');
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add('search-list-item');
    movieListItem.innerHTML = `
        <div class="search-list-item">
        <div class="search-item-thumbnail">
          <img src="${movies[idx].Poster}" alt="movie poster">
        </div>
        <div class="search-item-info">
          <h3>${movies[idx].Title}</h3>
          <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
};

window.loadMovieDetails = function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll('.search-list-item');
  searchListMovies.forEach((movie) => {
    movie.addEventListener('click', async () => {
      //  console.log(movie.dataset.id)
      searchList.classList.add('hide-search-list');
      movieSearchBox.value = '';
      const result = await fetch(
        `http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=${input}`,
      );
      const movieDetails = await result.json();
      // console.log(movieDetails)
      displayMovieDetails(movieDetails);
    });
  });
};

window.displayMovieDetails = function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class="movie-poster">
             <img src="${details.Poster}">            </div>
            <div class="movie-info">
              <h3 class="movie-title">${details.Title}</h3>
              <ul class="movie-misc-info">
                  <li class="year">Year: ${details.Year}</li>
                <li class="rated">Ratings: ${details.Rated}</li>
                <li class="released">Released: ${details.Released}</li>
              </ul>
              <p class="genre"><b>Genre: </b>${details.Genre}</p>
              <p class="writer"><b>Writer: </b>${details.Writer}</p>
              <p class="actors"><b>Actors: </b>${details.Actors}</p>
              <p class="plot"><b>Plot: </b>${details.Plot}</p>
              <p class="language"><b>Language: </b>${details.Language}</p>
              <p class="awards"><b>Awards: <i class="fas fa-award"></i></b>${details.Awards}</p>
            </div>
    `;
};

window.addEventListener('click', (event) => {
  if (event.target.className !== 'form-control') {
    searchList.classList.add('hide-search-list');
  }
});

document.querySelector('.footer').innerHTML = `
Created by A.Alveranga &copy 2022.
Logo photo by <a href="https://unsplash.com/@introspectivedsgn?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Erik Mclean</a> on <a href="https://unsplash.com/s/photos/movies?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
`
