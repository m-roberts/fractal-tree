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
	$scope.showControls = true;
	function setBgColour(ev, ui) {
		// Get RGB values
		var red = $scope.bg_colorpicker.red,
			green = $scope.bg_colorpicker.green,
			blue = $scope.bg_colorpicker.blue;
		
		// Update the actual swatch with the values from RGB
		ftDrawService.setBgColours(red, green, blue);
	}

	function setTreeColour(ev, ui) {
		// Get RGB values
		var red = $scope.tree_colorpicker.red,
			green = $scope.tree_colorpicker.green,
			blue = $scope.tree_colorpicker.blue;
		
		// Update the actual swatch with the values from RGB
		ftDrawService.setTreeColours(red, green, blue);
	}

	function setDesign(ev, ui) {
		// Get design values
		var iterations = $scope.design.iterations,
			noOfTrees = $scope.design.noOfTrees,
			rotationPerIteration = $scope.design.rotationPerIteration,
			branchIterationScaling = $scope.design.branchIterationScaling,
			zoom = $scope.design.zoom,
			lineWidth = $scope.design.lineWidth,
			startingAngle = $scope.design.startingAngle;
		
		// Update the actual swatch with the values from RGB
		ftDrawService.setDesign(iterations, noOfTrees, rotationPerIteration, branchIterationScaling, zoom, lineWidth, startingAngle);
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

	var defaultOptions = {
		orientation: 'horizontal',
		min: 0,
		range: 'min',
		change: setDesign,
		slide: setDesign
	}

	$scope.design = {
		iterations: 6,
		noOfTrees: 6,
		rotationPerIteration: 60,
		branchIterationScaling: 50,
		zoom: 100,
		lineWidth: 1,
		startingAngle: 0,
		iterationOptions: defaultOptions,
		noOfTreesOptions: defaultOptions,
		rotationPerIterationOptions: defaultOptions,
		branchIterationScalingOptions: defaultOptions,
		zoomOptions: defaultOptions,
		lineWidthOptions: defaultOptions,
		startingAngleOptions: defaultOptions
	};

	$scope.design.iterationOptions.max = 15;
	$scope.design.noOfTreesOptions.max = 8;
	$scope.design.rotationPerIterationOptions.max = 180;
	$scope.design.branchIterationScalingOptions.max = 100;
	$scope.design.zoomOptions.max = 100;
	$scope.design.lineWidthOptions.max = 5;
	$scope.design.startingAngleOptions.max = 360;
});