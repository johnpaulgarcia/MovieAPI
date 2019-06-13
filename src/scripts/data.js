
function clickedPoster(id,type){
    next.css({'display':'none'});
    prev.css({'display':'none'});
    
    switch(type){
        case "tv":
            fetchSerie(id);
        break;
        default:
            fetchMovie(id);
    }
    
}

async function searchIt(keyword){
    keyword = keyword.split(' ').join('%20');
    let searchy = `${searchApi}${page_no}${searchPage}${query}${keyword}`;
    let popMovieMarkUp = "";
    let shows = await fetch(searchy)
                    .then(res=>res.json())
                    .then(show=>{
                       let results = show.results;
                       Object.keys(results).map(res=>{
                           let {
                               original_title,
                               name,
                               poster_path,
                               id,
                           } = results[res];
                           let title = name;
                           let type = "tv";
                          if(original_title){
                             title = original_title; 
                             type = "movie";

                          }

                          popMovieMarkUp += `


                          <div class="smallbox">
                                       <img src="${posterImage}${poster_path}" alt="NO POSTER" class="logos" />
                          
                                          
                                       <div class="description">
                                                    <a onclick="clickedPoster('${id}','${type}')" href="#"><p class="tit">
                                             ${title}
                                       </p><a/>
                                  </div>
                           </div>
                          
                          
                          
                          `;

                           
                       })
                       bb.html(popMovieMarkUp);
                    })
}

function reload(){
    location.reload();
}

function selected(){
    console.log(opt.val());
}