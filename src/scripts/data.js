
async function clickedPoster(name,id,type){
    next.css({'display':'none'});
    prev.css({'display':'none'});
    movieId = 0;
    

       

    switch(type){
        case "tv":
            let encoded = encodeURIComponent(name+" movie trailer");
             console.log(name,id);
                 let api = `https://api.dailymotion.com/videos&search=${encoded}&limit=1`;
                     await fetch(api)
                        .then(res=>res.json())
                        .then(data=>{
                             movieId = data.list[0].id;
                        }).catch((err)=>{
                        globalError = true;
               
        });
            fetchSerie(id);
        break;
        default:
                fetchMovie(id);
            
    }

    // fetchYoutube(name).then(()=>{
    //     console.log("Fetching Sucess",movieId);
        

    // }).catch((err)=>{
    //     console.log("ERROR");
    // })

   

    
    
    
    
}

async function fetchYoutube(name){
  await new Promise((resolve,reject)=>{
    let request =  gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: encodeURIComponent(name),
        maxResults: 1,
    });
    //execute
      request.execute((response)=>{
         console.log(response);
    });
   })
}

async function searchIt(keyword){
    $('.note').css({'display':'block'});
    bb.css({'display':'none'});
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
                                                    <a onclick="clickedPoster('${escape(title)}','${escape(id)}','${escape(type)}')" href="#"><p class="tit">
                                             ${title}
                                       </p><a/>
                                  </div>
                           </div>
                          
                          
                          
                          `;

                           
                       })
                       bb.html(popMovieMarkUp+footah);
                       $('.note').css({'display':'none'});
                        bb.css({'display':'grid'});
                    })
}

function reload(){
    location.reload();
}

function selected(){
    console.log(opt.val());
}

async function init(){
    //    await new Promise((resolve,reject)=>{
    //     gapi.client.setApiKey("AIzaSyAOJtaCyLSHv5TigrKBP1jhnAJo-cLALFw");
    //     gapi.client.load("youtube","v3",function(){
    //         console.log("Youtube API LOADED!");
    //         resolve();
    //     })
    // })
   
}


