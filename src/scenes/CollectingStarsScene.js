import Phaser from "phaser";
export default class CollectingStarsScene extends Phaser.Scene {
  constructor() {
    super("collecting-stars-scene");
  }

  init() {
    this.platforms = [];
    this.player = undefined;
    this.stars= undefined;
    this.bombs= undefined;

    this.cursor = undefined;
    this.scoreText = undefined;
    this.score = 0;
  }
  
  preload() {
    this.load.image("sky", "/pic/skies.jpg");
    // this.load.image("ground", "/images/platform.png");
    this.load.image("ground", "/pic/ground.png");
    // this.load.image("star", "/images/star.png");
    this.load.image("bomb", "/images/bomb.png");
    this.load.spritesheet("dude", "/pic/run.png", {
        frameWidth: 32,
        frameHeight: 32
    })
    this.load.spritesheet("star", "/pic/coin.png", {
        frameWidth: 208.75,
        frameHeight: 192
    })
    this.load.image("dudeJump", "/pic/jump.png")
    this.load.image("spikes", "/pic/spikes.png")
    this.load.image("daunTanah", "/pic/daunTanah.png")
    

  }

  create() {
    this.add.image(400, 300, 'sky').setScale(1.25);


    this.platforms=this.physics.add.staticGroup();
    // Kode untuk mengubah posisi ground meayang
    this.platforms.create(330, 130, "ground").setScale(0.5).refreshBody();
    this.platforms.create(470, 130, "ground").setScale(0.5).refreshBody();
    this.platforms.create(530, 250, "ground");
    this.platforms.create(250, 250, "ground");
    // this.platforms.create(400, 200, "ground").setScale(2).refreshBody();

    // Kode untuk mengubah posisi daunTanah melayang
    this.platforms.create(70, 420, "daunTanah").setScale(1).refreshBody()
    this.platforms.create(720, 420, "daunTanah").setScale(1).refreshBody()

    // Kode untuk mengubah posisi daunTanah yang paling bawah
    this.platforms.create(160, 570, "daunTanah").setScale(2).refreshBody()
    this.platforms.create(475, 570, "daunTanah").setScale(2).refreshBody()
    this.platforms.create(790, 570, "daunTanah").setScale(2).refreshBody()


    this.player = this.physics.add.sprite(100, 450, "dude").setScale(2).refreshBody();
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.stars = this.physics.add.group({
        key: "star",
        repeat: 9,
        setXY: { x: 50, y: 0, stepX: 70 },
      });
    this.stars.children.iterate((child) => { child.setScale(0.1); });
    this.bombs = this.physics.add.group({
        key: "bomb",
        repeat: 5,
        setXY: { x: 80, y: 0, stepX: 211 },
      });
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.stars.children.iterate(function (child) {
        // @ts-ignore
        child.setBounceY(0.5);
      });
    
    // Mengaktigkan cursor pada game
    this.cursor = this.input.keyboard.createCursorKeys();
    
    this.anims.create({
      key: "coins",
      frames: this.anims.generateFrameNumbers("star", { start: 0, end: 3}),
      frameRate: 20,
      repeat: -1,
    })
    // Membuat animasi pada player/sprite
    // Left animation
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3}),
      frameRate: 10,
      repeat: -1,
    })
    // Idle animation
    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    })
    this.anims.create({
      key: "jump",
      frames: [{ key: "dude",}],
      frameRate: 20,
    })
    // Right animation
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8}),
      frameRate: 10,
      repeat: -1,
    })

    // Overlaps Stars
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

    this.physics.add.overlap(this.player, this.bombs, this.gameOver, null, this);

    // Score Text
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#faff89"
    });
  }

  update() {
    if (this.cursor.left.isDown){
      this.player.setVelocity(-500, 200);
      this.player.anims.play("left", true)
    } else if (this.cursor.right.isDown){
      this.player.setVelocity(500, 200);
      this.player.anims.play("right", true)
    } else {
      this.player.setVelocity(0, 0);
      this.player.anims.play("turn")
    }

    if (this.cursor.up.isDown){
      this.player.setVelocity(0, -500);
      this.player.anims.play("jump")
    }
    else if(this.cursor.down.isDown){
      this.player.setVelocity(0, 500);
      this.player.anims.play("jump")
    }

    // Win condition 
    if (this.score >= 100) {
      this.physics.pause();
      this.add.text(300, 300, "You Win!!!", {
        fontSize: "48px",
        fill: "yellow",
      });
    }
  }
  
  collectStar(player, star){
    star.destroy()
    
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score)
  }

  gameOver(player, bomb){
    this.physics.pause()
    this.add.text(300,300,'Game Over!!!', { 
    fontSize: '48px', fill:'yellow' })
  }

}