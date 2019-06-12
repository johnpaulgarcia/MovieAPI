

/*

"w92", "w154", "w185", "w342", "w500", "w780", or "original";

*/

async function popMovie(page){
    next.css({'display':'block'});
    prev.css({'display':'none'});
    title.text("MOVIE DIRECTORY");
    await  fetch(`${activeURL}${page}`)
    .then(res=>res.json())
    .then(data=>{

        console.log(data);
        let popMovieMarkUp = "";
        let results = data.results;

        Object.keys(results).map((movie)=>{
            popMovieMarkUp += `


        <div class="smallbox">
                     <img src="${posterImage}${results[movie].poster_path}" class="logos" />
        
                        
                     <div class="description">
                                  <a onclick="clickedPoster('${results[movie].id}')" href="#"><p class="tit">
                           ${results[movie].original_title}
                     </p><a/>
                </div>
         </div>
        
        
        
        `;
        })

        bb.html(popMovieMarkUp);
    });
}

function fetchGenre(){
    fetch(`${genre}${apiKey}`)
    .then(data=>data.json())
    .then(key=>{
        let genres = key.genres;
        let genreMarkup = "";
        Object.keys(genres).map((genre)=>{

            let id = genres[genre].id;
            let name = genres[genre].name;
            genreMarkup +=`
                <li id="civ" class="options-actual">
                    <a onclick="fetchMovieByGenre('${id}')">${name}</a>
                </li>  
            `;
            
           
        });
        opt.html(genreMarkup);
        
        
    })
}

function fetchMovie(id){
    next.css({'display':'none'});
    prev.css({'display':'none'});
    title.text("MOVIE INFORMATION");
    let url =  `${movieSpec}${id}${afterMovie}`;
    let movieMk = "";
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        let title = data.original_title;
        let logo = data.poster_path;
        let genre = [];
        data.genres.map(genr=>{
            genre.push(genr.name);
        });
        genre = genre.join(', ')
        console.log(data);
        let popularity = data.popularity;
        movieMk+=  `
        
        <div class="biggy">
                       
        <div style="background: url('${posterImage}${data.poster_path}');background-size:cover" class="logox">

        </div>

        <div class="leftinfo">
            <p class="name">${title}</p>
            <p>Genre: ${genre}</p>
            <p>Language: ${data.original_language}</p>
            <p>Popularity: ${popularity}</p>
        </div>

      

        <div class="biggy-description">
                ${data.overview}
        </div>

        <div class="more">
            <div class="production">
                <div class="p-tag">

                    INFO

                </div>

                <div class="characters">

                    <p class="chars">
                            Release Date
                    </p>

                    <span class="chars-actual">
                    ${data.release_date}
                    </span>


                </div>

                <div class="characters">

                <p class="chars">
                       Status
                </p>

                <span class="chars-actual">
                ${data.status}
                </span>


            </div>


            <div class="characters">

                <p class="chars">
                       Budget
                </p>

                <span class="chars-actual">
                ${data.budget}
                </span>


            </div>

            <div class="characters">

                <p class="chars">
                       Revenue
                </p>

                <span class="chars-actual">
                ${data.revenue}
                </span>


            </div>
            <div>
        </div>


       
    

  

    </div>
        
        
        `;
        bb.html(movieMk);
       
    })
   
}


function fetchMovieByGenre(id){
    title.text("MOVIE DIRECTORY");
    let url = `${gens}${afterGens}${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        let popMovieMarkUp = "";
        let results = data.results;

        Object.keys(results).map((movie)=>{
            popMovieMarkUp += `


        <div class="smallbox">
                     <img src="${posterImage}${results[movie].poster_path}" alt="No Poster" class="logos" />
        
                        
                     <div class="description">
                                  <a onclick="clickedPoster('${results[movie].id}')" href="#"><p class="tit">
                           ${results[movie].original_title}
                     </p><a/>
                </div>
         </div>
        
        
        
        `;
        })

        bb.html(popMovieMarkUp);
    })
}


