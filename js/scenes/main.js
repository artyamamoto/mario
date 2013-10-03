
var MainScene = Class.create(BaseScene, {
	"initialize" : function() {
		BaseScene.call(this);
		
		this.backgroundColor = 'rgba(110,130,255,1.0)';
				
		this.stage = new Group();
		this.addChild(this.stage);
		
		this.map = new MarioMap();
		this.stage.addChild(this.map);
		
		this.mario = new Mario();
		this.mario.map = this.map;
		this.stage.addChild(this.mario);
			
		var pad = new Pad();
		pad.x = 0;
		pad.y = 220;
		this.addChild(pad);
		
		var that = this;
		this.stage.addEventListener('enterframe' , function() {
			//that.stage.x = Math.max(that.map.width - game.width , 
			//							Math.min(0, 64 - that.mario.x));
			that.stage.x = Math.min(0, game.width / 2 - that.mario.x - that.mario.width / 2 );
			/* if (that.stage.x < that.map._image.width - game.width) {
				that.stage.x = that.map._image.width - game.width;
			} */	
			
			if (that.mario.dying) {
				if (! that.gameover) {
					var img = game.assets[configs.images.gameover];
					that.gameover = new Sprite(img.width, img.height);
					that.gameover.image = img;
					that.gameover.x = (game.width - img.width) / 2;
					that.gameover.y = (game.height - img.height) / 2;
					that.addChild(that.gameover);
				}
			} 
			if (that.mario.dead) {
				//game.end(0, 'GameOver');
			} 
		});
	}
});
