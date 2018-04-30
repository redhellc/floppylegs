var playerA;
var knate;

var player = function (life, state,jump,combo,shield ,positionInFieldX, positionInFieldY, keyboardKeys,scale) {
            this.life=life; //vida actual do jogador
            this.state=state;  //current action, O - running, 1 - attacking 3 - hit 
            this.jump=jump;
            this.combo=combo;
            this.shield = shield; //shield up or down, if false shield is down
            this.positionX=positionInFieldX;  //posição no campo x
            this.positionY=positionInFieldY;  //posição no campo y
            this.keys=keyboardKeys;  //teclas 0 - attack, 1 - jump,  2 - defend
            this.scale=scale;
            
        }
        
var character = function(run, shieldR, runA1, runA2, runA3, shieldRA1, shieldRA2, shieldRA3,jump, shieldJ, shieldUp, shieldUpR, hit, shieldhit ,dead, shieldDead){
            this.run = run;  //running animation
            this.runA1= runA1; //attack 1 running
            this.runA2 = runA2;
            this.runA3 = runA3;
            this.jump = jump; //jumping animation
            this.shieldR = shieldR; //shield on running
            this.shieldRA1 = shieldRA1; //shield on attack 1 running
            this.shieldRA2 = shieldRA2;
            this.shieldRA3 = shieldRA3;
            this.shieldJ = shieldJ; //shield on jumping animation
            this.shieldUp = shieldUp; //shield activate
            this.shieldUpR = shieldUpR; //shield active running
            this.hit = hit;
            this.shiedlHit = shieldhit;
            this.dead = dead;
            this.shieldDead = shieldDead;
}

function registerbutten(butten, action){ //função para registar keys que o jogador vai usar, vai receber a key pressionada e a acção que o jogador vai fazer
            for(var i=0; i<=action; i++){
                if(butten == playerA.keys[i]){
                    playerA.keys[action] = 0;
                    i = action + 1;
                }else{
                    if(i == action){
                        playerA.keys[action] = butten;
                    }
                }
            }
}

function doAction(sprite, positionx, positiony, animation, action, returnanimation){ //muda a textura do sprite para realizar a animação da acção tal como põe o state certo no sprite
            spriteE[sprite].loadTexture(animation, 0);
            spriteE[sprite].animations.add(animation);
            spriteE[sprite].animations.play(animation, 16, false);
            if(sprite == 1){
                playerA.state = action;
            }
            if(action == 2){
                playerA.jump = true;
                playerA.state = action;
            }
            spriteE[sprite].animations.currentAnim.onComplete.add(function () {	 //no final da animação este retorna para a que estava antes e coloca no state de acordo com essa animação
                    if(action == 1){
                        resumeani = false;
                        playerA.combo = 0;
                    }
                    if(returnanimation != null){
                    spriteE[sprite].loadTexture(returnanimation, 0);
                    spriteE[sprite].animations.add(returnanimation);
                    spriteE[sprite].animations.play(returnanimation, 16, true);
                    if(playerA.shield == true && playerA.state == 0){
                        if(spriteE[1].animations.currentAnim.frame < 4 ){
                        spriteE[sprite].animations.currentAnim.setFrame(spriteE[1].animations.currentAnim.frame, true);
                        }
                        if(spriteE[1].animations.currentAnim.frame > 4 ){
                            spriteE[sprite].animations.currentAnim.setFrame(spriteE[1].animations.currentAnim.frame - 4, true);
                        }
                    }
                    if(sprite == 1){
                        playerA.state = 0;
                    }
                    }
            });
}

function swordbox(){  //cria hitbox da sword, através de um gráfico convertido para um sprite, onde é cridado um body do mesmo
        swordHit = game.add.graphics(0, 0);
        swordHit.boundsPadding = 0;
        swordHit.beginFill(0x084b, 1);
        swordHit.drawRect(spriteE[1].body.x + spriteE[1].body.width*2.75,spriteE[1].body.y + spriteE[1].body.height/2);
        spriteE[41] = game.add.sprite(spriteE[1].body.x + spriteE[1].body.width*3.5, spriteE[1].body.y + spriteE[1].body.height/2.7,null);
        spriteE[41].addChild(swordHit);
        game.physics.arcade.enable(spriteE[41]);
        spriteE[41].exist = true;
        spriteE[41].body.setSize(spriteE[1].body.width+spriteE[1].body.width, spriteE[1].body.height*1.5);
}

function shieldbox(){  //cria hitbox do shield, através de um gráfico convertido para um sprite, onde é cridado um body do mesmo
        shieldHit = game.add.graphics(0, 0);
        shieldHit.boundsPadding = 0;
        shieldHit.beginFill(0x084b, 1);
        shieldHit.drawRect(spriteE[1].body.x, spriteE[1].body.y);
        spriteE[43] = game.add.sprite(spriteE[1].body.x , spriteE[1].body.y ,null);
        spriteE[43].addChild(shieldHit);
        game.physics.arcade.enable(spriteE[43]);
        spriteE[43].body.setSize(spriteE[1].body.width+spriteE[1].body.width/1.5, spriteE[1].body.height/2.5);
        spriteE[43].exist = true;
}

function airTime(sprite, positionx, positiony){  //vai realizar o movimento preciso para o salto
    if(spriteE[sprite].body.velocity.y == 0){ //verifica se está no chao se estiver entra
       spriteE[sprite].body.gravity.y = 6500; // dá uma gravidade ao sprite, este vai aumentar a velocidade em y, por cada frame
       spriteE[sprite].body.velocity.y = -2200; // da uma velocidade inicial em y, negativa para poder subir 
    } 
}

 function processsColide(sprite, sprite2){
    playerA.jump = false;
    sprite2.body.gravity.y = 0;
    sprite2.body.y = spriteE[1].body.y - 1;
}