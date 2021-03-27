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
})({"2Yuwv":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 58596;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "0fa2489aa94c8731ee2aee9f3fafb3e2";
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
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
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
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
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
          🚨 ${diagnostic.message}
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

},{}],"5rkFb":[function(require,module,exports) {
var _componentsPrviStupac = require("./components/PrviStupac");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _componentsPrviStupacDefault = _parcelHelpers.interopDefault(_componentsPrviStupac);
var _componentsTreciStupac = require("./components/treciStupac");
var _componentsTreciStupacDefault = _parcelHelpers.interopDefault(_componentsTreciStupac);
M.AutoInit();
localStorage["user"];
/*localStorage["user"]  = JSON.stringify({username: "ante"})
*/
/*console.log(JSON.parse(localStorage["user"]))*/
document.getElementById("example1").appendChild(new _componentsPrviStupacDefault.default().rootElement);
/*
document.getElementById("treciStupac").appendChild(new MojiOglasi().rootElement)*/
document.getElementById("treciStupac").appendChild(new _componentsTreciStupacDefault.default().rootElement);

},{"./components/PrviStupac":"6Tngg","./components/treciStupac":"7dnyH","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6Tngg":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _neprijavljeni = require("./neprijavljeni");
var _neprijavljeniDefault = _parcelHelpers.interopDefault(_neprijavljeni);
var _prijavljeni = require("./prijavljeni");
var _prijavljeniDefault = _parcelHelpers.interopDefault(_prijavljeni);
class PrviStupac extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let okvir;
    let user = JSON.parse(localStorage["user"]);
    if (user == false) {
      okvir = new _neprijavljeniDefault.default();
    } else {
      okvir = new _prijavljeniDefault.default();
    }
    this.addChild(okvir.rootElement);
  }
}
module.exports = PrviStupac;

},{"../baseComponent":"22hEl","./neprijavljeni":"1YQWG","./prijavljeni":"5qvko","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"22hEl":[function(require,module,exports) {
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

//import TodoApp from "./components/todoApp";

},{}],"1YQWG":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
class Neprijavljeni extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let naslov = document.createElement("h5");
    naslov.className = "col s12";
    naslov.innerHTML = "Prijava";
    let col1 = document.createElement("div");
    col1.className = "col s12";
    let username = document.createElement("input");
    username.placeholder = "Korisničko ime";
    col1.appendChild(username);
    let col2 = document.createElement("div");
    col2.className = "col s12";
    let password = document.createElement("input");
    password.placeholder = "Lozinka";
    col2.appendChild(password);
    let col3 = document.createElement("div");
    col3.className = "col s12";
    let prijava = document.createElement("a");
    prijava.className = "waves-effect waves-light btn-small";
    prijava.innerHTML = "Prijava";
    col3.appendChild(prijava);
    let col4 = document.createElement("div");
    col4.className = "col s12";
    col4.innerHTML = "ILI";
    let col5 = document.createElement("div");
    col5.className = "col s12";
    let registracija = document.createElement("a");
    registracija.className = "waves-effect waves-light btn-small";
    registracija.innerHTML = "Registracija";
    col5.appendChild(registracija);
    prijava.addEventListener("click", () => {
      this.prijava(username, password);
    });
    registracija.addEventListener("click", () => {
      this.registracija(username, password);
    });
    this.addChildren([naslov, col1, col2, col3, col4, col5]);
  }
  prijava(username, password) {
    let database = firebase.firestore();
    let prijava = false;
    // gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database.collection("korisnici").where("username", "==", username.value).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let podaci = doc.data();
        console.log(podaci);
        if (podaci.password == password.value) {
          M.toast({
            html: `Uspjesna prijava ${podaci.username}`
          });
          prijava = true;
          // korisnik se prijavio
          localStorage["user"] = JSON.stringify(podaci);
          _modelAndControlerDefault.default.user();
          location.reload();
        }
      });
      prijava == false ? alert("Netocno korisnicko ime ili lozinka") : false;
    });
  }
  registracija(username, password) {
    let database = firebase.firestore();
    let vecZauzeto = false;
    // provjerava je li username vez zauzet
    database.collection("korisnici").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.data().username == username.value ? vecZauzeto = true : false;
      });
      if (vecZauzeto == true) {
        alert("Korisnicko ime koje ste upisali je već zauzeto");
      } else {
        let obj = {
          username: username.value,
          password: password.value,
          oglasi: [],
          kontakt: ""
        };
        database.collection("korisnici").add(obj);
        M.toast({
          html: `${username.value}, uspješno ste se registrirali `
        });
        this.prijava(username, password);
      }
    });
  }
}
module.exports = Neprijavljeni;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5zPz0":[function(require,module,exports) {
class Controler extends EventTarget {
    constructor(){
        super();
    }

