//Služi za dodavaje oglasa u firebase i kreira dispatch event (preko controlera) te obvježtava novi oglase da treba dodati taj novouneseni oglas na listu u trcem stupcu
import Component from "../baseComponent";
import controler from "../modelAndControler";

class DodajOglas extends Component {
  constructor() {
    super("div");
    let button = document.createElement("a");
    button.className = "btn modal-trigger col s12 waves-effect waves-light btn";
    button.href = "#modal1"; //otvara modal1 iz html tj. obrazac za novi oglas
    button.innerHTML = "Dodaj oglas";

    document.getElementById("dodajOglas").addEventListener("click", () => {
      this.dodajOglas();
    });

    this.addChild(button);
  }



  dodajOglas() {
    let opis = document.getElementById("opis");
    let cijena = document.getElementById("cijena");
    let type = document.getElementById("predmet");
    let razina = document.getElementById("razina");
    //prikuplja podatke iz modal1

    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", user.username).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let korisnik = doc.data();
          let id = Number(); //id za oglas
          if (korisnik.oglasi.length == false) {
            id = 0;//ukoliko nema unesenih oglasa id je 0
          } else {
            let obj = korisnik.oglasi[korisnik.oglasi.length - 1]; //trazi posljednje uneseni oglas
            id = obj.id + 1; //id je za jedan veći od id-a posljednje unesenog oglasa
          }
          let noviOglas = {
            cijena: cijena.value,
            id: id,
            ocjena: { like: [], dislike: [] },
            opis: opis.value,
            predmet: type.value,
            razina: razina.value,
          };
          korisnik.oglasi.push(noviOglas); //trenutni niz oglasa push prima novonapravljeni oglas 
          database.collection("korisnici").doc(doc.id).update({ //update-a korisnik.oglasi u firebase-u
            oglasi: korisnik.oglasi
          });
          
          let tempNiz=noviOglas; //U njemu se nalaze svi podaci koji su portrebni da bi preko addEventListenera napravili karticu s podacima o oglasu 
          tempNiz["kontakt"]=korisnik.kontakt;
          tempNiz["username"]= korisnik.username;
          tempNiz["lokacija"]= korisnik.lokacija;
          controler.addOglas(tempNiz); //poziva funkciju iz controlera i prosljeđuje potrebne podatke *(mojiOglasi reagira na addEventListener koji controler.addOglas() napravi)
          
        });
        opis.value="";
        cijena.value="";
        type.value="";//kako da napravim da je value odmah na pocetku ="", ja sam probala napravit u matematika.html jedan option s samim praznim prostorom
        razina.value=""; //briše values inputima da budu spremni za novi unos
      });
  }
}

module.exports = DodajOglas;
