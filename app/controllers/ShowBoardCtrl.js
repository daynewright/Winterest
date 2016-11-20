"use strict";

app.controller("ShowBoardCtrl", (BoardsFactory, $uibModalInstance, $scope, PinsFactory, pin)=>{

  $scope.close = () => {
    $uibModalInstance.close();
  };

  BoardsFactory.getBoards()
    .then((boards)=>{
      console.log("boards", boards);
      $scope.boards = boards;
  });

  $scope.addPinToBoard = (board)=>{
    console.log("pin", pin);
    let boardId = {boardId: board.id};
    let pinId = pin.name;
    console.log("what is the board id?", board.id);
    PinsFactory.updatePin(boardId, pinId)
    .then((pin)=>{
      console.log("pin updated successfully", pin);
      $scope.close();
    });
  };

});