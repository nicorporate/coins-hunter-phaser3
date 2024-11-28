import Phaser from 'phaser'

// import HelloWorldScene from './HelloWorldScene'
import CollectingStarsScene from './scenes/CollectingStarsScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 500 },
		},
	},
	scene: [CollectingStarsScene],
}

export default new Phaser.Game(config)
