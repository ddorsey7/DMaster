window.onload = function()
{   
    "use strict";
    
    //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
	var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});// render: render });
    
    function preload() 
	{
        // Load an image and call it 'logo'
		game.load.image( 'ball', 'assets/virus.png' );
		game.load.image( 'box', 'assets/bloodflow.jpg' );
		
		//shooter
		game.load.image('arrow', 'assets/wc.png');
		game.load.image('bullet', 'assets/wcp.png');
		
		game.load.audio('boden', 'assets/Survival.m4a');
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
	var startTime;
	
	var bg;
	
	//shooter
	var sprite;
	var bullets;

	var fireRate = 100;
	var nextFire = 0;
	
	//keyboard
	var cursors;

	function create() {
		//background
		bg = game.add.tileSprite(0, 0, 1600, 1200, 'box');

		game.physics.startSystem(Phaser.Physics.ARCADE);

		cursors = game.input.keyboard.createCursorKeys();
    
		//  This creates a simple sprite that is using our loaded image and
		//  displays it on-screen
		//  and assign it to a variable
		balls = game.add.group();
		
		//Timer
		startTime=game.time.time;
		time=0;
		timeText = game.add.text(1100, 10, timeString + time, { font: '84px Arial', fill: '#fff' });
		//  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '168px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;
		

		for (var i = 0; i < 10; i++)
		{
			var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		
			game.physics.enable(s, Phaser.Physics.ARCADE);
			s.body.velocity.x = game.rnd.integerInRange(-400, 400);
			s.body.velocity.y = game.rnd.integerInRange(-400, 400);
		}
	

		game.physics.enable([balls], Phaser.Physics.ARCADE);

		//This gets it moving
		balls.setAll('body.collideWorldBounds', true);
		balls.setAll('body.bounce.x', 1);
		balls.setAll('body.bounce.y', 1);
		balls.setAll('body.minBounceVelocity', 0);
		
		//shooter
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		
		
		sprite = game.add.sprite(game.world.centerX,game.world.centerY, 'arrow');
		sprite.anchor.set(0.5);
		
		game.physics.enable(sprite, Phaser.Physics.ARCADE);
		sprite.body.allowRotation = false;
		
		//cursors
		cursors = game.input.keyboard.createCursorKeys();
	}

	//Move the knocker with the arrow keys
	function update () {
		//time
		updateTime();
		// Enable physics between balls
		game.physics.arcade.collide(balls);
		balls.rotation = game.physics.arcade.moveToObject(sprite, 1000, 60, 500);
		//shooter
		sprite.rotation = game.physics.arcade.angleToPointer(sprite);
		
		if(game.input.activePointer.isDown)
			fire();
		game.physics.arcade.collide(balls, bullets, hitByBullet, null, this);
		game.physics.arcade.collide(balls, sprite, collision, null, this);
		
		//controls
		if (cursors.left.isDown)
		{
			sprite.body.velocity.x = -300;
		}
		else if (cursors.right.isDown)
		{
			sprite.body.velocity.x = 300;
		}
		else if (cursors.down.isDown)
		{
			sprite.body.velocity.y = -300;
		}
		else if (cursors.up.isDown)
		{
			sprite.body.velocity.y = 300;
		}
	}
	
	function hitByBullet (balls, bullet) 
	{
		bullet.kill();
		balls.kill();
		
		balls.reset(game.world.randomX, 0);
		game.physics.enable(balls, Phaser.Physics.ARCADE);
		balls.body.velocity.x = game.rnd.integerInRange(-400, 400);
		balls.body.velocity.y = game.rnd.integerInRange(-400, 400);
	}
	
	function collision (balls, sprite)
	{
		sprite.kill();
		sprite.visible= false;
		stateText.text = "You Died!!!";
		stateText.visible = true;
	}
	
	function updateTime()
	{
		
		time = (Math.floor((game.time.time-startTime) / 1000));// % 60);
		if(time==60)
			time-=60;
		
		timeText.text= "time: "+time + " secs";//60";
		if (time==59)
		{
			stateText.text = "You Survived!";
			stateText.visible = true;
		}
	}
	
	function fire() 
	{

		//if (game.time.now > nextFire && bullets.countDead() > 0)
		if(nextFire==15)
		{
			//nextFire = game.time.now + fireRate;

			var bullet = bullets.getFirstDead();

			bullet.reset(sprite.x - 8, sprite.y - 8);

			game.physics.arcade.moveToPointer(bullet, 300);
			
			game.physics.enable(bullet, Phaser.Physics.ARCADE);
			
			//game.physics.arcade.collide(knocker, bullet, hitByBullet, null, this);
			
			nextFire=0;
		}
		
		nextFire++;

	}
};
