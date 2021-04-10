//Izgled prvog stupca ukoliko nitko nije prijavljen
import Component from "../baseComponent";
import controler from "../modelAndControler";

class Neprijavljeni extends Component {
  constructor() {
    super("div");

    let naslov = document.createElement("h5");
    naslov.innerHTML = "Prijava";

    this.username = document.createElement("input");
    this.username.placeholder = "Korisničko ime";

    this.password = document.createElement("input");
    this.password.placeholder = "Lozinka";
    this.password.type = "password";

    let prijava = document.createElement("a");
    prijava.className = "waves-effect waves-light btn-small";
    prijava.innerHTML = "Prijava";
    prijava.addEventListener("click", () => {
      this.prijava();
    });

    let ili = document.createElement("p");
    ili.innerHTML = "ILI";

    let registracija = document.createElement("a");
    registracija.className = "waves-effect waves-light btn-small";
    registracija.innerHTML = "Registracija";
    registracija.addEventListener("click", () => {
      this.registracija(this.password);
    });

    let niz = [naslov, this.username, this.password, prijava, ili, registracija];
    niz.forEach((el) => {
      console.log(el);
      let col = document.createElement("div");
      col.className = "col s12";
      col.appendChild(el);
      this.addChild(col);
    });     
  }
  prijava() {
    let database = firebase.firestore();
    let prijava = false; //gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database
      .collection("korisnici")
      .where("username", "==", this.username.value)
      .get()
      .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          let podaci = doc.data();
          console.log(podaci);
          if (podaci.password == this.password.value) {
            M.toast({ html: `Uspjesna prijava ${podaci.username}` });
            prijava = true; //korisnik se prijavio
            localStorage["user"] = JSON.stringify(podaci);
            location.reload();
          }
        });
        prijava == false ? alert("Netocno korisnicko ime ili lozinka") : false; //korisnik se nije prijavio
      });
  }

  registracija() {
    let database = firebase.firestore();
    let vecZauzeto = false; //provjerava je li username već zauzet
    database
      .collection("korisnici")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.data().username == this.username.value ? vecZauzeto = true : false; //ukoliko je korisnicko ime vec zauzeto mjenja se vrijadnost vecZauzeto
        });
        if (vecZauzeto == true) {
          M.toast({ html: `Korisnicko ime koje ste upisali je već zauzeto` });
        } else {
          let obj = {
            id: "",
            username: this.username.value,
            password: this.password.value,
            oglasi: [],
            kontakt: "",
            lokacija: { županija: "", grad: "" },
          };
          database.collection("korisnici").add(obj).then((doc)=>{
            database.collection("korisnici").doc(doc.id).update({
              id: doc.id,
            }).then(()=>{
            M.toast({ html: `${this.username.value}, uspješno ste se registrirali ` });
            this.prijava(); })//automatski se i prijavi
          })//dodaje novi doc u firebase
        }
      });
  }
}

module.exports = Neprijavljeni;
