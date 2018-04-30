
var contE; //conta a criação de enemigos de um tipo no array
var spriteE = new Array(45); //sprites
var contF = 0; //para contar o número de frames actuais
var contFold = contF; //para guardar frames para uso de criação de inimigos
var keypressed; // a tecla que esta a ser currentemente clicada
var resumeani=false; //vai comunicar se a animação de ataque esta parada
var swordHit;
var enemiesON = 0;//quantos inimigos estão no ecrã

var score = 0;
var multipliler = 1;
var airbonus = 1;
var scoreText;
var multiplilertext;
var BonusText;
var LifeText;
var timetext;

var fireTrigger = 0;
var firstFire = true;
var ricochet = false;
var firstRico = false;

var attackY = 0; //quando ataca no ar guarda a velocidade original do jogador

var frameJump = 0;


function scoring(bonus){
     if(playerA.jump==true){
          airbonus = 2;
     }else{
          airbonus = 1;
     }
     BonusText.text = '+ ' + (bonus*Math.round(multipliler))*airbonus;
     BonusText.x = scoreText.x + scoreText.width;
     BonusText.visible = true;
     setTimeout(function(){ 
          BonusText.visible = false;
          score = score + (bonus*Math.round(multipliler))*airbonus;
     }, 100);
     if(Math.round(multipliler)< 5){
          multipliler = multipliler + 0.2;
     }
}

function doSprite(sprite, health, scale, spritePositionX, spritePositionY, animation, loop){ //função para criar os sprite object no campo; todos são criados invisiveis para puderem ser tornados visiveis a medida que forem precisos
          spriteE[sprite] = game.add.sprite(spritePositionX, spritePositionY, animation, null);
          spriteE[sprite].health = health; //para controlar se um inimigo esta morto ou activo
          spriteE[sprite].scale.setTo(scale,scale);
          spriteE[sprite].animations.add(animation,null,16, loop, true);
          spriteE[sprite].animations.play(animation);
          spriteE[sprite].visible = false;
          game.physics.arcade.enable(spriteE[sprite]); //cria um body ao sprite para ser usado pelo sistema de fisicas 
}

function callingdramastop(sprite, sprite1, sprite2){
     if(playerA.state == 4){ //dead player
          dramastop(sprite, -300,-2000,6500,500);
          dramastop(sprite1, -300,-2000,6500,500);
     }else{ //quando é apenas acertado sem morte player
          dramastop(sprite, sprite.body.velocity.x,sprite.body.velocity.y,sprite.body.gravity.y,50);
          dramastop(sprite1, sprite1.body.velocity.x,sprite1.body.velocity.y,sprite1.body.gravity.y,50);
     }
     if(sprite2.exist == false){ // inimigo
          dramastop(sprite2, sprite2.body.velocity.x,sprite2.body.velocity.y,sprite2.body.gravity.y,50);
     }
}

function dramastop(sprite, velocityX, velocityY, gravityY, timestop){
     if(sprite==spriteE[1] && playerA.state >= 3){
          spriteE[1].exist = false;
          multipliler = 1;
     }
     sprite.animations.paused = true;
     if(velocityX!= 0){
          sprite.body.velocity.x = 0;
     }
     if(velocityY!= 0){
          sprite.body.velocity.y = 0;
     }
     if(gravityY!= 0){
          sprite.body.gravity.y = 0;
     }
     setTimeout(function(){
          console.log("entra");
          sprite.animations.paused = false;
          if(sprite==spriteE[1] && playerA.jump == true || sprite==spriteE[0] && playerA.jump){
               sprite.body.velocity.y = attackY;
               sprite.body.gravity.y = 8000;
          }else{
               sprite.body.velocity.y = velocityY;
               sprite.body.gravity.y = gravityY;
          }
          sprite.body.velocity.x = velocityX;
     }, timestop);
}

