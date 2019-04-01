importScripts('https://www.gstatic.com/firebasejs/5.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.1.0/firebase-messaging.js');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC6CuD2XXyZ90tWgf_2CdMtdIAMcl7oRXs",
    authDomain: "wordpress-blog-b4013.firebaseapp.com",
    databaseURL: "https://wordpress-blog-b4013.firebaseio.com",
    projectId: "wordpress-blog-b4013",
    storageBucket: "wordpress-blog-b4013.appspot.com",
    messagingSenderId: "679476202160"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();