
var enemy = function (health,fireRate,positionInFieldX, positionInFieldY,scale, velocity) { //cria classe inimigo
            this.health = health;
            this.fireRate = fireRate;
            this.positionX=positionInFieldX;  //posição no campo x
            this.positionY=positionInFieldY;  //posição no campo y
            this.scale = scale;
            this.velocity = velocity;
        }
        
var dino1 = function (run, action ,dead){  //cria uma classe com as animações do inimigo dino1
            this.run = run;
            this.action = action;
            this.dead = dead;
}


function createEnemy(startE, endE, posXE, posYE, veloX, dragX, animationS, loop, max, maxsame, rate, sound){ //função para criar inimigos
    var launcherAlive = 0;
    for(var x = startE; x < endE ;x++){ // conta quantos inimigos deste tipo estão vivos
            if(spriteE[x].health == 1){
                 launcherAlive++;
            }            
    }
    for(var i = startE; i < endE ;i++){
        if(spriteE[i].health == 0){ //verifica se o inimigo nao esta ja activo
             if(i==game.rnd.integerInRange(1,14) && contF==(contFold + 10) && enemiesON < max && launcherAlive < maxsame){
                switch(startE){
                        case 2:
                                Dino1G.play();
                                break;
                        case 7:
                                setTimeout(function(){Dino3G.play();}, 400);
                                break;        
                        case 13:
                                Dino2G.play();
                                break;
                }
                enemiesON++; //aumenta para saber se esta activo
                spriteE[i].health = 1; // activa inimigo
                spriteE[i].visible = true; //torna-o visivel
                spriteE[i].exist = true; //para voltar a detectar contactos
                spriteE[i].x = posXE;
                spriteE[i].y= posYE;
                spriteE[i].body.velocity.x = veloX;
                spriteE[i].body.drag.x = dragX;
                enemyAction(i , animationS, loop);
             }
        }else{
            //game.debug.body(spriteE[i]); //see hitbox dos dino1
            if(spriteE[i].inCamera == false){ // se sair fora do ecra reinicia
                enemiesON--;
                spriteE[i].visible = false;
                spriteE[i].exist = true;
                spriteE[i].body.velocity.x = 0;
                spriteE[i].health = 0;
                spriteE[i].body.gravity.y = 0;
                spriteE[i].body.velocity.y = 0;
                spriteE[i].body.drag.x = 0;
            }
        }
    }
}



function enemyOrder(dino1max, dino2max, dino3max, fullmmax){
        if(multipliler == 1){     
          
                createEnemy(2, 7, enemy1.positionX, enemy1.positionY, enemy1.velocity, 0, dinoF.run, true, fullmmax, dino1max, Dino1G); // cria inimigos do tipo dino1
                
                createEnemy(7, 13, enemy2.positionX, enemy2.positionY, enemy2.velocity, 0, dinoF2.run, false, fullmmax, dino2max, null); // cria inimigos do tipo dino2
     
          }else{
              
                spriteE[44].body.velocity.x = enemy2.velocity - Math.pow(3.5, multipliler);
                spriteE[45].body.velocity.x = enemy2.velocity - Math.pow(3.5, multipliler);
                
                createEnemy(2, 7, enemy1.positionX, enemy1.positionY, enemy1.velocity - Math.pow(3.5, multipliler), 0, dinoF.run, true, fullmmax, dino1max, Dino1G); // cria inimigos do tipo dino1
               
                createEnemy(7, 13, enemy2.positionX, enemy2.positionY, enemy2.velocity - Math.pow(3.5, multipliler), 0, dinoF2.run, false, fullmmax, dino2max, null); // cria inimigos do tipo dino2
          }
          
          createEnemy(13, 19, enemy3.positionX, enemy3.positionY, enemy3.velocity, 170, dinoL.run, true, fullmmax , dino3max, null); // cria inimigos do tipo dinoL 
}

