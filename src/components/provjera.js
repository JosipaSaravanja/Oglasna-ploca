import Component from "../baseComponent";
import Controler from "../modelAndControler";
let controler = new Controler();
import PrijavaOkvir from "./prijavaOkvir";
import Prijava from "./a";
import ProfilOkvir from "./b";

class PrviStupac extends Component {
  constructor() {
    super("div");
    let okvir;
  let user = JSON.parse(localStorage["user"]);
  if (user == false) {
    okvir=new Prijava();
  } else {
    okvir=new ProfilOkvir()
  }
  this.addChild(okvir.rootElement)
}

}

module.exports = PrviStupac;
