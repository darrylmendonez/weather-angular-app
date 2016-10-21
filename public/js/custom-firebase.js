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
  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignup = document.getElementById('btnSignup');
  const btnLogout = document.getElementById('btnLogout');
  const preObject = document.getElementById('object');

  // Listen for file selection
  fileButton.addEventListener('change', function(e) {
    // Get file
    var file = e.target.files[0];
    // Create a storage references
    var storageRef = firebase.storage().ref('sweet_gifs/' + file.name);
    // Upload file
    var task = storageRef.put(file);
    // Update progress bar
    task.on('state_changed',

      function progress(snapshot) {
        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploader.value = percentage;
      },

      function error(err) {

      },

      function complete() {

      }

    );
  });

  // Add login event
  btnLogin.addEventListener('click', e => {
    // Get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Add signup event
  btnSignUp.addEventListener('click', e=> {
    // Get email and password
    // TODO: CHECK FOR REAL EMAIL ADDRESS
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  // Add a realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    // User is logged in
    if(firebaseUser) {
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
      btnLogin.classList.add('hide');
      btnSignUp.classList.add('hide');
    }
    // User is logged out
    else {
      console.log('not logged in');
      btnLogout.classList.add('hide');
      btnLogin.classList.remove('hide');
      btnSignUp.classList.remove('hide');
    }
  });

  // Create references
  const dbRefObject = firebase.database().ref().child('object');

  // Sync object changes
  // dbRefObject.on('value', snap => console.log(snap.val()));
  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
  });

}());
