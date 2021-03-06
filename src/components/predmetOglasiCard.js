//Ispisuje čitatelju oglase koji postoje za određeni opredmet
import Component from "../baseComponent";
import controler from "../modelAndControler";

class PredmetOglasiCard extends Component {
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
    this.id = id;
    this.username = username;
    this.lokacija = lokacija;
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
        datum: ${date} <br>
        autor: ${username}<br>
        kontakt: ${kontakt} <br>
        `;

    let ocjena = document.createElement("div");
    ocjena.className = "col s1";

    this.like = document.createElement("i");
    this.like.innerHTML = "thumb_up";
    this.like.className = "material-icons";
    this.like.style = "cursor: pointer; vertical-align :-3px;";
    likes.includes(controler.user.username) //ako je korisnikovo ime u listi osoba koje su pozitivno ocjenile, icona će svjetlit plavo
      ? (this.like.style.color = "rgb(100, 181, 246)")
      : false;
    this.like.addEventListener("click", () => {
      //na klik poziva funkciju ili obavještava da se mora prijaviti
      controler.user !== false
        ? this.likeFunc()
        : M.toast({ html: `Morate se prijaviti da biste ocjenjivali oglase.` });
    });

    this.dislike = document.createElement("i");
    this.dislike.innerHTML = "thumb_down";
    this.dislike.className = "material-icons";
    this.dislike.style = "cursor: pointer; vertical-align :-10px;";
    dislikes.includes(controler.user.username) //ako je korisnikovo ime u listi osoba koje su negativno ocjenile, icona će svjetlit crveno
      ? (this.dislike.style.color = "rgb(229, 115, 115)")
      : false;
    this.dislike.addEventListener("click", () => {
      //na klik poziva funkciju ili obavještava da se mora prijaviti
      controler.user !== false
        ? this.dislikeFunc()
        : M.toast({ html: `Morate se prijaviti da biste ocjenjivali oglase.` });
    });

    this.numberOfLikesElement = document.createElement("span");
    this.numberOfLikesElement.innerHTML = likes.length;

    this.numberOfDislikesElement = document.createElement("span");
    this.numberOfDislikesElement.innerHTML = Number(dislikes.length);

    col.appendChild(opisElement); //opis oglasa
    col.appendChild(info); //podaci o oglasu
    ocjena.appendChild(this.numberOfLikesElement); //broj like-ova
    ocjena.appendChild(this.like); //icona like
    ocjena.appendChild(this.dislike); //icone dislike
    ocjena.appendChild(this.numberOfDislikesElement); //broj dislike-ova
    row.appendChild(col);
    row.appendChild(ocjena);

    this.addChild(row); //row dijeli cijelu karticu na dva stupca da icone za ocjenjivanje stoje sa strane

    controler.addEventListener("zupanije", (event) => {
      this.zupanijaFilter(event.detail.zupanija); //reagira kada je kreiran novi oglas
    });
  }
  zupanijaFilter(zupanija) {
    //ako odabrana zupanija nije jednaka zupaniji oglasa, oglas se brise
    zupanija !== "Sve županije" && this.lokacija.županija !== zupanija
      ? (this.rootElement.style.display = "none")
      : (this.rootElement.style.display = "block");
  }

  likeFunc() {
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", this.username) //traži prema imenu autora
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data();
          korisnik.oglasi.map((oglas) => {
            if (oglas.id == this.id) {
              //pronađi oglas prema id
              if (oglas.ocjena.like.includes(controler.user.username)) {
                oglas.ocjena.like = oglas.ocjena.like.filter(
                  (item) => item !== controler.user.username //ukloni korisnika iz liste osoba koje su like-ale
                );
              } else {
                oglas.ocjena.like.push(controler.user.username); //dodaj korisnika u listu osoba koje su like-ale oglas
                this.dislike.style.color == "rgb(229, 115, 115)" //ako je korisnik već prije dislike-ao oglas treba to poništit da ne likea i dislikea isti oglas
                  ? (oglas.ocjena.dislike = oglas.ocjena.dislike.filter((item) => item !== controler.user.username))
                  : false;
              }
            }
          });
          database
            .collection("korisnici")
            .doc(doc.id)
            .update({
              oglasi: korisnik.oglasi,
            })
            .then(() => {
              //tek kad se sve spremi u firebase korisniku se mijenja boja icone i dobiva potvrdnu informaciju
              if (this.like.style.color == "rgb(100, 181, 246)") {
                this.like.style.color = "black"; //makni boju s like icone
                this.numberOfLikesElement.innerHTML =
                  Number(this.numberOfLikesElement.innerHTML) - 1; //umanjio broj pored za jedan
              } else {
                this.like.style.color = "rgb(100, 181, 246)"; //pretvori u plavo
                this.numberOfLikesElement.innerHTML =
                  Number(this.numberOfLikesElement.innerHTML) + 1;
                if (this.dislike.style.color == "rgb(229, 115, 115)") {
                  //ako je korisnik već prije dislike-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  this.numberOfDislikesElement.innerHTML =
                    Number(this.numberOfDislikesElement.innerHTML) - 1;
                  this.dislike.style.color = "black";
                }
              }
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
              //pronađi oglas prema id
              if (oglas.ocjena.dislike.includes(controler.user.username)) {
                oglas.ocjena.dislike = oglas.ocjena.dislike.filter(
                  (item) => item !== controler.user.username
                ); //ukloni korisnika iz liste osoba koje su dislike-ale
              } else {
                oglas.ocjena.dislike.push(controler.user.username); //dodaj korisnika u listu osoba koje su dislike-ale oglas
                this.like.style.color == "rgb(100, 181, 246)" //ako je korisnik već prije like-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  ? (oglas.ocjena.like = oglas.ocjena.like.filter((item) => item !== controler.user.username))
                  : false;
              }
            }
          });
          database
            .collection("korisnici")
            .doc(doc.id)
            .update({
              oglasi: korisnik.oglasi,
            })
            .then(() => {
              if (this.dislike.style.color == "rgb(229, 115, 115)") {
                this.dislike.style.color = "black"; //makni boju s dislike icone
                this.numberOfDislikesElement.innerHTML =
                  Number(this.numberOfDislikesElement.innerHTML) - 1; //smanji broj pored njega
              } else {
                this.dislike.style.color = "rgb(229, 115, 115)"; //pretvori u crveno
                this.numberOfDislikesElement.innerHTML =
                  Number(this.numberOfDislikesElement.innerHTML) + 1; //povećaj broj pored njega
                if (this.like.style.color == "rgb(100, 181, 246)") {
                  //ako je korisnik već prije like-ao oglas treba to poništit da ne like-a i dislike-a isti oglas
                  this.numberOfLikesElement.innerHTML =
                    Number(this.numberOfLikesElement.innerHTML) - 1;
                  this.like.style.color = "black";
                }
              }
            });
        });
      });
  }
}

module.exports = PredmetOglasiCard;
