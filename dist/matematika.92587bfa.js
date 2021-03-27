// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
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
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
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
          typeof parcelRequire === 'function' && parcelRequire;
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

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

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
})({"693261fdce64f7c1f3ea3e29efa7d420":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 60063;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "92587bfac603c5078c813fec2b20b29a";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
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
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] 🚨 Connection to the HMR server was lost');
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

function getParents(bundle, id) {
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
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
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
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
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
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"75e16f8b051738a96bc7b0a720d20a06":[function(require,module,exports) {
"use strict";

var _provjera = _interopRequireDefault(require("./components/provjera"));

var _ispisiOglase = _interopRequireDefault(require("./components/ispisiOglase"));

var _prviStupac = _interopRequireDefault(require("./components/prviStupac"));

var _baseComponent = _interopRequireDefault(require("./baseComponent"));

var _modelAndControler = _interopRequireDefault(require("./modelAndControler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

M.AutoInit();
let controler = new _modelAndControler.default();
document.getElementById("example1").appendChild(new _provjera.default().rootElement);
let database = firebase.firestore();
database.collection("korisnici").get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    let korisnik = doc.data();
    korisnik.oglasi.forEach(el => {
      if (el.type == "matematika") {
        console.log(el);
        let oglas = new _ispisiOglase.default(el.opis, el.lokacija, el.cijena, el.razina, el.ocjena.like, el.ocjena.dislike);

        if (el.razina == "osnovna škola") {
          document.getElementById("osnovneSkole").appendChild(oglas.rootElement);
        } else {
          document.getElementById("srednjeSkole").appendChild(oglas.rootElement);
        }
      }
    });
  });
});
},{"./components/ispisiOglase":"7c904b832aa29413d9e651ce17739fcd","./components/prviStupac":"7ce67c7c4f6bd4badf1f207c4b0a45d3","./baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85","./modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","./components/provjera":"1813dcd1aade6e6dc456040f5049c1b8"}],"7c904b832aa29413d9e651ce17739fcd":[function(require,module,exports) {
"use strict";

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let controller = new _modelAndControler.default();

class IspisOglasa extends _baseComponent.default {
  constructor(opis, lokacija, cijena, razina, numberOfLikes, numberOfDislikes) {
    super("div");
    this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    let row = document.createElement("div");
    row.className = "row valign-wrapper";
    let col = document.createElement("div");
    col.className = "col s11";
    let opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;
    let info = document.createElement("p");
    info.innerHTML = `
            lokacija: ${lokacija} <br>
            cijena:  ${cijena} <br>
            razredi: ${razina}
        `;
    let ocjena = document.createElement("div");
    ocjena.className = "col s1";
    let like = document.createElement("i");
    like.innerHTML = "thumb_up";
    like.className = "material-icons";
    like.style = "cursor: pointer; vertical-align :-3px;";
    like.addEventListener("click", () => {
      this.like();
    });
    let dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-10px;";
    dislike.addEventListener("click", () => {
      this.dislike();
    });
    let numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = numberOfLikes;
    let numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = numberOfDislikes;
    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(numberOfLikesElement);
    ocjena.appendChild(like);
    ocjena.appendChild(dislike);
    ocjena.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);
    this.addChild(row);
  }

  like() {
    alert("like");
  }

  dislike() {
    alert("dislike");
  }

}

module.exports = IspisOglasa;
},{"../modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","../baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85"}],"6a4ce585180973c3cac8cc2959f4edc8":[function(require,module,exports) {
class Controler extends EventTarget {
  constructor() {
    super();
    this.currentUser = "";
  }

  user(user) {
    this.dispatchEvent(new CustomEvent("currentUser", {
      detail: {
        user: user
      }
    }));
  }

}

module.exports = Controler;
},{}],"51bea57bf2e43e1c5f8f911eabb72d85":[function(require,module,exports) {
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
    });
  }

}

