var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class Prijavljeni extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);
    let img = document.createElement("img");
    img.className = "col s12 m6 l12";
    img.src = `https://icons-for-free.com/iconfiles/png/512/eva+icons+++fill+person-1324449943844961316.png`;
    img.style.textAlign = "center";
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      _modelAndControlerDefault.default.user(user);
      location.reload();
    });
    odjava.innerHTML = `Odjavite se <i class="material-icons right">exit_to_app</i>`;
    let ime = document.createElement("h5");
    ime.className = "col s12 m6 l12";
    ime.innerHTML = user.username;
    let select = document.createElement("select");
    select.id = `zupanije`;
    select.className = "browser-default";
    let zupanijeNiz = ["Bjelovarsko-bilogorska županija", "", "Brodsko-posavska županija", "Dubrovačko-neretvanska županija", "Grad Zagreb županija", "Istarska županija", "Karlovačka županija", "Koprivničko-križevačka županija", "Krapinsko-zagorska županija", "Ličko-senjska županija", "Međimurska županija", "Osječko-baranjska županija", "Požeško-slavonska županija", "Primorsko-goranska županija", "Sisačko-moslavačka županija", "Splitsko-dalmatinska županija", "Šibensko-kninska županija", "Varaždinska županija", "Virovitičko-podravska županija", "Vukovarsko-srijemska županija", "Zadarska županija", "Zagrebačka županija"];
    zupanijeNiz.forEach(el => {
      let option = document.createElement("option");
      option.innerHTML = el;
      option.value = el;
      select.append(option);
    });
    let col = document.createElement("col");
    col.className = "col s12 m6 l12";
    col.appendChild(select);
    /*
    <option value="Bjelovarsko-bilogorska županija">Bjelovarsko-bilogorska županija</option>
    <option value="Brodsko-posavska županija">Brodsko-posavska županija</option>
    <option value="Dubrovačko-neretvanska županija">Dubrovačko-neretvanska županija</option>
    <option value="Grad Zagreb županija">Grad Zagreb županija</option>
    <option value="Istarska županija">Istarska županija</option>
    <option value="Karlovačka županija">Karlovačka županija</option>
    <option value="Koprivničko-križevačka županija">Koprivničko-križevačka županija</option>
    <option value="Krapinsko-zagorska županija">Krapinsko-zagorska županija</option>
    <option value="Ličko-senjska županija">Ličko-senjska županija</option>
    <option value="Međimurska županija">Međimurska županija</option>
    <option value="Osječko-baranjska županija">Osječko-baranjska županija</option>
    <option value="Požeško-slavonska županija">Požeško-slavonska županija</option>
    <option value="Primorsko-goranska županija">Primorsko-goranska županija</option>
    <option value="Sisačko-moslavačka županija">Sisačko-moslavačka županija</option>
    <option value="Splitsko-dalmatinska županija">Splitsko-dalmatinska županija</option>
    <option value="Šibensko-kninska županija">Šibensko-kninska županija</option>
    <option value="Varaždinska županija">Varaždinska županija</option>
    <option value="Virovitičko-podravska županija">Virovitičko-podravska županija</option>
    <option value="Vukovarsko-srijemska županija">Vukovarsko-srijemska županija</option>
    <option value="Zadarska županija">Zadarska županija</option>
    <option value="Zagrebačka županija">Zagrebačka županija</option>
    </select>*/
    this.addChildren([img, ime, col, odjava]);
  }
}
module.exports = Prijavljeni;
