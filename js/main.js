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
        game.load.image( 'ball', 'assets/car.png' );
		game.load.image( 'dude', 'assets/mycar.png' );
		game.load.image( 'box', 'assets/street.png' );
		
		game.load.image( 'cop', 'assets/police.png');
		
    }
    
    var bouncy;
    
    var image;
	var knocker;
	var cursors;
	var balls;
	var cop;
	
	var score;
	var scoreString = '';
	var scoreText;
	var stateText;
	
	var time;
	var timeString="Time: ";
	var timeText;
	
	var bg;
	
	var flag=true;

	function create() {
		//background
		bg = game.add.tileSprite(0, 0, 1600, 1200, 'box');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();
    
		//  This creates a simple sprite that is using our loaded image and
		//  displays it on-screen
		//  and assign it to a variable
		balls = game.add.group();//game.add.sprite(400, 200, 'ball');
		balls.enableBody = true;
		balls.physicsBodyType = Phaser.Physics.ARCADE;
		//add multiple balls
		//sprites = game.add.group();
	
		//text
		// The score
		score=0;
		scoreString = 'Life : ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '68px Arial', fill: '#fff' });
		//Timer
		time=0;
		timeText = game.add.text(1000, 10, timeString + time, { font: '68px Arial', fill: '#fff' });
		//  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;
		

		for (var i = 0; i < 5; i++)
		{
			var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		
			game.physics.enable(s, Phaser.Physics.ARCADE);
			s.body.velocity.x = game.rnd.integerInRange(-400, 400);
			s.body.velocity.y = game.rnd.integerInRange(-400, 400);
		}
	
		knocker = game.add.sprite(game.world.centerX,game.world.centerY, 'dude');
		cop = game.add.sprite(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'cop');

		game.physics.enable([knocker,balls,cop], Phaser.Physics.ARCADE);

		//knocker.body.immovable = true;
		knocker.anchor.setTo(0.5,0.5);//new code
		knocker.body.collideWorldBounds = true;
		knocker.body.allowRotation= false;//new code
		
		//cop code
		cop.anchor.setTo(0.5,0.5);//new code
		cop.body.collideWorldBounds = true;
		cop.body.allowRotation= false;//new code

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
		game.physics.arcade.collide(knocker, balls, hit, null, this);
		//Cop hit
		game.physics.arcade.collide(knocker, cop, collisionHandler, null, this);
		// Enable physics between balls
		game.physics.arcade.collide(balls);
		//new code
		knocker.rotation = game.physics.arcade.moveToPointer(knocker, 60, game.input.activePointer, 500);
		cop.rotation = game.physics.arcade.moveToObject(cop, knocker, 15,500);
	}
	
	function collisionHandler (bullet, alien) 
	{
		if(score>0)
			score -= 20;
		
		scoreText.text = scoreString + score;
		
	}
	
	function updateTime()
	{
		var gameRT=(Math.floor(game.time.time / 1000) % 60);
		time = (Math.floor(game.time.time / 1000) % 60)-gameRT;
		if(flag==true)
			time=0;
		flag=false;
		timeText.text= "time: "+time + "/60";
		if (score>=1000)
		{
			stateText.text = "You Won";
			stateText.visible = true;
		}
		if((time == 59)&(score>=1000))
		{
			stateText.text = "You Won";
			stateText.visible = true;
		}
		if((time == 59)&(score<1000))
		{
			stateText.text = "You Lose";
			stateText.visible = true;
		}
	}
	
	function hit (knocker, ball) {
	
	ball.kill();
	
    score += 10;

    scoreText.text = 'score: ' + score;

	}
};
