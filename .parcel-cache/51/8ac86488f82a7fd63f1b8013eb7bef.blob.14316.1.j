var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _spremljeniOglasi = require("./spremljeniOglasi");
var _spremljeniOglasiDefault = _parcelHelpers.interopDefault(_spremljeniOglasi);
var _dodajOglas = require("./dodajOglas");
var _dodajOglasDefault = _parcelHelpers.interopDefault(_dodajOglas);
var _filter = require("./filter");
var _filterDefault = _parcelHelpers.interopDefault(_filter);
require("../modelAndControler");
class TreciStupac extends _baseComponentDefault.default {
  constructor() {
    super("div");
    this.rootElement.className = "row z-depth-5";
    let user = JSON.parse(localStorage["user"]);
    if (user == false) {
      let filter = new _filterDefault.default();
      this.addChild(filter);
    } else {
      let spremljeniOglasi = new _spremljeniOglasiDefault.default();
      let dodajOglas = new _dodajOglasDefault.default();
      this.addChildren([dodajOglas.rootElement, spremljeniOglasi.rootElement]);
    }
  }
}
module.exports = TreciStupac;
