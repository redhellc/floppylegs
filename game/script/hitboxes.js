
hitBox = new Array(41);
function createhitbox(sprite, object, positionX, positionY){ //object vai defenir de quem é a box, em termos dos diferentes inimigos e o player
    hitBox[sprite] = game.add.graphics(0, 0);
    hitBox[sprite].beginFill(0x099b4b, 1);
    hitBox[sprite].drawRect(positionX, positionY, spriteE[sprite].width, spriteE[sprite].height);
}