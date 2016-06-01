module.directive('inputControlsDirective', function() {
	return {
		template: "ftControls.html"
	};
})
.controller('inputControlsController', function($window) {
	var controlsColumnLeft = window.innerWidth/2;
	angular.element('#controls_column').css('left', controlsColumnLeft);
});