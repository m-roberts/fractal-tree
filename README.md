# fractal-tree
Javascript implementation of a repeating fractal tree design for fun

### Example Design
![Example design](http://i.imgur.com/9ZSK97P.png "Example design")

### Version
0.2

### Running Online
It is possible to run the web application directly from the repo:
m-roberts.github.io/fractal-tree

### Changelog

v0.2
  - Added AngularJS and Angular Material

### TODO
  **Functionality**
  - Add mobile support
  - Add titles for sliders
  - Add accordion to sidebar (http://angularscript.com/angularjs-multi-level-accordion-component-v-accordion/)
  - Add invert option for relative scaling (i.e. gets longer each branch -> '1 - 1/depth')
  - Improve automatic zoom with better scaling function which automatically adjusts to fit page no matter what the design (likelt requires branchIterationScaling variable)
  - Add animations (i.e. ability to automatically move slider controls) -> GIF support?
  - Add transitions (i.e. a fluid movement between canvas draws rather than static canvas re-draws) (http://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)
  - Improve overall formatting of page
  - Adjust line width, branch length, colour, etc. according to generation of line drawn
  - Add save and load functionality (use database for JSON variables? Encode them into GET var in URL? http://stackoverflow.com/questions/16686121/javascript-save-way-to-read-get-without-php)

  **Meta**
  - Implement web workers for drawing computation
  - Real-time JS function editing (if possible)