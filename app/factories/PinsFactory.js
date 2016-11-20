"use strict";

app.factory('PinsFactory', function ($q, $http, FirebaseURL) {

  let createPin = (newPin) => {
    return $q((resolve, reject) => {
      $http.post(`${FirebaseURL}/pins.json`, JSON.stringify(newPin))
        .success((objFromFirebase) => {
          resolve(objFromFirebase);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };


  let getPins = (boardId) => {
    let pins = [];
    return $q((resolve, reject) => {
      $http.get(`${FirebaseURL}pins.json?orderBy="boardId"&equalTo="${boardId}"`)
        .success((objFromFirebase) => {
          Object.keys(objFromFirebase).forEach((key)=>{
            objFromFirebase[key].id = key;
            pins.push(objFromFirebase[key]);
          });
          // Sorting the pins by index
          // Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
          pins.sort(function (a, b) {
            return a.index - b.index;
          });
          resolve(pins);
        })
        .error((errorFromFirebase) => {
          reject(errorFromFirebase);
        });
    });
  };

  let deletePin = (pinId) => {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}pins/${pinId}.json`)
        .success(() => {
          resolve();
        })
        .error((error)=> {
          console.log('pin delete fail:', error);
          reject(error);
        });
    });
  };

  let updatePin = (pinObj, pinId)=>{
    return $q((resolve, reject)=>{
      $http.patch(`${FirebaseURL}pins/${pinId}.json`, angular.toJson(pinObj))
        .success((updatedObj)=>{
          resolve(updatedObj);
        })
        .error((error)=>{
          console.log("error", error);
          reject(error);
        });
    });
  };

  // Used to update pin indices when using drag and drop
  let updateAllPinsOnBoard = (pins) => {
    if (!pins) { return; }
    // Update the index of all pins on the board
    return $q.all(
      pins.map((pin) => {
        return updatePin(pin, pin.id);
      })
    );
  };

  return {
    createPin,
    getPins,
    deletePin,
    updatePin,
    updateAllPinsOnBoard
  };
});