module.exports = Component; //import TodoApp from "./components/todoApp";
},{}],"7ce67c7c4f6bd4badf1f207c4b0a45d3":[function(require,module,exports) {
"use strict";

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _prijavaOkvir = _interopRequireDefault(require("./prijavaOkvir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let controler = new _modelAndControler.default();

class PrviStupac extends _baseComponent.default {
  constructor() {
    super("div");
    controler.addEventListener("currentUser", () => {
      this.provjera();
    });
    this.provjera();
    /* if(user==false){
        this.nitkoNijePrijavljen()
     }else{
        this.currentUser()
    }*/
  }

  provjera() {
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
      this.nitkoNijePrijavljen();
    } else {
      this.currentUser();
    }
  }

  nitkoNijePrijavljen(event) {
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
    /* 
        console.log("hi" + this);
        let naslov = document.createElement("a");
        naslov.style = "color: black";
        naslov.innerHTML = `<h5 class="col s12">Prijava</h5>`;
        this.addChild(naslov); */
  }

  currentUser() {
    let user = JSON.parse(localStorage["user"]);
    let logOut = document.createElement("button");
    logOut.innerHTML = "Odjavite se";
    let pogledajProfil = document.createElement("a");
    pogledajProfil.className = "waves-effect waves-light btn-small";
    pogledajProfil.innerHTML = "Pogledajte profil";
    pogledajProfil.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      controler.user(user);
    });
    let ime = document.createElement("h5");
    ime.innerHTML = user.username;
    logOut.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify("");
      document.getElementById("example1").innerHTML = "";
    });
    this.addChildren([ime, pogledajProfil]);
  }
  /* 
    let employees = JSON.parse(localStorage["employees"]);
    if(employees==false){
        this.nitkoNijePrijavljen()
     }else{
        this.currentUser()
    } 
    
    controler.addEventListener("currentUser",
        (event) => {
            if(employees==false){
                this.nitkoNijePrijavljen()
             }else{
                this.currentUser()
            } ; //nova se osoba prijavila/registrirala
    }) 
  }
  currentUser(event){
    document.getElementById("example1").innerHTML=""
    let employees = JSON.parse(localStorage["employees"]);
    let logOut=document.createElement("button")
    logOut.innerHTML="Odjavite se"
    
    let ime=document.createElement("span")
    ime.innerHTML=employees.username
    
    logOut.addEventListener("click", ()=>
    {localStorage["employees"] = JSON.stringify(""); 
  controler.user()}
    )
    this.addChildren([
        logOut,ime
    ])
  }
  nitkoNijePrijavljen(){
    document.getElementById("example1").innerHTML=""
    let naslov=document.createElement("h5")
    naslov.className="col s12"
    naslov.innerHTML="Prijava"
      let col1=document.createElement("div")
    col1.className="col s12"
        let username=document.createElement("input")
        username.placeholder="Korisničko ime" 
        col1.appendChild(username)
      let col2=document.createElement("div")
    col2.className="col s12"
        let password=document.createElement("input")
        password.placeholder="Lozinka" 
        col2.appendChild(password)
      let col3=document.createElement("div")
    col3.className="col s12"
        let prijava=document.createElement("a")
        prijava.className="waves-effect waves-light btn-small"
        prijava.innerHTML="Prijava"
        col3.appendChild(prijava)
      let col4=document.createElement("div")
    col4.className="col s12"
    col4.innerHTML="ILI"
      let col5=document.createElement("div")
    col5.className="col s12"
        let registracija=document.createElement("a")
        registracija.className="waves-effect waves-light btn-small"
        registracija.innerHTML="Registracija"
        col5.appendChild(registracija)
    
    prijava.addEventListener("click", () => {this.prijava(username, password)});
    registracija.addEventListener("click", () => {this.registracija(username, password)});
        
    this.addChildren([
            naslov,
            col1, 
            col2,
            col3,
            col4,
            col5
        ]);
  }
      prijava(username, password){
    let database = firebase.firestore();
    let prijava=false //gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database.collection("korisnici").where("username", "==", username.value).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let podaci = doc.data();
          console.log(podaci)
          if(podaci.password==password.value){
            console.log(`Uspjesna prijava ${podaci.username}`);
              prijava=true //korisnik se prijavio
              controler.user(podaci)
          }
        });
        prijava==false ? console.log("Netocno korisnicko ime ili lozinka") : false; //korisnik se nije prijavio
      });
    
    }
      registracija(username, password){
    let database = firebase.firestore();
    let vecZauzeto=false //provjerava je li username vez zauzet
    database.collection("korisnici").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().username==username.value? vecZauzeto=true : false;
        });
        if(vecZauzeto== true){
            console.log("Korisnicko ime koje ste upisali je već zauzeto")
        } else{
            database.collection("korisnici").add({
                username: username.value,
                password: password.value,
                oglasi: []
                })
            console.log(`${username.value}, uspješno ste se registrirali `)
            controler.user({oglasi:[], username: username.value, password: password.value,})
          
        }
        }); */


}

