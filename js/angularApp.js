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

module.factory('colorpicker', function() {
	function hexFromRGB(r, g, b) {
		var hex = [r.toString(16), g.toString(16), b.toString(16)];
		angular.forEach(hex, function(value, key) {
			if (value.length === 1)
				hex[key] = "0" + value;
		});
		return hex.join('').toUpperCase();
	}
	return {
		refreshSwatch: function(r, g, b) {
			var color = '#' + hexFromRGB(r, g, b);
			angular.element('#swatch').css('background-color', color);
		}
	};
});

/*
 // To set an option for all sliders
 module.factory('uiSliderConfig', function ($log) {
 return {
 start: function (event, ui) { $log.info('Event: Slider start - set with uiSliderConfig', event); },
 stop: function (event, ui) { $log.info('Event: Slider stop - set with uiSliderCOnfig', event); },
 };
 });
 */

module.controller('fractalTreeCtrl', function($scope, $log, colorpicker) {

	function refreshSwatch(ev, ui) {
		var red = $scope.colorpicker.red,
				green = $scope.colorpicker.green,
				blue = $scope.colorpicker.blue;
		colorpicker.refreshSwatch(red, green, blue);
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

	$scope.colorpicker = {
		red: 255,
		green: 140,
		blue: 60,
		options: {
			orientation: 'horizontal',
			min: 0,
			max: 255,
			range: 'min',
			change: refreshSwatch,
			slide: refreshSwatch
		}
	};
});