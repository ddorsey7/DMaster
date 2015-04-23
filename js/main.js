window.onload = function()
{   
    "use strict";
    
	var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});
	function preload() {

    //game.load.image('analog', 'assets/tests/fusia.png');
    game.load.image('arrow', 'assets/arrow.png');
    game.load.image('ball', 'assets/bat.png');    

	}

	var arrow;
	var ball;
	var catchFlag = false;
	var launchVelocity = 0;
	var Xvector;
	var Yvector;

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);

		// set global gravity
		game.physics.arcade.gravity.y = 200;
		game.stage.backgroundColor = '#0072bc';
		
		var graphics = game.add.graphics(0,0);
		graphics.beginFill(0x049e0c);
		graphics.drawRect(395, 350, 10, 250);

		//analog = game.add.sprite(400, 350, 'analog');

		//game.physics.enable(analog, Phaser.Physics.ARCADE);

		/*analog.body.allowGravity = false;
		analog.width = 8;
		analog.rotation = 220;
		analog.alpha = 0;
		analog.anchor.setTo(0.5, 0.0);*/
		
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

	}

	function set(ball, pointer) {

		ball.body.moves = false;
		ball.body.velocity.setTo(0, 0);
		ball.body.allowGravity = false;
		catchFlag = true;
		heightLimit(ball);

	}

	function launch() {

		catchFlag = false;
		
		ball.body.moves = true;
		arrow.alpha = 0;
		//analog.alpha = 0;
		Xvector = (arrow.x - ball.x) * 3;
		Yvector = (arrow.y - ball.y) * 3;
		ball.body.allowGravity = true;  
		ball.body.velocity.setTo(Xvector, Yvector);

	}

	function update() {

		arrow.rotation = game.physics.arcade.angleBetween(arrow, ball);
		
		ball.rotation += 50;
		
		reset(ball);
		
		if (catchFlag == true)
		{
			//  Track the ball sprite to the mouse  
			ball.x = game.input.activePointer.worldX;   
			ball.y = game.input.activePointer.worldY;
			
			arrow.alpha = 1;    
			/*analog.alpha = 0.5;
			analog.rotation = arrow.rotation - 3.14 / 2;
			analog.height = game.physics.arcade.distanceToPointer(arrow);  
			launchVelocity = analog.height;*/
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
		if(bat.y <= 500)
		{
			bat.kill();
			bat.reset(game.world.randomX, 590);
		}
		
	}
};