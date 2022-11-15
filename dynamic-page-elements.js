// Create 16 x 16 grid of square divs (maybe increase fidelity?)

// If this function can ingest a input from user (defaulting at 16 if no input then we can have a resolution scaler!)

function initGridBlocks (resolutionFactor) {

    // Create an object that points to the container div
    const sketchGrid = document.querySelector('div.page-content div.sketch-grid');
    
    // Isolate square dim of sketch area
    const gridAreaTxt = window.getComputedStyle(sketchGrid).height;
    const gridAreaNum = gridAreaTxt.slice(0,gridAreaTxt.length-2);
    
    // Check if square dim is cleanly divisible by resolutionFactor
    // If not, increment res factor down until it is 0

    while (gridAreaNum%resolutionFactor != 0) {
        resolutionFactor --;
    }

    console.log(`Using a resolution factor of ${resolutionFactor}`)

    // Set dimension of blocks for sketch area
    const blockDim = gridAreaNum/resolutionFactor;
    
    // Create style value for block dim
    const blockDimStyle = `${blockDim}px`;

    // For resolution factor squared, construct that many block objects for sketch area

    for (let i = 0; i < resolutionFactor**2; i++) {
        const gridBlock = document.createElement('div');
        gridBlock.style.height = blockDimStyle;
        gridBlock.style.width = blockDimStyle;
        sketchGrid.appendChild(gridBlock);
    }

    }

// Per Assignment Requirement, Start with a Resolution of 16!
initGridBlocks(16);