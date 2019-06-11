const buttons = $('.options-actual');
const civ = $('#civ');
const str = $('#str');
const uni = $('#uni');
const tech = $('#tech');

$(document).ready(()=>{
    clickers();
});


function clickers(){
    buttons.on('click',()=>{
        $(this).css({'background':'red'});
    });

    civ.on('click',()=>{

       colorResetter();
       civ.css({'background':'rgba(225, 112, 85,1.0)'});
       getCivilization();
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
}

function colorResetter(){
    buttons.css({'background':'white','color':'#111'});
}