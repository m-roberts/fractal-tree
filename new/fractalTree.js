var elem = document.getElementById('fractalTree');
// Set size of canvas to screen
elem.width  = $(window).width();
elem.height = $(window).height();
var context = elem.getContext('2d');

/////////////////////
// START VARIABLES //
/////////////////////
/// MOVE THESE INTO AN OBJECT, FOREACH THEM IN TEXT DISPLAY
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
		y: 10,
		offset: 15
	}
}

var colours = {
	// Background colour (white)
	background: "#FFFFFF",
	// Tree colour (black)
	tree: "#000000",
	// Text colour (red)
	text: "#FF0000"
}

// Line thickness
// Can this be made a function of the generation currently being drawn?
context.lineWidth = 1;

var design = {
	// Number of iterations
	depth: 9,
	// Set number of trees to draw
	noOfTrees: 6,
	// Angle by which each root rotates from its preceding fork
	rotationPerIteration: 15,
	// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
	startingAngle: 0
}
///////////////////
// END VARIABLES //
///////////////////

// Scales size of tree in canvas
var scalingFactor = 100*design.depth/Math.pow(Math.sqrt(design.depth), 3);
// Constant
var degToRad = Math.PI / 180.0;

// FUNCTIONS
function drawLine(x1, y1, x2, y2){
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
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

function drawBackground(){
	// Set background
	context.fillStyle = colours.background;
	context.beginPath();
	context.fillRect(0,0,window.innerWidth,window.innerHeight);
	context.closePath();
}

function drawTrees(){
	// Draw tree
	context.beginPath();
	context.strokeStyle = colours.tree;
	for (var treeNo = 0; treeNo < design.noOfTrees; treeNo++) {

		// Draw equally spaced trees starting from upright
		drawTree(seedPoints.tree.x, seedPoints.tree.y, (treeNo*(360/design.noOfTrees))+(design.startingAngle-90), design.depth);
	}
	context.stroke();
	context.closePath();
}

function writeSettings(){
	// Write details used to the bottom of screen
	context.fillStyle = colours.text;
	context.beginPath();
	context.fillText("Iterations: " + design.depth, seedPoints.text.x, seedPoints.text.y);
	context.fillText("Number of trees: " + design.noOfTrees, seedPoints.text.x, seedPoints.text.y + seedPoints.text.offset);
	context.fillText("Fork rotation from each root: " + design.rotationPerIteration, seedPoints.text.x, seedPoints.text.y + 2*seedPoints.text.offset);
	context.fillText("Starting rotation from upright: " + design.startingAngle, seedPoints.text.x, seedPoints.text.y + 3*seedPoints.text.offset);
	context.fillText("Tree colour: " + colours.tree, seedPoints.text.x, seedPoints.text.y + 4*seedPoints.text.offset);
	context.fillText("Background colour: " + colours.background, seedPoints.text.x, seedPoints.text.y + 5*seedPoints.text.offset);
	context.fillText("Text colour: " + colours.text, seedPoints.text.x, seedPoints.text.y + 6*seedPoints.text.offset);
	context.closePath();
}

function updateCanvas(){
	// UPDATE CANVAS
	drawBackground();
	drawTrees();
	writeSettings();
}

updateCanvas();