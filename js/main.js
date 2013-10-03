
// enchant();

var game = game || {};

window.onload = function() {
	game = new Game(configs.game.width,configs.game.height);
	game.keybind(88,'a'); // X
	game.keybind(90,'b'); // Z
	game.fps = 48;
	game.preload(array_values(configs.images));
	game.onload = function() {
		var main = new MainScene();
		game.replaceScene(main);
	};
	game.start();
	/* jQuery.get( configs.ajax.map.field, {}, function(data) {
		configs.map.field = data;
		game.start();
	} , "json"); */
};
