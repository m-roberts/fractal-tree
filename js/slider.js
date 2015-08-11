function drawOnCanvas () {
   var rgb =[
       $('#slider-R').slider("value"),
       $('#slider-G').slider("value"),
       $('#slider-B').slider("value")
   ];
   var c = document.getElementById("fractalTree");
   var ctx = c.getContext("2d");
   var color = "rgb("+ rgb.join(',') + ")" ;
   ctx.fillStyle = color ;
    console.log(rgb);
   ctx.beginPath();
   ctx.arc(100, 100, 100, 0, Math.PI*2, true);
   ctx.closePath();
   ctx.fill();
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

/*
var textfield = document.getElementById('tree-color-R');

textfield.onchange = function() {
    console.log(this.value);
  alert("I am an alert box!");
} */