//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";
import controler from "../modelAndControler";

class MojiOglasi extends Component {
  constructor() {
    super("div");
    let sadrzaj = document.createElement("div");
    this.noviOglasi=document.createElement("div");
    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", user.username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => { 
          let korisnik = doc.data();
          korisnik.oglasi.reverse().forEach((el) => {//pronalazi sve oglase korisnika i ispisuje ih od kraja tako da su oni nedavno uneseni na vrhu
            let oglas = new OglasTodoCard(
              el.id,
              korisnik.kontakt,
              el.opis,
              korisnik.lokacija,
              el.cijena,
              el.predmet,
              el.razina,
              el.ocjena.like,
              el.ocjena.dislike,
              korisnik.username
            );
            sadrzaj.appendChild(oglas.rootElement); //zasto mi ne pronalazi this
          });
        });
      });

    controler.addEventListener("newOglas", (event) => {
      this.dodanJeOglas(event.detail.oglas); //reagira kada je kreiran novi oglas
    });
    this.addChildren([this.noviOglasi, sadrzaj]);
  }

  dodanJeOglas(el) {
    console.log(el);
    let oglas = new OglasTodoCard(
      el.id,
      el.kontakt,
      el.opis,
      el.lokacija,
      el.cijena,
      el.predmet,
      el.razina,
      el.ocjena.like,
      el.ocjena.dislike,
      el.username
    );
    this.noviOglasi.appendChild(oglas.rootElement);
  } //kako staviti da se novi oglas stavi na početak this.novihOglasa?
}

module.exports = MojiOglasi;
