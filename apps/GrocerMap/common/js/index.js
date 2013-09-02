window.onload  = GetMap;

var map = null;
var searchManager = null;
var currInfobox = null;

function GetMap(){
   Microsoft.Maps.loadModule('Microsoft.Maps.Themes.BingTheme', { callback: function() 
       {
           map = new  Microsoft.Maps.Map(document.getElementById('divMap'), 
           { 
              credentials: "Your Bing Maps Key",
              mapTypeId:  Microsoft.Maps.MapTypeId.road,
              enableClickableLogo: false,
              enableSearchLogo: false,
              center: new  Microsoft.Maps.Location(47.603561, -122.329437),
              zoom: 10,
              theme: new  Microsoft.Maps.Themes.BingTheme()
           }); 
       }
    });
}
   
function createSearchManager() {
   map.addComponent('searchManager', new  Microsoft.Maps.Search.SearchManager(map));
   searchManager = map.getComponent('searchManager');
}

function LoadSearchModule() {
   Microsoft.Maps.loadModule('Microsoft.Maps.Search', {  callback: searchRequest })
}

function searchRequest() {
   createSearchManager();
   var query = document.getElementById('txtSearch').value;
   var request =
       {
           query: query,
           count: 20,
           startIndex: 0,
           bounds: map.getBounds(),
           callback: search_onSearchSuccess,
           errorCallback:  search_onSearchFailure
       };
   searchManager.search(request);
 }

function search_onSearchSuccess(result, userData) {
   map.entities.clear();
   var searchResults = result && result.searchResults;
   if (searchResults) {
       for (var i = 0; i < searchResults.length; i++) {
           search_createMapPin(searchResults[i]);
       }
       if (result.searchRegion &&  result.searchRegion.mapBounds) {
           map.setView({ bounds:  result.searchRegion.mapBounds.locationRect });
       }
       else {
           alert('No results');
       }
    }
}

function search_createMapPin(result) {
   if (result) {
       var pin = new Microsoft.Maps.Pushpin(result.location, null);
       Microsoft.Maps.Events.addHandler(pin, 'click', function () {  
  search_showInfoBox(result) });
       map.entities.push(pin);
   }
}

function search_showInfoBox(result) {
   if (currInfobox) {
   currInfobox.setOptions({ visible: true });
   map.entities.remove(currInfobox);
   }
   currInfobox = new Microsoft.Maps.Infobox(
       result.location,
       {
           title: result.name,
           description: [result.address,  result.city, result.state, 
             result.country,  result.phone].join(' '),
           showPointer: true,
           titleAction: null,
           titleClickHandler: null 
       });
   currInfobox.setOptions({ visible: true });
   map.entities.push(currInfobox);
}

function search_onSearchFailure(result, userData) {
   alert('Search  failed');
}