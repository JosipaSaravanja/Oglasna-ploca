// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"rLgZZ":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 50808;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "763977495e413c904a13bbff7c175679";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] ???? Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"2YMLy":[function(require,module,exports) {
var _componentsPrviStupac = require("./components/PrviStupac");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _componentsPrviStupacDefault = _parcelHelpers.interopDefault(_componentsPrviStupac);
var _componentsTreciStupac = require("./components/treciStupac");
var _componentsTreciStupacDefault = _parcelHelpers.interopDefault(_componentsTreciStupac);
var _componentsPredmetOglasiCard = require("./components/predmetOglasiCard");
var _componentsPredmetOglasiCardDefault = _parcelHelpers.interopDefault(_componentsPredmetOglasiCard);
M.AutoInit();
document.getElementById("stupac1").appendChild(new _componentsPrviStupacDefault.default().rootElement);
// Dodaje sadr??aj prvom stupcu
let database = firebase.firestore();
database.collection("korisnici").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    let korisnik = doc.data();
    korisnik.oglasi.forEach(el => {
      if (el.predmet == "engleski") {
        let oglas = new _componentsPredmetOglasiCardDefault.default(// za svaki oglas kojem je predmet="matematika" kreira katricu
        korisnik.kontakt, el.opis, korisnik.lokacija, el.cijena, el.razina, el.date, el.ocjena.like, el.ocjena.dislike, el.id, korisnik.username);
        if (el.razina == "osnovna ??kola") {
          // karticu prema razini ubacuje u div za osnovne ili srednje ??kole
          document.getElementById("osnovneSkole").appendChild(oglas.rootElement);
        } else {
          document.getElementById("srednjeSkole").appendChild(oglas.rootElement);
        }
      }
    });
  });
});
document.getElementById("stupac3").appendChild(new _componentsTreciStupacDefault.default().rootElement);

},{"./components/PrviStupac":"6Tngg","./components/treciStupac":"7dnyH","./components/predmetOglasiCard":"6BAjC","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6Tngg":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _neprijavljeni = require("./neprijavljeni");
var _neprijavljeniDefault = _parcelHelpers.interopDefault(_neprijavljeni);
var _prijavljeni = require("./prijavljeni");
var _prijavljeniDefault = _parcelHelpers.interopDefault(_prijavljeni);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class PrviStupac extends _baseComponentDefault.default {
  constructor() {
    super("div");
    _modelAndControlerDefault.default.user == false ? this.addChild(new _neprijavljeniDefault.default().rootElement) : this.addChild(new _prijavljeniDefault.default().rootElement);
  }
}
module.exports = PrviStupac;

},{"../baseComponent":"22hEl","./neprijavljeni":"1YQWG","./prijavljeni":"5qvko","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","../modelAndControler":"5zPz0"}],"22hEl":[function(require,module,exports) {
class Component {
    constructor(rootElementTag) {
        this.rootElement = document.createElement(rootElementTag);
    }

    addChild(element) {
        this.rootElement.appendChild(element);
    }
    addChildren(elementList) {
        elementList.forEach(element => {
            this.rootElement.appendChild(element);
        })
    }
}

module.exports = Component;

},{}],"1YQWG":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
require("../modelAndControler");
class Neprijavljeni extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let naslov = document.createElement("h5");
    naslov.innerHTML = "Prijava";
    this.username = document.createElement("input");
    this.username.placeholder = "Korisni??ko ime";
    this.password = document.createElement("input");
    this.password.placeholder = "Lozinka";
    this.password.type = "password";
    let prijava = document.createElement("a");
    prijava.className = "waves-effect waves-light btn-small";
    prijava.innerHTML = "Prijava";
    prijava.addEventListener("click", () => {
      this.username.value !== "" && this.password.value !== false ? this.prijava() : M.toast({
        html: `Isputnite polja za Korisin??ko ime i Lozinku`
      });
    });
    let ili = document.createElement("p");
    ili.innerHTML = "ILI";
    let registracija = document.createElement("a");
    registracija.className = "waves-effect waves-light btn-small";
    registracija.innerHTML = "Registracija";
    registracija.addEventListener("click", () => {
      this.username.value !== "" && this.password.value !== false ? this.registracija() : M.toast({
        html: `Isputnite polja za Korisin??ko ime i Lozinku`
      });
    });
    let niz = [naslov, this.username, this.password, prijava, ili, registracija];
    niz.forEach(el => {
      let col = document.createElement("div");
      col.className = "col s12";
      col.appendChild(el);
      this.addChild(col);
    });
  }
  prijava() {
    let database = firebase.firestore();
    let prijava = false;
    // gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database.collection("korisnici").where("username", "==", this.username.value).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let podaci = doc.data();
        if (podaci.password == this.password.value) {
          M.toast({
            html: `Uspjesna prijava ${podaci.username}`
          });
          prijava = true;
          // korisnik se prijavio
          localStorage["user"] = JSON.stringify(podaci);
          location.reload();
        }
      });
      prijava == false ? M.toast({
        html: `KNetocno korisnicko ime ili lozinka`
      }) : false;
    });
  }
  registracija() {
    let database = firebase.firestore();
    let vecZauzeto = false;
    // provjerava je li username ve?? zauzet
    database.collection("korisnici").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.data().username == this.username.value ? vecZauzeto = true : false;
      });
      if (vecZauzeto == true) {
        M.toast({
          html: `Korisnicko ime koje ste upisali je ve?? zauzeto`
        });
      } else {
        let obj = {
          id: "",
          username: this.username.value,
          password: this.password.value,
          oglasi: [],
          kontakt: "",
          lokacija: {
            ??upanija: "",
            grad: ""
          }
        };
        database.collection("korisnici").add(obj).then(doc => {
          database.collection("korisnici").doc(doc.id).update({
            id: doc.id
          }).then(() => {
            M.toast({
              html: `${this.username.value}, uspje??no ste se registrirali `
            });
            this.prijava();
          });
        });
      }
    });
  }
}
module.exports = Neprijavljeni;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5zPz0":[function(require,module,exports) {
class Controler extends EventTarget {
    constructor(){
        super(); 
        localStorage.getItem('user')== null?localStorage.setItem('user', false): false;
        this.user=JSON.parse(localStorage["user"]);
        console.log(this.user)
    }

