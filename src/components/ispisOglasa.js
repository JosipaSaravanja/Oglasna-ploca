//Ispisuje čitatelju oglase koji postoje (da pronađe što mu treba), svaki predmet ga posebno poziva s svojim oglasima (nor matematika.js s korisnik.oglasi gdje je predmet ="matematika)")
import Component from "../baseComponent";

class IspisOglasa extends Component {
  constructor(
    kontakt,
    opis,
    lokacija,
    cijena,
    razina,
    likes,
    dislikes,
    id,
    username
  ) {
    super("div");
    let user = JSON.parse(localStorage["user"]);

    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";

    let row = document.createElement("div");
    row.className = "row valign-wrapper";

    let col = document.createElement("div");
    col.className = "col s11";

    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;

    let info = document.createElement("p");
    info.innerHTML = `
        ${lokacija.županija}, ${lokacija.grad}<br>
        cijena:  ${cijena} <br>
        razredi: ${razina} <br>
        autor: ${username}<br>
        kontakt: ${kontakt} 
        `;

    let ocjena = document.createElement("div");
    ocjena.className = "col s1";

    let like = document.createElement("i");
    like.innerHTML = "thumb_up";
    like.className = "material-icons";
    like.style = "cursor: pointer; vertical-align :-3px;";

    like.addEventListener("click", () => {
      this.like(id, username);
      //like.style.color="#64b5f6 "?like.style.color="black":like.style.color="#64b5f6 "
      
    });

    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-10px;";
    dislike.addEventListener("click", () => {
      this.dislike(id, username);
    });

    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = likes.length;
    likes.includes(user.username)? like.style.color="#64b5f6 ": false

    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = dislikes.length;
    dislikes.includes(user.username)? dislike.style.color="#e57373" : false

    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(numberOfLikesElement);
    ocjena.appendChild(like);
    ocjena.appendChild(dislike);
    ocjena.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);
    this.addChild(row);
  }

  like(id, username) {
    let user = JSON.parse(localStorage["user"]);

    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data(); 
          korisnik.oglasi.map(oglas=>{
            if(oglas.id==id){
              console.log(oglas)
              if (oglas.ocjena.like.includes(user.username)) {
                oglas.ocjena.like=oglas.ocjena.like.filter((item) => item !== "korisnik3")
                console.log(oglas)
              } else {
                oglas.ocjena.like.push(user.username)
                console.log(oglas)
              } 
            
            }})
            console.log(korisnik.oglasi)
            database.collection("korisnici").doc(doc.id).update({
              oglasi: korisnik.oglasi
            }).then(function(){
              alert("GLASOVALI STE")
            }); 
          
        });
      });
  }
  dislike(id, username) {
    let user = JSON.parse(localStorage["user"]);

    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data(); 
          korisnik.oglasi.map(oglas=>{
            if(oglas.id==id){
              console.log(oglas)
              if (oglas.ocjena.dislike.includes(user.username)) {
                oglas.ocjena.dislike=oglas.ocjena.dislike.filter((item) => item !== "korisnik3")
                console.log(oglas)
              } else {
                oglas.ocjena.dislike.push(user.username)
                console.log(oglas)
              } 
            
            }})
            console.log(korisnik.oglasi)
            database.collection("korisnici").doc(doc.id).update({
              oglasi: korisnik.oglasi
            }).then(function(){
              alert("GLASOVALI STE")
            }); 
          
        });
      });
  }
}

module.exports = IspisOglasa;