module.exports = PrviStupac;
},{"../baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85","../modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","./prijavaOkvir":"3f6df6b1d475bc630fbcbf13b27a7301"}],"3f6df6b1d475bc630fbcbf13b27a7301":[function(require,module,exports) {
/* import Component from "../baseComponent";
import Controler from "../modelAndControler";
let controler = new Controler();

class PrijavaOkvir extends Component {
  constructor() {
    super("div");
    var employees = JSON.parse(localStorage["user"]);
    if(employees==false){
        this.nitkoNijePrijavljen()
     }else{
        this.currentUser()
    } 
    
    controler.addEventListener("currentUser",
        (event) => {
        this.currentUser(event); //nova se osoba prijavila/registrirala
    }) 
}

currentUser(event){
    document.getElementById("example1").innerHTML=""
    let employees = JSON.parse(localStorage["user"]);
    let logOut=document.createElement("button")
    logOut.innerHTML="Odjavite se"
    
    let ime=document.createElement("span")
    ime.innerHTML=employees.username
    
    logOut.addEventListener("click", ()=>
    {localStorage["user"] = JSON.stringify("");
    document.getElementById("example1").innerHTML="";
      this.nitkoNijePrijavljen()}
    )
    this.addChildren([
        logOut,ime
    ])
}
nitkoNijePrijavljen(){
    let naslov=document.createElement("h5")
    naslov.className="col s12"
    naslov.innerHTML="Prijava"

    let col1=document.createElement("div")
    col1.className="col s12"
        let username=document.createElement("input")
        username.placeholder="Korisničko ime" 
        col1.appendChild(username)

    let col2=document.createElement("div")
    col2.className="col s12"
        let password=document.createElement("input")
        password.placeholder="Lozinka" 
        col2.appendChild(password)

    let col3=document.createElement("div")
    col3.className="col s12"
        let prijava=document.createElement("a")
        prijava.className="waves-effect waves-light btn-small"
        prijava.innerHTML="Prijava"
        col3.appendChild(prijava)

    let col4=document.createElement("div")
    col4.className="col s12"
    col4.innerHTML="ILI"

    let col5=document.createElement("div")
    col5.className="col s12"
        let registracija=document.createElement("a")
        registracija.className="waves-effect waves-light btn-small"
        registracija.innerHTML="Registracija"
        col5.appendChild(registracija)
    
    prijava.addEventListener("click", () => {this.prijava(username, password)});
    registracija.addEventListener("click", () => {this.registracija(username, password)});
        
    this.addChildren([
            naslov,
            col1, 
            col2,
            col3,
            col4,
            col5
        ]);

}

    prijava(username, password){
    let database = firebase.firestore();
    let prijava=false //gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password
    database.collection("korisnici").where("username", "==", username.value).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let podaci = doc.data();
          console.log(podaci)
          if(podaci.password==password.value){
            console.log(`Uspjesna prijava ${podaci.username}`);
              prijava=true //korisnik se prijavio
              controler.user(podaci)
          }
        });
        prijava==false ? console.log("Netocno korisnicko ime ili lozinka") : false; //korisnik se nije prijavio
      });
    
    }

    registracija(username, password){
    let database = firebase.firestore();
    let vecZauzeto=false //provjerava je li username vez zauzet
    database.collection("korisnici").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().username==username.value? vecZauzeto=true : false;
        });
        if(vecZauzeto== true){
            console.log("Korisnicko ime koje ste upisali je već zauzeto")
        } else{
            database.collection("korisnici").add({
                username: username.value,
                password: password.value,
                oglasi: []
                })
            console.log(`${username.value}, uspješno ste se registrirali `)
            controler.user({oglasi:[], username: username.value, password: password.value,})
          
        }
        });
        
    } 
  /* prijava(event) {
    alert("Radi");
    this.okvir.innerHTML = ``;
  } 
}

module.exports = PrijavaOkvir;
 */
},{}],"1813dcd1aade6e6dc456040f5049c1b8":[function(require,module,exports) {
"use strict";

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _prijavaOkvir = _interopRequireDefault(require("./prijavaOkvir"));

var _a = _interopRequireDefault(require("./a"));

var _b = _interopRequireDefault(require("./b"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let controler = new _modelAndControler.default();

class PrviStupac extends _baseComponent.default {
  constructor() {
    super("div");
    let okvir;
    let user = JSON.parse(localStorage["user"]);

    if (user == false) {
      okvir = new _a.default();
    } else {
      okvir = new _b.default();
    }

    this.addChild(okvir.rootElement);
  }

}

module.exports = PrviStupac;
},{"../baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85","../modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","./prijavaOkvir":"3f6df6b1d475bc630fbcbf13b27a7301","./a":"375a5258caf6dc0b518a545994caa4d3","./b":"e34e4c435f27878ea90c57ca39993270"}],"375a5258caf6dc0b518a545994caa4d3":[function(require,module,exports) {
"use strict";

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _prijavaOkvir = _interopRequireDefault(require("./prijavaOkvir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let controler = new _modelAndControler.default();

class Prijava extends _baseComponent.default {
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
    let prijava = false; //gleda da li se korisnik uspio prijaviti tj. da li je ispravno i username i password

    database.collection("korisnici").where("username", "==", username.value).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        let podaci = doc.data();
        console.log(podaci);

        if (podaci.password == password.value) {
          console.log(`Uspjesna prijava ${podaci.username}`);
          prijava = true; //korisnik se prijavio

          localStorage["user"] = JSON.stringify(podaci);
          controler.user();
          location.reload();
        }
      });
      prijava == false ? console.log("Netocno korisnicko ime ili lozinka") : false; //korisnik se nije prijavio
    });
  }

  registracija(username, password) {
    let database = firebase.firestore();
    let vecZauzeto = false; //provjerava je li username vez zauzet

    database.collection("korisnici").get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.data().username == username.value ? vecZauzeto = true : false;
      });

      if (vecZauzeto == true) {
        console.log("Korisnicko ime koje ste upisali je već zauzeto");
      } else {
        let obj = {
          username: username.value,
          password: password.value,
          oglasi: [],
          kontakt: 0
        };
        database.collection("korisnici").add(obj);
        console.log(`${username.value}, uspješno ste se registrirali `);
        this.prijava(username, password);
      }
    });
  }

}

