
(function() {

//=== util
function getimage(k) {
	return game.assets[configs.images[k]];
}

window.Mario = Class.create(Sprite, {
	"initialize" : function() {
		Sprite.call(this,16,16);
		
		this.sf = new Surface(16,16);
		this.image = this.sf;
		
		this.x = 100;
		this.y = 100;
		this.dx = this.dy = 0;
		this.ax = 0.5;
		this.ay = 8.0;
		this.friction = 0.85;
		this.gravity = 0.4;
		this.dir = 1;
		
		this.jumping = true;
		
		this.images = {};
		this.images.running = getimage('running');
		this.images.jumping = getimage('jumping');
		this.images.standing = getimage('standing');
		this.images.dying = getimage('dying');
			
		this.setImage('jumping');
		
		this.map = null;
	} , 
	"setImage" : function(k) {
		var obj = this.images[k];
		this._img = obj;
		//this.image.draw(this._img , 0,0, 16,24, 0,0,16,24);
		this.image = this._img;
		if (k == 'running') {
			this.frame = intval(game.frame / 2) % 3;
		} else {
			this.frame = 1;
		}
	} , 
	"onenterframe" : function() {
		if (this.dying_stop) {
			if (this.dying_stop-- > 0) {
				this.setImage("dying");
				return;
			}
		}
		if (this.dead) {
			return;
		} 
		// 死んでるアクション
		if (this.dying) {
			this.setImage("dying");
			this.dy += this.gravity;
			this.y += this.dy;
			
			if (this.dy > 0 && this.y > game.height) {
				this.dead = true;
				game.fps = 48;
			}
			return;
		} 
		// 死に判定
		if (this.y > game.height - 15) {
			this.dying_stop = 22;
			this.dying = true;
			this.y = game.height - 15;
			this.dy = -this.ay;
			this.setImage("dying");
			
			game.fps = 28;
			
			return;
		}
		
		if (game.input.up && !this._jumpLocked && !this.jumping) {
			this.dy = -this.ay;
			this.jumping = true;
			this._jumpLocked = true;
		} else if (this.jumping) {
			//this.dy = this.ay;
		}
		if (! game.input.up) {
			this._jumpLocked = false;
		}
		
		if (game.input.left) {
			this.dx -= this.ax;
			this.dir = -1;
		} else if (game.input.right) {
			this.dx += this.ax;
			this.dir = 1;
		} else {
			//this.dir = 0;
		}
		this.dx *= this.friction;
		if (-0.06 <= this.dx && this.dx <= 0.06) 
			this.dx = 0;
		this.dy += this.gravity;
		
		function _range(n,len) {
			if (n < -len) 
				n = -len;
			if (n > len) 
				n = len;
			return n;
		}
		this.dx = _range(this.dx , 3.0);
		this.dy = _range(this.dy, 8.0);
		
		// 天井にぶつかる
		if (this.dy < 0) {
			if (this.map.hitTest(this.x , this.y-1) || 
				this.map.hitTest(this.x + 16 , this.y - 1)) 
			{
				this.jumping = true;
				this.dy = Math.abs(this.dy) * 0.4;
				//this.y += (16 - (this.y % 16));
			}
		}
		// 地面
		if (this.dy > 0) {
			if (this.map.hitTest(this.x ,     this.y + 16 + 1) || 
				this.map.hitTest(this.x + 16, this.y + 16 + 1)) 
			{
				this.jumping = false;
				this.dy = 0;
				this.y -= (this.y % 16);
				
				//game.input.up = false;
			}
		}
		// 横
		if (this.dx > 0) {
			if (this.map.hitTest(this.x + 17, this.y) || 
				this.map.hitTest(this.x + 17 , this.y + 15))
			{
				this.dx = 0;
				//this.x -= (this.x % 16);
			}
		}
		if (this.dx < 0) {
			if (this.map.hitTest(this.x - 1 , this.y) || 
				this.map.hitTest(this.x - 1, this.y + 15)) 
			{
				this.dx = 0;
				//this.x += (16 - (this.x % 16));
			}
		}
		
		this.x += this.dx;
		this.y += this.dy;
		//this.x = Math.max(0, Math.min(game.width, this.x));
		//this.y = Math.max(0, Math.min(game.height - 32, this.y));
		//while (this.x <= 0) {
		//	this.x += game.width;
		//}
		//while (this.x > game.width) {
		//	this.x -= game.width;
		//}
		if (this.x < 0) 
			this.x = 0; 
		if (this.x > this.map.width - 16) 
			this.x = this.map.width - 16;
		/*
		if (this.y >= game.height - 32) {
			this.jumping = false;
			this.dy = 0;
			this.y = game.height - 32;
		} */
			
		if (this.jumping) {
			this.setImage('jumping');
		} else {
			if (this.dx != 0) {
				this.setImage('running');
			} else {
				this.setImage('standing');
			}
		}
		
		//this.clip.setX(this.x);
		//this.clip.setY(this.y);
		if (this.dir == 1) {
			this.scaleX = 1;
			//this._image.setX(-1 * this._image.getWidth() );
		} else if (this.dir == -1) {
			this.scaleX = -1;
			//this._image.setX(0);
		}
	}
});



})(); // (function() {

