var ctx;
var elem;
var seedPoints;
var colours = {};
var design = {};
var scalingFactor;

function setupInteractions() {
	function createSlider(slider, boundTextField, min, max, orientation) {
		slider.slider({
			orientation: orientation,
			range: "min",
			min: min,
			max: max,
			value: 0,
			slide: function( event, ui ) {
				boundTextField.val( ui.value );
				// Redraw canvas
				updateCanvas();
			}
		})
	}
	
	createSlider($( "#iterations-slider" ), $( "#iterations-txt" ), 1, 15, "horizontal");
	$( "#iterations-slider" ).slider( "value", 8 );

	createSlider($( "#noOfTrees-slider" ), $( "#noOfTrees-txt" ), 1, 15, "horizontal");
	$( "#noOfTrees-slider" ).slider( "value", 6 );

	createSlider($( "#rotationPerIteration-slider" ), $( "#rotationPerIteration-txt" ), 0, 360, "horizontal");
	$( "#rotationPerIteration-slider" ).slider( "value", 60 );

	createSlider($( "#startingAngle-slider" ), $( "#startingAngle-txt" ), 0, 360, "horizontal");
	$( "#startingAngle-slider" ).slider( "value", 0 );

	createSlider($( "#tree-slider-R" ), $( "#tree-color-R" ), 0, 255, "vertical");
	$( "#tree-slider-R" ).slider( "value", 255 );
	createSlider($( "#tree-slider-G" ), $( "#tree-color-G" ), 0, 255, "vertical");
	$( "#tree-slider-G" ).slider( "value", 255 );
	createSlider($( "#tree-slider-B" ), $( "#tree-color-B" ), 0, 255, "vertical");
	$( "#tree-slider-B" ).slider( "value", 255 );
}

/////////////////////
// START VARIABLES //
/////////////////////
function setSeedPoints() {
	seedPoints = {
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
}

function setColours() {
	colours.background = "rgb(0,0,0)";

	var tree_rgb =[
		$('#tree-slider-R').slider("value"),
		$('#tree-slider-G').slider("value"),
		$('#tree-slider-B').slider("value")
	];
   colours.tree = "rgb("+ tree_rgb.join(',') + ")" ;
}

function setDesign() {
	design = {
		// Number of iterations
		depth: $('#iterations-slider').slider("value"),
		// depth: 9,
		// Set number of trees to draw
		noOfTrees: $('#noOfTrees-slider').slider("value"),
		// noOfTrees: 7,
		// Angle by which each root rotates from its preceding fork
		rotationPerIteration: $('#rotationPerIteration-slider').slider("value"),
		// rotationPerIteration: 20,
		// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
		startingAngle: $('#startingAngle-slider').slider("value"),
		// startingAngle: 0

	}
	// Scales size of tree in canvas
	scalingFactor = 100*design.depth/Math.pow(Math.sqrt(design.depth), 3);
}



var lineWidth = 1;
///////////////////
// END VARIABLES //
///////////////////


// Constant
var degToRad = Math.PI / 180.0;

function setCanvasSize() {
	// Set size of canvas to screen
	elem.width  = $(window).width();
	elem.height = $(window).height();
}

// FUNCTIONS
function drawLine(x1, y1, x2, y2){
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
}
function drawTree(x1, y1, angle, depth){
  if (depth !== 0){
	var x2 = x1 + (Math.cos(angle * degToRad) * scalingFactor);
	var y2 = y1 + (Math.sin(angle * degToRad) * scalingFactor);
	drawLine(x1, y1, x2, y2);
	drawTree(x2, y2, angle - design.rotationPerIteration, depth - 1);
	drawTree(x2, y2, angle + design.rotationPerIteration, depth - 1);
  }
}

function updateCanvas(){
	function drawBackground(){
		// Set background
		ctx.fillStyle = colours.background;
		ctx.beginPath();
		ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
		ctx.closePath();
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

	setColours();	

	setDesign();

	drawBackground();
	drawTrees();
	writeSettings();
}

function writeSettings(){
	// Write details used to the bottom of screen
	$("#depth").text(design.depth);
	$("#noOfTrees").text(design.noOfTrees);
	$("#rotationPerIteration").text(design.rotationPerIteration);
	$("#startingAngle").text(design.startingAngle);
	$("#colourTree").text(colours.tree.toString());
	$("#colourBackground").text(colours.background.toString());
}

$(window).resize(function() {
	// Update canvas width/height values
	setCanvasSize();
	// Update seed point for tree
	setSeedPoints();
	// Redraw canvas
	updateCanvas();
});

$( document ).ready(function() {
	elem = document.getElementById('fractalTree');
	setupInteractions();
	setCanvasSize();
	setSeedPoints();
	ctx = elem.getContext('2d');
	// Line thickness
	// Can this be made a function of the generation currently being drawn?
	ctx.lineWidth = lineWidth;

	updateCanvas();
});