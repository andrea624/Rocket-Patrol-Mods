//enemy spaceship
class Spaceship_enemy extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.spaceshipSpeed*2
    }
    update(){
        //moves spaceship left
        this.x -= this.moveSpeed
        //wrap from the left to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width
        }
    }
    reset(){
        this.x = game.config.width
    }
}