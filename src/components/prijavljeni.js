//Izgled prvog stupca ukoliko je netko prijavljen
import Component from "../baseComponent";
import controler from "../modelAndControler";

class Prijavljeni extends Component {
  constructor() {
    super("div");
    let img=document.createElement("img");
    img.className="col s12 m6 l12";
    img.src=`https://icons-for-free.com/iconfiles/png/512/eva+icons+++fill+person-1324449943844961316.png`;//kako povezat mapu s ovim dokumentom?
    img.style.textAlign="center";
    
    let ime = document.createElement("h5");
    ime.innerHTML = controler.user.username;

    this.select=document.createElement("select")
      this.select.id=`zupanije`
      this.select.className="browser-default"
      let zupanijeNiz=[
        "Bjelovarsko-bilogorska županija",
        "Brodsko-posavska županija",
        "Dubrovačko-neretvanska županija",
        "Grad Zagreb županija",
        "Istarska županija",
        "Karlovačka županija",
        "Koprivničko-križevačka županija",
        "Krapinsko-zagorska županija",
        "Ličko-senjska županija",
        "Međimurska županija",
        "Osječko-baranjska županija",
        "Požeško-slavonska županija",
        "Primorsko-goranska županija",
        "Sisačko-moslavačka županija",
        "Splitsko-dalmatinska županija",
        "Šibensko-kninska županija",
        "Varaždinska županija",
        "Virovitičko-podravska županija",
        "Vukovarsko-srijemska županija",
        "Zadarska županija",
        "Zagrebačka županija"]
      zupanijeNiz.forEach(el=>{
        let option=document.createElement("option");
        option.innerHTML=el;
        option.value=el;
        this.select.appendChild(option);
      })
      this.select.value=controler.user.lokacija.županija;
      
      
    this.grad=document.createElement("input");
    this.grad.placeholder="Grad";
    this.grad.value=controler.user.lokacija.grad ;
 
    this.kontakt=document.createElement("input");
    this.kontakt.placeholder="Kontakt";
    this.kontakt.value=controler.user.kontakt;

    this.password=document.createElement("input");
    this.password.placeholder="Lozinka";
    this.password.value=controler.user.password;
    this.password.type="password";

    let spremi = document.createElement("a");
    spremi.className = "waves-effect waves-light btn-small";
    spremi.addEventListener("click", ()=>{this.spremi()})
    spremi.style.marginBottom="5%";
    spremi.innerHTML = `Spremi promjene <i class="material-icons right">save</i>`;
      
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.addEventListener("click", () => {
      localStorage.setItem('user', false);
      location.reload();
    });
    odjava.innerHTML = `Odjava<i class="material-icons right">exit_to_app</i>`;

    let col=document.createElement("div");
    col.className="col s12 m6 l12";
      let niz=[ime, this.select, this.grad, this.kontakt, this.password, spremi, odjava];
      niz.forEach(el=>{
        let div=document.createElement("div");
          div.appendChild(el);
          col.appendChild(div);
      })//svaki element je u svom div-u tako da svaki ima "vlastiti" red te je sve spremljeno u col s m6 pa slika i ostalo stoje jedno do drugoga na meduium ekranima
      this.addChildren([img, col]);
}
  spremi(){
    let database = firebase.firestore();
        database.collection("korisnici").doc(controler.user.id).update({
          password: this.password.value,
          lokacija:{županija: this.select.value, grad: this.grad.value},
          kontakt: this.kontakt.value
        }).then(() => {
          database.collection("korisnici").where("username", "==", controler.user.username).get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              localStorage["user"] = JSON.stringify(doc.data());//localStorage["user"] poprimi nove podatke nakon što ih je korisnik update-ao
              location.reload() 
            })
          });
          })
  } 
}

module.exports = Prijavljeni;
