'use strict';

app.factory('BoardsFactory', ($q, $http, FirebaseURL, AuthFactory, PinsFactory) => {
  let createBoard = (boardObj) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/boards.json`, JSON.stringify(boardObj))
        .success((objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };

  let getBoards = ()=>{
    let boards = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}boards.json?orderBy="uid"&equalTo="${AuthFactory.getUserId()}"`)
        .success((objFromFirebase) => {
          Object.keys(objFromFirebase).forEach((key)=>{
            objFromFirebase[key].id = key;
            boards.push(objFromFirebase[key]);
          });
          resolve(boards);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    })
    .then((boards) => {
      // Adding a property to each board called imgUrls
      // that contains four pin images to be displayed
      // on a user's Boards page
      boards.forEach((board) => {
        getImgUrlsFromBoard(board);
      });

      console.info('New modified boards with imgUrls:', boards);
      return $q.resolve(boards);
    });
  };

  // Internal function, no need to export
  function getImgUrlsFromBoard(board) {
    // Augmenting the board object to include a list of image urls
    return PinsFactory.getPins(board.id)
      .then((pinsArray) => {
        board.imgUrls = [];

        pinsArray.forEach((pin, index) => {
          if (index < 4) {
            board.imgUrls.push(pin.imgUrl);
          }
        });

        if (board.imgUrls.length < 4) {
          // If less than 4 pins, add blank images
          for (let i = board.imgUrls.length; i < 4; i++) {
            board.imgUrls.push('https://i.imgur.com/BaJOjOc.jpg');
          }
        }
      });
  }

  let getSingleBoard = (boardId)=> {
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}boards/${boardId}.json`)
        .success((singleBoard) => {
          resolve(singleBoard);
        });
    });
  };

  let deleteBoard = (boardId)=> {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}boards/${boardId}.json`)
        .success((singleBoard) => {
          resolve(singleBoard);
        });
    })
    .then(()=> {
      let pins = [];
      return $q((resolve, reject)=> {
        $http.get(`${FirebaseURL}pins.json?orderBy="boardId"&equalTo="${boardId}"`)
        .success((pinsObj)=> {
          console.log('Pins on board to be deleted: ', pinsObj);
          // Extracting Firebase Id from each pin
          Object.keys(pinsObj).forEach((key) => {
            pins.push(key);
          });
          resolve(pins);
        })
        .error((error)=> {
          console.log('error on deleting pins: ', error);
          reject(error);
        });
      })
      .then((pinsArray) => {
        return $q.all(
          pinsArray.map((pinId) => {
            return PinsFactory.deletePin(pinId);
          })
        );
      });
    });
  };

  let updateBoard = (boardObj, boardId)=>{
    console.log("board object", boardObj);
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}boards/${boardId}.json`, JSON.stringify(boardObj))
        .success((updatedObj)=>{
          resolve(updatedObj);
        })
        .error((error)=>{
          console.log("error", error);
          reject(error);
        });
    });
  };

  return {
    createBoard,
    getBoards,
    getSingleBoard,
    deleteBoard,
    updateBoard
  };
});