module.exports = Prijava;
},{"../baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85","../modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","./prijavaOkvir":"3f6df6b1d475bc630fbcbf13b27a7301"}],"e34e4c435f27878ea90c57ca39993270":[function(require,module,exports) {
"use strict";

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _prijavaOkvir = _interopRequireDefault(require("./prijavaOkvir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let controler = new _modelAndControler.default();

class ProfilOkvir extends _baseComponent.default {
  constructor() {
    super("div");
    let user = JSON.parse(localStorage["user"]);
    let odjava = document.createElement("a");
    odjava.className = "waves-effect waves-light btn-small";
    odjava.innerHTML = "Odjavite se";
    odjava.addEventListener("click", () => {
      localStorage["user"] = JSON.stringify(false);
      controler.user(user);
      location.reload();
    });
    let ime = document.createElement("h5");
    ime.innerHTML = user.username;
    this.addChildren([ime, odjava]);
  }

}

module.exports = ProfilOkvir;
},{"../baseComponent":"51bea57bf2e43e1c5f8f911eabb72d85","../modelAndControler":"6a4ce585180973c3cac8cc2959f4edc8","./prijavaOkvir":"3f6df6b1d475bc630fbcbf13b27a7301"}]},{},["693261fdce64f7c1f3ea3e29efa7d420","75e16f8b051738a96bc7b0a720d20a06"], null)

//# sourceMappingURL=matematika.92587bfa.js.map