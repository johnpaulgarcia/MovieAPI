const buttons = $('.options-actual');
const civ = $('#civ');
const str = $('#str');
const uni = $('#uni');
const tech = $('#tech');
const opt = $('#opt');
const bb = $('.bigbox');
const next = $('.next');
const prev = $('.prev');
const header = $('#navi');
const home = $('#home');
const optia = $('#opti-a');
const optib = $('#opti-b');
const optic = $('#opti-c');
const optid = $('#opti-d');
const input = $('.input');
let page = 1;


// 


const apiKey = "?api_key=f9165a1158394cba9f390c1eb6f7b13d";
const genre = "https://api.themoviedb.org/3/genre/movie/list";
const popMovies = "https://api.themoviedb.org/3/movie/popular?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US&page=";
const nowMovies = "https://api.themoviedb.org/3/movie/now_playing?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US&page=";
const topMovies = "https://api.themoviedb.org/3/movie/top_rated?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US&page=";
const upcomingMovies = "https://api.themoviedb.org/3/movie/upcoming?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US&page=";
const posterImage = "http://image.tmdb.org/t/p/original/";
const afterMovie = "?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US";
const movieSpec = "https://api.themoviedb.org/3/movie/";
const afterGens = "&with_genres=";
const gens = "https://api.themoviedb.org/3/discover/movie?api_key=f9165a1158394cba9f390c1eb6f7b13d";
const searchApi = "https://api.themoviedb.org/3/search/movie?api_key=f9165a1158394cba9f390c1eb6f7b13d&language=en-US&page=1&query=";
let activeURL = "";
const title = $('.title');

$(document).ready(()=>{
    clickers();
    loaders();
});




function loaders(){
    fetchGenre();
    if(!activeURL){
        activeURL = popMovies;
    }
    popMovie(page);
    
}


function clickers(){
    buttons.on('click',()=>{
        $(this).css({'background':'red'});
    });

    civ.on('click',()=>{

       colorResetter();
       civ.css({'background':'rgba(225, 112, 85,1.0)'});
       
    });

    str.on('click',()=>{
        colorResetter();
        str.css({'background':'rgba(225, 112, 85,1.0)'});
    });

    uni.on('click',()=>{
        colorResetter();
        uni.css({'background':'rgba(225, 112, 85,1.0)'});
    });

    tech.on('click',()=>{
        colorResetter();
        tech.css({'background':'rgba(225, 112, 85,1.0)'});
    });

    next.on('click',()=>{
        page++;
        popMovie(page);
        prev.css({'display':'block'});
    })

    prev.on('click',()=>{
       if(page>0){
           page--;
           if(page>1){
             prev.css({'display':'block'});
           }
           else {
             prev.css({'display':'none'});
           }
       }
        popMovie(activeURL,page);
    });

    home.on('click',()=>{
        reload();
    });

    optia.on('click',()=>{
        activeURL = popMovies;
        page = 1;
        popMovie(page);
    });

    optib.on('click',()=>{
        activeURL = nowMovies;
        page = 1;
        popMovie(page);
    })

    optic.on('click',()=>{
        activeURL = topMovies;
        page = 1;
        popMovie(page);
    })

    optid.on('click',()=>{
        activeURL = upcomingMovies;
        page = 1;
        popMovie(page);
    });

    input.on('input',()=>{
       if(input.val()){
         activeURL = `${searchApi}'${input.val()}'`;
         page = 1;
         console.log(activeURL);
         popMovie(page);
       }
    })

   
}

function colorResetter(){
    buttons.css({'background':'white','color':'#111'});
}