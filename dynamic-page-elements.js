// Create 16 x 16 grid of square divs (maybe increase fidelity?)

// If this function can ingest a input from user (defaulting at 16 if no input then we can have a resolution scaler!)

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

// Res Factor Set by Some Other Event (static for now)
const resFactor = 16;

// Custom requirement always have a resolution of 1000 pixels...!
initGridBlocks(resFactor);

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