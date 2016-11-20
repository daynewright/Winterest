"use strict";

app.controller("TopCtrl", ($route, $window)=>{
  firebase.auth().onAuthStateChanged(function(user){
    if (user){
      console.log("Current user logged is?", user.uid);
      //This will manually start the digest cycle
      $route.reload();
      // $scope.$apply();
    } else {
      console.log("no user");
      $window.location.href = '#/login';
    }
  });
});
