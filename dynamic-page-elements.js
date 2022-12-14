
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Global Variables & General Event Listeners
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Establish a variable to determine if mouse is down or up
let mouseDown = false;
document.body.onmousedown = function () {mouseDown = true;}
document.body.onmouseup = function () {mouseDown = false;}

// Store resolution slider as an object and resolution slider container
const resolutionSlider = document.querySelector('#gridRes');
const resContainer = document.querySelector('#grid-slider-container');

// Initialize resfactor (default value per the slider html code) and print value on visible html
let resFactor = resolutionSlider.value;
const resText = document.createElement('p');

resText.classList.add('res-text');
resText.textContent = `${resFactor} x ${resFactor}`;
resContainer.appendChild(resText);

// Store pen slider as an object and pen slider container
const penSlider = document.querySelector('#penShade');
const shadeContainer = document.querySelector('#pen-slider-container');

// Initialize shade factor (default value per the slider html code) and print value on visible html
let shadeFactor = penSlider.value;
const shadeText = document.createElement('p');
shadeText.classList.add('shade-text');
shadeText.textContent = `${shadeFactor}%`;
shadeContainer.appendChild(shadeText);

// Store color picker as an object
const colorPicker = document.querySelector('#pen-color-selector');

// Store default pen color value
let colorVal = colorPicker.value;

// Store rainbow mode and eraser buttons
const rainbowMode = document.querySelector('#rainbow-mode');
const eraserMode = document.querySelector('#eraser-mode');
const eraserColor = "#FFFFFF";
let rainbowPen = "";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Sketch Space Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Function to generate random color everytime sketch-space is clicked or dragged on
// ***************************************************************************************************

function updateRainbow(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    rainbowPen = `#${randColor.toUpperCase()}`;
}

// Callback Functions that Allow for Block Coloring
// ***************************************************************************************************
function dragColor(e) {
    // Add the colored class to the div so to allow the block to be colored black
    if (mouseDown) {
        updateRainbow();
        let blockColor = "";
        if (rainbowMode.checked && !eraserMode.checked) {
            blockColor = `${rainbowPen}`;
        }
        else if (eraserMode.checked) {
            blockColor = `${eraserColor}`;
        }
        else {
            blockColor = `${colorVal}`;
        }
        this.style.backgroundColor = blockColor;
        this.style.opacity = `${shadeFactor/100}`;
    }
}

function clickColor(e) {
    // Add the colored class to the div so to allow the block to be colored black
    updateRainbow();
    let blockColor = "";
    if (rainbowMode.checked && !eraserMode.checked) {
        blockColor = `${rainbowPen}`;
    }
    else if (eraserMode.checked) {
        blockColor = `${eraserColor}`;
    }
    else {
        blockColor = `${colorVal}`;
    }
    this.style.backgroundColor = blockColor;
    this.style.opacity = `${shadeFactor/100}`;
}

// Function to activate when clear grid button is pressed
// ***************************************************************************************************
function resetGrid () {
    const sketchBlocks = document.querySelectorAll('.sketch-block'); 
    sketchBlocks.forEach(sketchBlock => sketchBlock.style.backgroundColor = "#FFFFFF");
}

// Grid initialization / re-intialization function
// ***************************************************************************************************
function initGridBlocks (resFactor) {

    // Create an object that points to the container div
    const sketchGrid = document.querySelector('div.page-content div.sketch-grid');
    
    // Remove any children existing in the grid
    while (sketchGrid.firstChild) {sketchGrid.removeChild(sketchGrid.firstChild);}

    // Isolate square dim of sketch area
    const gridDim = window.getComputedStyle(sketchGrid).width;
    const gridDimNum = gridDim.slice(0,gridDim.length-2);

    // Compute the dimension of each block
    const blockDim = gridDimNum/resFactor;

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

    // Attach event Listeners to sketch blocks
    const sketchBlocks = document.querySelectorAll('.sketch-block');
    sketchBlocks.forEach(sketchBlock => sketchBlock.addEventListener('mouseenter',dragColor));
    sketchBlocks.forEach(sketchBlock => sketchBlock.addEventListener('click',clickColor));
    }

// Initialize sketch space with default value upon load
initGridBlocks(resFactor);

// Function to run everytime slider is adjusted
function changeResVal() {
    resFactor = resolutionSlider.value;
    const sliderText = document.querySelector('.res-text');
    sliderText.textContent = `${resFactor} x ${resFactor}`;
    initGridBlocks(resFactor);
}

// Function to run everytime color-picker recieves an input
function changeColorVal() {
    colorVal = colorPicker.value;
}

// Function to run everytime pen-shader recieves an input
function changePenShade() {
    shadeFactor = penSlider.value;
    const shadeText = document.querySelector('.shade-text');
    shadeText.textContent = `${shadeFactor}%`;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// General Event Listeners Agnostic of Sketch Area Resolution Change
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Resize sketch area during window resize
// ***************************************************************************************************
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

// Attach event listener to buttons
// ***************************************************************************************************
function buttonHover (e) {
    // Colors button if it is being hovered over
    this.classList.add('hover');
}

function revertButton(e) {
    // Colors the button if it is no longer being hovered over
    this.classList.remove('hover');
}

const controlButtons = document.querySelectorAll('button.control-button');
controlButtons.forEach(controlButton => controlButton.addEventListener('mouseenter',buttonHover));
controlButtons.forEach(controlButton => controlButton.addEventListener('mouseleave',revertButton));

