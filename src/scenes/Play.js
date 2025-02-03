class Play extends Phaser.Scene{
    constructor(){
        super('playScene')
    
    }
    create(){
        // this places the tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'galaxy').setOrigin(0,0)
        // purple UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xCCAEEA).setOrigin(0,0)
        
        this.p1Rocket  = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5,0)
        //ufo .setScale changes the size of image and when passing ship03 will go under the ship
        this.ship04 = new Spaceship_enemy(this, game.config.width + borderUISize, borderUISize*3, 'ufo', 2, 50).setOrigin(0, 0).setScale(2)

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0)
         // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        

        
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        // initilize score
        this.p1Score = 0
        //displays score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '26px',
            backgroundColor: '#C891FF',
            color: '#E0CFF2',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 150
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        //displays score
        this.timeLeft = this.add.text(borderUISize + borderPadding*40,borderUISize + borderPadding *2, '', scoreConfig)

        // game over flag
        this.gameOver = false

        //60 second play timer
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

    
    }
    update(){
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)){
            this.scene.restart()
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene")
        }
        this.starfield.tilePositionX -= 4
        if(!this.gameOver){
            this.p1Rocket.update() // update rocket sprite
            // updates the ships 3x
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        
        }
    
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
       
        }
        
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
         
        }
        
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
       
        }

       
    
        // pointer input 
        
        this.p1Rocket.setInteractive()
        this.input.on('pointerdown', () => {
            if (!this.gameOver && !this.p1Rocket.isFiring) {
                this.p1Rocket.isFiring = true
            }
        })
        this.input.on('pointermove', (pointer) => {
            this.p1Rocket.x = Phaser.Math.Clamp(pointer.x, borderUISize, game.config.width - borderUISize)
        })
        if (this.p1Rocket.isFiring) {
            if (keyLEFT.isDown) {
                this.p1Rocket.x -= 4 //moves left
            }
            if (keyRIGHT.isDown) {
                this.p1Rocket.x += 4 //moves right
            }
        }
        let remainingTime = Math.ceil(this.clock.getRemainingSeconds())//remaining time ceil() rounds
        this.timeLeft.text = `Time: ${remainingTime}s`

       

    }
    

    checkCollision(rocket, ship){
        // simple aabb checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width> ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            return true
        }else{
            return false
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprite at the ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode') //plays explode animation
        boom.on('animationcomplete', () => { //callback after animation completes
            ship.reset() //resets ship position
            ship.alpha = 1 //makes ship visible again
            boom.destroy() //removes explosion sprite
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
        this.remainingTime += this.addedTime
    }

}