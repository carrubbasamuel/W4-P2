const musicData = (id) =>{
    let promise= new Promise((resolve,reject)=>{
        let request =  fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=' + id, { method: 'GET' });
        setTimeout(()=>{
            resolve(request);
            reject("error");
        },1000);
 });
    return promise;
}



musicData("eminem")
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "eminemSection")})})
.catch((error)=>{console.log(error)});


musicData("metallica")
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "metallicaSection")})})
.catch((error)=>{console.log(error)});

musicData("queen")
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "queenSection")})})
.catch((error)=>{console.log(error)});




/* funzione che visualizza alcuni album subito*/
function getAlbum(datas, name) {
    let dadDiv = document.querySelector(`#${name}`);
    let albumUnici = [];
  
    for (let i = 0; i < datas.data.length; i++) {
      // Verifica se il titolo dell'album corrente è già presente nell'array albumUnici
      if (!albumUnici.find((album) => album.title === datas.data[i].album.title)) {//*se non è presente lo aggiunge
        albumUnici.push(datas.data[i].album);
        let newDiv = document.createElement("div");
        let p = document.createElement("p");
        p.innerText = datas.data[i].album.title;
        let img = document.createElement("img");
        img.src = datas.data[i].album.cover_medium;
        newDiv.appendChild(img);
        newDiv.appendChild(p);
        dadDiv.appendChild(newDiv);
      }
  
      // Esci dal ciclo quando hai trovato 4 album unici
      if (albumUnici.length === 4) {
        break;
      }
    }
  }
  
  




/* Funzione cerca canzoni artista */
function search(){
    let input = document.querySelector("#searchField").value.toLowerCase();
    musicData(input)
   .then((response)=>{ response.json().then((data)=>{
        let datas = data.data;
        let dadDiv = document.querySelector("#searchResults div");
        for (const data of datas) {
            let div = document.createElement("div");
            let p = document.createElement("p");
            p.innerText = data.title;
            let img =document.createElement("img");
            img.src = data.album.cover_medium;
            div.appendChild(img);
            div.appendChild(p);
            dadDiv.appendChild(div);
        }
   })})
}

