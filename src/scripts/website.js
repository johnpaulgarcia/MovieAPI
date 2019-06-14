

/*

"w92", "w154", "w185", "w342", "w500", "w780", or "original";

*/

async function popMovie(page){
   
    next.css({'display':'block'});
    prev.css({'display':'none'});
    $('.note').css({'display':'block'});
    bb.css({'display':'none'});
    title.text(notice);
    let shows = [];

    let getMovies = await fetch(`${activeURL}${page}`)
                    .then(res=>res.json())
                    .then(data=>{
                        let results = data.results;
                        Object.keys(results).map(movie=>{
                            let id = results[movie].id;
                            let poster = results[movie].poster_path;
                            let title = results[movie].original_title;

                            
                            
                            let mObj = Object.create({
                                id,
                                poster,
                                title,
                                type: "movie"
                            });

                            shows.push(mObj);
                        });
                    });
    let getSeries = await fetch(`${activeSeries}${page}`)
                    .then(res=>res.json())
                    .then(data=>{
                        let results = data.results;
                        Object.keys(results).map(serie=>{
                            let id = results[serie].id;
                            let poster = results[serie].poster_path;
                            let title = results[serie].name;
                            
                            let mObj = Object.create({
                                id,
                                poster,
                                title,
                                type: "tv"
                            });

                            shows.push(mObj);
                    });
                });
        
        shows.sort(function() {
            return .5 - Math.random();
          });
       
        let popMovieMarkUp = "";
        shows.map(show=>{
            
            let {type,title,poster,id} = show;
            

            popMovieMarkUp += `


        <div class="smallbox">
                     <img src="${posterImage}${poster}" class="logos" />
        
                        
                     <div class="description">
                                  <a onclick="clickedPoster('${escape(title)}','${escape(id)}','${escape(type)}')" href="#"><p class="tit">
                           ${title}
                     </p><a/>
                </div>
         </div>
        
        
        
        `;
        
        });
                 
        bb.html(popMovieMarkUp+footah);
        $('.note').css({'display':'none'});
        bb.css({'display':'grid'});

    // return await  fetch(`${activeURL}${page}`)
    // .then(res=>res.json())
    // .then(data=>{

    //     console.log(activeURL,data);
    //     let popMovieMarkUp = "";
    //     let results = data.results;

    //     Object.keys(results).map((movie)=>{
    //         popMovieMarkUp += `


    //     <div class="smallbox">
    //                  <img src="${posterImage}${results[movie].poster_path}" class="logos" />
        
                        
    //                  <div class="description">
    //                               <a onclick="clickedPoster('${results[movie].id}')" href="#"><p class="tit">
    //                        ${results[movie].original_title}
    //                  </p><a/>
    //             </div>
    //      </div>
        
        
        
    //     `;
    //     })

    //     bb.html(popMovieMarkUp);
    // });
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
                <option value="${id}" id="civ" class="options-actual">
                   ${name}
                </option>  
            `;
            
           
        });
        opt.html(genreMarkup);
        
        
    })
}

function fetchMovie(id){
    $('.note').css({'display':'block'});
    bb.css({'display':'none'});
    notice = "MOVIE INFORMATION";
    title.text(notice);
    let url =  `${movieSpec}${id}${afterMovie}`;
    let movieMk = "";
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        let title = data.original_title;
        let logo = data.poster_path;
        let genre = [];
        let prod = [];
      
        
        if(data.genres){
            data.genres.map(genr=>{
                genre.push(genr.name);
            });
        }

       if(data.production_companies){
        data.production_companies.map(pd=>{
            prod.push(`${pd.name} | ${pd.origin_country}`);
        });
       }

        prod = prod.join(', ');
        genre = genre.join(', ');
        let popularity = data.popularity;

        let frame = `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/${movieId}" allowfullscreen allow="autoplay"></iframe>
        `;

        if(globalError){
            
            frame=`<p class="notice-1">No video available man.</p>`;
            globalError = false;
        }
        

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

        <div class="video">

        ${frame}
       
        </div>

        <div class="more">
            <div class="production">
                <div class="p-tag">

                    INFO

                </div>

                <div class="characters">

                <p class="chars">
                       TYPE
                </p>

                <span class="chars-actual">
                 MOVIE
                </span>


            </div>

            <div class="characters">

                    <p class="chars">
                           Production Companies
                    </p>

                    <span class="chars-actual">
                    ${prod}
                    </span>


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
                       Budget / Revenue
                </p>

                <span class="chars-actual">
                ${data.budget} budget /  ${data.revenue} revenue
                </span>


            </div>
            <div>
        </div>


       
    

  

    </div>
        
        
        `;
        bb.html(movieMk+footah);
        $('.note').css({'display':'none'});
        bb.css({'display':'grid'});
       
    })
   
}


