angular
.module('fractalTree')
.directive('ftControls', function() {
	var inputsController = ['$scope', '$rootScope', function ($scope, $rootScope ) {

    
    }]
	return {
		restrict: 'E',
		templateUrl: '../ftControls.html',
		controller: inputsController
	};
});

// // Used in the HTML to enable use of `<ft-canvas></ft-canvas>`
// module.directive('ftControls', function() {
//   return {
// 	restrict: 'E',
// 	// replace: true,
// 	// scope: true,
// 	template: '<canvas id="myCanvas"></canvas>'
//   };
// })