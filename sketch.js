var bg, bgImg;
var r;
var p1,p2,p3,p4,p5,platform,platformGroup;
var plr,plrImg,flyingMonster,flyingMonsterImg,swordMonsterImg,groundMonster,bombMonsterImg;
var iGround, iB, ibGroup;
var coin, coinImg, moneyBag, moneyBagImg;
var cG, mbG;
var score=0;
var cbS, cS, bgS, dS;
var gameState="serve";
var mG;
var monsterHead, mhG;
var spawnedYet;

function preload() {
  bgImg=loadImage("./assets/bg.png");
  p1=loadImage("./assets/platformVar1.png");
  p2=loadImage("./assets/platformVar2.png");
  p3=loadImage("./assets/platformVar3.png");
  p4=loadImage("./assets/platformVar4.png");
  p5=loadImage("./assets/platformVar5.png");

  coinImg=loadImage("./assets/coin.png");
  moneyBagImg=loadImage("./assets/moneybag.png");

  cbS=loadSound("./assets/cb.mp3");
  cS=loadSound("./assets/c.mp3");
  bgS=loadSound("./assets/bg.mp3");
  dS=loadSound("./assets/died.mp3");

  plrImg=loadAnimation(
  "./assets/runningFrames/r1.gif",
  "./assets/runningFrames/r2.gif",
  "./assets/runningFrames/r3.gif",
  "./assets/runningFrames/r4.gif",
  "./assets/runningFrames/r5.gif",
  "./assets/runningFrames/r6.gif",
  "./assets/runningFrames/r7.gif",
  "./assets/runningFrames/r8.gif",
  "./assets/runningFrames/r9.gif",
  "./assets/runningFrames/r10.gif",
  "./assets/runningFrames/r11.gif",
  "./assets/runningFrames/r12.gif");

  flyingMonsterImg=loadAnimation(
    "./assets/flyingMonster/1.png",
    "./assets/flyingMonster/2.png",
    "./assets/flyingMonster/3.png",
    "./assets/flyingMonster/4.png",
    "./assets/flyingMonster/5.png",
    "./assets/flyingMonster/6.png",
    "./assets/flyingMonster/7.png",
    "./assets/flyingMonster/8.png"
    );

  swordMonsterImg=loadAnimation(
  "./assets/swordMonster/1.png",
  "./assets/swordMonster/2.png",
  "./assets/swordMonster/3.png",
  "./assets/swordMonster/4.png",
  "./assets/swordMonster/5.png",
  "./assets/swordMonster/6.png",
  "./assets/swordMonster/7.png",
  "./assets/swordMonster/8.png",
  "./assets/swordMonster/9.png"
  );

  bombMonsterImg=loadAnimation(
  "./assets/bombMonster/1.png",
  "./assets/bombMonster/2.png",
  "./assets/bombMonster/3.png",
  "./assets/bombMonster/4.png",
  "./assets/bombMonster/5.png",
  "./assets/bombMonster/6.png",
  "./assets/bombMonster/7.png",
  "./assets/bombMonster/8.png");
}




function setup() {
  createCanvas( 1800,750);
  bg=createSprite(900,375);
  bg.addImage(bgImg);
  bg.scale=0.8;
  bg.velocityX=-5;
  
  cG=new Group();
  mbG=new Group();
  mG=new Group();
  mhG=new Group();

  platformGroup=new Group();
  ibGroup=new Group();

  plr=createSprite(100,500,40,40);
  plr.addAnimation("running",plrImg);
  plr.scale=0.5;
  plr.setCollider("rectangle", 0, 0, 150, 500);

  //plr.debug=true;

  iGround=createSprite(150,650,300,5);
  iGround.visible=false;

  setTimeout(() => {
    iGround.remove();
  }, 16000);
  setTimeout(() => {
    gameState="play";
  }, 15000);
}

function draw() {
  background(0);  
  if(!bgS.isPlaying()){
    bgS.play();
  }

  if(bg.x<400){
    bg.x=width/2;
  }
  
  if(keyDown("space") && plr.y>150){
    plr.velocityY=-10;
    console.log(plr.y);
  }
  plr.velocityY+=0.8;

  handleCoins()
  handleCoinBags();

  handleMonsters();

  randomPlatforms();
  spawnCoins()

  spawnFlyingMonsters();

  if(plr.y>800){
    plr.remove();
    gameOver();
  }

  if(frameCount%80===0){
    ra=Math.round(random(1,100));
        if(ra<30){
          groundMonsterSpawn(platform.y-100);
        }
      }

  plr.collide(iGround);
  plr.collide(ibGroup);

  drawSprites();
  fill("#6d4c41");
  textFont("impact");
  textSize(40);
  text(`You have collected ${score} coins!`, 100, 100);
  textAlign(CENTER, CENTER);

  //message to the player to hop on the platform
 
 if(gameState==="serve"){
  fill("lime");
  strokeWeight(3);
  stroke("red");
  text("Hop on the platform as soon ", width/2,height/2-100);
  text("as you can reach it to avoid the down fall.", width/2,height/2-20);
  fill("cyan");
  text("You can also jump on top of ground monsters to kill them.", width/2,height-200);
 }
}



