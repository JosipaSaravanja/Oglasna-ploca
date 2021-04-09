//Gleda je li korisnik prijavljen ili ne te tako mijenja izgled prvog stupca
import Component from "../baseComponent";
import Neprijavljeni from "./neprijavljeni";
import Prijavljeni from "./prijavljeni";

class PrviStupac extends Component {
  constructor() {
    super("div");
    let user=JSON.parse(localStorage["user"]) ;
    user== false ? this.addChild(new Neprijavljeni().rootElement):this.addChild(new Prijavljeni().rootElement);
    //Ukoliko je netko prijavljen this.addChild s podacima, a u suprotnom this.addChild s okvirom za prijavu
}
}

module.exports = PrviStupac;
