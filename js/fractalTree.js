var ctx;
var elem;
var seedPoints;
var colours = {
	// Background colour (white)
	background: "#000000",
	// Tree colour (black)
	tree: "#FFFFFF",
	// Text colour (red)
	text: "#FF0000"
}

function createSlider(slider, boundTextField) {
   slider.slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 255,
      value: 0,
      slide: function( event, ui ) {
        boundTextField.val( ui.value );
        drawOnCanvas();
      }
  })
}

$(function() {
	createSlider($( "#slider-R" ), $( "#tree-color-R" ));
	createSlider($( "#slider-G" ), $( "#tree-color-G" ));
	createSlider($( "#slider-B" ), $( "#tree-color-B" ));    
});

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
   var rgb =[
       $('#slider-R').slider("value"),
       $('#slider-G').slider("value"),
       $('#slider-B').slider("value")
   ];
   colours.tree = "rgb("+ rgb.join(',') + ")" ;
}

var design = {
	// Number of iterations
	depth: 9,
	// Set number of trees to draw
	noOfTrees: 7,
	// Angle by which each root rotates from its preceding fork
	rotationPerIteration: 20,
	// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
	startingAngle: 0
}

var lineWidth = 1;
///////////////////
// END VARIABLES //
///////////////////

// Scales size of tree in canvas
var scalingFactor = 100*design.depth/Math.pow(Math.sqrt(design.depth), 3);
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

	function writeSettings(){
		// Write details used to the bottom of screen
		ctx.fillStyle = colours.text;
		ctx.beginPath();
		ctx.fillText("Iterations: " + design.depth, seedPoints.text.x, seedPoints.text.y);
		ctx.fillText("Number of trees: " + design.noOfTrees, seedPoints.text.x, seedPoints.text.y + seedPoints.text.offset);
		ctx.fillText("Fork rotation from each root: " + design.rotationPerIteration, seedPoints.text.x, seedPoints.text.y + 2*seedPoints.text.offset);
		ctx.fillText("Starting rotation from upright: " + design.startingAngle, seedPoints.text.x, seedPoints.text.y + 3*seedPoints.text.offset);
		ctx.fillText("Tree colour: " + colours.tree, seedPoints.text.x, seedPoints.text.y + 4*seedPoints.text.offset);
		ctx.fillText("Background colour: " + colours.background, seedPoints.text.x, seedPoints.text.y + 5*seedPoints.text.offset);
		ctx.fillText("Text colour: " + colours.text, seedPoints.text.x, seedPoints.text.y + 6*seedPoints.text.offset);
		ctx.closePath();
	}

	drawBackground();
	drawTrees();
	writeSettings();
}

$(window).resize(function() {
	// Update canvas width/height values
	setCanvasSize();
	// Update seed point for tree
	setSeedPoints();
	// Update colours
	setColours();
	// Redraw canvas
	updateCanvas();
});

$( document ).ready(function() {
	elem = document.getElementById('fractalTree');
	setCanvasSize();
	setSeedPoints();
	ctx = elem.getContext('2d');
	// Line thickness
	// Can this be made a function of the generation currently being drawn?
	ctx.lineWidth = lineWidth;

	updateCanvas();
});