function detectHit(enemyF, enemyL){
    for(var i = enemyF; i < enemyL ;i++){
        if(game.physics.arcade.overlap(spriteE[i], spriteE[1], null, null, this)==true){
                if(spriteE[1].health != 0 && spriteE[i].exist == true && spriteE[1].exist == true && playerA.state < 3){
                    Hurt.play();
                    spriteE[i].exist = false;
                    spriteE[1].health -= 1;
                    if(spriteE[1].health > 0){
                        playerA.state = 3;
                        playerA.combo = 0;
                        doAction(0,null,null, knate.shieldHit,playerA.state, knate.shieldR);
                        doAction(1,null,null, knate.hit,playerA.state, knate.run);
                        callingdramastop(spriteE[0], spriteE[1], spriteE[i]);
                    }
                    if(spriteE[1].health <= 0){
                        playerA.state = 4;
                        Dead.play();
                        doAction(0,null,null, knate.shieldDead,playerA.state, null);
                        doAction(1,null,null, knate.dead,playerA.state, null);
                        callingdramastop(spriteE[0], spriteE[1], spriteE[i]);
                    }
                } 
        }
    }
}


function projectileHit(sprite, dinoP){
        if(DinoPS.isPlaying == false){
                DinoPS.play();
        }
        if(sprite == spriteE[1] && playerA.shield == false && dinoP.animations.currentAnim.frame == 0){
            if(spriteE[1].exist == true){
                spriteE[1].health -= 1;
                if(spriteE[1].health > 0){
                    playerA.state = 3;
                    doAction(0,null,null, knate.shieldHit,playerA.state, knate.shieldR);
                    doAction(1,null,null, knate.hit,playerA.state, knate.run);
                    callingdramastop(spriteE[0], spriteE[1], dinoP);
                }
                if(spriteE[1].health <= 0){
                    playerA.state = 4;
                    Dead.play();
                    doAction(0,null,null, knate.shieldDead,playerA.state, null);
                    doAction(1,null,null, knate.dead,playerA.state, null);
                    callingdramastop(spriteE[0], spriteE[1], dinoP);
                }
                dinoP.body.drag.y = 8000;
            }
        }
        
        if(sprite == spriteE[43]){
            dinoP.body.drag.y = 16000;
            callingdramastop(spriteE[0], spriteE[1], dinoP);
            scoring(5);
            if(DinoPSS.isPlaying == false){
                DinoPSS.play();
            }
        }
        
        
        if(sprite.exist == true && ricochet == true){
            for(var S = 13; S < 19 ; S++){
                if(sprite == spriteE[S]){
                    scoring(10);
                    dinoP.body.drag.y = 20000;
                    callingdramastop(spriteE[0], spriteE[1], dinoP);
                    game.world.swap(spriteE[S], dinoPs);
                    sprite.exist = false;
                }
            }
        }
       
        dinoP.animations.play('DP', 16, false);
        dinoP.animations.currentAnim.onComplete.add(function () {
            dinoP.body.drag.y = 0;
            if(dinoP.alive==true){
                for(var Z = 13; Z < 19 ; Z++){
                    if(spriteE[Z].health == 1 && ricochet == true){
                        ricochet = false;
                        game.world.swap(spriteE[Z], dinoPs);
                        enemiesON--;
                        spriteE[Z].visible = false;
                        spriteE[Z].x = enemy1.positionX;
                        spriteE[Z].body.velocity.x = 0;
                        spriteE[Z].body.drag.x = 0;
                        spriteE[Z].health = 0;
                        Dino2G.stop();
                    }
                }
            }
            dinoP.loadTexture('DP', 0);
            dinoP.kill();
        });
        
}


function invertprojectile(sprite, dinoP){
        if(DinoPSS.isPlaying == false){
            DinoPSS.play();
        }
        scoring(10);
        dinoP.body.drag.y = 16000;
        sprite.exist = false;
        callingdramastop(spriteE[0], spriteE[1], dinoP);
        setTimeout(function(){
        sprite.exist = true;
        ricochet = true;
        dinoP.body.drag.y = 0;
        dinoP.body.velocity.y = -5000;
        
        }, 200);
}

