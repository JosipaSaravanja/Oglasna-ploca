class Controler extends EventTarget {
    constructor(){
        super();
        this.currentUser="";
    }

    user(user){
        this.dispatchEvent(
            new CustomEvent(
                "currentUser",
                {detail: {user: user}}
                )
        );
    }
}

module.exports = Controler;