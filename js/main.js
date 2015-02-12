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

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    cursors = game.input.keyboard.createCursorKeys();
    
    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    balls = game.add.group();//game.add.sprite(400, 200, 'ball');
	//add multiple balls
	//sprites = game.add.group();

	for (var i = 0; i < 30; i++)
	{
		var s = balls.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'ball');
		//s.animations.add('spin', [0,1,2,3]);
		//s.play('spin', 10, true);
		game.physics.enable(s, Phaser.Physics.ARCADE);
		s.body.velocity.x = game.rnd.integerInRange(-200, 200);
		s.body.velocity.y = game.rnd.integerInRange(-200, 200);
	}
	
    knocker = game.add.sprite(400, 200, 'dude');

    game.physics.enable([knocker,balls], Phaser.Physics.ARCADE);

    knocker.body.immovable = true;

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

/*function render () {

    //debug helper
    game.debug.spriteInfo(balls, 32, 32);

}*/
};
