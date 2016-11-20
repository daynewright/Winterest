"use strict";

app.controller("SearchCtrl", function($scope, ApiFactory, $uibModal, PinsFactory){

  ApiFactory.getQuotes()
  .then((quotes)=>{
    $scope.quotes = quotes;
    console.log("$scope.quotes");
  });

  $scope.addPin = (quote)=>{
    let quoteObj = {
      title: `Ron Swanson Quote`,
      description: quote,
      imgUrl: 'https://lovelace-media.imgix.net/uploads/413/f4becb20-a4f4-0132-44f6-0ebc4eccb42f.jpg?'
    };
    console.log("quote?", quoteObj);
    PinsFactory.createPin(quoteObj)
    .then ((pin)=>{
      console.log("created successfully", pin);
      whichBoard(pin);
    });
  };

  function whichBoard(pin){
    console.log("what is pin?", pin);
     let modalInstance = $uibModal.open({
      templateUrl: '../partials/ShowBoards.html',
      controller: 'ShowBoardCtrl',
      resolve: {
        pin
      }
    });
  }
});
