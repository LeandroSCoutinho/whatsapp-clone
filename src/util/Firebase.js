const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyCcpy-FEe2E11YcLohyMD5Vys-7ruIt8dI",
            authDomain: "whatsapp-clone-e4717.firebaseapp.com",
            projectId: "whatsapp-clone-e4717",
            storageBucket: "whatsapp-clone-e4717.appspot.com",
            messagingSenderId: "220044125756",
            appId: "1:220044125756:web:4fcab2eed05295b47ec539"
        }

        this.init();

    }

    init(){

        if(!window._initializedFirebase){            
           const app = initializeApp(firebaseConfig);

           firebase.initializeApp(this._config);

           firebase.firestore().settings({
            timestampsInSnapshots:true
           });

           window._initializedFirebase = true;
        }
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        
        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider()

            firebase.auth().signInWithPopup(provider).then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user, 
                    token
                });
            }).catch(err=>{
                f(err);
            });
        });
    }

}