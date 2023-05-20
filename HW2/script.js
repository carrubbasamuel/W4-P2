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
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "eminem")})})
.catch((error)=>{console.log(error)});


musicData("metallica")
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "metallica")})})
.catch((error)=>{console.log(error)});

musicData("queen")
.then((response)=>{ response.json().then((data)=>{getAlbum(data, "queen")})})
.catch((error)=>{console.log(error)});




/* funzione che visualizza alcuni album subito*/
function getAlbum(datas, name) {
  let dadDiv = document.querySelector(`#${name}`);//* Es. #eminem
  let h2 = dadDiv.querySelector("h2");
  h2.style.opacity = "1"; // Imposta l'opacità iniziale a 0
  let imgArtist = document.createElement("img");
  imgArtist.src = datas.data[0].artist.picture;
  imgArtist.classList.add("artistImg");
  h2.insertAdjacentElement("afterbegin", imgArtist);
  let divSection = dadDiv.querySelector(`div#${name}Section`);//*Es. div#eminemSection
  let albumUnici = [];
  let delay = 0; // Aggiungi una variabile per gestire il ritardo dell'animazione

  for (let i = 0; i < datas.data.length; i++) {
    if (!albumUnici.find((album) => album.title === datas.data[i].album.title)) {
      albumUnici.push(datas.data[i].album);
      let newDiv = document.createElement("div");
      newDiv.classList.add("album");
      let p = document.createElement("p");
      p.innerText = datas.data[i].album.title;
      p.classList.add("albumTitle");
      let img = document.createElement("img");
      img.src = datas.data[i].album.cover_medium;
      let button = document.createElement("button");
      button.innerText = "Play";
      button.style.position = "absolute";
      button.style.top = "";
      button.style.left = "50%";
      button.style.opacity = "0";
      button.style.zIndex = "1";
      img.addEventListener("mouseover", () => {
        anime({
          targets: img,
          scale: [1, 1.1], 
          opacity: [1, 0.8], 
          duration: 300, 
          easing: "easeOutQuad", 
        });
        anime({
          targets: p,
          scale: [1, 1.1], 
          opacity: [1, 0.8], 
          duration: 300, 
          easing: "easeOutQuad", 
        });
        anime({
          targets: button,
          opacity: [0, 1],
          duration: 300,
          easing: "easeOutQuad",
        });
      });
      
      // Ripristina l'immagine all'animazione originale quando viene rimosso l'hover
      img.addEventListener("mouseout", () => {
        anime({
          targets: img,
          scale: [1.1, 1],
          opacity: [0.8, 1],
          duration: 300,
          easing: "easeOutQuad",
        });
        anime({
          targets: p,
          scale: [1.1, 1],
          opacity: [0.8, 1],
          duration: 300,
          easing: "easeOutQuad",
        });
        anime({
          targets: button,
          opacity: [1, 0],
          duration: 300,
          easing: "easeOutQuad",
        });
      });


      newDiv.appendChild(button);
      newDiv.appendChild(img);
      newDiv.appendChild(p);

      // Aggiungi l'effetto di animazione con un ritardo
      setTimeout(() => {
        newDiv.style.opacity = "1"; // Modifica l'opacità del div per visualizzare l'animazione
      }, delay);

      divSection.appendChild(newDiv);
      delay += 100; // Incrementa il ritardo per ogni nuovo div
    }

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
        let divNone = document.querySelector("#searchResults");
        let dadDiv = document.querySelector("#searchResults div");
        divNone.style.display = "block";
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
   .catch((error)=>{console.log("error")});
}




