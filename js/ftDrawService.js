// This is used in ftCanvas.js to initialise the HTML canvas context
module.service("ftDrawService", function($window) {
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
		startingAngle: 0,
		treeSeedPoints: {
			// Start in the middle of the screen
			x: window.innerWidth/2,
			y: window.innerHeight/2
		}
	};

	// Scales size of tree in canvas
	var zoom = 100;

	var sidebarWidth = 0;

	// Setting timeout to wait for sidebar to correctly return its width
	setTimeout(function(){
		sidebarWidth = angular.element(document.getElementById('sidebar')).prop('offsetWidth');
		
		setCanvasSize();
		ftDrawService.setBgColours();
		ftDrawService.setTreeColours();
	}, 50);

	// Allows the canvas context to be interacted with, now that it is available
	ftDrawService.init = function(context) {
		ctx = context;
		// Got context, now provide initial line width
		ctx.lineWidth = 1;
	}

	setCanvasSize = function() {
		ctx.canvas.width = $window.innerWidth - sidebarWidth;
		ctx.canvas.height = $window.innerHeight;

		design.treeSeedPoints = {
			x: ctx.canvas.width/2,
			y: ctx.canvas.height/2
		};
	}

	///////////////////////////////
	// Setting design parameters //
	///////////////////////////////
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

	ftDrawService.setDesign = function(iterations, noOfTrees, rotationPerIteration, branchIterationScaling, newZoom, lineWidth, startingAngle) {
		// Number of iterations
		design.depth = iterations;
		// Set number of trees to draw
		design.noOfTrees = noOfTrees;
		// Angle by which each root rotates from its preceding fork
		design.rotationPerIteration = rotationPerIteration;
		// rotationPerIteration: 20,
		design.branchIterationScaling = branchIterationScaling;
		// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
		design.startingAngle = startingAngle;

		// Scales size of tree in canvas
		zoom = newZoom;

		// Line thickness
		// Can this be made a function of the generation currently being drawn?
		ctx.lineWidth = lineWidth;

		updateCanvas();
	}

	////////////////////
	// Draw functions //
	////////////////////
	updateCanvas = function() {
		drawBackground();
		drawTrees();
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
				drawTree(design.treeSeedPoints.x, design.treeSeedPoints.y, (treeNo*(360/design.noOfTrees))+(design.startingAngle-90), design.depth);
			}
			ctx.stroke();
		ctx.closePath();
	}

	return ftDrawService;
})
