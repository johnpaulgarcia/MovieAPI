function ntime(){
    let timeElem = document.getElementById('time');
    let date = new Date();
    let hour = date.getHours()>12?date.getHours()-12:date.getHours();
    let min = (date.getMinutes()-9)<10?(date.getMinutes()):date.getMinutes()-9;
    let sec = date.getSeconds()<10?`0${date.getSeconds()}`:date.getSeconds();
    let time = `${hour}:${min}:${sec}`;
    timeElem.innerText=time;
}

setInterval(ntime,1000);