var gameplayState={
    
     create: function(){
          
          game.physics.startSystem(Phaser.Physics.ARCADE);  //inicia o sistema de fisicas do phaser
          
          Music.play();
          
          game.stage.backgroundColor = "#5ba6d8";
          
          // chão temporário
          
          spriteE[44] = game.add.sprite(0, game.world.height-game.world.height/5, 'grass', null);
          game.physics.arcade.enable(spriteE[44]);
          spriteE[44].body.velocity.x = -800;
          
          spriteE[45] = game.add.sprite(spriteE[44].x + spriteE[44].width, spriteE[44].y ,'grass', null);
          game.physics.arcade.enable(spriteE[45]);
          spriteE[45].body.velocity.x = spriteE[44].body.velocity.x;
          
           //drawing running animation dino1
           //o contE vai ser dado o valor 7 para criar 5 sprites de dino1 para estar disponiveis para usar ao mesmo tempo
           //o i para que começa a preencher os sprites em layers vazias e com alguma ordem
          contE = 7;
          for(var i = 2; i < contE ;i++){ //
               doSprite(i,enemy1.health,enemy1.scale,enemy1.positionX, enemy1.positionY, dinoF.run, true);
               spriteE[i].exist = true;
               spriteE[i].body.setSize(spriteE[i].body.width/2,spriteE[i].body.height - spriteE[i].body.height/4, spriteE[i].body.width/5); //modifica o tamanho do body do sprite dos dino1, que vai servir de hitbox
               if(i == 6){
                    contE = contE + 6; // para passar a criação de outro tipo de inimigos, é dado outro valor máximo que será usado no ciclo a seguir
               }
          }
          
           //drawing running animation dino2
           //inicia em 7,para começar a criação dos dino2 a seguir aos dino1
          
          // FX para o hits
          Hits = game.add.group();
          Hits.createMultiple(10, 'Hit', 0);
          Hits.scale.setTo(0.8,0.8);
          Hits.callAll('animations.add', 'animations', 'Hit', [0,1,2,3], 16, false);
          //
          
          
          //drawing sprite animation knate's shield - 0 no array
          doSprite(0,playerA.life,playerA.scale,playerA.positionX, playerA.positionY, knate.shieldR, true);
          spriteE[0].visible = true;
          //drawing sprite animation knate - 1 no array
          doSprite(1,playerA.life,playerA.scale,playerA.positionX, playerA.positionY, knate.run, true);
          spriteE[1].visible = true; 
          spriteE[1].exist = true;
          spriteE[1].body.setSize(spriteE[1].body.width/4,spriteE[1].body.height/2,spriteE[1].body.width/1.75,spriteE[1].body.height/3);  //modifica o tamanho do body do sprite do player, que vai servir de hitbox
          spriteE[0].body.setSize(spriteE[0].body.width/4,spriteE[0].body.height/2,spriteE[0].body.width/1.75,spriteE[0].body.height/3);
               
          
          if(contE == 13){
               for(var x = 7; x < contE ; x++){
                    doSprite(x,enemy2.health,enemy2.scale,enemy2.positionX, enemy2.positionY, dinoF2.run, false);
                    spriteE[x].exist = true;
                    spriteE[x].animations.paused = true;
                    spriteE[x].body.setSize(spriteE[x].body.width + spriteE[x].body.width/5 ,spriteE[x].body.height, spriteE[x].body.width/1.7,  spriteE[x].body.height/1.5); //modifica o tamanho do body do sprite dos dino2, que vai servir de hitbox
                    if(x == 12){
                         contE = contE + 6; // para passar a criação de outro tipo de inimigos, é dado outro valor máximo que será usado no ciclo a seguir
                    }          
               }
          }
          
          Hits2 = game.add.group();
          Hits2.enableBody = true;
          Hits2.physicsBodyType = Phaser.Physics.ARCADE;
          Hits2.createMultiple(10, 'Hit2', 0);
          Hits2.scale.setTo(0.7,0.7);
          Hits2.callAll('animations.add', 'animations', 'Hit2', [0,1,2,3], 16, false);
               
          //criar projecteis
          dinoPs = game.add.group();
          dinoPs.enableBody = true;
          dinoPs.physicsBodyType = Phaser.Physics.ARCADE;
          dinoPs.createMultiple(10, 'DP', 0);
          dinoPs.scale.setTo(0.4,0.4);
          dinoPs.callAll('animations.add', 'animations', 'DP', [0,1,2,3,4,5,6,7,8,9], 16, false);
          dinoPs.setAll('checkWorldBounds', true);
          dinoPs.setAll('outOfBoundsKill', true);
          //


          //drawing running animation dino launcher
           //inicia em 13,para começar a criação dos dinoL a seguir aos dino2
          if(contE == 19){
               for(var z = 13; z < contE ; z++){
                    doSprite(z,enemy3.health,enemy3.scale,enemy3.positionX, enemy3.positionY, dinoL.run, true);
                    spriteE[z].exist = true;
                    spriteE[z].body.setSize(spriteE[z].body.width/2 ,spriteE[z].body.height, spriteE[z].body.width/1.35,  spriteE[z].body.height/1.5); //modifica o tamanho do body do sprite dos dino2, que vai servir de hitbox
               }
          }
          
          //caixa para impedir o jogador de descer para baixo do chao
          spriteE[42] = game.add.sprite(0, spriteE[1].body.y+(spriteE[1].body.height*2)-spriteE[1].body.height/3,null);
          game.physics.arcade.enable(spriteE[42]);
          spriteE[42].body.setSize(game.world.width, game.world.height/6);
          spriteE[42].body.immovable = true;
          spriteE[42].exist = true;
          
          swordbox();
          shieldbox();
          
          //hud temporário
          timetext = game.add.text(game.world.centerX - game.world.width/4,game.world.centerY - game.world.height/6, '......................' , {font: '100px contrail-one', fill:'#ffffff'});
          timetext.visible = false;
          scoreText = game.add.text(game.world.width/15, game.world.height -game.world.height/15, 'SCORE: 0', { fontSize: '32px', fill: '#000' });
          BonusText = game.add.text(scoreText.x + scoreText.width, scoreText.y, ' + 0', { fontSize: '32px', fill: '#b70000' });
          multiplilertext= game.add.text(scoreText.x - game.world.width/40, scoreText.y, multipliler + 'x', { fontSize: '32px', fill: '#b70000' });
          BonusText.visible = false;
          multiplilertext.visible = false;
          LifeText = game.add.text(game.world.width/15, game.world.height -game.world.height/10, 'LIFE: 0', { fontSize: '32px', fill: '#000' });
          
          
     },
     
     update: function(){
     
     if(contF>300){
          
          if(score < 1500){
               enemyOrder(4,0,0,4);
          }
          if(score > 1500 && score < 2500){
               enemyOrder(3,1,0,4);
          }
          if(score > 2500){
               if(firstRico == false){
                    enemyOrder(0,2,1,4);
               }
               if(firstRico == true){
                    if(Math.round(multipliler) <= 2){
                         enemyOrder(5,0,1,5);
                    }
                    if(Math.round(multipliler) > 2 && Math.round(multipliler) <= 4){
                         enemyOrder(5,1,1,5);
                    }
                    if(Math.round(multipliler) > 4){
                         enemyOrder(5,2,1,6);
                    }
               }
          }
          
     }
     
     if(contF==(contFold + 10)){ // para actualizar o contador de frames old 
               contFold = contF;
     }
     
     //console.log(playerA.shield);
     if(spriteE[1].health > 0){
          
     score += 1; //recebe score por estar vivo          
          
     game.input.keyboard.onDownCallback = function() {  //verifica quando é pressionado um botão
          
          if(playerA.state < 3){
          
          keypressed = game.input.keyboard.event.keyCode;  //coloca o ultimo butão pressionado na variável      
               if((keypressed==playerA.keys[0]&&playerA.state != 1)||(keypressed==playerA.keys[0] && spriteE[1].animations.currentAnim.frame>=4 && playerA.state == 1 && playerA.combo > 0)){   //se esse botao for igual ao pre-estabelecido pelo jogador para o ataque, então ele inica a animação se ja não estiver a decorrer
                    Swing.play();
                    playerA.shield = false;
                    if(playerA.jump==true&&playerA.state != 1){
                         if(spriteE[1].body.gravity.y!=0 && spriteE[1].body.velocity.y > 0){
                              spriteE[0].body.gravity.y=6500;
                              spriteE[1].body.gravity.y=6500;
                         }
                         attackY = spriteE[1].body.velocity.y;
                    }
                    if(playerA.combo == 0){
                         Attack1.play();
                         doAction(0,playerA.positionX, playerA.positionY, knate.shieldRA1, 1, knate.shieldR); //faz animação de ataque do shield
                         doAction(1,playerA.positionX, playerA.positionY, knate.runA1, 1,knate.run); //faz animação de ataque do resto do sprite
                    }
                    if(playerA.combo == 1 && spriteE[1].animations.name != 'runKA2'){
                         Attack2.play();
                         doAction(0,playerA.positionX, playerA.positionY, knate.shieldRA2, 1, knate.shieldR); //faz animação de ataque do shield
                         doAction(1,playerA.positionX, playerA.positionY, knate.runA2, 1,knate.run); //faz animação de ataque do resto do sprite
                    }
                    if(playerA.combo == 2 && spriteE[1].animations.name != 'runKA3'){
                         Attack3.play();
                         playerA.combo = 0;
                         doAction(0,playerA.positionX, playerA.positionY, knate.shieldRA3, 1, knate.shieldR); //faz animação de ataque do shield
                         doAction(1,playerA.positionX, playerA.positionY, knate.runA3, 1,knate.run); //faz animação de ataque do resto do sprite
                    }
                    
               }
               if(keypressed==playerA.keys[1] && playerA.jump == false && playerA.state!=2){   //se esse botao for igual ao pre-estabelecido pelo jogador para o salto, então ele inica a animação se ja não estiver a decorre
                    playerA.combo = 0;
                    if(playerA.shield == false){
                    doAction(0,playerA.positionX, playerA.positionY, knate.shieldJ, 2, knate.shieldR); //faz animação de salto do shield
                    }
                    doAction(1,playerA.positionX, playerA.positionY, knate.jump, 2,knate.run); //faz animação de saltto do resto do sprite
               }
               if(keypressed==playerA.keys[2]&&playerA.shield == false){   //se esse botao for igual ao pre-estabelecido pelo jogar para o shield, então ele inica a animação se ja não estiver a decorrer
                    playerA.combo = 0;
                    SwingS.play();
                    playerA.shield = true;
                    doAction(0,playerA.positionX, playerA.positionY, knate.shieldUp, null, knate.shieldUpR); //faz animação do shield
                    spriteE[0].animations.paused = false;
               }
          }
     }
     
     game.input.keyboard.onUpCallback = function() {
          if(playerA.state < 3){
          keypressed = game.input.keyboard.event.keyCode;
               if(keypressed==playerA.keys[2]&&playerA.shield == true){
                    doAction(0,playerA.positionX, playerA.positionY, knate.shieldR, null, knate.shieldR);
                    playerA.shield = false;
                     if(playerA.jump == true && spriteE[1].body.gravity.y!=0 && spriteE[1].body.velocity.y > 0){
                         spriteE[0].body.gravity.y=6500;
                         spriteE[1].body.gravity.y=6500;
                    }
               }
               if(keypressed==playerA.keys[0]&&playerA.state == 1 && playerA.combo < 2){
                    playerA.combo++;
               }  
          }
     }
     
     //verifica se colide com um objecto invisivel criado para "gravar" a posição inicial do sprite
     if(spriteE[42].exist == true){
          game.physics.arcade.collide(spriteE[42], spriteE[1], processsColide);  
          game.physics.arcade.collide(spriteE[42], spriteE[0], processsColide);
     }
     
     detectHit(2,19);  //chama função para detetar se o jogador tem alguma colisão com inimigos
     
     if(playerA.shield == true && spriteE[0].animations.name == 'KSupR'){
          if(playerA.jump == true && spriteE[1].body.gravity.y!=0 && spriteE[1].body.velocity.y > 0){
               spriteE[0].body.gravity.y=100;
               spriteE[1].body.gravity.y=100;
          }
     }
     
     if(playerA.shield == false||(playerA.shield == true && spriteE[0].animations.name == 'KSup' && spriteE[0].animations.currentAnim.frame < 1)){ //so entra se o shield estiver activo ou se estiver no primeiro frame do shield
          game.physics.arcade.overlap(dinoPs, spriteE[1], null, projectileHit, this); // detecta se ha colisão entre o jogador e projecteis
     }
     
     if(spriteE[43].exist == true){ // se o escudo existe, preciso para so detetar colisão uma vez para não criar problemas de várias deteções de colisão repetidas
     
          if(playerA.shield == true && game.physics.arcade.overlap(dinoPs, spriteE[43], null, null, this)==true && game.physics.arcade.overlap(dinoPs, spriteE[1], null, null, this) != true && ricochet != true){ //se o escudo estiver activo e exitir colisão entre o mesmo e o projectil, não existir colisão entre o jogador e projectil e já não esta em curso um parry 
               if(spriteE[0].animations.name == 'KSup' && spriteE[0].animations.currentAnim.frame >= 1 ){ // se estiver na animação de levantar o shield e não no primeiro frame
                    game.physics.arcade.overlap(dinoPs, spriteE[43], null, invertprojectile, this); // verificar se existe colisão entre o shield e o projectil, se sim então chama a função que faz parry
               }
               if(spriteE[0].animations.name == 'KSupR'){     // se estiver na animação do hold do shield
                    game.physics.arcade.overlap(dinoPs, spriteE[43], null, projectileHit, this); //verificar se existe colisão entre o shield e o projectil, se sim chama a função que vai explodir o projectil
               }
          }
          
          if(ricochet == true){ //se estiver em curso um parry
               for(var S = 13; S < 19 ; S++){ //vai circular os inimigos voadores todos
                    firstRico = true;
                    game.physics.arcade.overlap(dinoPs, spriteE[S], null, projectileHit, this); //deteta se existe colisão entre o projectil defeflected e algum inimigo voador, se sim chama função que explode com o projectil
               }
          }
     
     }
     
          
     }
     
     
     if(playerA.state == 3 && spriteE[1].exist == false){
          spriteE[1].tint = 0xfcff5e;
          spriteE[0].tint = 0xfcff5e;
          setTimeout(function(){
               spriteE[1].tint = 0xFFFFFF;
               spriteE[0].tint = 0xFFFFFF;
               spriteE[1].exist = true;
          }, 1500);
     }
     
     if(playerA.jump == true){  //verifica se  está em acção de salto
          if(spriteE[1].animations.currentAnim.frame==0 && playerA.state ==2){
               Jump.play();
               airTime(0,playerA.positionX, playerA.positionY); // vair mover o corpo do sprite do shield para cima e baixo enquanto estiver em salto
               airTime(1,playerA.positionX, playerA.positionY); // vair mover o corpo do sprite para cima e baixo enquanto estiver em salto
          }
          if(spriteE[1].animations.currentAnim.frame == 3 && spriteE[1].body.velocity.y < 0){
               spriteE[1].animations.paused = true;
               if(playerA.shield == false){
                    spriteE[0].animations.paused = true;
               }
          }
          if(spriteE[1].animations.paused == true && spriteE[1].body.velocity.y < 0 && spriteE[1].animations.currentAnim.frame < 4){
               spriteE[1].animations.paused = false;
               if(playerA.shield == false){
               spriteE[0].animations.paused = false;
               }
          }
          if(spriteE[1].animations.currentAnim.frame == 4 && spriteE[1].body.velocity.y > 0){
               spriteE[1].animations.paused = true;
               if(playerA.shield == false){
                    spriteE[0].animations.paused = true;
               }
          }
          if(spriteE[1].animations.paused == true){
               spriteE[1].animations.paused = false;
               if(playerA.shield == false){
               spriteE[0].animations.paused = false;
               }
          }
     }
     
     
     if(playerA.state==1 && spriteE[1].animations.currentAnim.frame==4 && resumeani==false){  //pausa a animação no ar durante pouco tempo para dar ao jogador seguimento para outros ataques, fazendo um combo de 3 max
          resumeani = true;
          setTimeout(function(){ spriteE[1].animations.paused = false; spriteE[0].animations.paused = false;}, 100);
          spriteE[1].animations.paused = true;
          spriteE[0].animations.paused = true;
     }
     
     if(playerA.state==1 && spriteE[1].animations.currentAnim.frame < 5 && spriteE[1].animations.currentAnim.frame > 2){ //quando esta em acção de ataque no chao, e durante as frames certas, detectar se existe contacto entre espada e inimigos
          detectHitemp(2,13,41,10);
     }
     
     
     
     if(spriteE[1].health <= 0){
               spriteE[42].exist = false;
          if(spriteE[1].inCamera == false && spriteE[0].inCamera == false){
               timetext.visible = true;
               timetext.text = 'TIME: ' + displayTime(contF);
               game.paused = true;
          }
          
     }
     
     
     //actualiza posição da hitbox do shield e sword
     spriteE[43].body.x = spriteE[1].body.x;
     spriteE[43].body.y = spriteE[1].body.y - spriteE[1].body.y/8;
     spriteE[41].body.y = spriteE[1].body.y;
     
     firstFire = fireRange(13, firstFire); // chama função que verifica se alguma inimigo voador se encontra na posição de disparo para acertar no player, e dipara de 200 em 200 frames
     
     contF++;
     
     //text Hud
     scoreText.text = 'SCORE: ' + score;
     LifeText.text = 'LIFE: ' + spriteE[1].health;
     multiplilertext.text = Math.round(multipliler) + 'x';
     if(Math.round(multipliler) > 1){
          multiplilertext.visible = true;
     }else{
          multiplilertext.visible = false;
     }
     
     floorRotate(44);
     floorRotate(45);
     
    }
}

function floorRotate(floor){
      if(spriteE[floor].inCamera == false){
           if(floor > 44){
                spriteE[floor].x = spriteE[floor - 1].x + spriteE[floor - 1].width;
           }else{
                spriteE[floor].x = spriteE[floor + 1].x + spriteE[floor + 1].width;
           }
      }
}


function displayTime(currentFrame) {
    var fps = 30;
    var h = Math.floor(currentFrame/(60*60*fps));
    var m = (Math.floor(currentFrame/(60*fps))) % 60;
    var s = (Math.floor(currentFrame/fps)) % 60;
    var f = currentFrame % fps;
    return showTwoDigits(h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
}

function showTwoDigits(number) {
    return ("00" + number).slice(-2);
}