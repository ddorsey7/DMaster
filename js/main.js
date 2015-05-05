window.onload = function()
{   
    "use strict";
    
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});
	function preload() {

    //game.load.image('analog', 'assets/tests/fusia.png');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('ball', 'assets/bat.png');
	game.load.image('city', 'assets/gotham.jpg');
	game.load.image('harleyPic', 'assets/harley.png');
	game.load.image('jokerPic', 'assets/joker.png');
	game.load.image('madPic', 'assets/MadLove.png');

	}

	var arrow;
	var ball;
	var catchFlag = false;
	var launchVelocity = 0;
	var Xvector;
	var Yvector;
	
	var bg;
	
	var joker;
	var joker2;
	var harley;
	var love;
	
	var score;
	var scoreString = '';
	var scoreText;
	var stateText;
	
	var time;
	var timeString="Time: ";
	var timeText;
	var startTime;

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
		
		bg = game.add.tileSprite(0, 0, 1600, 1200, 'city');
		joker = game.add.sprite(0, 150, 'jokerPic');
		//joker2 = game.add.sprite(700, 50, 'jokerPic');
		harley = game.add.sprite(700, 150, 'harleyPic' );
		//love = game.add.sprite(0, 150, 'madPic');
		
		//Timer
		/*startTime=game.time.time;
		time=0;
		timeText = game.add.text(570, 10, timeString + time, { font: '42px Arial', fill: '#fff' });*/
		//  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '168px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;
		// The score
		score=0;
		scoreString = 'Score : ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '42px Arial', fill: '#fff' });
		
		game.physics.enable([joker, harley], Phaser.Physics.ARCADE);
		joker.body.allowGravity = false;
		//joker2.body.allowGravity = false;
		harley.body.allowGravity = false;
		//love.body.allowGravity = false;

		// set global gravity
		game.physics.arcade.gravity.y = 200;
		game.stage.backgroundColor = '#0072bc';
		
		
		arrow = game.add.sprite(400, 350, 'arrow');

		game.physics.enable(arrow, Phaser.Physics.ARCADE);

		arrow.anchor.setTo(0.1, 0.5);
		arrow.body.moves = false;
		arrow.body.allowGravity = false;
		arrow.alpha = 0;
		
		ball = game.add.sprite(100, 400, 'ball');
		game.physics.enable(ball, Phaser.Physics.ARCADE);
		ball.anchor.setTo(0.5, 0.5);
		ball.body.collideWorldBounds = true;
		ball.body.bounce.setTo(0.9, 0.9);
		
		// Enable input.
		ball.inputEnabled = true;
		ball.input.start(0, true);
		ball.events.onInputDown.add(set);
		ball.events.onInputUp.add(launch);
		
		
		game.camera.follow(ball, Phaser.Camera.FOLLOW_TOPDOWN);

	}

	function set(ball, pointer) {

		ball.body.moves = false;
		ball.body.velocity.setTo(0, 0);
		ball.body.allowGravity = false;
		catchFlag = true;
		

	}

	function launch() {

		catchFlag = false;
		ball.body.moves = true;
		game.camera.follow(ball, Phaser.Camera.FOLLOW_TOPDOWN);
		arrow.alpha = 0;
		
		Xvector = (arrow.x - ball.x) * 3;
		Yvector = (arrow.y - ball.y) * 3;
		ball.body.allowGravity = true;  
		ball.body.velocity.setTo(Xvector, Yvector);

	}

	function update() {
		
		

		arrow.rotation = game.physics.arcade.angleBetween(arrow, ball);
		
		ball.rotation += 50;
		
		//reset(ball);
		
		//moving cards
		moveRight(joker);
		//moveRight(love);
		//moveLeft(joker2);
		moveLeft(harley);
		
		game.physics.arcade.collide(ball, joker, 	hitRight, 	null, this);
		//game.physics.arcade.collide(ball, love, 	hitRight, 	null, this);
		//game.physics.arcade.collide(ball, joker2, 	hitLeft, 	null, this);
		game.physics.arcade.collide(ball, harley, 	hitLeft, 	null, this);
		
		if (catchFlag == true)
		{
			//  Track the ball sprite to the mouse  
			ball.x = game.input.activePointer.worldX;   
			ball.y = game.input.activePointer.worldY;
			
			arrow.alpha = 1;
			
			//heightLimit(ball);
		}   

	}
	
	function reset(bat) {
		if(bat.y <= 50)
		{
			bat.kill();
			bat.reset(game.world.randomX, 590);
		}
		
	}
	
	function heightLimit(bat) {
		
		
		
		if(bat.y <= 300)
		{
			bat.kill();
			bat.reset(game.world.randomX, 590);
			
			score -= 20;
		
			scoreText.text = 'score: ' + score;
		}
		
	}
	
	function moveRight(card){
		card.x += 5;
		if(card.x >= 800)
			card.reset(game.world.randomX, 150);
	}
	
	function moveLeft(card){
		card.x += -5;
		if(card.x < 0)
			card.reset(game.world.randomX, 50);
	}
	
	function hitRight (ball, card) 
	{
		card.kill();
		ball.kill();
		card.reset(game.world.randomX, 150);
		ball.reset(game.world.randomX, 590);
		
		score += 20;

		scoreText.text = 'score: ' + score;
	}
	
	function hitLeft (ball, card) 
	{
		card.kill();
		ball.kill();
		card.reset(game.world.randomX, 50);
		ball.reset(game.world.randomX, 590);
		
		score += 20;

		scoreText.text = 'score: ' + score;
	}
	
};