var ctx;
var elem;
var seedPoints;
var colours = {};
var design = {};
var zoom;

// Default slider values
var sliders = {
		iterations: {
			min: 1,
			max: 15,
			val: 8
		},
		noOfTrees: {
			min: 1,
			max: 15,
			val: 6
		},
		rotationPerIteration: {
			min: 0,
			max: 180,
			val: 30
		},
		branchIterationScaling: {
			min: 0,
			max: 100,
			val: 100
		},
		startingAngle: {
			min: 0,
			max: 360,
			val: 0
		},
		treeColorR: {
			min: 0,
			max: 255,
			val: 255
		},
		treeColorG: {
			min: 0,
			max: 255,
			val: 255
		},
		treeColorB: {
			min: 0,
			max: 255,
			val: 255
		},
		backColorR: {
			min: 0,
			max: 255,
			val: 0
		},
		backColorG: {
			min: 0,
			max: 255,
			val: 0
		},
		backColorB: {
			min: 0,
			max: 255,
			val: 0
		},
		zoom: {
			min: 0,
			max: 200,
			val: 100
		},
		lineWidth: {
			min: 1,
			max: 30,
			val: 1
		}
	}

function randomiseSliders() {
	for (var sliderName in sliders) {
		sliders[sliderName].val = Math.floor((Math.random() * sliders[sliderName].max) + sliders[sliderName].min);	
	}
	setSliderValues();
}

function setSliderValues() {
	$( "#iterations-slider" ).slider( "value", sliders.iterations.val );
	$( "#noOfTrees-slider" ).slider( "value", sliders.noOfTrees.val );
	$( "#rotationPerIteration-slider" ).slider( "value", sliders.rotationPerIteration.val );
	$( "#branchIterationScaling-slider" ).slider( "value", sliders.branchIterationScaling.val );
	$( "#startingAngle-slider" ).slider( "value", sliders.startingAngle.val );
	$( "#tree-slider-R" ).slider( "value", sliders.treeColorR.val );
	$( "#tree-slider-G" ).slider( "value", sliders.treeColorG.val );
	$( "#tree-slider-B" ).slider( "value", sliders.treeColorB.val );
	$( "#back-slider-R" ).slider( "value", sliders.backColorR.val );
	$( "#back-slider-G" ).slider( "value", sliders.backColorG.val );
	$( "#back-slider-B" ).slider( "value", sliders.backColorB.val );
	$( "#zoom-slider" ).slider( "value", sliders.zoom.val );
	$( "#lineWidth-slider" ).slider( "value", sliders.lineWidth.val );
}

function setupInteractions() {
	// Set up download button
	var download_btn = document.getElementById('btn-download');
	download_btn.addEventListener('click', function (e) {
		var dataURL = elem.toDataURL('image/png');
		download_btn.href = dataURL;
	});

	// Set up settings toggle button
	var settings_toggle = document.getElementById('btn-settings');
	settings_toggle.addEventListener('click', function (e) {
		// Show or hide #settings
		$("#settings").fadeToggle();
	});

	// Set up randomise button
	var randomise_btn = document.getElementById('btn-randomise');
	randomise_btn.addEventListener('click', function (e) {
		// Set all user-defineable values randomly
		if (confirm("Are you sure? This might crash!") == true) {
			randomiseSliders();
			updateCanvas();
			
		}
	});
	
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
		});
	}
	
	createSlider($( "#iterations-slider" ), $( "#iterations-txt" ), sliders.iterations.min, sliders.iterations.max, "horizontal");
	createSlider($( "#noOfTrees-slider" ), $( "#noOfTrees-txt" ), sliders.noOfTrees.min, sliders.noOfTrees.max, "horizontal");
	createSlider($( "#rotationPerIteration-slider" ), $( "#rotationPerIteration-txt" ), sliders.rotationPerIteration.min, sliders.rotationPerIteration.max, "horizontal");
	createSlider($( "#branchIterationScaling-slider" ), $( "#branchIterationScaling-txt" ), sliders.branchIterationScaling.min, sliders.branchIterationScaling.max, "horizontal");
	createSlider($( "#startingAngle-slider" ), $( "#startingAngle-txt" ), sliders.startingAngle.min, sliders.startingAngle.max, "horizontal");
	createSlider($( "#tree-slider-R" ), $( "#tree-color-R" ), sliders.treeColorR.min, sliders.treeColorR.max, "vertical");
	createSlider($( "#tree-slider-G" ), $( "#tree-color-G" ), sliders.treeColorG.min, sliders.treeColorG.max, "vertical");
	createSlider($( "#tree-slider-B" ), $( "#tree-color-B" ), sliders.treeColorB.min, sliders.treeColorB.max, "vertical");
	createSlider($( "#back-slider-R" ), $( "#back-color-R" ), sliders.backColorR.min, sliders.backColorR.max, "vertical");
	createSlider($( "#back-slider-G" ), $( "#back-color-G" ), sliders.backColorG.min, sliders.backColorG.max, "vertical");
	createSlider($( "#back-slider-B" ), $( "#back-color-B" ), sliders.backColorB.min, sliders.backColorB.max, "vertical");
	createSlider($( "#zoom-slider" ), $( "#zoom-txt" ), sliders.zoom.min, sliders.zoom.max, "horizontal");
	createSlider($( "#lineWidth-slider" ), $( "#lineWidth-txt" ), sliders.lineWidth.min, sliders.lineWidth.max, "horizontal");

	setSliderValues();
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
	};
}

function setColours() {
	var background_rgb =[
		$('#back-slider-R').slider("value"),
		$('#back-slider-G').slider("value"),
		$('#back-slider-B').slider("value")
	];
   colours.background = "rgb("+ background_rgb.join(',') + ")";

	var tree_rgb =[
		$('#tree-slider-R').slider("value"),
		$('#tree-slider-G').slider("value"),
		$('#tree-slider-B').slider("value")
	];
   colours.tree = "rgb("+ tree_rgb.join(',') + ")";
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
		branchIterationScaling: $('#branchIterationScaling-slider').slider("value"),
		// Starting position (+/-0 = top, +90/-270 = right, +/-180 = down, +270/-90 = left)
		startingAngle: $('#startingAngle-slider').slider("value"),
		// startingAngle: 0

	};
	// Scales size of tree in canvas
	zoom = $('#zoom-slider').slider("value");
	// Line thickness
	// Can this be made a function of the generation currently being drawn?
	ctx.lineWidth = $('#lineWidth-slider').slider("value");
}

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
	var scalingFactor = zoom*design.depth/Math.pow(Math.sqrt(design.depth), 3);
	if (depth !== 0){
		var x2 = x1 + (Math.cos(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
		var y2 = y1 + (Math.sin(angle * degToRad) * ((depth-1) * (1 - design.branchIterationScaling/100) + 1) * scalingFactor);
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
	$("#branchIterationScaling").text(design.branchIterationScaling);
	$("#zoom").text(zoom);
	$("#lineWidth").text(ctx.lineWidth);
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
	function showStartupDialog() {
		$( "#dialog" ).dialog({
			resizable: false,
			draggable: false,
			width: 350,
			height: 230,
			dialogClass: "alert",
		});
	}
	elem = document.getElementById('fractalTree');
	ctx = elem.getContext('2d');
	setupInteractions();
	setCanvasSize();
	setSeedPoints();
	updateCanvas();
	showStartupDialog();
});