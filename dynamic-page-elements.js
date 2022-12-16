
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Global Variables & Genearl Behavior Functions (Things that are always running latently) Prior to
// the first grid initialization
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Establish a variable to determine if mouse is down or up
let mouseDown = false;
document.body.onmousedown = function () {mouseDown = true;}
document.body.onmouseup = function () {mouseDown = false;}

// Store resolution slider as an object and resolution slider container
const resolutionSlider = document.querySelector('.slider');
const sliderContainer = document.querySelector('.slider-container');

// Initialize resfactor (default value per the slider html code) and print value on visible html
let resFactor = resolutionSlider.value;
const resText = document.createElement('p');

resText.classList.add('res-text');
resText.textContent = `${resFactor} x ${resFactor}`;
sliderContainer.appendChild(resText);

// Establish variable to slider
console.log(resFactor);

// Function to run everytime slider is adjsuted
function changeResVal() {
    resFactor = resolutionSlider.value;
    
    const sliderText = document.querySelector('.res-text');
    sliderText.textContent = `${resFactor} x ${resFactor}`;

    console.log(resFactor);
}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Initialize Sketch Space
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function initGridBlocks (resFactor) {

    // Create an object that points to the container div
    const sketchGrid = document.querySelector('div.page-content div.sketch-grid');
    
    // Isolate square dim of sketch area
    const gridDim = window.getComputedStyle(sketchGrid).width;
    const gridDimNum = gridDim.slice(0,gridDim.length-2);

    // Compute the dimension of each block
    const blockDim = gridDimNum/resFactor;

    // May not need this while loop segement...
    // Because remainders are stored, we get an even num
    // of grid squares

    // console.log(`Using a grid dim of ${gridDimNum}`);
    // console.log(`Using a block dim of ${blockDim}`);

    // Set dimension of blocks for sketch area (divide dim by resolution)
    const blockDimStyle = `${blockDim}px`;

    // Compute how many sketch divs must be used...
    const blocksNeeded = resFactor ** 2;

    for (let i = 0; i < blocksNeeded; i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.height = blockDimStyle;
        gridBlock.style.width = blockDimStyle;
        gridBlock.classList.add('sketch-block');
        sketchGrid.appendChild(gridBlock);
    }

    }

// Custom requirement always have a resolution of 1000 pixels...!
initGridBlocks(resFactor);


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Attach Event Listeners
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Establish global constants that references all sketch blocks, control buttons, and then individual buttons
const sketchBlocks = document.querySelectorAll('.sketch-block');
const controlButtons = document.querySelectorAll('button.control-button');
const resetButton = document.querySelector('button.control-button.reset');


// generate callback function
function changeDim(e) {
     // Get all sketch blocks
     const blocks = document.querySelectorAll('.sketch-block');

     // Recompute what the block dimension should be
     const sketchGrid = document.querySelector('div.page-content div.sketch-grid');
     const gridDim = window.getComputedStyle(sketchGrid).width;
     const gridDimNum = gridDim.slice(0,gridDim.length-2);
 
     // Recalculate block dim
     const newBlockDim = gridDimNum / resFactor; // resFactor is global variable
     const newBlockDimStyle = `${newBlockDim}px`;

     blocks.forEach(block => {
        block.style.height = newBlockDimStyle;
        block.style.width = newBlockDimStyle;
     });
}

// Add event listener to the window...
window.addEventListener('resize', changeDim);

// Set hover effect so that div's with the .sketch-block class change color
// when the mouse hovers over them

function dragColor(e) {
    // Add the colored class to the div so to allow the block to be colored black
    if (mouseDown) {
        this.classList.add('colored');
    }
}

function clickColor(e) {
    // Add the colored class to the div so to allow the block to be colored black
    this.classList.add('colored');
    
}

sketchBlocks.forEach(sketchBlock => sketchBlock.addEventListener('mouseenter',dragColor));
sketchBlocks.forEach(sketchBlock => sketchBlock.addEventListener('click',clickColor));

// Attach event listener to buttons

// Add one to highlight when hovering over the button

function buttonHover (e) {
    // Colors button if it is being hovered over
    this.classList.add('hover');
}

function revertButton(e) {
    // Colors the button if it is no longer being hovered over
    this.classList.remove('hover');
}

controlButtons.forEach(controlButton => controlButton.addEventListener('mouseenter',buttonHover));
controlButtons.forEach(controlButton => controlButton.addEventListener('mouseleave',revertButton));

// Reset Grid Function / Button
function resetGrid (e) {
    sketchBlocks.forEach(sketchBlock => sketchBlock.classList.remove('colored'));
}

resetButton.addEventListener('click',resetGrid);

// Enable user to set resolution (reset grid upon entering resolution)
