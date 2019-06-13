function clickedPoster(id,type){
    console.log(type);
    switch(type){
        case "tv":
            fetchSerie(id);
        break;
        default:
            fetchMovie(id);
    }
    
}

function reload(){
    location.reload();
}

function selected(){
    console.log(opt.val());
}