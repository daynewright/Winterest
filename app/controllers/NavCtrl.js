'use strict';

app.controller('NavCtrl', function($scope, AuthFactory, $window, $location, SearchService) {

  let searchText = SearchService.getSearchText();
  $scope.searchText = searchText;

  $scope.$watch('searchText', function(newValue) {
    $scope.searchText = newValue;
    SearchService.setSearchText(newValue);
    console.log('setting searchTerm:', SearchService.getSearchText());
    console.log($scope.searchText);
  });

  // Logs out current user
  $scope.logout = () => {
    AuthFactory.logout()
    .then((logoutData) => {
      $window.location.href = '#/login';
      console.log('Logged out', logoutData);
    });
  };

  firebase.auth().onAuthStateChanged(function(user) {
    $scope.isLoggedIn = AuthFactory.isAuthenticated();
  });

  $scope.isActive = (viewLocation) => viewLocation === $location.path();
});
