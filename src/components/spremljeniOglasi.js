//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";
import controler from "../modelAndControler";

class MojiOglasi extends Component {
  constructor() {
    super("div");
    let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database
      .collection("korisnici")
      .where("username", "==", user.username)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          let korisnik = doc.data();
          korisnik.oglasi.reverse().forEach((el) => {
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
            sadrzaj.appendChild(oglas.rootElement);
          });
        });
      });

    controler.addEventListener("newOglas", (event) => {
      this.dodanJeOglas(event.detail.oglas);
    });

    this.addChild(sadrzaj);
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
      el.ocjena.like.length,
      el.ocjena.dislike.length,
      el.username
    );
    this.addChild(oglas.rootElement);
  } //staviti na početak a ne na kraj
}

module.exports = MojiOglasi;