    addOglas(event){
        this.dispatchEvent(
            new CustomEvent(
                "newOglas",
                {detail: {oglas: event}}
                )
        );

    }

    zupanija(event){
        this.dispatchEvent(
            new CustomEvent(
                "zupanije",
                {detail: {zupanija: event}}
                )
        );
    }
}
let controler=new Controler
module.exports = controler;
},{}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"5qvko":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class Prijavljeni extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let img = document.createElement("img");
    img.className = "col s12 m6 l12";
    img.src = `https://icons-for-free.com/iconfiles/png/512/eva+icons+++fill+person-1324449943844961316.png`;
    // kako povezat mapu s ovim dokumentom?
    img.style.textAlign = "center";
    let ime = document.createElement("h5");
    ime.innerHTML = _modelAndControlerDefault.default.user.username;
    this.select = document.createElement("select");
    this.select.id = `zupanije`;
    this.select.className = "browser-default";
    let zupanijeNiz = ["Bjelovarsko-bilogorska ??upanija", "Brodsko-posavska ??upanija", "Dubrova??ko-neretvanska ??upanija", "Grad Zagreb ??upanija", "Istarska ??upanija", "Karlova??ka ??upanija", "Koprivni??ko-kri??eva??ka ??upanija", "Krapinsko-zagorska ??upanija", "Li??ko-senjska ??upanija", "Me??imurska ??upanija", "Osje??ko-baranjska ??upanija", "Po??e??ko-slavonska ??upanija", "Primorsko-goranska ??upanija", "Sisa??ko-moslava??ka ??upanija", "Splitsko-dalmatinska ??upanija", "??ibensko-kninska ??upanija", "Vara??dinska ??upanija", "Viroviti??ko-podravska ??upanija", "Vukovarsko-srijemska ??upanija", "Zadarska ??upanija", "Zagreba??ka ??upanija"];
    zupanijeNiz.forEach(el => {
      let option = document.createElement("option");
      option.innerHTML = el;
      option.value = el;
      this.select.appendChild(option);
    });
    this.select.value = _modelAndControlerDefault.default.user.lokacija.??upanija;
    this.grad = document.createElement("input");
    this.grad.placeholder = "Grad";
    this.grad.value = _modelAndControlerDefault.default.user.lokacija.grad;
    this.kontakt = document.createElement("input");
    this.kontakt.placeholder = "Kontakt";
    this.kontakt.value = _modelAndControlerDefault.default.user.kontakt;
    this.password = document.createElement("input");
    this.password.placeholder = "Lozinka";
    this.password.value = _modelAndControlerDefault.default.user.password;
    this.password.type = "password";
    let spremi = document.createElement("a");
    spremi.className = "waves-effect waves-light btn-small";
    spremi.addEventListener("click", () => {
      this.spremi();
    });
    spremi.style.marginBottom = "5%";
    spremi.innerHTML = `Spremi promjene <i class="material-icons right">save</i>`;
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.addEventListener("click", () => {
      localStorage.setItem('user', false);
      location.reload();
    });
    odjava.innerHTML = `Odjava<i class="material-icons right">exit_to_app</i>`;
    let col = document.createElement("div");
    col.className = "col s12 m6 l12";
    let niz = [ime, this.select, this.grad, this.kontakt, this.password, spremi, odjava];
    niz.forEach(el => {
      let div = document.createElement("div");
      div.appendChild(el);
      col.appendChild(div);
    });
    // svaki element je u svom div-u tako da svaki ima "vlastiti" red te je sve spremljeno u col s m6 pa slika i ostalo stoje jedno do drugoga na meduium ekranima
    this.addChildren([img, col]);
  }
  spremi() {
    let database = firebase.firestore();
    database.collection("korisnici").doc(_modelAndControlerDefault.default.user.id).update({
      password: this.password.value,
      lokacija: {
        ??upanija: this.select.value,
        grad: this.grad.value
      },
      kontakt: this.kontakt.value
    }).then(() => {
      database.collection("korisnici").where("username", "==", _modelAndControlerDefault.default.user.username).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          localStorage["user"] = JSON.stringify(doc.data());
          // localStorage["user"] poprimi nove podatke nakon ??to ih je korisnik update-ao
          location.reload();
        });
      });
    });
  }
}
module.exports = Prijavljeni;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7dnyH":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _mojiOglasi = require("./mojiOglasi");
var _mojiOglasiDefault = _parcelHelpers.interopDefault(_mojiOglasi);
var _dodajOglas = require("./dodajOglas");
var _dodajOglasDefault = _parcelHelpers.interopDefault(_dodajOglas);
var _filter = require("./filter");
var _filterDefault = _parcelHelpers.interopDefault(_filter);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class TreciStupac extends _baseComponentDefault.default {
  constructor() {
    super("div");
    _modelAndControlerDefault.default.user == false ? this.addChild(new _filterDefault.default().rootElement) : this.addChildren([new _dodajOglasDefault.default().rootElement, new _mojiOglasiDefault.default().rootElement]);
  }
}
module.exports = TreciStupac;

},{"../baseComponent":"22hEl","./dodajOglas":"6EMck","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","./filter":"5RHnC","./mojiOglasi":"1LZQR"}],"6EMck":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class DodajOglas extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let button = document.createElement("a");
    button.className = "btn modal-trigger col s12 waves-effect waves-light btn";
    button.href = "#modal1";
    // otvara modal1 iz html tj. obrazac za novi oglas
    button.innerHTML = "Dodaj oglas";
    document.getElementById("dodajOglas").addEventListener("click", () => {
      this.dodajOglas();
    });
    this.addChild(button);
  }
  dodajOglas() {
    let opis = document.getElementById("opis");
    let cijena = document.getElementById("cijena");
    let type = document.getElementById("predmet");
    let razina = document.getElementById("razina");
    // prikuplja podatke iz modal1
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", _modelAndControlerDefault.default.user.username).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let korisnik = doc.data();
        let id = Number();
        // id za oglas
        if (korisnik.oglasi.length == false) {
          id = 0;
        } else {
          let obj = korisnik.oglasi[korisnik.oglasi.length - 1];
          // trazi posljednje uneseni oglas
          id = obj.id + 1;
        }
        let noviOglas = {
          cijena: cijena.value,
          id: id,
          ocjena: {
            like: [],
            dislike: []
          },
          opis: opis.value,
          predmet: type.value,
          razina: razina.value,
          date: new Date().getDate() + ". " + (new Date().getMonth() + 1) + ". " + new Date().getFullYear() + "."
        };
        korisnik.oglasi.push(noviOglas);
        // trenutni niz oglasa push prima novonapravljeni oglas
        database.collection("korisnici").doc(doc.id).update({
          // update-a korisnik.oglasi u firebase-u
          oglasi: korisnik.oglasi
        });
        let tempNiz = noviOglas;
        // U njemu se nalaze svi podaci koji su portrebni da bi preko addEventListenera napravili karticu s podacima o oglasu
        tempNiz["kontakt"] = korisnik.kontakt;
        tempNiz["username"] = korisnik.username;
        tempNiz["lokacija"] = korisnik.lokacija;
        _modelAndControlerDefault.default.addOglas(tempNiz);
      });
      opis.value = "";
      cijena.value = "";
      type.value = "matematika";
      razina.value = "osnovna ??kola";
    });
  }
}
module.exports = DodajOglas;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5RHnC":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
require("./oglasTodoCard");
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class Filter extends _baseComponentDefault.default {
  constructor() {
    super("div");
    this.select = document.createElement("select");
    this.select.id = `zupanije`;
    this.select.className = "browser-default";
    let zupanijeNiz = ["Sve ??upanije", "Bjelovarsko-bilogorska ??upanija", "Brodsko-posavska ??upanija", "Dubrova??ko-neretvanska ??upanija", "Grad Zagreb ??upanija", "Istarska ??upanija", "Karlova??ka ??upanija", "Koprivni??ko-kri??eva??ka ??upanija", "Krapinsko-zagorska ??upanija", "Li??ko-senjska ??upanija", "Me??imurska ??upanija", "Osje??ko-baranjska ??upanija", "Po??e??ko-slavonska ??upanija", "Primorsko-goranska ??upanija", "Sisa??ko-moslava??ka ??upanija", "Splitsko-dalmatinska ??upanija", "??ibensko-kninska ??upanija", "Vara??dinska ??upanija", "Viroviti??ko-podravska ??upanija", "Vukovarsko-srijemska ??upanija", "Zadarska ??upanija", "Zagreba??ka ??upanija"];
    zupanijeNiz.forEach(el => {
      let option = document.createElement("option");
      option.innerHTML = el;
      option.value = el;
      this.select.appendChild(option);
    });
    this.select.addEventListener("change", () => {
      _modelAndControlerDefault.default.zupanija(this.select.value);
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

},{"../baseComponent":"22hEl","./oglasTodoCard":"6SN5t","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6SN5t":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class OglasTodoCard extends _baseComponentDefault.default {
  constructor(id, opis, cijena, predmet, razina, date, likes, dislikes) {
    super("div");
    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    this.id = id;
    let row = document.createElement("div");
    row.className = "row";
    let col = document.createElement("div");
    col.className = "col s12";
    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;
    let info = document.createElement("p");
    info.innerHTML = `
            ${_modelAndControlerDefault.default.user.lokacija.??upanija}, ${_modelAndControlerDefault.default.user.lokacija.grad}<br>
            cijena:  ${cijena} <br>
            predmet: ${predmet} <br>
            razredi: ${razina} <br>
            datum: ${date} <br>
            autor: ${_modelAndControlerDefault.default.user.username}<br>
            kontakt: ${_modelAndControlerDefault.default.user.kontakt} 
        `;
    let ocjena = document.createElement("div");
    ocjena.className = "col s1";
    let like = document.createElement("i");
    like.innerHTML = "thumb_down";
    like.className = "material-icons";
    like.style = "cursor: pointer; vertical-align :-10px;";
    // like.addEventListener("click", /* */)
    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_up";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-3px;";
    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = likes.length;
    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = dislikes.length;
    let col2 = document.createElement("div");
    col2.className = "col s12";
    let button = document.createElement("a");
    button.className = "col s12 waves-effect waves-light btn";
    button.innerHTML = "OBRI??I OGLAS";
    button.addEventListener("click", () => {
      this.removeSelf();
    });
    col2.appendChild(button);
    col.appendChild(opisElement);
    col.appendChild(info);
    col.appendChild(numberOfLikesElement);
    col.appendChild(dislike);
    col.appendChild(like);
    col.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(col2);
    this.addChild(row);
  }
  removeSelf() {
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", _modelAndControlerDefault.default.user.username).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let korisnik = doc.data();
        database.collection("korisnici").doc(doc.id).// pronalazi korisnika
        update({
          oglasi: korisnik.oglasi.filter(item => item.id !== this.id)
        }).then(() => {
          let parent = this.rootElement.parentNode;
          parent.removeChild(this.rootElement);
        });
      });
    });
  }
}
module.exports = OglasTodoCard;

},{"../baseComponent":"22hEl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","../modelAndControler":"5zPz0"}],"1LZQR":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _oglasTodoCard = require("./oglasTodoCard");
var _oglasTodoCardDefault = _parcelHelpers.interopDefault(_oglasTodoCard);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class MojiOglasi extends _baseComponentDefault.default {
  constructor() {
    super("div");
    this.spremljeniOglasi = document.createElement("div");
    this.noviOglasi = document.createElement("div");
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", _modelAndControlerDefault.default.user.username).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let korisnik = doc.data();
        korisnik.oglasi.forEach(el => {
          // pronalazi sve oglase korisnika i ispisuje ih od kraja tako da su oni nedavno uneseni na vrhu
          let oglas = new _oglasTodoCardDefault.default(el.id, el.opis, el.cijena, el.predmet, el.razina, el.date, el.ocjena.like, el.ocjena.dislike);
          this.spremljeniOglasi.insertBefore(oglas.rootElement, this.spremljeniOglasi.firstChild);
        });
      });
    });
    _modelAndControlerDefault.default.addEventListener("newOglas", event => {
      this.dodanJeOglas(event.detail.oglas);
    });
    this.addChildren([this.noviOglasi, this.spremljeniOglasi]);
  }
  dodanJeOglas(el) {
    let oglas = new _oglasTodoCardDefault.default(el.id, el.opis, el.cijena, el.predmet, el.razina, el.date, el.ocjena.like, el.ocjena.dislike);
    this.noviOglasi.insertBefore(oglas.rootElement, this.noviOglasi.firstChild);
  }
}
module.exports = MojiOglasi;

},{"../baseComponent":"22hEl","./oglasTodoCard":"6SN5t","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6BAjC":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class PredmetOglasiCard extends _baseComponentDefault.default {
  constructor(kontakt, opis, lokacija, cijena, razina, date, likes, dislikes, id, username) {
    super("div");
    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    let row = document.createElement("div");
    row.className = "row valign-wrapper";
    let col = document.createElement("div");
    col.className = "col s11";
    this.lokacija = lokacija;
    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;
    let info = document.createElement("p");
    info.innerHTML = `
        ${lokacija.??upanija}, ${lokacija.grad}<br>
        cijena:  ${cijena} <br>
        razredi: ${razina} <br>
        datum: ${date} <br>
        autor: ${username}<br>
        kontakt: ${kontakt} <br>
        `;
    let ocjena = document.createElement("div");
    ocjena.className = "col s1";
    this.id = id;
    this.username = username;
    this.like = document.createElement("i");
    this.like.innerHTML = "thumb_up";
    this.like.className = "material-icons";
    this.like.style = "cursor: pointer; vertical-align :-3px;";
    likes.includes(_modelAndControlerDefault.default.user.username) ? this.like.style.color = "rgb(100, 181, 246)" : false;
    this.like.addEventListener("click", () => {
      _modelAndControlerDefault.default.user !== false ? this.likeFunc() : M.toast({
        html: `Morate se prijaviti da biste ocjenjivali oglase.`
      });
      ;
    });
    this.dislike = document.createElement("i");
    this.dislike.innerHTML = "thumb_down";
    this.dislike.className = "material-icons";
    console.log(opis);
    dislikes.includes(_modelAndControlerDefault.default.user.username) ? this.dislike.style.color = "rgb(229, 115, 115)" : false;
    this.dislike.style = "cursor: pointer; vertical-align :-10px;";
    this.dislike.addEventListener("click", () => {
      _modelAndControlerDefault.default.user !== false ? this.dislikeFunc() : M.toast({
        html: `Morate se prijaviti da biste ocjenjivali oglase.`
      });
      ;
    });
    this.numberOfLikesElement = document.createElement("span");
    this.numberOfLikesElement.innerHTML = likes.length;
    this.numberOfDislikesElement = document.createElement("span");
    this.numberOfDislikesElement.innerHTML = Number(dislikes.length);
    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(this.numberOfLikesElement);
    ocjena.appendChild(this.like);
    ocjena.appendChild(this.dislike);
    ocjena.appendChild(this.numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);
    this.addChild(row);
    _modelAndControlerDefault.default.addEventListener("zupanije", event => {
      this.zupanijaFilter(event.detail.zupanija);
    });
  }
  zupanijaFilter(zupanija) {
    this.rootElement.style.display = "block";
    if (zupanija !== "Sve ??upanije" && this.lokacija.??upanija !== zupanija) {
      this.rootElement.style.display = "none";
    }
  }
  likeFunc() {
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", this.username).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let korisnik = doc.data();
        korisnik.oglasi.map(oglas => {
          if (oglas.id == this.id) {
            // prona??i oglas prema id
            if (oglas.ocjena.like.includes(_modelAndControlerDefault.default.user.username)) {
              oglas.ocjena.like = oglas.ocjena.like.filter(item => item !== _modelAndControlerDefault.default.user.username);
            } else {
              oglas.ocjena.like.push(_modelAndControlerDefault.default.user.username);
              // dodaj korisnika u listu osoba koje su like-ale oglas
              this.dislike.style.color == "rgb(229, 115, 115)" ? // ako je korisnik ve?? prije dislike-ao oglas treba to poni??tit da ne like-a i dislike-a isti oglas
              oglas.ocjena.dislike = oglas.ocjena.dislike.filter(item => item !== _modelAndControlerDefault.default.user.username) : false;
            }
          }
        });
        database.collection("korisnici").doc(doc.id).update({
          oglasi: korisnik.oglasi
        }).then(() => {
          if (this.like.style.color == "rgb(100, 181, 246)") {
            // makni boju s like icone
            this.like.style.color = "black";
            this.numberOfLikesElement.innerHTML = Number(this.numberOfLikesElement.innerHTML) - 1;
          } else {
            this.like.style.color = "rgb(100, 181, 246)";
            // pretvori u plavo
            this.numberOfLikesElement.innerHTML = Number(this.numberOfLikesElement.innerHTML) + 1;
            // pove??aj broj pored
            if (this.dislike.style.color == "rgb(229, 115, 115)") {
              // ako je korisnik ve?? prije dislike-ao oglas treba to poni??tit da ne like-a i dislike-a isti oglas
              this.numberOfDislikesElement.innerHTML = Number(this.numberOfDislikesElement.innerHTML) - 1;
              this.dislike.style.color = "black";
            }
          }
        });
      });
    });
  }
  dislikeFunc() {
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", this.username).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let korisnik = doc.data();
        korisnik.oglasi.map(oglas => {
          if (oglas.id == this.id) {
            if (oglas.ocjena.dislike.includes(_modelAndControlerDefault.default.user.username)) {
              oglas.ocjena.dislike = oglas.ocjena.dislike.filter(item => item !== _modelAndControlerDefault.default.user.username);
            } else {
              oglas.ocjena.dislike.push(_modelAndControlerDefault.default.user.username);
              // dodaj korisnika u listu osoba koje su dislike-ale oglas
              this.like.style.color == "rgb(100, 181, 246)" ? // ako je korisnik ve?? prije like-ao oglas treba to poni??tit da ne like-a i dislike-a isti oglas
              oglas.ocjena.like = oglas.ocjena.like.filter(item => item !== _modelAndControlerDefault.default.user.username) : false;
            }
          }
        });
        database.collection("korisnici").doc(doc.id).update({
          oglasi: korisnik.oglasi
        }).then(() => {
          if (this.dislike.style.color == "rgb(229, 115, 115)") {
            this.dislike.style.color = "black";
            // makni boju s dislike icone
            this.numberOfDislikesElement.innerHTML = Number(this.numberOfDislikesElement.innerHTML) - 1;
          } else {
            this.dislike.style.color = "rgb(229, 115, 115)";
            // pretvori u crveno
            this.numberOfDislikesElement.innerHTML = Number(this.numberOfDislikesElement.innerHTML) + 1;
            // pove??aj broj pored njega
            if (this.like.style.color == "rgb(100, 181, 246)") {
              // ako je korisnik ve?? prije like-ao oglas treba to poni??tit da ne like-a i dislike-a isti oglas
              this.numberOfLikesElement.innerHTML = Number(this.numberOfLikesElement.innerHTML) - 1;
              this.like.style.color = "black";
            }
          }
        });
      });
    });
  }
}
module.exports = PredmetOglasiCard;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["rLgZZ","2YMLy"], "2YMLy", "parcelRequire427e")

//# sourceMappingURL=engleski.7c175679.js.map
