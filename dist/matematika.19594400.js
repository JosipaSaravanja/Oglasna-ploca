// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/modelAndControler.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Controler = /*#__PURE__*/function (_EventTarget) {
  _inherits(Controler, _EventTarget);

  var _super = _createSuper(Controler);

  function Controler() {
    var _this;

    _classCallCheck(this, Controler);

    _this = _super.call(this);
    _this.currentUser = "";
    return _this;
  }

  _createClass(Controler, [{
    key: "user",
    value: function user(_user) {
      this.dispatchEvent(new CustomEvent("currentUser", {
        detail: {
          user: _user
        }
      }));
      localStorage["user"] = JSON.stringify(_user);
      this.currentUser = _user;
      console.log(this.currentUser);
    }
  }]);

  return Controler;
}( /*#__PURE__*/_wrapNativeSuper(EventTarget));

module.exports = Controler;
},{}],"src/baseComponent.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component(rootElementTag) {
    _classCallCheck(this, Component);

    this.rootElement = document.createElement(rootElementTag);
  }

  _createClass(Component, [{
    key: "addChild",
    value: function addChild(element) {
      this.rootElement.appendChild(element);
    }
  }, {
    key: "addChildren",
    value: function addChildren(elementList) {
      var _this = this;

      elementList.forEach(function (element) {
        _this.rootElement.appendChild(element);
      });
    }
  }]);

  return Component;
}();

