# fractal-tree
Javascript implementation of a repeating fractal tree design for fun

### Example Design
![Example design](http://i.imgur.com/9ZSK97P.png "Example design")

### Version
0.1.4

### Running Online
It is possible to run the web application directly from the repo:
m-roberts.github.io/fractal-tree

### Changelog

v0.1.4
  - Added JQuery inputs to change most variables in real-time without page reload
  - Added relative scaling for each branch iteration
  - Added manual zoom
  - Added randomise function
  - Added show/hide button for settings

v0.1.3
  - Moved settings display ('Toto, I've a feeling we're not in canvas anymore.'), needs colour option
  - Slightly improved colour slider appearance

v0.1.2
  - Added primitive tree colour slider, needs better initialisation, etc.

v0.1.1
  - No longer fails whenever canvas size is changed

v0.1.0
  - Correctly loads fractal tree to screen canvas
  - Produces text display of main variables used in design
  - Fails whenever canvas size is changed

### TODO
  **Functionality**
  - Implement with Angular (will fix lag)
  - Settings need colour control
  - Add mobile support
  - Add invert option for relative scaling (i.e. gets longer each branch -> '1 - 1/depth')
  - Improve automatic zoom with better scaling function which automatically adjusts to fit page no matter what the design (likelt requires branchIterationScaling variable)
  - Add animations (i.e. ability to automatically move slider controls) -> GIF support?
  - Add transitions (i.e. a fluid movement between canvas draws rather than static canvas re-draws) (http://www.kirupa.com/html5/animating_with_requestAnimationFrame.htm)
  - Improve overall formatting of page
  - Improve colour sliders (fetch initial tree colour from slider starting values, edit colour of each slider to reflect RGB rather than just pale orange)
  - Adjust line width, branch length, colour, etc. according to generation of line drawn
  - Add save and load functionality (use database for JSON variables? Encode them into GET var in URL? http://stackoverflow.com/questions/16686121/javascript-save-way-to-read-get-without-php)

  **Meta**
  - Separate functions and default variable values by file; give JS files better names
  - Establish computational limits to prevent variables from being too large as to break
  - Better commenting
  - Real-time JS function editing (if possible)