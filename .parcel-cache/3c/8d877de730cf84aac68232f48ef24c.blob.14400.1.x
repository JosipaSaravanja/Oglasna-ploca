var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
require("./ispisOglasa");
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
var _mojOglas = require("./mojOglas");
var _mojOglasDefault = _parcelHelpers.interopDefault(_mojOglas);
let controler = new _modelAndControlerDefault.default();
class MojiOglasi extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);
    if (user == false) {
      sadrzaj.innerHTML = "";
    } else {
      let database = firebase.firestore();
      database.collection("korisnici").where("username", "==", user.username).get().then(function (querySnapshot) {
        querySnapshot.forEach(doc => {
          let korisnik = doc.data();
          korisnik.oglasi.forEach(el => {
            let oglas = new _mojOglasDefault.default(el.id, korisnik.kontakt, el.opis, el.lokacija, el.cijena, el.razina, el.ocjena.like, el.ocjena.dislike, korisnik.username);
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
      this.dodajOglas();
    });
    controler.addEventListener("dodanJeOglas", event => {
      this.dodanOglas(event);
    });
    this.addChildren([button, sadrzaj]);
  }
  dodanOglas(event) {
    console.log(event.detail.oglas);
    let oglas = new _mojOglasDefault.default(event.detail.oglas.id, "korisnik.kontakt", event.detail.oglas.opis, event.detail.oglas.lokacija, event.detail.oglas.cijena, event.detail.oglas.razina, event.detail.oglas.ocjena.like.value, event.detail.oglas.ocjena.dislike.value, "korisnik.username");
    sadrzaj.appendChild(oglas.rootElement);
  }
  dodajOglas() {
    let grad = document.getElementById("grad");
    let zupanija = document.getElementById("zupanije");
    let opis = document.getElementById("opis");
    let cijena = document.getElementById("cijena");
    let type = document.getElementById("predmet");
    let razina = document.getElementById("razina");
    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", user.username).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let korisnik = doc.data();
        let id = Number();
        alert(korisnik.oglasi.length);
        if (korisnik.oglasi.length == false) {
          id = 0;
        } else {
          let obj = korisnik.oglasi[length - 1];
          console.log(obj);
        }
        let noviOglas = {
          cijena: cijena.value,
          id: id,
          lokacija: {
            grad: grad.value,
            ??upanija: zupanija.value
          },
          ocjena: {
            like: Number(0),
            dislike: Number(0)
          },
          opis: opis.value,
          predmet: type.value,
          razina: razina.value
        };
        let niz = korisnik.oglasi;
        niz.push(noviOglas);
        database.collection("korisnici").doc(doc.id).update({
          oglasi: niz
        });
      });
    });
  }
}
module.exports = MojiOglasi;
