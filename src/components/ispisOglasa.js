//Ispisuje čitatelju oglase koji postoje (da pronađe što mu treba), svaki predmet ga posebno poziva s svojim oglasima (nor matematika.js s korisnik.oglasi gdje je predmet ="matematika)")
import Component from "../baseComponent";
import controler from "../modelAndControler";

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
this.id=id
    this.like = document.createElement("i");
    this.like.innerHTML = "thumb_up";
    this.like.className = "material-icons";
    this.like.style = "cursor: pointer; vertical-align :-3px;";

    this.like.addEventListener("click", () => {
      this.likeFunc(id, username);
      this.like.style.color=="#64b5f6" ?this.like.style.color="red":this.like.style.color="#64b5f6"
      
    });

    this.dislike = document.createElement("i");
    this.dislike.innerHTML = "thumb_down";
    this.dislike.className = "material-icons";
    this.dislike.style = "cursor: pointer; vertical-align :-10px;";
    this.dislike.addEventListener("click", () => {
      this.dislikeFunc(id, username);
    });

    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = likes.length;
    likes.includes(user.username)? this.like.style.color="#64b5f6 ": false

    let numberOfDislikesElement = document.createElement("span");
    this.nod=Number(dislikes.length);
    numberOfDislikesElement.innerHTML =this.nod
    dislikes.includes(user.username)? this.dislike.style.color="#e57373" : false

    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(numberOfLikesElement);
    ocjena.appendChild(this.like);
    ocjena.appendChild(this.dislike);
    ocjena.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);
    
    this.addChild(row);
  }
  likeFunc(id, username) {
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
            }).then(()=>{}); 
          
        });
      });
  }
  dislikeFunc(id, username) {
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
                //promjena
              } else {
                oglas.ocjena.dislike.push(user.username)
                console.log(oglas)
                //proimjena
              } 
            
            }})
            console.log(korisnik.oglasi)
            database.collection("korisnici").doc(doc.id).update({
              oglasi: korisnik.oglasi
            }).then(()=>{
              
            }); 
          
        });
      });
  }
}

module.exports = IspisOglasa;
