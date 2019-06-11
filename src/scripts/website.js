const api = "http://age-of-empires-2-api.herokuapp.com/api/v1/";
const civilization_api = `${api}civilizations`;

let getCivilization = () => {

    fetch("http://age-of-empires-2-api.herokuapp.com/api/v1/civilizations")
    .then(data=>{
       console.log(data);
    })
}

// function getCivilization(){
//   let xhr = new XMLHttpRequest();

//     xhr.open("GET",
//         ); // assuming you’re hosting it locally
//     xhr.setRequestHeader("Content-type", 'application/json');
  
//     let data = {
//       headers: {
//         Accept: "application/json",
//         Origin: "http://maximum.blog"
//     },
//       method: 'GET'
//     };
//       xhr.send(JSON.stringify(data));
//       console.table(xhr.response);
       
// }
