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
let page = 1;

$(document).ready(()=>{
    clickers();
    loaders();
});


function loaders(){
    fetchGenre();
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
        popMovie(page);
    });

    header.scroll(()=>{
        console.log("Scrolling");
    })
}

function colorResetter(){
    buttons.css({'background':'white','color':'#111'});
}