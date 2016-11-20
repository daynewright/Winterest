'use strict';

app.controller('PinModalCtrl', function($scope, $uibModalInstance, PinsFactory, $route, $routeParams, pin, isEditing) {
  console.log("is editing", isEditing);
  $scope.pin = pin;
  $scope.isEditing = isEditing;

  $scope.update = (pin, pinId) => {
    let pinObj = {
      title: pin.title,
      description: pin.description,
      imgUrl: pin.imgUrl
    };
    PinsFactory.updatePin(pinObj, pinId)
    .then(()=>{
      $scope.pin = {};
      $uibModalInstance.close();
      return PinsFactory.getPins($routeParams.boardId);
    })
    .then((pins)=>{
      console.log("pins", pins);
      $route.reload();
    });
  };

  $scope.create = () => {
    console.log("boardId", $routeParams.boardId);
    PinsFactory.createPin($scope.pin)
    .then(()=>{
      $scope.pin = {};
      $uibModalInstance.close();
      return PinsFactory.getPins($routeParams.boardId);
    })
    .then((pins)=>{
      console.log("pins", pins);
      $route.reload();
    });
  };

  $scope.close = () => {
    $uibModalInstance.close();
    $scope.pin = {};
  };
});
