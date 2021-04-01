//Kad se korisnik ulogira ispisuje mu (u trecem stupcu) sve oglase koje je vec unio
import Component from "../baseComponent";
import OglasTodoCard from "./oglasTodoCard";
import controler from "../modelAndControler";

class Filter extends Component {
  constructor() {
    super("div");
    let form=document.createElement("form")
    form.action=`#`
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
          let p=document.createElement("p")
          p.innerHTML=`<label>
          <input type="checkbox" />
          <span>${el}</span>
        </label>`
        form.appendChild(p)
      })
    
    this.addChild(form);
  }
}

module.exports = Filter;
