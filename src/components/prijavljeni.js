//Izgled dprvog stuopca ukoliko je netko prijavljen
import Component from "../baseComponent";
import controler from "../modelAndControler";


class Prijavljeni extends Component {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);

    let img=document.createElement("img")
    img.className="col s12 m6 l12"
    img.src=`https://icons-for-free.com/iconfiles/png/512/eva+icons+++fill+person-1324449943844961316.png`;
    img.style.textAlign="center"
    
    let ime = document.createElement("h5");
    ime.className="col s12 m6 l12"
    ime.innerHTML = user.username;

    
    let select=document.createElement("select")
      select.id=`zupanije`
      select.className="browser-default"
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
          let option=document.createElement("option")
          option.innerHTML=el
          option.value=el
          console.log(user.lokacija.županija)
        select.append(option)
      })
      select.value=user.lokacija.županija
      
      
    let grad=document.createElement("input")
    grad.innerHTML=user.lokacija.grad 
    console.log(user.lokacija.grad)
    grad.value=user.lokacija.grad 
 
    let kontakt=document.createElement("input")
    kontakt.innerHTML=user.kontakt 
    console.log(user.kontakt)
    kontakt.value=user.kontakt

    let password=document.createElement("input")
    password.value=user.password 
    password.type="password"

    let spremi = document.createElement("a");
    spremi.className = "waves-effect waves-light btn-small";
/*     spremi.addEventListener("click", () => {
      let database = firebase.firestore();
      database.collection("korisnici").where("username", "==", user.username).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
         
          database.collection("korisnici").doc(doc.id).update({
            password: password.value,
            lokacija:{županija: select.value, grad: grad.value},
            kontakt: kontakt.value
          });
        })
      });
    }); */

    spremi.style.marginBottom="5%"
    spremi.innerHTML = `Spremi promjene <i class="material-icons right">save</i>`;
      
    
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      location.reload()
    });
    odjava.innerHTML = `Odjavite se <i class="material-icons right">exit_to_app</i>`;
      
    let col=document.createElement("col")
      col.className="col s12 m6 l12"
      col.appendChild(select)
      col.appendChild(grad)
      col.appendChild(kontakt)
      col.appendChild(password)
      col.appendChild(spremi)
      col.appendChild(odjava)

    this.addChildren([img, ime, col]);
}
}

module.exports = Prijavljeni;
