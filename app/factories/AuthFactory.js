'use strict';

app.factory('AuthFactory', ($q) => {

  var uid = null;

  let getUserId = () => {
    return firebase.auth().currentUser.uid;

  };

  let createUser = (userObj) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error) {
      let errorCode = error.code;
      let errorMessage = error.Message;
    });
  };

  let loginUserWithEmail = (userObj) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
    .then((userData) => {
      return $q.resolve(userData);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.Message;
      console.error(errorCode, errorMessage);
    });
  };

  let loginUserWithGoogle = function(){
    let provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then((userData) => {
        return $q.resolve(userData);
      })
      .catch(function(error){
        console.error("Oops, there was an error logging in:", error);
    });
  };


  let logout = () => {
    return firebase.auth().signOut();
  };

  let isAuthenticated = () => (firebase.auth().currentUser) ? true : false;

  return {
    createUser,
    getUserId,
    isAuthenticated,
    loginUserWithEmail,
    loginUserWithGoogle,
    logout
  };
});
