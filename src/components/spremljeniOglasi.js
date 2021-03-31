//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";

class SpremljeniOglasi extends Component {
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
              el.razina,
              el.ocjena.like.length,
              el.ocjena.dislike.length,
              korisnik.username
            );
            sadrzaj.appendChild(oglas.rootElement);
          });
        });
      });
    this.addChild(sadrzaj);
  }
}

module.exports = SpremljeniOglasi;
