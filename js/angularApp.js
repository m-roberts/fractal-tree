// Belongs to the whole web app
module = angular.module("fractalTree", ['ui.bootstrap', 'ngMaterial']);
module.config(function($mdThemingProvider){
	// Allow use of  {( myVariable )} for Angular expressions and avoid conflict with Liquid (included with Jekyll for Github Pages) tags
	// http://alwayscoding.ca/momentos/2013/10/09/angular-and-liquid-expressions-in-jekyll/
	'$interpolateProvider', function($interpolateProvider) {
		return $interpolateProvider.startSymbol('{(').endSymbol(')}');
	}

  $mdThemingProvider.theme('default').dark();
});

module.run(function(){

});

// Belongs to the body (canvas)
// This includes the colorpicker factory
// module.controller('fractalTreeCtrl', function($scope, $log, colorpicker) {
module.controller('fractalTreeCtrl', function($scope, $log, ftDrawService) {
	////////////////
	// Background //
	////////////////
	function setBgColour(ev, ui) {
		// Get RGB values
		var red = $scope.bg_colorpicker.red,
			green = $scope.bg_colorpicker.green,
			blue = $scope.bg_colorpicker.blue;

		// Update the actual swatch with the values from RGB
		ftDrawService.setBgColours(red, green, blue);
	}

	$scope.$watch("bg_colorpicker", function() {
		setBgColour();
	}, true);

	$scope.bg_colorpicker = {
		red: 0,
		green: 0,
		blue: 0
	};

	//////////
	// Tree //
	//////////
	function setTreeColour(ev, ui) {
		// Get RGB values
		var red = $scope.tree_colorpicker.red,
			green = $scope.tree_colorpicker.green,
			blue = $scope.tree_colorpicker.blue;

		// Update the actual swatch with the values from RGB
		ftDrawService.setTreeColours(red, green, blue);
	}

	$scope.$watch("tree_colorpicker", function() {
		setTreeColour();
	}, true);

	$scope.tree_colorpicker = {
		red: 255,
		green: 140,
		blue: 60
	};

	////////////
	// Design //
	////////////
	function setDesign(ev, ui) {
		// Get design values
		var iterations = $scope.design.iterations,
			noOfTrees = $scope.design.noOfTrees,
			rotationPerIteration = $scope.design.rotationPerIteration,
			branchIterationScaling = $scope.design.branchIterationScaling,
			zoom = $scope.design.zoom,
			lineWidth = $scope.design.lineWidth,
			startingAngle = $scope.design.startingAngle;

		ftDrawService.setDesign(iterations, noOfTrees, rotationPerIteration, branchIterationScaling, zoom, lineWidth, startingAngle);
	}

	$scope.$watch("design", function() {
		setDesign();
	}, true);

	$scope.design = {
		iterations: 6,
		noOfTrees: 6,
		rotationPerIteration: 60,
		branchIterationScaling: 50,
		zoom: 100,
		lineWidth: 1,
		startingAngle: 0
	};
});