     user(user){
        this.dispatchEvent(
            new CustomEvent(
                "currentUser",
                {detail: {user: user}}
                )
        );
    } 

    addOglas(event){
        this.dispatchEvent(
            new CustomEvent(
                "newOglas",
                {detail: {oglas: event}}
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
    let user = JSON.parse(localStorage["user"]);
    let img = document.createElement("div");
    img.className = "col s12 m6 l12";
    // img.innerHTML=`<img src="images/1.jpg" width="100%" height="100%" />`;
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
    ime.innerHTML = user.username;
    this.addChildren([img, ime, odjava]);
  }
}
module.exports = Prijavljeni;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7dnyH":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _spremljeniOglasi = require("./spremljeniOglasi");
var _spremljeniOglasiDefault = _parcelHelpers.interopDefault(_spremljeniOglasi);
var _dodajOglas = require("./dodajOglas");
var _dodajOglasDefault = _parcelHelpers.interopDefault(_dodajOglas);
require("../modelAndControler");
var _noviOglas = require("./noviOglas");
var _noviOglasDefault = _parcelHelpers.interopDefault(_noviOglas);
class TreciStupac extends _baseComponentDefault.default {
  constructor() {
    super("div");
    this.rootElement.className = "row z-depth-5";
    let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);
    if (user == false) {
      sadrzaj.innerHTML = "";
    } else {
      let spremljeniOglasi = new _spremljeniOglasiDefault.default();
      let dodajOglas = new _dodajOglasDefault.default();
      let noviOglas = new _noviOglasDefault.default();
      this.addChildren([dodajOglas.rootElement, noviOglas.rootElement, spremljeniOglasi.rootElement]);
    }
  }
}
module.exports = TreciStupac;

},{"../baseComponent":"22hEl","./spremljeniOglasi":"jgwZ0","./dodajOglas":"6EMck","../modelAndControler":"5zPz0","./noviOglas":"3ClHC","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"jgwZ0":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _oglasTodoCard = require("./oglasTodoCard");
var _oglasTodoCardDefault = _parcelHelpers.interopDefault(_oglasTodoCard);
class SpremljeniOglasi extends _baseComponentDefault.default {
  constructor() {
    super("div");
    let sadrzaj = document.createElement("div");
    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", user.username).get().then(function (querySnapshot) {
      querySnapshot.forEach(doc => {
        let korisnik = doc.data();
        korisnik.oglasi.reverse().forEach(el => {
          let oglas = new _oglasTodoCardDefault.default(el.id, korisnik.kontakt, el.opis, el.lokacija, el.cijena, el.razina, el.ocjena.like.length, el.ocjena.dislike.length, korisnik.username);
          sadrzaj.appendChild(oglas.rootElement);
        });
      });
    });
    this.addChild(sadrzaj);
  }
}
module.exports = SpremljeniOglasi;

},{"../baseComponent":"22hEl","./oglasTodoCard":"6SN5t","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6SN5t":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
class OglasTodoCard extends _baseComponentDefault.default {
  constructor(id, kontakt, opis, lokacija, cijena, razina, numberOfLikes, numberOfDislikes, username) {
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
            lokacija: ${lokacija.županija}, ${lokacija.grad}<br>
            cijena:  ${cijena} <br>
            razredi: ${razina} <br>
            kontakt: ${kontakt}
        `;
    let ocjena = document.createElement("div");
    ocjena.className = "col s1";
    let like = document.createElement("i");
    like.innerHTML = "thumb_up";
    like.className = "material-icons";
    like.style = "vertical-align :-3px;";
    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "vertical-align :-10px;";
    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = numberOfLikes;
    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = numberOfDislikes;
    let col2 = document.createElement("div");
    col2.className = "col s12";
    let button = document.createElement("a");
    button.className = "col s12 waves-effect waves-light btn";
    button.innerHTML = "OBRIŠI OGLAS";
    button.addEventListener("click", () => {
      this.removeSelf(id, username);
    });
    col2.appendChild(button);
    col.appendChild(opisElement);
    col.appendChild(info);
    col.appendChild(numberOfLikesElement);
    col.appendChild(like);
    col.appendChild(dislike);
    col.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(col2);
    this.addChild(row);
  }
  removeSelf(id, username) {
    let parent = this.rootElement.parentNode;
    parent.removeChild(this.rootElement);
    let database = firebase.firestore();
    console.log(username);
    database.collection("korisnici").where("username", "==", username).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let korisnik = doc.data();
        database.collection("korisnici").doc(doc.id).update({
          oglasi: korisnik.oglasi.filter(item => item.id !== id)
        });
      });
    });
  }
}
module.exports = OglasTodoCard;

},{"../baseComponent":"22hEl","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6EMck":[function(require,module,exports) {
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
    button.innerHTML = "Dodaj oglas";
    document.getElementById("dodajOglas").addEventListener("click", () => {
      this.dodajOglas();
    });
    this.addChild(button);
  }
  dodajOglas() {
    let grad = document.getElementById("grad");
    let zupanija = document.getElementById("zupanije");
    let opis = document.getElementById("opis");
    let cijena = document.getElementById("cijena");
    let type = document.getElementById("predmet");
    let razina = document.getElementById("razina");
    let user = JSON.parse(localStorage["user"]);
    let database = firebase.firestore();
    database.collection("korisnici").where("username", "==", user.username).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let korisnik = doc.data();
        let id = Number();
        if (korisnik.oglasi.length == false) {
          id = 0;
        } else {
          let obj = korisnik.oglasi[korisnik.oglasi.length - 1];
          id = obj.id + 1;
        }
        let noviOglas = {
          cijena: cijena.value,
          id: id,
          lokacija: {
            grad: grad.value,
            županija: zupanija.value
          },
          ocjena: {
            like: [],
            dislike: []
          },
          opis: opis.value,
          predmet: type.value,
          razina: razina.value
        };
        let niz = korisnik.oglasi;
        niz.push(noviOglas);
        database.collection("korisnici").doc(doc.id).update({
          oglasi: niz
        });
        let tempNiz = noviOglas;
        // U njemu se nalaze svi podaci koji su portrebni da bi novi oglasi preko addEventListenera napravili novu kartivu
        tempNiz["kontakt"] = korisnik.kontakt;
        tempNiz["username"] = korisnik.username;
        _modelAndControlerDefault.default.addOglas(tempNiz);
      });
    });
    grad.value = "";
    zupanija.value = "Bjelovarsko-bilogorska županija";
    opis.value = "";
    cijena.value = "";
    type.value = "matematika";
    razina.value = "osnovna škola";
  }
}
module.exports = DodajOglas;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3ClHC":[function(require,module,exports) {
var _baseComponent = require("../baseComponent");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _baseComponentDefault = _parcelHelpers.interopDefault(_baseComponent);
var _modelAndControler = require("../modelAndControler");
var _modelAndControlerDefault = _parcelHelpers.interopDefault(_modelAndControler);
var _oglasTodoCard = require("./oglasTodoCard");
var _oglasTodoCardDefault = _parcelHelpers.interopDefault(_oglasTodoCard);
class MojiOglasi extends _baseComponentDefault.default {
  constructor() {
    super("div");
    _modelAndControlerDefault.default.addEventListener("newOglas", event => {
      this.dodanJeOglas(event.detail.oglas);
    });
  }
  dodanJeOglas(el) {
    console.log(el);
    let oglas = new _oglasTodoCardDefault.default(el.id, el.kontakt, el.opis, el.lokacija, el.cijena, el.razina, el.ocjena.like.length, el.ocjena.dislike.length, el.username);
    this.addChild(oglas.rootElement);
    // container.insertBefore(newElement, container.firstChild)
    ;
  }
}
module.exports = MojiOglasi;

},{"../baseComponent":"22hEl","../modelAndControler":"5zPz0","./oglasTodoCard":"6SN5t","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["2Yuwv","5rkFb"], "5rkFb", "parcelRequire427e")

//# sourceMappingURL=index.3fafb3e2.js.map
