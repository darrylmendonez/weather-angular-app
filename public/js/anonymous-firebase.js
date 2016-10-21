/*jshint esversion: 6 */
(function() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyD47bzHiB7-xdsAd5WT0ed2ucqAVeGxHdQ",
    authDomain: "angular-weather-app.firebaseapp.com",
    databaseURL: "https://angular-weather-app.firebaseio.com",
    storageBucket: "angular-weather-app.appspot.com",
    messagingSenderId: "119916706625"
  };
  firebase.initializeApp(config);

  // Get elements
  const messaging = firebase.messaging();
  const btnLogin = document.getElementById('btnLogin');
  const btnLogout = document.getElementById('btnLogout');

  // messaging
  messaging.requestPermission()
  .then(function() {
    console.log('Permision Granted');
  })
  .catch(function(err) {
    console.log('Access Denied');
  });


  // Click login event listener
  btnLogin.addEventListener('click', e => {
    firebase.auth().signInAnonymously();
  });

  // Click logout event listener
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Auth listener
  firebase.auth().onAuthStateChanged(firebaseuser => {
    console.log(firebaseuser);
    if(firebaseuser) {
      btnLogin.classList.add('hide');
      btnLogout.classList.remove('hide');
    } else {
      btnLogin.classList.remove('hide');
      btnLogout.classList.add('hide');
    }
  });

}());
