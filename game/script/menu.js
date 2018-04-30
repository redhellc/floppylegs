var startLabel;
var menuState = {
    
    create: function(){

        startLabel = game.add.text(game.width/2, game.world.height-100,'Press Space to Start',
        {font: '35px contrail-one', fill: '#ffffff'});
        startLabel.anchor.x = 0.5;
        startLabel.anchor.y = 0.5;
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    
    update: function(){
        
         if (this.spaceKey.isDown){
            game.state.start('inputMenu');
    }

    }
}