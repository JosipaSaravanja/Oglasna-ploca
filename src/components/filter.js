//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";
import controler from "../modelAndControler";

class Filter extends Component {
  constructor() {
    super("div");
    
    this.select=document.createElement("select")
      this.select.id=`zupanije`
      this.select.className="browser-default"
      let zupanijeNiz=[
        "Sve županije", 
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
      this.select.addEventListener("change", ()=>{
        controler.zupanija(this.select.value)
      })
     /*  $('.abc').click(()=>{alert("HELLO")}); */
     /*  let button=document.createElement("a")
      button.className="waves-effect waves-light btn"
      button.innerHTML="Filtriraj"
      button.addEventListener("click", this.filtriraj())

       */
    this.addChildren([this.select]);
  }
  filtriraj(){
  }
}

module.exports = Filter;
