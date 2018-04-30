
var loadState={
    preload: function(){
        
        var loadingLabel = game.add.text(game.world.centerX,game.world.centerY, 'Loading', 
        {font: '100px contrail-one', fill:'#ffffff'});
        loadingLabel.anchor.x=0.5;
        loadingLabel.anchor.y=0.5;
        
        //loading sprites Knate
        game.load.atlasJSONHash('runK', 'game/imgs/knate/Knate.png', 'game/imgs/knate/Knate.json');
        game.load.atlasJSONHash('runKS', 'game/imgs/knate/knateS.png', 'game/imgs/knate/knateS.json');
        
        //loading sprites Knate ataque 1
        game.load.atlasJSONHash('runKA', 'game/imgs/knate/knateA1.png', 'game/imgs/knate/knateA1.json');
        game.load.atlasJSONHash('runKAS', 'game/imgs/knate/knateA1S.png', 'game/imgs/knate/knateA1S.json');
        
        //loading sprites Knate salto
        game.load.atlasJSONHash('runKJ', 'game/imgs/knate/Knatejump.png', 'game/imgs/knate/Knatejump.json');
        game.load.atlasJSONHash('runKJS', 'game/imgs/knate/KnatejumpS.png', 'game/imgs/knate/KnatejumpS.json');
        
        //loading sprites Knate escudo para cima, e continuo a correr
        game.load.atlasJSONHash('KSup', 'game/imgs/knate/knateSup.png', 'game/imgs/knate/knateSup.json');
        game.load.atlasJSONHash('KSupR', 'game/imgs/knate/knateSupR.png', 'game/imgs/knate/knateSupR.json');
        
        //loading sprites Knate ataque 2
        game.load.atlasJSONHash('runKA2', 'game/imgs/knate/knateA2.png', 'game/imgs/knate/knateA2.json');
        game.load.atlasJSONHash('runKA2S', 'game/imgs/knate/knateA2S.png', 'game/imgs/knate/knateA2S.json');
        
        //loading sprites Knate ataque 3
        game.load.atlasJSONHash('runKA3', 'game/imgs/knate/knateA3.png', 'game/imgs/knate/knateA3.json');
        game.load.atlasJSONHash('runKA3S', 'game/imgs/knate/knateA3S.png', 'game/imgs/knate/knateA3S.json');
        
        //loading sprites Knate de zero life
        game.load.atlasJSONHash('runKD', 'game/imgs/knate/knateD.png', 'game/imgs/knate/knateD.json');
        game.load.atlasJSONHash('runKDS', 'game/imgs/knate/knateDS.png', 'game/imgs/knate/knateDS.json');
        
        //loading sprites Knate de zero life
        game.load.atlasJSONHash('runKD', 'game/imgs/knate/knateD.png', 'game/imgs/knate/knateD.json');
        game.load.atlasJSONHash('runKDS', 'game/imgs/knate/knateDS.png', 'game/imgs/knate/knateDS.json');
        
        //loading sprites Knate de zero life
        game.load.atlasJSONHash('runKH', 'game/imgs/knate/knateH.png', 'game/imgs/knate/knateH.json');
        game.load.atlasJSONHash('runKHS', 'game/imgs/knate/knateHS.png', 'game/imgs/knate/knateHS.json');
        
        
        //loading sprites Dino 1
        game.load.atlasJSONHash('runD1', 'game/imgs/dino1/dino1.png', 'game/imgs/dino1/dino1.json');
        game.load.atlasJSONHash('deadD1', 'game/imgs/dino1/dino1D.png', 'game/imgs/dino1/dino1D.json');
        
        //loading sprites Dino 2
        game.load.atlasJSONHash('runD2', 'game/imgs/dino2/dino2.png', 'game/imgs/dino2/dino2.json');
        
        //loading sprites Dino launcher
        game.load.atlasJSONHash('runDL', 'game/imgs/dinoL/DinoL.png', 'game/imgs/dinoL/DinoL.json');
        
        //loading sprites Dino launcher Fire
        game.load.atlasJSONHash('runDLF', 'game/imgs/dinoL/DinoLF.png', 'game/imgs/dinoL/DinoLF.json');
        
        //loading sprites Dino Projectile
        game.load.atlasJSONHash('DP', 'game/imgs/dinoP/DinoP.png', 'game/imgs/dinoP/DinoP.json');
        
        //loading hitFXs
        game.load.atlasJSONHash('Hit', 'game/imgs/fx/hitFX.png', 'game/imgs/fx/hitFX.json');
        
        game.load.atlasJSONHash('Hit2', 'game/imgs/fx/hit2FX.png', 'game/imgs/fx/hit2FX.json');
        
        //loading groundgrass
        game.load.atlasJSONHash('grass', 'game/imgs/floor/Grass.png', 'game/imgs/floor/Grass.json');
        
        game.load.audio('music', ['game/sounds/Artofescapism_-_Lions_Haven.ogg']);
        
        game.load.audio('attack1', ['game/sounds/WW_Link_Attack1.ogg']);
        
        game.load.audio('attack2', ['game/sounds/WW_Link_Attack2.ogg']);
        
        game.load.audio('attack3', ['game/sounds/WW_Link_Attack3.ogg']);
        
        game.load.audio('hurt', ['game/sounds/WW_Link_Hurt1.ogg']);
        
        game.load.audio('jump', ['game/sounds/WW_Link_Roll1.ogg']);
        
        game.load.audio('dead', ['game/sounds/WW_Link_Fall.ogg']);
        
        game.load.audio('swing', ['game/sounds/60004__qubodup__fast-sword-swing-sound.ogg']);
        
        game.load.audio('swingS', ['game/sounds/344131__thebuilder15__sword-slice.ogg']);
        
        game.load.audio('swordH1', ['game/sounds/370204__nekoninja__samurai-slash.ogg']);
        
        game.load.audio('swordH2', ['game/sounds/160413__timmy-h123__sword-hit-metal-14.ogg']);
        
        game.load.audio('dino1G', ['game/sounds/318319__michael-klier__large-monster-grunt-hit-01.ogg']);
        
        game.load.audio('dino2G', ['game/sounds/88464__davidou__helicoptere.ogg']);
        
        game.load.audio('dino3G', ['game/sounds/63506__pugger__shling.ogg']);
        
        game.load.audio('dino2Gshoot', ['game/sounds/97965__apeiron__shooton.ogg']);
        
        game.load.audio('dinoPS', ['game/sounds/143611__d-w__weapons-synth-blast-01.ogg']);
        
        game.load.audio('dinoPSS', ['game/sounds/223630__ctcollab__shield-hit-1.ogg']);
        

    },
    
    create: function(){
    
    
        playerA = new player(6,0,false,0,false,0, game.world.height-(game.world.height/4)*2, [0,0,0], 0.65); 
        knate = new character('runK','runKS','runKA','runKA2','runKA3','runKAS','runKA2S','runKA3S','runKJ','runKJS','KSup','KSupR', 'runKH','runKHS','runKD','runKDS');
        
        enemy1 = new enemy(0,null,game.world.width, game.world.height-(game.world.height/2)*1.37,1, -1100);
        dinoF = new dino1('runD1',null,'deadD1');
        
        enemy2 = new enemy(0,null,game.world.width, game.world.height-(game.world.height/2)*0.62,0.35, -800);
        dinoF2 = new dino1('runD2',null,null);
        
        enemy3 = new enemy(0,200,game.world.width, 0 - (game.world.height/8.7), 0.5, -800);
        dinoL = new dino1('runDL','runDLF',null);
        
        Music = game.add.audio('music',0.5,true);
        
        Attack1 = game.add.audio('attack1', 0.4);
        
        Attack2 = game.add.audio('attack2', 0.4);
        
        Attack3 = game.add.audio('attack3', 0.4);
        
        Dead = game.add.audio('dead', 0.4);
        
        Hurt = game.add.audio('hurt', 0.4);
        
        Jump = game.add.audio('jump', 0.4);
        
        Swing = game.add.audio('swing', 0.4);
        
        SwingS = game.add.audio('swingS', 0.2);
        
        SwordH1 = game.add.audio('swordH1', 0.7);
        
        SwordH2 = game.add.audio('swordH2', 0.5);
        
        Dino1G = game.add.audio('dino1G');
        
        Dino2G = game.add.audio('dino2G',1,true);
        
        Dino2GS = game.add.audio('dino2Gshoot');
        
        Dino3G = game.add.audio('dino3G', 0.7);
        
        DinoPS = game.add.audio('dinoPS');
        
        DinoPSS = game.add.audio('dinoPSS');
        
        /*Field = function (fieldBackground, backAssets, middleAssets, frontAssets, realPositions) {
            this.background = fieldBackground;   //campos
            this.assets1 = backAssets; //caso seja necessário adicionar nuvens etc layer atrás
            this.assets2 = middleAssets; //caso seja necessário adicionar nuvens etc plataforma
            this.assets3 = frontAssets; //caso seja necessário adicionar nuvens etc layer à frente
            this.positions = realPositions; 
        }*/
        
        
      
        game.state.start('menu');
        
        
    },
    
  
}