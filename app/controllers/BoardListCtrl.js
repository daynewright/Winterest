'use strict';

app.controller('BoardListCtrl', function($scope, $uibModal, boards, $location, BoardsFactory, SearchService) {
  $scope.boards = boards;

  $scope.$watch(function () { return SearchService.getSearchText(); }, function (newValue, oldValue) {
       if (newValue !== null) {
           $scope.searchText= SearchService.getSearchText();
       }
   }, true);

  $scope.boardEdit= (board)=>{
    let modalInstance = $uibModal.open({
      templateUrl: '/pinterest-d15-team-winterest/partials/ModalView.html',
      controller: 'ModalCtrl',
      resolve: {
        board,
        isEditing: true
      }
    });
  };

  $scope.open = () => {
    let modalInstance = $uibModal.open({
      templateUrl: '/pinterest-d15-team-winterest/partials/ModalView.html',
      controller: 'ModalCtrl',
      resolve: {
        board: {
          title: "",
          description: ""
        },
        isEditing: false
      }
    });
  };

  $scope.viewBoard = (boardId)=>{
    $location.path(`/boards/${boardId}`);
  };

  $scope.boardDelete = (boardId)=> {
    BoardsFactory.deleteBoard(boardId)
    .then(() => {
      console.log('board deleted:', boardId);
      console.info('Repainting DOM with boards.');
      return BoardsFactory.getBoards();
    })
    .then((boards) => {
      $scope.boards = boards;
    });
  };
});
