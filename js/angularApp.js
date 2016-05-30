// Belongs to the whole web app
module = angular.module("fractalTree", ['ui.bootstrap', 'ui.slider']);
module.config(function(){
	// Allow use of  {( myVariable )} for Angular expressions and avoid conflict with Liquid (included with Jekyll for Github Pages) tags
	// http://alwayscoding.ca/momentos/2013/10/09/angular-and-liquid-expressions-in-jekyll/
	'$interpolateProvider', function($interpolateProvider) {
		return $interpolateProvider.startSymbol('{(').endSymbol(')}');
	}
});

module.run(function(){
	
});

// Belongs to the body (canvas)
// This includes the colorpicker factory
// module.controller('fractalTreeCtrl', function($scope, $log, colorpicker) {
module.controller('fractalTreeCtrl', function($scope, $log, ftDrawService) {

	function setBgColour(ev, ui) {
		// Get RGB values
		var red = $scope.bg_colorpicker.red,
			green = $scope.bg_colorpicker.green,
			blue = $scope.bg_colorpicker.blue;
		
		// Update the actual swatch with the values from RGB
		ftDrawService.setBgColours(red, green, blue);
		ftDrawService.updateCanvas();
	}

	function setTreeColour(ev, ui) {
		// Get RGB values
		var red = $scope.tree_colorpicker.red,
			green = $scope.tree_colorpicker.green,
			blue = $scope.tree_colorpicker.blue;
		
		// Update the actual swatch with the values from RGB
		ftDrawService.setTreeColours(red, green, blue);
		ftDrawService.updateCanvas();
	}

	// Slider options with event handlers
	$scope.slider = {
		'options': {
			start: function(event, ui) {
				$log.info('Event: Slider start - set with slider options', event);
			},
			stop: function(event, ui) {
				$log.info('Event: Slider stop - set with slider options', event);
			}
		}
	};

	$scope.bg_colorpicker = {
		red: 0,
		green: 0,
		blue: 0,
		options: {
			orientation: 'horizontal',
			min: 0,
			max: 255,
			range: 'min',
			change: setBgColour,
			slide: setBgColour
		}
	};

	$scope.tree_colorpicker = {
		red: 255,
		green: 140,
		blue: 60,
		options: {
			orientation: 'horizontal',
			min: 0,
			max: 255,
			range: 'min',
			change: setTreeColour,
			slide: setTreeColour
		}
	};
});