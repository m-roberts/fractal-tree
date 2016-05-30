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

// // This factory is included in the fractalTreeCtrl
// // Used to update the actual swatch with the values from RGB
// module.factory('colorpicker', function() {
// 	function hexFromRGB(r, g, b) {
// 		var hex = [r.toString(16), g.toString(16), b.toString(16)];
// 		angular.forEach(hex, function(value, key) {
// 			if (value.length === 1)
// 				hex[key] = "0" + value;
// 		});
// 		return hex.join('').toUpperCase();
// 	}
// 	return {
// 		refreshSwatch: function(r, g, b) {
// 			var color = '#' + hexFromRGB(r, g, b);
// 			angular.element('#swatch').css('background-color', color);
// 			angular.element('#myCanvas').css('color', color);
// 		}
// 	};
// });

/*
 // To set an option for all sliders
 module.factory('uiSliderConfig', function ($log) {
 return {
 start: function (event, ui) { $log.info('Event: Slider start - set with uiSliderConfig', event); },
 stop: function (event, ui) { $log.info('Event: Slider stop - set with uiSliderCOnfig', event); },
 };
 });
 */

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