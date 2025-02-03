/*
Andrea Martinez
Hours Spent: 11
Modifications:
5 points: Enemy Spaceship moving faster, worth more, and smaller
5 points: Mouse Movement and Left click to fire
3 points: Displays Time
1 point: Allows player to move ship even after being fired
1 point: Create New Background Tile Sprite 

Totals points: 15
sources used : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil used to help create my remaining time variable to help round and not show mili secs


*/
let config = {
    type: Phaser.AUTO,
    //turned pixel art on to make ufo clear
    pixelArt: true,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)
//reserves keyword bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