async function fetchMovieByGenre(){
    $('.note').css({'display':'block'});
    bb.css({'display':'none'});
    let id = opt.val();
    title.text("MOVIE DIRECTORY");
    let url = `${gens}${afterGens}${id}`;
    let urlTV = `${gensTV}${afterGens}${id}`;
    activeURL = url;
    activeSeries = urlTV;
    let shows = [];
    let getMovieByGenre = await fetch(url)
                            .then(res=>res.json())
                            .then(data=>{
                                let results = data.results;
                                Object.keys(results).map(reso=>{
                                   let {
                                       title,
                                       poster_path,
                                       id,
                                   } = results[reso];

                                   let mObj = Object.create({
                                       title,
                                        id,
                                        poster: poster_path,
                                        type: "movie"
                                   })

                                   shows.push(mObj);
                                })
                            });
    let getSeriesByGenre = await fetch(urlTV)
                            .then(res=>res.json())
                            .then(data=>{
                                let results = data.results;
                                Object.keys(results).map(reso=>{
                                   let {
                                       name,
                                       poster_path,
                                       id,
                                   } = results[reso];

                                   let mObj = Object.create({
                                       title:name,
                                        id,
                                        poster: poster_path,
                                        type: "tv"
                                   })

                                   shows.push(mObj);
                                });

                               
                            })

                            shows.sort(function() {
                                return .5 - Math.random();
                              });

                              let popMovieMarkUp = "";
                                    shows.map(show=>{
            
                                        let {type,title,poster,id} = show;
            

                                     popMovieMarkUp += `


                                                          <div class="smallbox">
                                                                            <img src="${posterImage}${poster}" class="logos" />
        
                        
                                                             <div class="description">
                                                                             <a onclick="clickedPoster('${escape(title)}','${escape(id)}','${escape(type)}')" href="#"><p class="tit">
                                                                                             ${title}
                                                                                     </p><a/>
                                                                         </div>
                                                                        </div>
        
        
        
        `;
        
        });
                 
        bb.html(popMovieMarkUp+footah);
        $('.note').css({'display':'none'});
        bb.css({'display':'grid'});


    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>{
    //     let popMovieMarkUp = "";
    //     let results = data.results;

    //     Object.keys(results).map((movie)=>{
    //         popMovieMarkUp += `


    //     <div class="smallbox">
    //                  <img src="${posterImage}${results[movie].poster_path}" alt="No Poster" class="logos" />
        
                        
    //                  <div class="description">
    //                               <a onclick="clickedPoster('${results[movie].id}')" href="#"><p class="tit">
    //                        ${results[movie].original_title}
    //                  </p><a/>
    //             </div>
    //      </div>
        
        
        
    //     `;
    //     })

    //     bb.html(popMovieMarkUp);
    // })
}


function fetchSerie(id){
    $('.note').css({'display':'block'});
    bb.css({'display':'none'});
    title.text("SERIES INFORMATION");
    let movieMk = "";
    let url = `${seriesSpec}${id}${afterMovie}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        let genres = data.genres;
        let {
            name,
            number_of_seasons,
            number_of_episodes,
            overview,
            poster_path,
            episode_run_time,
            status,
            popularity,
            original_language,
            first_air_date,
            last_air_date,
            networks,
            origin_country
        } = data;

        let genre = [];
        genres.map(gnr=>{
           genre.push(gnr.name);
        })

        genre.join(', ');

        let frame = `<iframe frameborder="0" width="100%" height="100%" src="https://www.dailymotion.com/embed/video/${movieId}" allowfullscreen allow="autoplay"></iframe>
        `;

        if(globalError){
            frame=`<p class="notice-1">No video available man.</p>`;
            globalError = false;
        }

        movieMk+=  `
        
        <div class="biggy">
                       
        <div style="background: url('${posterImage}${poster_path}');background-size:cover" class="logox">

        </div>

        <div class="leftinfo">
            <p class="name">${name}</p>
            <p>Genre: ${genre}</p>
            <p>Language: ${original_language}</p>
            <p>Popularity: ${popularity}</p>
        </div>

      

        <div class="biggy-description">
                ${overview}
        </div>

        <div class="video">
            ${frame}
        </div>

        <div class="more">
            <div class="production">
                <div class="p-tag">

                    INFO

                </div>

                <div class="characters">

                <p class="chars">
                       TYPE
                </p>

                <span class="chars-actual">
                 TV SHOW
                </span>


            </div>

            <div class="characters">

                <p class="chars">
                       PRODUCTION | COUNTRY
                </p>

                <span class="chars-actual">
                    ${networks[0].name} | ${origin_country}
                </span>


            </div>

            <div class="characters">

            <p class="chars">
                   Aired
            </p>

            <span class="chars-actual">
            ${first_air_date} | Last Aired ${last_air_date}
            </span>


        </div>
               

                <div class="characters">

                <p class="chars">
                       Status
                </p>

                <span class="chars-actual">
                ${status}
                </span>


            </div>

            <div class="characters">

            <p class="chars">
                  No. Of Seasons
            </p>

            <span class="chars-actual">
            ${number_of_episodes} episodes / ${number_of_seasons} seasons /  ${episode_run_time[0]} mins per episode
            </span>


        </div>

        




        

           
            <div>
        </div>


       
    

  

    </div>
        
        
        `;
        bb.html(movieMk+footah);
        $('.note').css({'display':'none'});
        bb.css({'display':'grid'});
    })
}


