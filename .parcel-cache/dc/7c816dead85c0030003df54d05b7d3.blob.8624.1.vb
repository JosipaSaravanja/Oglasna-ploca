// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyA_bA0LS0eefdaWyqKe-qyL7U-zHuoOe-k",
    authDomain: "oglasna-ploca.firebaseapp.com",
    projectId: "oglasna-ploca",
    storageBucket: "oglasna-ploca.appspot.com",
    messagingSenderId: "738452914857",
    appId: "1:738452914857:web:e02497ec7cfbd129e59fb8",
    measurementId: "G-2L3E02TT43"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
    $(document).ready(function () {
        $('.scrollspy').scrollSpy();
    });//nešto za dodatak materialize-a