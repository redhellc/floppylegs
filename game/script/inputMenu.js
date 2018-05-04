var inputLabel;
var inputState = {
    
    create: function(){
        inputLabel = game.add.text(game.width/2, game.world.height-100,'Select attack button',
        {font: '35px contrail-one', fill: '#ffffff'});
        inputLabel.anchor.x = 0.5;
        inputLabel.anchor.y = 0.5;
    },
    
    update: function(){
        
        
        game.input.keyboard.onDownCallback = function() {  //chama função quando uma tecla é clicada
            for(var i=0; i<3; i++){ //corre o array das teclas do jogador
                if(playerA.keys[i]==0){ //verifica se a tecla está vazia
                        registerbutten(game.input.keyboard.event.keyCode,i); //regista essa tecla como acção pretendida
                        console.log(playerA.keys[i]);
                        if(i==0 && playerA.keys[i]!=0){
                        inputLabel.setText("Select jump button"); //muda texto no ecra
                        }
                        if(i==1 && playerA.keys[i]!=0){
                        inputLabel.setText("Select shield button"); //muda texto no ecra
                        }
                        i=3;
                }
            }
            
        };
        

        
        
        if (playerA.keys[0] != 0 && playerA.keys[1] != 0 && playerA.keys[2] != 0){
                game.state.start('gameplay');
        }

    }
}