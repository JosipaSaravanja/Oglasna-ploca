//Čeka addEventListenerom kad dodajOglas tj controler obavjesti da je dodan novi oglas te kreira kartivu s toim novim oglasom
import Component from "../baseComponent";
import controler from "../modelAndControler";
import OglasTodoCard from "./oglasTodoCard";


class MojiOglasi extends Component {
  constructor() {
    super("div");
    controler.addEventListener("newOglas",
            (event) => {
            this.dodanJeOglas(event.detail.oglas);
        })
  }

  dodanJeOglas(el) {
    console.log(el)
    let oglas = new OglasTodoCard(
    el.id,
    el.kontakt,
    el.opis,
    el.lokacija,
    el.cijena,
    el.razina,
    el.ocjena.like.length,
    el.ocjena.dislike.length,
    el.username
  );
  this.addChild(oglas.rootElement);
  //  container.insertBefore(newElement, container.firstChild)
;
  }
}

module.exports = MojiOglasi;






/* import Component from "../baseComponent";
import IspisOglasa from "./ispisOglasa";
import Controler from "../modelAndControler";
import MojOglas from "./mojOglas";
import NoviOglas from "./noviOglas";

let controler = new Controler();

class NoviOglasi extends Component {
  constructor() {
    super("div");
    
    let grad = document.getElementById("grad");
    let zupanija = document.getElementById("zupanije");
    let opis = document.getElementById("opis");
    let cijena = document.getElementById("cijena");
    let type = document.getElementById("predmet");
    let razina = document.getElementById("razina");

    let user = JSON.parse(localStorage["user"]);

    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", user.username).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let korisnik = doc.data();
          let id = Number();
          if (korisnik.oglasi.length == false) {
            id = 0;
          } else {
            let obj = korisnik.oglasi[korisnik.oglasi.length - 1];
            id = obj.id + 1;
          }
          let noviOglas = {
            cijena: cijena.value,
            id: id,
            lokacija: { grad: grad.value, županija: zupanija.value },
            ocjena: { like: Number(0), dislike: Number(0) },
            opis: opis.value,
            predmet: type.value,
            razina: razina.value,
          };
          let niz = korisnik.oglasi;
          niz.push(noviOglas);
          database.collection("korisnici").doc(doc.id).update({
            oglasi: niz,
          });
          controler.addOglas(noviOglas);

        });
        //location.reload()
      });}

    /*   let user = JSON.parse(localStorage["user"]);

  let database = firebase.firestore();
  database.collection("korisnici").where("username", "==", user.username).get()
.then(function(querySnapshot) {
querySnapshot.forEach(function(doc) {
  let podaci=doc.data()
  database.collection("korisnici").doc(doc.id).update({
    oglasi: {cijena: cijena, lokacija: grad, ocjena: {dislike: 0, like: 0}, opis: opis, razina: razina, type: type}
    })
});
}); */
/* 


let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
      sadrzaj.innerHTML = "";
    } else {
      let database = firebase.firestore();

      database
        .collection("korisnici")
        .where("username", "==", user.username)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach((doc) => {
            let korisnik = doc.data();
            korisnik.oglasi.forEach((el) => {
              let oglas = new MojOglas(
                el.id,
                "korisnik.kontakt",
                el.opis,
                el.lokacija,
                el.cijena,
                el.razina,
                el.ocjena.like,
                el.ocjena.dislike,
                "korisnik.username"
              );
              sadrzaj.appendChild(oglas.rootElement);
            });
          });
        });
    }

    let button = document.createElement("a");
    button.className = "btn modal-trigger col s12 waves-effect waves-light btn";
    button.href = "#modal1";
    button.innerHTML = "Dodaj oglas";

    document.getElementById("dodajOglas").addEventListener("click", () => {
      new NoviOglas();
    });

    controler.addEventListener("dodanJeOglas", (event) => {

      this.dodanOglas(event.detail.oglas);
    });

    this.addChildren([button, sadrzaj]);
  }

  dodanOglas(el) {
    let oglas = new MojOglas(
        el.id,
        el.id,
        el.opis,
        el.lokacija,
        el.cijena,
        el.razina,
        el.ocjena.like,
        el.ocjena.dislike,
        el.id,
      );
      this.addChild(oglas)
  }

  dodajOglas() {
  } 
}

module.exports = NoviOglasi;
 */