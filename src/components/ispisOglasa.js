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
    this.user = JSON.parse(localStorage["user"]);

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
    this.id = id;
    this.username = username;
    this.like = document.createElement("i");
    this.like.innerHTML = "thumb_up";
    this.like.className = "material-icons";
    this.like.style = "cursor: pointer; vertical-align :-3px;";
    if (likes.includes(this.user.username)) {
      this.like.style.color = "rgb(100, 181, 246)";
    }
    this.like.addEventListener("click", () => {
      this.likeFunc();
    });

    this.dislike = document.createElement("i");
    this.dislike.innerHTML = "thumb_down";
    this.dislike.className = "material-icons";
    this.dislike.style = "cursor: pointer; vertical-align :-10px;";
    this.dislike.addEventListener("click", () => {
      this.dislikeFunc();
    });

    this.numberOfLikesElement = document.createElement("span");
    this.numberOfLikesElement.innerHTML = likes.length;
    likes.includes(this.user.username)
      ? (this.like.style.color = "rgb(100, 181, 246)")
      : false;

    this.numberOfDislikesElement = document.createElement("span");
    this.numberOfDislikesElement.innerHTML = Number(dislikes.length);
    dislikes.includes(this.user.username)
      ? (this.dislike.style.color = "rgb(229, 115, 115)")
      : false;

    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(this.numberOfLikesElement);
    ocjena.appendChild(this.like);
    ocjena.appendChild(this.dislike);
    ocjena.appendChild(this.numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);

    this.addChild(row);
  }
  likeFunc() {
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", this.username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data();
          korisnik.oglasi.map((oglas) => {
            if (oglas.id == this.id) {//pronađi oglas prema id
              if (oglas.ocjena.like.includes(this.user.username)) {
                oglas.ocjena.like = oglas.ocjena.like.filter((item) => item !== this.user.username); //ukloni korisnika iz liste osoba koje su like-ale
                this.like.style.color = "black"; //makni boju s like icone
                this.numberOfLikesElement.innerHTML =Number(this.numberOfLikesElement.innerHTML) - 1; //i smanji broj pored njega
              } else {
                oglas.ocjena.like.push(this.user.username); //dodaj korisnika u listu osoba koje su like-ale oglas
                this.like.style.color = "rgb(100, 181, 246)"; //pretvori u plavo
                this.numberOfLikesElement.innerHTML = Number(this.numberOfLikesElement.innerHTML) + 1; //i povećaj broj pored
                if (this.dislike.style.color == "rgb(229, 115, 115)") {//ako je korisnik već prije dislike-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  oglas.ocjena.dislike = oglas.ocjena.dislike.filter((item) => item !== this.user.username);
                  this.numberOfDislikesElement.innerHTML =Number(this.numberOfDislikesElement.innerHTML) - 1;
                  this.dislike.style.color = "black";
                }
              }
            }
          });
          console.log(korisnik.oglasi);
          database.collection("korisnici").doc(doc.id).update({
            oglasi: korisnik.oglasi,
          });
        });
      });
  }
  dislikeFunc() {
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", this.username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data();
          korisnik.oglasi.map((oglas) => {
            if (oglas.id == this.id) {
              if (oglas.ocjena.dislike.includes(this.user.username)) {
                oglas.ocjena.dislike = oglas.ocjena.dislike.filter((item) => item !== this.user.username); //ukloni korisnika iz liste osoba koje su dislike-ale
                this.dislike.style.color="black";//makni boju s dislike icone
                this.numberOfDislikesElement.innerHTML=Number(this.numberOfDislikesElement.innerHTML)-1; //smanji broj pored njega
              } else {
                oglas.ocjena.dislike.push(this.user.username); //dodaj korisnika u listu osoba koje su dislike-ale oglas
                this.dislike.style.color = "rgb(229, 115, 115)"; //pretvori u crveno
                this.numberOfDislikesElement.innerHTML=Number(this.numberOfDislikesElement.innerHTML)+1; //povećaj broj pored njega
                console.log(this.like.style.color)
                if(this.like.style.color == "rgb(100, 181, 246)"){
                  oglas.ocjena.like = oglas.ocjena.like.filter((item) => item !== this.user.username);//ako je korisnik već prije like-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  this.numberOfLikesElement.innerHTML =Number(this.numberOfLikesElement.innerHTML) - 1;
                  this.like.style.color = "black"
                }
              }
            }
          });
          console.log(korisnik.oglasi);
          database
            .collection("korisnici")
            .doc(doc.id)
            .update({
              oglasi: korisnik.oglasi,
            })
        });
      });
  }
}

module.exports = IspisOglasa;
