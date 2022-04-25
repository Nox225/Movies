const APIURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query='

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");

const closeDetails = document.getElementById("close-details");
const movieDetails = document.getElementById("movie-details");
const movieDetailsContainer = document.getElementById("movie-details-container");

getMovies(APIURL);

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);
    showMovies(respData.results);
}

function getClassByRate(vote){
    if(vote >= 7.5){
        return "green";
    }else if(vote < 7.5 && vote >= 5){
        return "orange";
    }else{
        return "red";
    }
}

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie) =>{
        const card = document.createElement('div');
        card.classList.add('movie');

        card.innerHTML = `
        <img src="${IMGPATH + movie.poster_path}"/>
        <div class="movie-info" id="movie-info">
            <h3>${movie.title}</h3>
            <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            ${movie.overview}
        </div>
        `;
        //some movies didnt have images
        //so I show only the ones that had
        if(movie.poster_path){
            main.appendChild(card);
        }

        card.addEventListener('click', ()=>{
            showDetails(movie);
        });
    });
}

function showDetails(movie){

    const details = document.createElement('div');

    details.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="${IMGPATH + movie.backdrop_path}">
            <p>${movie.overview}</p>
    `;

    movieDetails.appendChild(details);

    movieDetailsContainer.classList.remove('hidden');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value; 

    if(searchTerm){
        getMovies(SEARCHAPI + searchTerm);
        searchTerm = '';
    }
});

closeDetails.addEventListener('click', () => {
    movieDetailsContainer.classList.add("hidden");
    console.log("click");
    movieDetails.innerHTML = '';
});
