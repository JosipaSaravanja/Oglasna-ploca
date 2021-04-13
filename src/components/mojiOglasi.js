//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";
import controler from "../modelAndControler";

class MojiOglasi extends Component {
  constructor() {
    super("div");
    this.spremljeniOglasi = document.createElement("div");
    this.noviOglasi=document.createElement("div");
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", controler.user.username)
      .get()
      .then((querySnapshot) =>{
        querySnapshot.forEach((doc) => { 
          let korisnik = doc.data();
          korisnik.oglasi.forEach((el) => {//pronalazi sve oglase korisnika i ispisuje ih od kraja tako da su oni nedavno uneseni na vrhu
            let oglas = new OglasTodoCard(
              el.id,
              el.opis,
              el.cijena,
              el.predmet,
              el.razina,
              el.date,
              el.ocjena.like,
              el.ocjena.dislike,
            );
            this.spremljeniOglasi.insertBefore(
              oglas.rootElement, 
              this.spremljeniOglasi.firstChild) 
          });
        });
      });

    controler.addEventListener("newOglas", (event) => {
      this.dodanJeOglas(event.detail.oglas); //reagira kada je kreiran novi oglas
    });
    this.addChildren([this.noviOglasi, this.spremljeniOglasi]);
  }

  dodanJeOglas(el) {
    let oglas = new OglasTodoCard(
      el.id,
      el.opis,
      el.cijena,
      el.predmet,
      el.razina,
      el.date,
      el.ocjena.like,
      el.ocjena.dislike,
    );
    this.noviOglasi.insertBefore(
      oglas.rootElement, 
      this.noviOglasi.firstChild);}
}

module.exports = MojiOglasi;
