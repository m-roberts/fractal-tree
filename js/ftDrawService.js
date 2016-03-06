module.service("ftDrawService", function($window) {
	ftDrawService = {};

	var ctx;
	var colours = {};

	ftDrawService.init = function (context) {
		ctx = context;

		setCanvasSize();
		// DEBUG
		// ctx.font = "30px Arial";
		// ctx.fillText("H:" + ctx.canvas.height + " W:" + ctx.canvas.width, 10, 50);
		drawBackground();
	}

	setCanvasSize = function() {
		ctx.canvas.height = $window.innerHeight;
		ctx.canvas.width = $window.innerWidth;
	}

	ftDrawService.updateCanvas = function() {
		setColours();
		setDesign();
		drawBackground();
		drawTrees();
		writeSettings();
	}

	function setColours() {
		// Get colours from sliders


	// 	var background_rgb =[
	// 		$('#back-slider-R').slider("value"),
	// 		$('#back-slider-G').slider("value"),
	// 		$('#back-slider-B').slider("value")
	// 	];
	
		// 	Assign to background colour variable
	   // colours.background = "rgb("+ background_rgb.join(',') + ")";

		// Get colours from sliders

	// 	var tree_rgb =[
	// 		$('#tree-slider-R').slider("value"),
	// 		$('#tree-slider-G').slider("value"),
	// 		$('#tree-slider-B').slider("value")
	// 	];
	
		// 	Assign to tree colour variable
	   // colours.tree = "rgb("+ tree_rgb.join(',') + ")";
	}

	function setDesign() {
	// 	design = {
	// 		// Number of iterations
	// 		depth: $('#iterations-slider').slider("value"),
	// 		// depth: 9,
	// 		// Set number of trees to draw
	// 		noOfTrees: $('#noOfTrees-slider').slider("value"),
	// 		// noOfTrees: 7,
	// 		// Angle by which each root rotates from its preceding fork
	// 		rotationPerIteration: $('#rotationPerIteration-slider').slider("value"),
	// 		// rotationPerIteration: 20,
	// 		branchIterationScaling: $('#branchIterationScaling-slider').slider("value"),
	// 		// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
	// 		startingAngle: $('#startingAngle-slider').slider("value"),
	// 		// startingAngle: 0

	// 	};
	// 	// Scales size of tree in canvas
	// 	zoom = $('#zoom-slider').slider("value");
	// 	// Line thickness
	// 	// Can this be made a function of the generation currently being drawn?
	// 	ctx.lineWidth = $('#lineWidth-slider').slider("value");
	}

	function drawBackground(){
		// Set background
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.beginPath();
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		ctx.closePath();
	}

	function drawLine(x1, y1, x2, y2){
	// 	ctx.moveTo(x1, y1);
	// 	ctx.lineTo(x2, y2);
	}

	function drawTree(x1, y1, angle, depth){
	// 	var scalingFactor = zoom*design.depth/Math.pow(Math.sqrt(design.depth), 3);
	// 	if (depth !== 0){
	// 		var x2 = x1 + (Math.cos(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
	// 		var y2 = y1 + (Math.sin(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
	// 		drawLine(x1, y1, x2, y2);
	// 		drawTree(x2, y2, angle - design.rotationPerIteration, depth - 1);
	// 		drawTree(x2, y2, angle + design.rotationPerIteration, depth - 1);
	// 	}
	}
	
	function drawTrees(){
		// Draw tree
		// ctx.beginPath();
		// ctx.strokeStyle = colours.tree;
		// for (var treeNo = 0; treeNo < design.noOfTrees; treeNo++) {
		// 	// Draw equally spaced trees starting from upright
		// 	drawTree(seedPoints.tree.x, seedPoints.tree.y, (treeNo*(360/design.noOfTrees))+(design.startingAngle-90), design.depth);
		// }
		// ctx.stroke();
		// ctx.closePath();
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
	}

	

	

	return ftDrawService;
})