class Controler extends EventTarget {
    constructor(){
        super();
    }

/*     ocjena(ocjena, pomak, username,id){
        this.dispatchEvent(
            new CustomEvent(
                "ocjenjenOglas",
                {detail: {user:{
                    ocjena:ocjena,
                    pomak:pomak,
                    username:username, 
                    id:id}}}
                )
        );
    } */

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