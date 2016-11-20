'use strict';

app.service('SearchService', function(){
  let searchText = '';

  let getSearchText = ()=> {
    return searchText;
  };

  let setSearchText = (value)=> {
    searchText = value;
    return searchText;
  };

  return {getSearchText, setSearchText};
});
