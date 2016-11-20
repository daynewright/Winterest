'use strict';

app.controller('BoardSingleCtrl', function($scope, $routeParams, BoardsFactory, PinsFactory, $uibModal, $route, SearchService) {
  $scope.message = 'Single board pins be here!';

  $scope.$watch(function () { return SearchService.getSearchText(); }, function (newValue, oldValue) {
       if (newValue !== null) {
           $scope.searchText= SearchService.getSearchText();
       }
   }, true);

  let boardId = $routeParams.boardId;

  $scope.pinUpdate = (pin)=>{
    let modalInstance = $uibModal.open({
      templateUrl: '../partials/PinsModal.html',
      controller: 'PinModalCtrl',
      resolve: {
        pin,
        isEditing: true
      }
    });
  };

  let getBoardPins = ()=> {
    BoardsFactory.getSingleBoard(boardId)
    .then((singleBoard) => {
      console.log(singleBoard);
      $scope.board = singleBoard;
      return PinsFactory.getPins($routeParams.boardId);
    })
    .then ((pins) => {
      console.log(pins);
      $scope.pins = pins;

      // Drag and drop functionality
      // Watch the pins. If any value on any pin changes, run the callback fn
      // Docs: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch
      $scope.$watch('pins', function handlePinIndexChange(newValue, oldValue) {
        // Uncomment the line below to see the pins update their index
        // console.log('Updated pins:', newValue);
        PinsFactory.updateAllPinsOnBoard($scope.pins);
      }, true);
    });
  };

  $scope.open = () => {
     let modalInstance = $uibModal.open({
      templateUrl: '../partials/PinsModal.html',
      controller: 'PinModalCtrl',
      resolve: {
        pin: {
          title: '',
          description: '',
          imgUrl: '',
          boardId: $routeParams.boardId,
        },
        isEditing: false
      }
    });
  };

  $scope.pinDelete = (pinId)=> {
    PinsFactory.deletePin(pinId)
    .then(()=> {
      getBoardPins();
      console.log('pin delete: ', pinId);
    });
  };

  getBoardPins();

});
