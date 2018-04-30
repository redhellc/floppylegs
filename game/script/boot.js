
var bootState = {
    create: function (){
        
        //scaling window
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxWidth = this.game.width;
        this.scale.maxHeight = this.game.height;
        this.scale.windowConstraints.bottom="visual";
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        
        game.state.start('load');
        
    }
}