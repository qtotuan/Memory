// Create array with 10 images
var images = [
    getImage("avatars/leafers-seed"),
    getImage("avatars/spunky-sam"),
    getImage("avatars/mr-pants"), 
    getImage("avatars/mr-pink"),
    getImage("avatars/piceratops-seed"),
    getImage("avatars/old-spice-man"),
    getImage("avatars/orange-juice-squid"),
    getImage("avatars/piceratops-ultimate"),
    getImage("avatars/purple-pi"),
    getImage("avatars/robot_female_2")
];

// Global var for number of columns/rows
var numCol = 2;
var numRow = 2;

// Create array with 2 copies of each image, 20 images total
var randomImages = [];
for (var i=0; i < (numCol * numRow)/2; i++) {
    
    // Create a random number 1-10, and store in a variable to use an an index later
    var randomNumber = floor(random(images.length));
    
    // Push an image twice to the array
    randomImages.push(images[randomNumber]);
    randomImages.push(images[randomNumber]);
    
    // Use splice to remove the randomNumer that has already been used
    images.splice(randomNumber,1);
}


// Randomize the array of images; this sort function gives back equal number of positive and negative number
randomImages.sort(
    function() {
    return 0.5 - random();
    }
);



//***Memory Cards Back***//

// Tile object: constructor function
var Tile = function (x, y, width, randomImages) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.randomImages = randomImages;
};

// Method: Draw the tile face up; store if face is down in a property
Tile.prototype.drawFaceUp = function() {
     fill(205, 218, 247);
     rect(this.x, this.y, this.width, this.width, 10);
     image(this.randomImages, this.x, this.y, this.width, this.width);
     this.FaceIsDown = false;
};

// Method: Draw the tile face down; store if face is down in a property
Tile.prototype.drawFaceDown = function() {
     fill(205, 218, 247);
     rect(this.x, this.y, this.width, this.width, 10);
     image(getImage("creatures/Hopper-Jumping"), this.x, this.y, this.width, this.width);
     this.FaceIsDown = true;
};

// Create array of objects of tiles
var tiles = [];

for (var i = 0; i <numCol; i++) {
    for (var j = 0; j <numRow; j++) {
tiles.push(new Tile (50 + i*60, 50 + j*60, 50, randomImages.pop()));
}
}

// Call the draw function
for (var i=0; i < tiles.length; i++) {
    tiles[i].drawFaceDown();
}


// Check if mouse is inside tile
Tile.prototype.mouseInside = function () {
    return mouseX > this.x && 
    mouseX < (this.x + this.width) && 
    mouseY > this.y && 
    mouseY < (this.y + this.width);
};

// Flip Tiles face up. Ad MouseClicked function; keep track of number of tiles flipped and store in global variable; execute function only if number of tiles flipped is < 2; only exectue if FaceIsDown is true (so when a tile is clicked twice, the user can still flip another tile); loop() makes the code in draw run continously
var flippedTiles = [];
var frameCountSecondClick = 0;
var numTries = 0;

mouseClicked = function () {
    for (var i=0; i < tiles.length; i++) {
        if (tiles[i].mouseInside() && flippedTiles.length < 2 && tiles[i].FaceIsDown) {
            tiles[i].drawFaceUp();
            flippedTiles.push(tiles[i]);
            if (flippedTiles[0].randomImages === flippedTiles[1].randomImages) {
                flippedTiles[0].isMatch = true;
                flippedTiles[1].isMatch = true;
            }
            if (flippedTiles.length === 2) {
                numTries++;
                frameCountSecondClick = frameCount;
                loop();
            }
        }
    }
    // Display message when all paris have been found
            var foundAllMatches = true;
            for (var i = 0; i < tiles.length; i++){
                foundAllMatches = foundAllMatches && tiles[i].isMatch;
            }
            if (foundAllMatches) {
                
                var rectX = 200;
                var rectY = 200;
                var rectW = 350;
                var rectH = 200;
                
                fill(250, 182, 250);
                strokeWeight(5);
                rectMode(CENTER);
                rect(rectX, rectY, rectW, rectH, 10);
                
                var myFont = createFont("monospace");
                textFont(myFont, 20);
                textAlign(CENTER, CENTER);
                fill(14, 71, 0);
                text("Whoohoo! You found all pairs! It took you " + numTries + " tries.", 100, 133, 200, 131);
            }
};


// Flip Tiles back face down automatically. Compare time elapsed after the second tile has been flipped over; this is done by comparing 2 points in time: 1. point in time right now and point in time of the second tile click; if time difference is higher than x frames, then draw all tiles face down; reset numTilesFlipped and frameCountSecondClick to 0 to allow process to be started over again; noLoop() stops the code running in draw()
draw = function() {
    if (frameCount-frameCountSecondClick > 50) {
        for (var i = 0; i < tiles.length; i++) {
            if (!tiles[i].isMatch) {
                tiles[i].drawFaceDown();
            }
        }
        flippedTiles.length = 0;
        frameCountSecondClick = 0;
        noLoop();
    }
};





/* 
for (var i = 0; i < 20; i++) {
    image(randomImages[i], 0 + i*17, 59, 26, 26);
}
*/

// Adding more stuff to the code


