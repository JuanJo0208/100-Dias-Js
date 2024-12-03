let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Fetch Data form api
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // Si el inpupt esta vacio
    if(movieName.length <= 0){
        result.innerHTML = '<h3 class="msg">Porfavor ingresa el nombre de una pelicula</h3>'
    }else{
        fetch(url).then((resp) => resp.json()).then((data) => {
            // Si la pelicula existe
            if(data.Response == "True"){
                result.innerHTML = `
                    <div class ="info">  
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating-container">
                                <div class="rating">
                                    <img src="star-icon.svg">
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="score">
                                    <h4>${data.Metascore}</h4>
                                    <p>MetaScore</p>
                                </div>  
                            </div>
                            
                            <div class="details">
                                <span>${data.Rated}   -</span>
                                <span>${data.Year}   -</span>
                                <span>${data.Runtime}</span>
                            </div>

                            <div class="genres">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                        <div class="texts">
                            <h3>Resumen:</h3>
                            <p>${data.Plot}</p>
                            <h3>Casting:</h3>
                            <p>${data.Actors}</p>
                            <h3>Ingresos</h3>
                            <p>${data.BoxOffice}</p>   
                        </div>
                    </div>`
            }else{  // Si la pelicula no existe
                result.innerHTML = `<h3 class="msg">No se ha encontrado la pelicula, Trata de escribirla mejor ;)</h3>`;
            }
        })
        // Si un error ocurre
        .catch(()=>{
            result.innerHTML = `<h3 class="msg">Un error ha Ocurrido :(</h3>`
        })
    }
};

searchBtn.addEventListener("click", getMovie);
movieNameRef.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        getMovie();
    }
});