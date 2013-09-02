mapApp.controller('mapController', function ($scope, $controller, mapService){
	$scope.mapService = mapService;
	$scope.formData = {"address": "Edison NJ"};

	$scope.$watch(function() {
		return mapService;
	}, function(mapService) {
		$scope.currentLocation = mapService.currentLocation;
		$scope.storeList = mapService.storeList;
	}, true);
	
	$scope.getGrocers = function(formData){

		var map;
		var infowindow;
		var location;

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			"address": formData.address
		}, function(results) {
			mapService.setLocation(results[0].geometry.location.ob, results[0].geometry.location.pb);
			location = results[0].geometry.location;
			setMap();
		});

		function setMap()
		{
			var pyrmont = new google.maps.LatLng(location.ob, location.pb);
			map = new google.maps.Map(document.getElementById('map-canvas'), {
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: pyrmont,
				zoom: 9
			});

			var request = {
				location: pyrmont,
				rankBy: google.maps.places.RankBy.DISTANCE,
				keyword: 'indian groceries'

			};
			infowindow = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);
			service.nearbySearch(request, callback);
		}

		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				var storeList = [];
				for (var i = 0; i < results.length; i++) {
					storeList.push(results[i]);
					createMarker(results[i]);
				}
				$scope.$apply(function () {
					mapService.setStoreList(storeList);
				});

				console.log('stores1', mapService.storeList);
			}
		}

		function createMarker(place) {
			console.log(place);

			var placeLoc = place.geometry.location;
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});
		}

		console.log('hi');
	};
});