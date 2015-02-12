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
	
	var score;
	var scoreString = '';
	var scoreText;
	var stateText;
	
	var time;
	var timeString="Time: ";
	var timeText;

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
		// The score
		score=0;
		scoreString = 'Score : ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
		//Timer
		time=0;
		timeText = game.add.text(1400, 10, timeString + time, { font: '34px Arial', fill: '#fff' });
		//  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;

		for (var i = 0; i < 10; i++)
		{
			var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		
			game.physics.enable(s, Phaser.Physics.ARCADE);
			s.body.velocity.x = game.rnd.integerInRange(-200, 200);
			s.body.velocity.y = game.rnd.integerInRange(-200, 200);
		}
	
		knocker = game.add.sprite(1000, 1000, 'dude');

		game.physics.enable([knocker,balls], Phaser.Physics.ARCADE);

		knocker.body.immovable = true;
		knocker.body.collideWorldBounds = true;

		//This gets it moving
		balls.setAll('body.collideWorldBounds', true);
		balls.setAll('body.bounce.x', 1);
		balls.setAll('body.bounce.y', 1);
		balls.setAll('body.minBounceVelocity', 0);
	}

	//Move the knocker with the arrow keys
	function update () {
		//time
		updateTime();
		//score keeper
		game.physics.arcade.collide(knocker, balls, collisionHandler, null, this);
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
	
	function collisionHandler (bullet, alien) 
	{
		
		score += 20;
		scoreText.text = scoreString + score;
		
		if (score == 1000)
		{
			scoreText.text = scoreString + score;
			stateText.text = " You Won, \n Click to restart";
			stateText.visible = true;
		}
	}
	
	function updateTime()
	{
		time = Math.floor(game.time.time / 1000) % 60;
		timeText.text= timeString + time;
		
		if((time == 60)&&(score<1000))
		{
			stateText.text = "You Survived";
			stateText.visible = true;
		}
		
	}
};
