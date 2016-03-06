module = angular.module("fractalTree");

module.directive('ftCanvas', function(ftDrawService) {
  return {
	restrict: 'E',
	replace: true,
	scope: true,
	template: '<canvas id="myCanvas"></canvas>',
	link: function(scope, element, attrs) {
		var ctx = element[0].getContext('2d');
		ftDrawService.init(ctx);
	}
  };
})