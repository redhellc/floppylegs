var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'gameContainer');

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('inputMenu', inputState);
game.state.add('gameplay', gameplayState);
game.state.start('boot');
