/*
Andrea Martinez
Modifications:
5 points: Enemy Spaceship moving faster, worth more, and smaller
1 point: Create New Background Tile Sprite 

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