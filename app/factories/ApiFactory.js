"use strict";

app.factory("ApiFactory", ($q, $http)=>{

  let getQuotes = ()=>{
    return $q((resolve, reject)=>{
      $http.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes/100')
      .success((quotes)=>{
        resolve(quotes);
      })
      .error((error)=>{
        reject(error);
      });
    });
  };

  return {
    getQuotes
  };
});
