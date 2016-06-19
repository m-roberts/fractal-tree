// This factory is included in the fractalTreeCtrl
// Used to update the actual swatch with the values from RGB
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
		refreshCanvas: function(r, g, b) {
			var color = '#' + hexFromRGB(r, g, b);
			angular.element('#swatch').css('background-color', color);
			angular.element('#myCanvas').css('color', color);
		}
	};
});

// This is used in ftCanvas.js to initialise the HTML canvas context
module.service("ftDrawService", function($window, colorpicker) {
	ftDrawService = {};
  var seedPoints = {};

  angular.element($window).on("resize", function(){
    setCanvasSize();
    updateCanvas();
  });

	var degToRad = Math.PI / 180.0;

	var ctx;
	var colours = {
		background: "rgb(0,0,0)",
		tree: "rgb(255,140,60)"
	};

	var design = {
		depth: 6,
		noOfTrees: 6,
		rotationPerIteration: 60,
		branchIterationScaling: 50,
		startingAngle: 0
	};

	var seedPoints = {
		// Sets position on screen to start drawing tree
		tree: {
			// Start in the middle of the screen
			x: window.innerWidth/2,
			y: window.innerHeight/2
		},
		// Sets position on screen to display text from
		text: {
			x: 10,
			y: 20,
			offset: 15
		}
	}

	// Scales size of tree in canvas
	var zoom = 100;

	ftDrawService.init = function (context) {
		ctx = context;
		ctx.lineWidth = 1;

		setCanvasSize();

		// TO DEBUG INFO TO THE CANVAS (currently black text):
		// ctx.font = "30px Arial";
		// ctx.fillText("H:" + ctx.canvas.height + " W:" + ctx.canvas.width, 10, 50);

		ftDrawService.setBgColours();
		ftDrawService.setTreeColours();
		// ftDrawService.setDesign();
	}

	setCanvasSize = function() {
		ctx.canvas.height = $window.innerHeight;
		ctx.canvas.width = $window.innerWidth;

    seedPoints = {
      tree: {
        x: ctx.canvas.width/2,
        y: ctx.canvas.height/2
      }
    };
	}

	ftDrawService.setBgColours = function(r, g, b) {
		// Get colours from sliders
		// Assign to background colour variable
		colours.background = "rgb(" + r + "," + g + "," + b + ")";
		updateCanvas();
	}

	ftDrawService.setTreeColours = function(r, g, b) {
		// Get colours from sliders
		// Assign to background colour variable
	   colours.tree = "rgb(" + r + "," + g + "," + b + ")";
	   updateCanvas();
	}

	updateCanvas = function() {
		drawBackground();
		drawTrees();
	}

	ftDrawService.setDesign = function(iterations, noOfTrees, rotationPerIteration, branchIterationScaling, newZoom, lineWidth, startingAngle) {
		design = {
			// Number of iterations
			depth: iterations,
			// Set number of trees to draw
			noOfTrees: noOfTrees,
			// Angle by which each root rotates from its preceding fork
			rotationPerIteration: rotationPerIteration,
			// rotationPerIteration: 20,
			branchIterationScaling: branchIterationScaling,
			// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
			startingAngle: startingAngle
		};
		// Scales size of tree in canvas
		zoom = newZoom;

		// Line thickness
		// Can this be made a function of the generation currently being drawn?
		ctx.lineWidth = lineWidth;

		updateCanvas();
	}

	function drawBackground(){
		// Set background
		ctx.fillStyle = colours.background;
		ctx.beginPath();
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.closePath();
	}

	function drawLine(x1, y1, x2, y2){
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
	}

	function drawTree(x1, y1, angle, depth){
		var scalingFactor = zoom*design.depth/Math.pow(Math.sqrt(design.depth), 3);
		if (depth !== 0){
			var x2 = x1 + (Math.cos(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
			var y2 = y1 + (Math.sin(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
			drawLine(x1, y1, x2, y2);
			drawTree(x2, y2, angle - design.rotationPerIteration, depth - 1);
			drawTree(x2, y2, angle + design.rotationPerIteration, depth - 1);
		}
	}

	function drawTrees(){
		// Draw tree
		ctx.beginPath();
		ctx.strokeStyle = colours.tree;
		for (var treeNo = 0; treeNo < design.noOfTrees; treeNo++) {
			// Draw equally spaced trees starting from upright
			drawTree(seedPoints.tree.x, seedPoints.tree.y, (treeNo*(360/design.noOfTrees))+(design.startingAngle-90), design.depth);
		}
		ctx.stroke();
		ctx.closePath();
	}

	function writeSettings(){
	// 	// Write details used to the bottom of screen
	// 	$("#depth").text(design.depth);
	// 	$("#noOfTrees").text(design.noOfTrees);
	// 	$("#rotationPerIteration").text(design.rotationPerIteration);
	// 	$("#branchIterationScaling").text(design.branchIterationScaling);
	// 	$("#zoom").text(zoom);
	// 	$("#lineWidth").text(ctx.lineWidth);
	// 	$("#startingAngle").text(design.startingAngle);
	// 	$("#colourTree").text(colours.tree.toString());
	// 	$("#colourBackground").text(colours.background.toString());
	//
	// 	updateCanvas();
	}

	return ftDrawService;
})
