module = angular.module("fractalTree");

// Used in the HTML to enable use of `<ft-canvas></ft-canvas>`
module.directive('ftCanvas', function(ftDrawService) {
  return {
	restrict: 'E',
	replace: true,
	scope: true,
	template: '<canvas id="ftCanvas"></canvas>',
	link: function(scope, element, attrs) {
		var ctx = element[0].getContext('2d');
		ftDrawService.init(ctx);
	}
  };
})