module.exports = Component; //import TodoApp from "./components/todoApp";
},{}],"src/components/ispisiOglase.js":[function(require,module,exports) {
"use strict";

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var controller = new _modelAndControler.default();

var IspisOglasa = /*#__PURE__*/function (_Component) {
  _inherits(IspisOglasa, _Component);

  var _super = _createSuper(IspisOglasa);

  function IspisOglasa(opis, lokacija, cijena, razina, numberOfLikes, numberOfDislikes) {
    var _this;

    _classCallCheck(this, IspisOglasa);

    _this = _super.call(this, "div");
    _this.rootElement.className = "card-panel grey lighten-5 z-depth-1";
    var row = document.createElement("div");
    row.className = "row valign-wrapper";
    var col = document.createElement("div");
    col.className = "col s11";
    var opisElement = document.createElement("p");
    opisElement.className = "black-text";
    opisElement.innerHTML = opis;
    var info = document.createElement("p");
    info.innerHTML = "\n            lokacija: ".concat(lokacija, " <br>\n            cijena:  ").concat(cijena, " <br>\n            razredi: ").concat(razina, "\n        ");
    var ocjena = document.createElement("div");
    ocjena.className = "col s1";
    var like = document.createElement("i");
    like.innerHTML = "thumb_up";
    like.className = "material-icons";
    like.style = "cursor: pointer; vertical-align :-3px;";
    like.addEventListener("click", function () {
      _this.like();
    });
    var dislike = document.createElement("i");
    dislike.innerHTML = "thumb_down";
    dislike.className = "material-icons";
    dislike.style = "cursor: pointer; vertical-align :-10px;";
    dislike.addEventListener("click", function () {
      _this.dislike();
    });
    var numberOfLikesElement = document.createElement("span");
    numberOfLikesElement.innerHTML = numberOfLikes;
    var numberOfDislikesElement = document.createElement("span");
    numberOfDislikesElement.innerHTML = numberOfDislikes;
    col.appendChild(opisElement);
    col.appendChild(info);
    ocjena.appendChild(numberOfLikesElement);
    ocjena.appendChild(like);
    ocjena.appendChild(dislike);
    ocjena.appendChild(numberOfDislikesElement);
    row.appendChild(col);
    row.appendChild(ocjena);

    _this.addChild(row);

    return _this;
  }

  _createClass(IspisOglasa, [{
    key: "like",
    value: function like() {
      alert("like");
    }
  }, {
    key: "dislike",
    value: function dislike() {
      alert("dislike");
    }
  }, {
    key: "doneSelf",
    value: function doneSelf() {
      controller.addTodo(model.todos[this.id].title, model.todos[this.id].desc, true);
      var parent = this.rootElement.parentNode;
      parent.removeChild(this.rootElement);
    }
  }, {
    key: "removeSelf",
    value: function removeSelf() {
      var parent = this.rootElement.parentNode;
      parent.removeChild(this.rootElement);
    }
  }]);

  return IspisOglasa;
}(_baseComponent.default);

module.exports = IspisOglasa;
},{"../modelAndControler":"src/modelAndControler.js","../baseComponent":"src/baseComponent.js"}],"src/components/prijavaOkvir.js":[function(require,module,exports) {
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
},{}],"src/components/prviStupac.js":[function(require,module,exports) {
"use strict";

var _baseComponent = _interopRequireDefault(require("../baseComponent"));

var _modelAndControler = _interopRequireDefault(require("../modelAndControler"));

var _prijavaOkvir = _interopRequireDefault(require("./prijavaOkvir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var controler = new _modelAndControler.default();

var PrviStupac = /*#__PURE__*/function (_Component) {
  _inherits(PrviStupac, _Component);

  var _super = _createSuper(PrviStupac);

  function PrviStupac() {
    var _this;

    _classCallCheck(this, PrviStupac);

    _this = _super.call(this, "div");
    var user = JSON.parse(localStorage["user"]);

    if (user == false) {
      _this.nitkoNijePrijavljen();
    } else {
      _this.currentUser();
    }

    return _this;
  }

  _createClass(PrviStupac, [{
    key: "nitkoNijePrijavljen",
    value: function nitkoNijePrijavljen(event) {
      var naslov = document.createElement("a");
      naslov.style = "color: black";
      naslov.href = "prijava.html";
      naslov.innerHTML = "<h5 class=\"col s12\">Prijava</h5>";
      this.addChild(naslov);
    }
  }, {
    key: "currentUser",
    value: function currentUser() {
      document.getElementById("example1").innerHTML = "";
      var user = JSON.parse(localStorage["user"]);
      var logOut = document.createElement("button");
      logOut.innerHTML = "Odjavite se";
      var pogledajProfil = document.createElement("a");
      pogledajProfil.className = "waves-effect waves-light btn-small";
      pogledajProfil.innerHTML = "Pogledajte profil";
      pogledajProfil.href = "profil.html";
      var ime = document.createElement("h5");
      ime.innerHTML = user.username;
      logOut.addEventListener("click", function () {
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

  }]);

  return PrviStupac;
}(_baseComponent.default);

module.exports = PrviStupac;
},{"../baseComponent":"src/baseComponent.js","../modelAndControler":"src/modelAndControler.js","./prijavaOkvir":"src/components/prijavaOkvir.js"}],"src/matematika.js":[function(require,module,exports) {
"use strict";

var _ispisiOglase = _interopRequireDefault(require("./components/ispisiOglase"));

var _prviStupac = _interopRequireDefault(require("./components/prviStupac"));

var _baseComponent = _interopRequireDefault(require("./baseComponent"));

var _modelAndControler = _interopRequireDefault(require("./modelAndControler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

M.AutoInit();
var controler = new _modelAndControler.default();
document.getElementById("example1").appendChild(new _prviStupac.default().rootElement);
var database = firebase.firestore();
database.collection("korisnici").get().then(function (querySnapshot) {
  querySnapshot.forEach(function (doc) {
    var korisnik = doc.data();
    korisnik.oglasi.forEach(function (el) {
      if (el.type == "matematika") {
        console.log(el);
        var oglas = new _ispisiOglase.default(el.opis, el.lokacija, el.cijena, el.razina, el.ocjena.like, el.ocjena.dislike);
        document.getElementById("drugiStupac").appendChild(oglas.rootElement);
      }
    });
  });
});
},{"./components/ispisiOglase":"src/components/ispisiOglase.js","./components/prviStupac":"src/components/prviStupac.js","./baseComponent":"src/baseComponent.js","./modelAndControler":"src/modelAndControler.js"}],"../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
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
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62776" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","src/matematika.js"], null)
//# sourceMappingURL=/matematika.19594400.js.map