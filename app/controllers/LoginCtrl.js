'use strict';

app.controller('LoginCtrl', function($scope, AuthFactory, $window) {
  $scope.account = {
    email: "",
    password: ""
  };

  $scope.loginWithEmailAndPassword = () => {
    AuthFactory.loginUserWithEmail($scope.account)
    .then((data) => {
      console.log("logged in with email", data);
      $window.location.href = '#/boards/list';
    });
  };

  $scope.registerWithEmailAndPassword = () => {
    AuthFactory.createUser($scope.account)
    .then((data) => {
      console.log("User registered with email and password", data);
      AuthFactory.loginUserWithEmail($scope.account);
    });
  };

  $scope.loginWithGoogle = () => {
    AuthFactory.loginUserWithGoogle()
    .then((userData) => {
      if (userData) {
        console.info('User data after successful login:', userData);
        $window.location.href = '#/boards/list';
      }
    });
    console.log('loginWithGoogle clicked');

  };
});
