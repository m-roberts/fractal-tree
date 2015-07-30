var context;
var elem;
var canvasData;

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

// Mandelbrot set functions

function baseCalculation(real, img, z) {
	var C = Math.pow( Math.pow(real, 2) + Math.pow(img, 2), 0.5);
	var Z = Math.pow(z, 2) + C
	return Z
}

function calculateNumberOfIteationsTillLimit(real, img, limit) {
	var Z = 0; 
	var count = 0;

	while(Z < 10) {
		Z = baseCalculation(real, img, Z);
		count++;

		if (count > 15) break
	}

	return count;
}

function pointCalculation(real, img, iterations) {
	var Z = 0;

	for (var i = 0; i < iterations; i++) {
		Z = baseCalculation(real, img, Z);
	}

	return Z;
}

function drawMandelbrotSet() {
	canvasData = context.getImageData(0, 0, elem.width, elem.height);

	var img_height = elem.height / 2
	var img_width = elem.width / 2;

	var start_x = elem.width / 4;
	var start_y = elem.height / 4;

	var interval_x = 4 / img_width;
	var interval_y = 4 / img_height;

	for (var y = 0 ; y < img_height; y++) {
		for (var x = 0 ; x < img_width; x++) {

			var img = -2 + (y * interval_y);
			var real = -2 + (x * interval_x);

			// console.log(real)

			var iterations = calculateNumberOfIteationsTillLimit(img , real, 0)
			// var colour = iterations;
			// console.log('img: ' + img + 'real: ' + real + ' colour: ' + colour)
			var colour  = iterations * 10;
			drawPixel(start_x + x, 100 + y, colour, 0, 0, 255);
		}
	}
	
	redrawCanvas();
}

// Drawing pixel functions

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * elem.width) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

function redrawCanvas() {
    context.putImageData(canvasData, 0, 0);
    console.log('done')
}

// Tools functions

function setCanvasSize() {
	elem = document.getElementById('mandelbrot');
	// Set size of canvas to screen
	elem.width  = $(window).width();
	elem.height = $(window).height();
}

function drawBackground(){
	// Set background
	context.fillStyle = colours.background;
	context.beginPath();
	context.fillRect(0,0,window.innerWidth,window.innerHeight);
	context.closePath();
}

function writeSettings(){
	// Write details used to the bottom of screen
	context.fillStyle = colours.text;
	context.beginPath();
	context.fillText("Iterations: ", seedPoints.text.x, seedPoints.text.y);
	context.fillText("Number of trees: ", seedPoints.text.x, seedPoints.text.y + seedPoints.text.offset);
	context.fillText("Fork rotation from each root: ", seedPoints.text.x, seedPoints.text.y + 2*seedPoints.text.offset);
	context.fillText("Starting rotation from upright: ", seedPoints.text.x, seedPoints.text.y + 3*seedPoints.text.offset);
	context.fillText("Tree colour: ", seedPoints.text.x, seedPoints.text.y + 4*seedPoints.text.offset);
	context.fillText("Background colour: ", seedPoints.text.x, seedPoints.text.y + 5*seedPoints.text.offset);
	context.fillText("Text colour: ", seedPoints.text.x, seedPoints.text.y + 6*seedPoints.text.offset);
	context.closePath();
}

function updateCanvas(){
	// UPDATE CANVAS
	drawBackground();
	writeSettings();
	drawMandelbrotSet();
}

$(window).resize(function() {
	setCanvasSize();
});

$( document ).ready(function() {
	setCanvasSize();
	context = elem.getContext('2d');

	updateCanvas();
});