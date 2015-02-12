window.onload = function()
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
	var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});// render: render });
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'ball', 'assets/ball.png' );
		game.load.image( 'dude', 'assets/cat.png' );
    }
    
    var bouncy;
    
    var image;
	var knocker;
	var cursors;
	var balls;
	
	var score=0;
	var scoreString = '';
	var scoreText;
	var stateText;

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();
    
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
		balls = game.add.group();//game.add.sprite(400, 200, 'ball');
	//add multiple balls
	//sprites = game.add.group();
	
	//text
	//  The score
		scoreString = 'Score : ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    //  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;

		for (var i = 0; i < 30; i++)
		{
			var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		//s.animations.add('spin', [0,1,2,3]);
		//s.play('spin', 10, true);
			game.physics.enable(s, Phaser.Physics.ARCADE);
			s.body.velocity.x = game.rnd.integerInRange(-200, 200);
			s.body.velocity.y = game.rnd.integerInRange(-200, 200);
		}
	
		knocker = game.add.sprite(1000, 1000, 'dude');

		game.physics.enable([knocker,balls], Phaser.Physics.ARCADE);

		knocker.body.immovable = true;
		knocker.body.collideWorldBounds = true;

    //  This gets it moving
    //ball.body.velocity.setTo(200, 200);
		balls.setAll('body.collideWorldBounds', true);
		balls.setAll('body.bounce.x', 1);
		balls.setAll('body.bounce.y', 1);
		balls.setAll('body.minBounceVelocity', 0);

    //  This makes the game world bounce-able
    //ball.body.collideWorldBounds = true;

    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors (as an x,y point). "1" is 100% energy return
    //ball.body.bounce.setTo(1, 1);
	
	//add
	}

//  Move the knocker with the arrow keys
	function update () {

    //  Enable physics between the knocker and the ball
		game.physics.arcade.collide(knocker, balls);
	
	//score keeper
		game.physics.arcade.overlap(knocker, balls, collisionHandler, null, this);
	// Enable physics between balls
		game.physics.arcade.collide(balls);

		if (cursors.up.isDown)
		{
			knocker.body.velocity.y = -300;
		}
		else if (cursors.down.isDown)
		{
			knocker.body.velocity.y =  300;
		}
		else if (cursors.left.isDown)
		{
			knocker.body.velocity.x = -300;
		}
		else if (cursors.right.isDown)
		{
			knocker.body.velocity.x = 300;
		} 
		else
		{
			knocker.body.velocity.setTo(0, 0);
		}
    
	}
		function collisionHandler (bullet, alien) {

    //  When a bullet hits an alien we kill them both
    //bullet.kill();
    //alien.kill();

    //  Increase the score
		score += 20;
		scoreText.text = scoreString + score;

    //  And create an explosion :)
    //var explosion = explosions.getFirstExists(false);
	//explosion.reset(alien.body.x, alien.body.y);
    //explosion.play('kaboom', 30, false, true);

		if (score == 1000)
		{
			scoreText.text = scoreString + score;

        //enemyBullets.callAll('kill',this);
			stateText.text = " You Won, \n Click to restart";
			stateText.visible = true;

        //the "click to restart" handler
        //game.input.onTap.addOnce(restart,this);
		}

	}
/*function render () {

    //debug helper
    game.debug.spriteInfo(balls, 32, 32);

}*/
};
