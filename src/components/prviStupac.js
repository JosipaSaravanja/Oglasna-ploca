//Gleda je li korisnik prijavljen ili ne te utječe na izgled prvog stupca
import Component from "../baseComponent";
/* import Prijava from "./a";
import ProfilOkvir from "./b";  */
import Neprijavljeni from "./neprijavljeni"
import Prijavljeni from "./prijavljeni"

class PrviStupac extends Component {
  constructor() {
    super("div");
    let okvir;
  let user = JSON.parse(localStorage["user"]);
  if (user == false) {
    okvir=new Neprijavljeni();
  } else {
    okvir=new Prijavljeni()
  }
  this.addChild(okvir.rootElement)
}

}

module.exports = PrviStupac;
