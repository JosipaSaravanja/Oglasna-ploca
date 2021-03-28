//Služi za dodavaje oglasa u firebase i kreira dispatch event (preko controlera) te obvježtava novi oglase da treba dodati taj novouneseni oglas na listu u trcem stupcu
import Component from "../baseComponent";
import controler from "../modelAndControler";

class DodajOglas extends Component {
  constructor() {
    super("div");
    let button = document.createElement("a");
    button.className = "btn modal-trigger col s12 waves-effect waves-light btn";
    button.href = "#modal1";
    button.innerHTML = "Dodaj oglas";

    document.getElementById("dodajOglas").addEventListener("click", () => {
      this.dodajOglas();
    });

    this.addChild(button);
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
            ocjena: { like: [], dislike: [] },
            opis: opis.value,
            predmet: type.value,
            razina: razina.value,
          };
          let niz = korisnik.oglasi;
          niz.push(noviOglas);
          database.collection("korisnici").doc(doc.id).update({
            oglasi: niz,
          });
          
          let tempNiz=noviOglas; //U njemu se nalaze svi podaci koji su portrebni da bi novi oglasi preko addEventListenera napravili novu kartivu 
          tempNiz["kontakt"]=korisnik.kontakt;
          tempNiz["username"]= korisnik.username;
          controler.addOglas(tempNiz);
          
        });
        grad.value=""
        zupanija.value="Bjelovarsko-bilogorska županija";
        opis.value="";
        cijena.value="";
        type.value="matematika";
        razina.value="osnovna škola"
      });
  }
}

module.exports = DodajOglas;
