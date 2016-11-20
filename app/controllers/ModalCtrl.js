'use strict';

app.controller('ModalCtrl', function($scope, $uibModalInstance, AuthFactory, BoardsFactory, $route, board, isEditing) {
  $scope.board = board;
  $scope.isEditing = isEditing;

  $scope.create = () => {
    $scope.board.uid = AuthFactory.getUserId();
    BoardsFactory.createBoard($scope.board)
    .then(()=>{
      $scope.board = {};
      $uibModalInstance.close();
      return BoardsFactory.getBoards();
    })
    .then((boards)=>{
      console.log("boards", boards);
      $route.reload();
    });
  };

  $scope.close = () => {
    $uibModalInstance.close();
    $scope.board = {};
  };

  $scope.update = (board)=>{
    let updatedBoard = {
      title: board.title,
      description: board.description
    };
    BoardsFactory.updateBoard(updatedBoard, board.id)
    .then(()=>{
      console.log("successful edit");
      $scope.board = {};
      $uibModalInstance.close();
      return BoardsFactory.getBoards();
    })
    .then((boards)=>{
      console.log("boards", boards);
      $route.reload();
    });
  };

});
