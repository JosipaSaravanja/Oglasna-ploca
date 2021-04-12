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
    date,
    likes,
    dislikes,
    id,
    username
  ) {
    super("div");

    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";

    let row = document.createElement("div");
    row.className = "row valign-wrapper";

    let col = document.createElement("div");
    col.className = "col s11";
this.lokacija=lokacija
    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;

    let info = document.createElement("p");
    info.innerHTML = `
        ${lokacija.županija}, ${lokacija.grad}<br>
        cijena:  ${cijena} <br>
        razredi: ${razina} <br>
        datum: ${date} <br>
        autor: ${username}<br>
        kontakt: ${kontakt} <br>
        `;

    let ocjena = document.createElement("div");
    ocjena.className = "col s1";
    this.id = id;
    this.username = username;
    this.like = document.createElement("i");
    this.like.innerHTML = "thumb_up";
    this.like.className = "material-icons";
    this.like.style = "cursor: pointer; vertical-align :-3px;";
    likes.includes(controler.user.username)
      ? this.like.style.color = "rgb(100, 181, 246)"
      : false;

    this.like.addEventListener("click", () => {
      controler.user!==false?this.likeFunc(): M.toast({ html: `Morate se prijaviti da biste ocjenjivali oglase.` });;
    });

    this.dislike = document.createElement("i");
    this.dislike.innerHTML = "thumb_down";
    this.dislike.className = "material-icons";
    console.log(dislikes)
    dislikes.includes(controler.user.username)
      ? this.dislike.style.color = "rgb(229, 115, 115)"
      : false;

    this.dislike.style = "cursor: pointer; vertical-align :-10px;";
    this.dislike.addEventListener("click", () => {
      controler.user!==false?this.dislikeFunc(): M.toast({ html: `Morate se prijaviti da biste ocjenjivali oglase.` });;
    });

    this.numberOfLikesElement = document.createElement("span");
    this.numberOfLikesElement.innerHTML = likes.length;
    

    this.numberOfDislikesElement = document.createElement("span");
    this.numberOfDislikesElement.innerHTML = Number(dislikes.length);
    
    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(this.numberOfLikesElement);
    ocjena.appendChild(this.like);
    ocjena.appendChild(this.dislike);
    ocjena.appendChild(this.numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);

    this.addChild(row);
    
    controler.addEventListener("zupanije", (event) => {
      this.zupanijaFilter(event.detail.zupanija); //reagira kada je kreiran novi oglas
    });
  }
  zupanijaFilter(zupanija){
    this.rootElement.style.display="block"
    console.log(this.lokacija.županija)
    if(zupanija!=="Sve županije" && this.lokacija.županija!==zupanija){
      this.rootElement.style.display="none"}
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
              console.log(controler.user.username)
              if (oglas.ocjena.like.includes(controler.user.username)) {
                oglas.ocjena.like = oglas.ocjena.like.filter(
                  (item) => item !== controler.user.username //ukloni korisnika iz liste osoba koje su like-ale
                );
              } else {
                oglas.ocjena.like.push(controler.user.username); //dodaj korisnika u listu osoba koje su like-ale oglas
                this.dislike.style.color == "rgb(229, 115, 115)"//ako je korisnik već prije dislike-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  ? (oglas.ocjena.dislike = oglas.ocjena.dislike.filter(
                      (item) => item !== controler.user.username
                    ))
                  : false;
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
            .then(() => {
              if (this.like.style.color == "rgb(100, 181, 246)") {//makni boju s like icone
                this.like.style.color = "black";
                this.numberOfLikesElement.innerHTML =Number(this.numberOfLikesElement.innerHTML) - 1; //umanjio broj pored za jedan
              } else {
                this.like.style.color = "rgb(100, 181, 246)"; //pretvori u plavo
                this.numberOfLikesElement.innerHTML = Number(this.numberOfLikesElement.innerHTML) + 1; //povećaj broj pored
                if (this.dislike.style.color == "rgb(229, 115, 115)") {//ako je korisnik već prije dislike-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  this.numberOfDislikesElement.innerHTML = Number(this.numberOfDislikesElement.innerHTML) - 1;
                  this.dislike.style.color = "black";
                }
              }
            });
        });
      });
  }
  dislikeFunc() {
    console.log(controler.user.id)
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
              console.log(controler.user.username)
              if (oglas.ocjena.dislike.includes(controler.user.username)) {
                oglas.ocjena.dislike = oglas.ocjena.dislike.filter(
                  (item) => item !== controler.user.username
                ); //ukloni korisnika iz liste osoba koje su dislike-ale
              } else {
                oglas.ocjena.dislike.push(controler.user.username); //dodaj korisnika u listu osoba koje su dislike-ale oglas
                
                this.like.style.color == "rgb(100, 181, 246)" //ako je korisnik već prije like-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  ? (oglas.ocjena.like = oglas.ocjena.like.filter(
                      (item) => item !== controler.user.username
                    ))
                  : false;
              }
            }
          });
          console.log(doc.id)
          console.log(korisnik.oglasi);
          database
            .collection("korisnici")
            .doc(doc.id)
            .update({
              oglasi: korisnik.oglasi,
            })
            .then(() => {
              if (this.dislike.style.color == "rgb(229, 115, 115)") {
                this.dislike.style.color = "black"; //makni boju s dislike icone
                this.numberOfDislikesElement.innerHTML =Number(this.numberOfDislikesElement.innerHTML) - 1; //smanji broj pored njega
              } else {
                this.dislike.style.color = "rgb(229, 115, 115)"; //pretvori u crveno
                this.numberOfDislikesElement.innerHTML = Number(this.numberOfDislikesElement.innerHTML) + 1; //povećaj broj pored njega
                if (this.like.style.color == "rgb(100, 181, 246)") { //ako je korisnik već prije like-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  this.numberOfLikesElement.innerHTML =Number(this.numberOfLikesElement.innerHTML) - 1;
                  this.like.style.color = "black";
                }
              }
            });
        });
      });
  }
}

module.exports = IspisOglasa;