function detectHitemp(enemyF, enemyL, action, bonus){ //detecta se um ataque acertou no inimigo, neste caso ainda só está a ser chamado para o inimigo1
    for(var i = enemyF; i < enemyL ;i++){
        if(i<7){
        if(game.physics.arcade.overlap(spriteE[i], spriteE[action], null, null, this)==true && spriteE[i].exist == true){
            SwordH1.play();
            scoring(bonus);
            //animação do fx do hit
            var hit = Hits.getFirstDead();
            hit.reset(spriteE[i].body.x - spriteE[i].body.width, spriteE[i].body.y + spriteE[i].body.height/3);
            hit.animations.play('Hit', 16, false);
            hit.animations.currentAnim.onComplete.add(function () {
                hit.visible = false;
                hit.kill();
                hit.loadTexture('Hit', 0);
            });
            //
            enemiesON--;
            spriteE[i].exist = false;
            spriteE[i].body.velocity.x = 300 + game.rnd.integerInRange(1,50);
            spriteE[i].body.gravity.y = 6500;
            spriteE[i].body.velocity.y = -2200 - game.rnd.integerInRange(1,200);
            callingdramastop(spriteE[0], spriteE[1], spriteE[i]);
            enemyAction(i , dinoF.dead, false);
        }
        }
        if( i > 7 ){
            if(game.physics.arcade.overlap(spriteE[i], spriteE[action], null, null, this)==true && spriteE[41].exist == true){
            spriteE[41].exist = false;
            SwordH2.play();
            var hit2 = Hits2.getFirstDead();
            hit2.reset(spriteE[i].body.x - spriteE[i].body.width*2, spriteE[i].body.y + spriteE[i].body.height);
            hit2.body.velocity.x = spriteE[i].body.velocity.x;
            hit2.animations.play('Hit2', 16, false);
            hit2.animations.currentAnim.onComplete.add(function () {
                hit2.visible = false;
                hit2.kill();
                hit2.loadTexture('Hit2', 0);
                spriteE[41].exist = true;
            });
            callingdramastop(spriteE[0], spriteE[1], spriteE[i]);
            }
        }
    }
}


function enemyAction(enemy , animation, loop){
        spriteE[enemy].loadTexture(animation, 0);
        spriteE[enemy].animations.add(animation);
        spriteE[enemy].animations.play(animation, 16, loop);
}

function changeSize(projE){
    projE.body.setSize(projE.body.width/19,projE.body.height/14,projE.body.width/5.1,projE.body.height/4.8);

}

function fireRange(enemy, firstTime){ //verifica se o inimigo esta na posição de disparo relativa ao jogador
    for(var x=enemy; x < (enemy + 6); x++){ 
        //console.log(spriteE[x].exist);
        if(spriteE[x].health == 1){
            if(spriteE[1].body.x > spriteE[x].body.x && spriteE[1].body.x < (spriteE[x].body.x + spriteE[x].body.x)){
                if(fireTrigger < enemy3.fireRate){
                    fireTrigger++;
                }
                else{
                    doAction(x,null,null,dinoL.action,0,dinoL.run);
                    Dino2GS.play();
                    if(dinoPs.countDead() > 9){
                        var dinoP = dinoPs.getFirstDead();
                        dinoP.reset(spriteE[x].body.x - (spriteE[x].body.x-spriteE[x].body.x/1.3), spriteE[x].body.y-spriteE[x].body.y/1.5,0);
                        dinoP.body.drag.y = 0;
                        dinoP.body.velocity.y = 2000;
                        if(firstTime == true){ //nota: dá problemas se estiver a usar mais que 1 projectil
                            changeSize(dinoP);
                            firstTime = false;
                        }
                        //setTimeout(function(){game.debug.body(dinoP);}, 100);
                        fireTrigger = 0;
                    }
                }
            }
        }
    }
    return(firstTime);
}