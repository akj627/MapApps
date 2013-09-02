var mapApp = angular.module('mapApp', ['ui.bootstrap']);

mapApp.factory('mapService', function() {

	var object = {
		currentStore: {},
		currentLocation: {},
		storeList:[],
		setLocation: setLocation,
		setStoreList: setStoreList
	};

	function getLocation()
	{
		console.log('navigator.geolocation', navigator.geolocation);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(setLocation, showError);
		} else {
			currentLocation = {};
		}
	}

	function setLocation(position)
	{
		object.currentLocation.latitude = position.coords.latitude;
		object.currentLocation.longitude = position.coords.longitude; 
	}

	function setLocation(latitude, longitude)
	{
		object.currentLocation.latitude = latitude;
		object.currentLocation.longitude = longitude; 
	}

	function showError(error)
	{
		switch(error.code) 
		{
			case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
			case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
			case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
			case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
		}
	}

	function setStoreList(storeList)
	{
		object.storeList = storeList;
		console.log('position12', storeList);
	}

	getLocation();

	return object;
});