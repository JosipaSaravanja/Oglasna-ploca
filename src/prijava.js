
import Component from "./baseComponent";
import Controler from "./modelAndControler";
let controler = new Controler()
let username=document.getElementById("username")
let password=document.getElementById("password")
let kontakt=document.getElementById("kontakt")
document.getElementById("prijava").addEventListener("click", () => {prijava()});
document.getElementById("registracija").addEventListener("click", () => {registracija()});

function prijava(){
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
        prijava==false ? console.log("Netocno korisnicko ime ili lozinka") : document.getElementById("link").innerHTML=`<a href="index.html">Natrag na početnu</a>`; //korisnik se nije prijavio
      });
    
    }

function registracija(){
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
                kontakt: kontakt.value,
                oglasi: []
                })
            console.log(`${username.value}, uspješno ste se registrirali `)
            document.getElementById("link").innerHTML=`<a href="index.html">Natrag na početnu</a>`
            controler.user({oglasi:[], username: username.value, password: password.value, kontakt: kontakt.value,})
          
        }
        });
        
    } 

