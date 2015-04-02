window.onload = function()
{   
    "use strict";
    
    //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
	var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update});// render: render });
    
    function preload() 
	{
        // Load an image and call it 'logo'
		game.load.image( 'ball', 'assets/car.png' );
		game.load.image( 'dude', 'assets/mycar.png' );
		game.load.image( 'box', 'assets/street.png' );
		
		game.load.image( 'cop', 'assets/police.png');
		
		//shooter
		game.load.image('arrow', 'assets/police.png');
		game.load.image('bullet', 'assets/ball.png');
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

	function create() {
		//background
		bg = game.add.tileSprite(0, 0, 1600, 1200, 'box');

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
		scoreString = 'Score: ';
		scoreText = game.add.text(10, 10, scoreString + score, { font: '84px Arial', fill: '#fff' });
		//Timer
		startTime=game.time.time;
		time=0;
		timeText = game.add.text(1100, 10, timeString + time, { font: '84px Arial', fill: '#fff' });
		//  Text
		stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
		stateText.anchor.setTo(0.5, 0.5);
		stateText.visible = false;
		
		//shoot
		sprite = game.add.sprite(400, 300, 'arrow');
		sprite.anchor.set(0.5);

		for (var i = 0; i < 10; i++)
		{
			var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		
			game.physics.enable(s, Phaser.Physics.ARCADE);
			s.body.velocity.x = game.rnd.integerInRange(-400, 400);
			s.body.velocity.y = game.rnd.integerInRange(-400, 400);
		}
	
		knocker = game.add.sprite(game.world.centerX,game.world.centerY, 'dude');
		//cop = game.add.sprite(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'cop');

		game.physics.enable([knocker,balls], Phaser.Physics.ARCADE);

		//knocker.body.immovable = true;
		knocker.anchor.setTo(0.5,0.5);//new code
		knocker.body.collideWorldBounds = true;
		knocker.body.allowRotation= false;//new code

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
	}

	//Move the knocker with the arrow keys
	function update () {
		//time
		updateTime();
		//score keeper
		game.physics.arcade.collide(knocker, balls, hit, null, this);
		// Enable physics between balls
		game.physics.arcade.collide(balls);
		//new code
		knocker.rotation = game.physics.arcade.moveToPointer(knocker, 60, game.input.activePointer, 500);
		//cop
		
		//shooter
		sprite.rotation = game.physics.arcade.angleToPointer(sprite);
		fire();
		game.physics.arcade.collide(knocker, bullets, hitByBullet, null, this);
	}
	
	function hitByBullet (knocker, bullet) 
	{
		bullet.kill();
		
		if(score>=0)
		{
			score -= 20;
			scoreText.text = scoreString + score;
		}
		
		/*if (score == 0)
		{
			scoreText.text = scoreString + score;
			stateText.text = " You Died!";
			stateText.visible = true;
		}*/
	}
	
	function hit (knocker, ball) {
	
		ball.kill();
	
		score += 20;

		scoreText.text = 'score: ' + score;

	}
	
	function updateTime()
	{
		
		time = (Math.floor((game.time.time-startTime) / 1000));// % 60);
		if(time>60)
			time-=60;
		
		timeText.text= "time: "+time + " secs";//60";
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
	
	function fire() 
	{

		//if (game.time.now > nextFire && bullets.countDead() > 0)
		if(nextFire==25)
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
