var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
require("./oglasTodoCard");
require("../modelAndControler");
class Filter extends _baseComponentDefault.default {
  constructor() {
    super("div");
    this.select = document.createElement("select");
    this.select.id = `zupanije`;
    this.select.className = "browser-default";
    let zupanijeNiz = ["Bjelovarsko-bilogorska županija", "Brodsko-posavska županija", "Dubrovačko-neretvanska županija", "Grad Zagreb županija", "Istarska županija", "Karlovačka županija", "Koprivničko-križevačka županija", "Krapinsko-zagorska županija", "Ličko-senjska županija", "Međimurska županija", "Osječko-baranjska županija", "Požeško-slavonska županija", "Primorsko-goranska županija", "Sisačko-moslavačka županija", "Splitsko-dalmatinska županija", "Šibensko-kninska županija", "Varaždinska županija", "Virovitičko-podravska županija", "Vukovarsko-srijemska županija", "Zadarska županija", "Zagrebačka županija"];
    zupanijeNiz.forEach(el => {
      let option = document.createElement("option");
      option.innerHTML = el;
      option.value = el;
      this.select.appendChild(option);
    });
    /*$('.abc').click(()=>{alert("HELLO")});*/
    /*let button=document.createElement("a")
    button.className="waves-effect waves-light btn"
    button.innerHTML="Filtriraj"
    button.addEventListener("click", this.filtriraj())
    
    */
    this.addChildren([this.select]);
  }
  filtriraj() {}
}
module.exports = Filter;
