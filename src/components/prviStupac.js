import Component from "../baseComponent";
import Controler from "../modelAndControler";
let controler = new Controler();
import PrijavaOkvir from "./prijavaOkvir";

class PrviStupac extends Component {
  constructor() {
    super("div");
    controler.addEventListener("currentUser", () => {
      this.provjera();
    });
    this.provjera();
    /* if(user==false){
        this.nitkoNijePrijavljen()
     }else{
        this.currentUser()
    }*/
  }
  provjera() {
    let user = JSON.parse(localStorage["user"]);
    if (user == false) {
      this.nitkoNijePrijavljen();
    } else {
      this.currentUser();
    }
  }

  nitkoNijePrijavljen(event) {
    let naslov=document.createElement("h5")
    naslov.className="col s12"
    naslov.innerHTML="Prijava"

    let col1=document.createElement("div")
    col1.className="col s12"
        let username=document.createElement("input")
        username.placeholder="Korisničko ime" 
        col1.appendChild(username)

    let col2=document.createElement("div")
    col2.className="col s12"
        let password=document.createElement("input")
        password.placeholder="Lozinka" 
        col2.appendChild(password)

    let col3=document.createElement("div")
    col3.className="col s12"
        let prijava=document.createElement("a")
        prijava.className="waves-effect waves-light btn-small"
        prijava.innerHTML="Prijava"
        col3.appendChild(prijava)

    let col4=document.createElement("div")
    col4.className="col s12"
    col4.innerHTML="ILI"

    let col5=document.createElement("div")
    col5.className="col s12"
        let registracija=document.createElement("a")
        registracija.className="waves-effect waves-light btn-small"
        registracija.innerHTML="Registracija"
        col5.appendChild(registracija)
    
    prijava.addEventListener("click", () => {this.prijava(username, password)});
    registracija.addEventListener("click", () => {this.registracija(username, password)});
        
    this.addChildren([
            naslov,
            col1, 
            col2,
            col3,
            col4,
            col5
        ]);



/* 
    console.log("hi" + this);
    let naslov = document.createElement("a");
    naslov.style = "color: black";
    naslov.innerHTML = `<h5 class="col s12">Prijava</h5>`;
    this.addChild(naslov); */
  }

  currentUser() {
    let user = JSON.parse(localStorage["user"]);

    let logOut = document.createElement("button");
    logOut.innerHTML = "Odjavite se";

    let pogledajProfil = document.createElement("a");
    pogledajProfil.className = "waves-effect waves-light btn-small";
    pogledajProfil.innerHTML = "Pogledajte profil";
    pogledajProfil.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      controler.user(user);
      
    });

    let ime = document.createElement("h5");
    ime.innerHTML = user.username;

    logOut.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify("");
      document.getElementById("example1").innerHTML = "";
    });
    this.addChildren([ime, pogledajProfil]);
  }
  /* 
    let employees = JSON.parse(localStorage["employees"]);
    if(employees==false){
        this.nitkoNijePrijavljen()
     }else{
        this.currentUser()
    } 
    
    controler.addEventListener("currentUser",
        (event) => {
            if(employees==false){
                this.nitkoNijePrijavljen()
             }else{
                this.currentUser()
            } ; //nova se osoba prijavila/registrirala
    }) 
}

currentUser(event){
    document.getElementById("example1").innerHTML=""
    let employees = JSON.parse(localStorage["employees"]);
    let logOut=document.createElement("button")
    logOut.innerHTML="Odjavite se"
    
    let ime=document.createElement("span")
    ime.innerHTML=employees.username
    
    logOut.addEventListener("click", ()=>
    {localStorage["employees"] = JSON.stringify(""); 
controler.user()}
    )
    this.addChildren([
        logOut,ime
    ])
}

nitkoNijePrijavljen(){
    document.getElementById("example1").innerHTML=""
    let naslov=document.createElement("h5")
    naslov.className="col s12"
    naslov.innerHTML="Prijava"

    let col1=document.createElement("div")
    col1.className="col s12"
        let username=document.createElement("input")
        username.placeholder="Korisničko ime" 
        col1.appendChild(username)

    let col2=document.createElement("div")
    col2.className="col s12"
        let password=document.createElement("input")
        password.placeholder="Lozinka" 
        col2.appendChild(password)

    let col3=document.createElement("div")
    col3.className="col s12"
        let prijava=document.createElement("a")
        prijava.className="waves-effect waves-light btn-small"
        prijava.innerHTML="Prijava"
        col3.appendChild(prijava)

    let col4=document.createElement("div")
    col4.className="col s12"
    col4.innerHTML="ILI"

    let col5=document.createElement("div")
    col5.className="col s12"
        let registracija=document.createElement("a")
        registracija.className="waves-effect waves-light btn-small"
        registracija.innerHTML="Registracija"
        col5.appendChild(registracija)
    
    prijava.addEventListener("click", () => {this.prijava(username, password)});
    registracija.addEventListener("click", () => {this.registracija(username, password)});
        
    this.addChildren([
            naslov,
            col1, 
            col2,
            col3,
            col4,
            col5
        ]);
}

    prijava(username, password){
    let database = firebase.firestore();
    let prijava=false //gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database.collection("korisnici").where("username", "==", username.value).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let podaci = doc.data();
          console.log(podaci)
          if(podaci.password==password.value){
            console.log(`Uspjesna prijava ${podaci.username}`);
              prijava=true //korisnik se prijavio
              controler.user(podaci)
          }
        });
        prijava==false ? console.log("Netocno korisnicko ime ili lozinka") : false; //korisnik se nije prijavio
      });
    
    }

    registracija(username, password){
    let database = firebase.firestore();
    let vecZauzeto=false //provjerava je li username vez zauzet
    database.collection("korisnici").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().username==username.value? vecZauzeto=true : false;
        });
        if(vecZauzeto== true){
            console.log("Korisnicko ime koje ste upisali je već zauzeto")
        } else{
            database.collection("korisnici").add({
                username: username.value,
                password: password.value,
                oglasi: []
                })
            console.log(`${username.value}, uspješno ste se registrirali `)
            controler.user({oglasi:[], username: username.value, password: password.value,})
          
        }
        }); */
}

module.exports = PrviStupac;