function randomPlatforms(){
  if(frameCount%80===0){
    platform=createSprite(2000,500);
    platform.y=Math.round(random(400,650));
    platform.velocityX=-5;

    choice=Math.round(random(1,50));
    if(choice<10){
      moneyBagSpawn(platform.y-100);
    }

    k = Math.round(random(1,5));
    
    if(frameCount%80===0 && spawnedYet===true){
      monsterHead=createSprite(groundMonster.x,groundMonster.y-37,50,2);
      monsterHead.velocityX=-5;
      monsterHead.visible=false;
      //groundMonster.debug=true;
      mhG.add(monsterHead);
    }

    if(frameCount%80===0){
      
      iB=createSprite(platform.x,platform.y-50,100,2);
      iB.velocityX=-5;
      iB.visible=false;
      //iB.debug=true;
      ibGroup.add(iB);
    }
    switch(k){
      case 1:
        platform.addImage(p1);
        break;
      case 2:
        platform.addImage(p2);
        break;
      case 3:
        platform.addImage(p3);
        break;
      case 4:
        platform.addImage(p4);
        break;
      case 5:
        platform.addImage(p5);
        break;

      default:break;
      
    }
    platform.scale=0.25;
    platform.lifetime=500;
    platformGroup.add(platform);
  }
}

function spawnCoins(){

  if(frameCount%75===0){
    coin=createSprite(2000,Math.round(random(10,500)));
    coin.addImage(coinImg);
    coin.velocityX=-5;
    coin.scale=0.1

    coin.lifetime=450;
    cG.add(coin);
  }

}

function moneyBagSpawn(y){
  moneyBag=createSprite(2000,y);
  moneyBag.addImage(moneyBagImg);
  moneyBag.velocityX=-5;
  moneyBag.scale=0.07

  moneyBag.lifetime=450;
  mbG.add(moneyBag);
}


function handleCoins() {
  plr.overlap(cG, function(collector, collected) {
    score += 1;
    collected.remove();
    cS.play();
  });
}

function handleCoinBags() {
  plr.overlap(mbG, function(collector, collected) {
    score += 50;
    collected.remove();
    cbS.play()
  });
}

function handleMonsters() {
  
  //making so that the player can kill a ground monster
  //if they jump on their head.
  plr.overlap(mhG, function(collector, collected) {
    collected.remove();
    plr.overlap(mG, function(collector, collected) {
      collected.remove();
    });
  });
  plr.overlap(mG, function(collector, collected) {
    gameOver();
    plr.remove();
    collected.remove();
  });
}

function gameOver(){
  plr.destroy();
  bgS.pause();
  if(!dS.isPlaying()){
    dS.play();
  }
  
  swal(
    {
      html: true,
      title: `You Lost!!!`,
      text: 'You fell off the map or died to the enemies!! <br >You only collected '+score+' coins!',
      imageUrl:
        "https://th.bing.com/th/id/R.3e58c0e950de0b26f805dff1ccd8a030?rik=fUrVRF8p1ov3Og&pid=ImgRaw&r=0",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function spawnFlyingMonsters() {
  //write code here to spawn the flyingMonsters
   if (frameCount % 180 === 0) {
    flyingMonster = createSprite(2000,100,40,10);
    flyingMonster.y = Math.round(random(10,220));
    flyingMonster.addAnimation("fly",flyingMonsterImg);
    flyingMonster.scale = 0.2;
    flyingMonster.velocityX = -9;
    
    flyingMonster.lifetime = 500;
    
    flyingMonster.setCollider("circle", 0, 0, 150);
    //flyingMonster.debug=true;
    
   mG.add(flyingMonster);
    }
}

function groundMonsterSpawn(y){
  spawnedYet=true;
  groundMonster=createSprite(2000,y);
  g = Math.round(random(1,2));
  switch(g){
    case 1:
      groundMonster.addAnimation("sword",swordMonsterImg);
      break;
    case 2:
      groundMonster.addAnimation("bomb",bombMonsterImg);
      break;

    default:break;
    
  }



  groundMonster.velocityX=-5;
  groundMonster.scale=0.24

  groundMonster.setCollider("circle", 0, 0, 150);
  //groundMonster.debug=true;

  groundMonster.lifetime=450;
  mG.add(groundMonster);
}

