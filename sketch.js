var evilCupid, cupidAnim;
var girl, girl2, girl_anim, girl_duck, girl_dead;
var heartGroup, heartAnim, heartPix;
var spider;
var skeletonGroup, skelAnim;
var spiderGroup, spiderImg;
var arrowGroup, arrowImg;
var stoneGroup, stoneImg;
var g_over, gameOver;
var door, doorImg;
var coinGroup;
var shieldGroup;
var gback, gback_anim;
var inv_block1, inv_block2, inv_block3;
var heartX ;
var heart;
var girlname;
var score = 0;
var d = 1000;
var counter = 3;
var form1;
var gameState = 0;
var back2;
var a = 0;
var c = 0;
var e = 0;
var shield
var b=0;

function preload()
{
    back_img = loadImage("ancient.png");
    back_img2 = loadImage("Background1.png");
    girl_anim = loadAnimation("g1.png","g2.png","g3.png","g4.png","g5.png","g6.png","g7.png","g8.png","g9.png","g10.png","g11.png");
    girl_duck = loadImage("gdead.png");
    girl_dead = loadImage("Girl_dead.png");
    g_over = loadImage("Game over.png")
    doorImg = loadImage("door.png");
    gback_anim = loadAnimation("b1.png","b1.png","b1.png","b1.png","b1.png","b2.png","b2.png","b2.png","b3.png","b3.png","b3.png","b4.png","b4.png","b4.png","b5.png","b5.png","b5.png","b6.png","b6.png","b6.png","b7.png","b7.png","b7.png","b8.png","b8.png","b8.png","b9.png","b9.png","b9.png","b10.png","b10.png","b11.png","b11.png","b11.png","b11.png","b11.png","b11.png","b11.png","b12.png","b12.png","b12.png","b13.png","b13.png","b13.png","b14.png","b14.png","b14.png","b15.png","b15.png","b15.png","b16.png","b16.png","b16.png","b16.png","b17.png","b17.png","b17.png","b18.png","b18.png","b18.png","b19.png","b19.png","b19.png","b20.png","b20.png","b20.png","b21.png","b21.png","b21.png","b22.png","b22.png","b22.png","b21.png","b21.png","b21.png","b22.png","b22.png","b22.png","b21.png","b21.png","b21.png","b22.png","b22.png","b22.png","b21.png","b21.png","b21.png","b22.png","b22.png","b22.png","b22.png")
    heartAnim = loadAnimation("h1.png","h2.png","h3.png","h4.png","h5.png","h6.png","h7.png","h8.png","h9.png","h10.png","h11.png","h12.png");
    cupidAnim = loadAnimation("cupid2.png","cupid2.png","cupid2.png","cupid2.png","cupid3.png","cupid3.png","cupid3.png","cupid3.png","cupid2.png","cupid2.png","cupid2.png","cupid2.png","cupid3.png","cupid3.png","cupid3.png","cupid3.png","cupid2.png","cupid2.png","cupid2.png","cupid2.png","cupid3.png","cupid3.png","cupid3.png","cupid3.png","cupid2.png","cupid2.png","cupid2.png","cupid2.png","cupid1.png","cupid1.png", "cupid1.png","cupid1.png","cupid1.png");
    skelAnim = loadAnimation("s1.png","s2.png","s3.png","s4.png","s5.png","s6.png","s7.png","s8.png");
    heartPix = loadImage("heartpixel.png")
    spiderImg = loadImage("spidey.png");
    stoneImg = loadImage("stone.png");
    arrowImg = loadImage("black arrow.png");
}

function setup() 
{
    createCanvas(windowWidth,windowHeight);
  
    database = firebase.database();

    gameState = database.ref('gameState');
    gameState.on("value", readData, showError);

    back1 = createSprite(width/2,height/2,width,height);
    back1.addImage("back_image", back_img2);
    back1.scale = 1.5;
    
    back2 = createSprite(1.5*width,height/2,width,height);
    back2.addImage("back_image", back_img2);
    back2.scale = 1.5;
    back2.visible = false;

    door = createSprite(width,360,100,300);
    door.visible = false;
    door.setCollider("rectangle",0,0,10,door.height)
    door.addImage(doorImg);
    door.scale = 1;

    girl = createSprite(700,300,30,130);
    girl.addAnimation("girl_run", girl_anim);
    girl.visible = false;
    girl.setCollider("rectangle",0,0,girl.width-50,girl.height+300);
    girl.scale = 0.3;

    girl2 = createSprite(girl.x,girl.y);
    girl2.addImage(girl_duck);
    girl2.scale = 0.3;
    girl2.visible = false;
    girl2.setCollider("circle",50,120,1);

    girl3 = createSprite(girl.x,girl.y + 200);
    girl3.addImage(girl_dead);
    girl3.scale = 0.2;
    girl3.visible = false;

    evilCupid = createSprite(170,300);
    evilCupid.addAnimation("cupid_fly",cupidAnim);
    evilCupid.visible = false;
    evilCupid.scale = 0.4555;

    spider = createSprite(1500,-400,0,0);

    d = 1015;
    e = 0;

    heartGroup = createGroup();
    arrowGroup = createGroup();
    skeletonGroup = createGroup();
    spiderGroup = createGroup();
    stoneGroup = createGroup();
    coinGroup = createGroup();
    sheildGroup = createGroup();

    heartX = displayWidth - 50;

    for(var i = 1; i <= counter; i++)
    {
        heart = createSprite(heartX, 50, 20,20);
        heart.addImage(heartPix);
        heart.scale = 0.0655
        heartX = heartX - 50;
        coinGroup.add(heart);
    }
    
    inv_block1 = createSprite(1500,470,20,50);
    inv_block1.visible = false;
    inv_block2 = createSprite(170,400,50,20);
    inv_block2.visible = false;
    inv_block3 = createSprite(1500,-400,20,300);
    inv_block3.visible = false;

    form1 = new form();
}

function draw() 
{
    background(255);

    createEdgeSprites();
    console.log(girl.y);
    score = score + Math.round(getFrameRate()/60);

    if(gameState == 0)
    {
        background(back_img);

        fill(88,6,21);
        textSize(60);
        textFont("bembo");
        text("BLACK VALENTINE", width-950, height-530);

        textSize(20);
        text("You are in a lively party with your valentine", 500, 220);
        text("and you are drinking a glass of",550,245);
        text("fruit punch given to you by a stranger.",525,270);
        text("All of a sudden you fall down, and... ",530,295);
        text("Press start to know.",590,320);

        back1.visible = false;
        girl.visible = false;
        evilCupid.visible = false;

        form1.display();

        writeData(0);
    }

    if(gameState == 1)
    {
        background(0);

        back1.visible = true;
        back2.visible = true;
        girl.visible = true;
        evilCupid.visible = true;
        girl2.visible = false;
        girl.scale = 0.3;
        heartX = displayWidth - 50;

        arrows();
        hearts();
        obstacles();
        spiders();

        if(inv_block1.isTouching(stoneGroup))
        {
            inv_block1.velocityX = -6
        }

        if(inv_block2.isTouching(arrowGroup))
        {
            inv_block2.velocityX = 7
        }

        if(inv_block3.isTouching(spider))
        {
            inv_block3.velocityX = -8;
        }

        if(counter>=5 && keyDown("s") && a<200)
        {
            b=1;
        }

        if(b==1 && a<200)
        {
            heartGroup.destroyEach();

            if(girl.isTouching(arrowGroup)||girl.isTouching(spiderGroup)||girl.isTouching(stoneGroup))
            {
                arrowGroup.destroyEach();
                spiderGroup.destroyEach();
                stoneGroup.destroyEach();
            }

            a=a+1;
            girl.scale=0.4;
        }

        back1.velocityX = -(4 + 3* score/500);
        back2.velocityX = -(4 + 3* score/500);
        
        if (back1.x < -width/2)
        {
            back1.x = width/2;
        }
        if (back2.x < width/2)
        {
            back2.x = 1.5*width;
        }

        if(keyDown("SPACE")&& girl.y >= 410)
        
        {
            girl2.visible = false;
            girl.visible=true;
            girl.velocityY = -25;
        }

        if(girl.y > 450)
        {
            girl.y = 450;
        }

        if(d <= 30)
        {
            door.visible = true;
            door.velocityX = -4;
        }

        if(keyDown("DOWN_ARROW"))
        {
            girl2.visible = true;
            girl2.x=girl.x;
            girl2.y=girl.y;
            girl.visible = false;
        }

        if( girl.isTouching(arrowGroup)||girl.isTouching(spiderGroup)||girl.isTouching(stoneGroup))
        {
                    
            if(girl.scale==0.3)
            counter--;
           

            coinGroup.destroyEach();

            for(var i = 1; i <= counter; i++)
            {
                heart = createSprite(heartX, 50, 20,20);
                heart.addImage(heartPix);
                heart.scale = 0.0655
                heartX = heartX - 50;
                coinGroup.add(heart);
            }
        }
        
        
        if(girl.isTouching(heartGroup))
        {
            counter++;
        }

        girl.velocityY = girl.velocityY + 1.2;
    }

    if(girl.isTouching(arrowGroup))
    {
        arrowGroup.destroyEach();
    }

    if(girl.isTouching(skeletonGroup))
    {
        skeletonGroup.destroyEach();
    }

    if(girl.isTouching(heartGroup))
    {
        heartGroup.destroyEach();

        for(var i = 1; i <= counter; i++)
        {
            heart = createSprite(heartX, 50, 20,20);
            heart.addImage(heartPix);
            heart.scale = 0.0655;
            heartX = heartX - 50;

            coinGroup.add(heart);
        }

        if(counter <= 0)
        {
            gameState = 2;
            writeData(2);
        }
    }

    if(girl.isTouching(stoneGroup))
    {
        stoneGroup.destroyEach();
    }

    if(girl.isTouching(spider))
    {
        spider.destroy();
    }

    if(d <= 70)
    {
        stoneGroup.destroyEach();
        spider.destroy();
        arrowGroup.destroyEach();
        heartGroup.destroyEach();

        evilCupid.velocityX = -3;
    }

    if(counter <= 0)
    {
        background(0);
        gameState=-1;
        form1.reset.show();

        form1.reset.position(500, 500);
        
        back1.velocityX = 0;
        back2.velocityX = 0;

        girl.visible = false;
        girl2.visible = false;
        girl3.visible = true;

        evilCupid.visible = true;
        spider.visible = false;

        heartGroup.destroyEach();
        stoneGroup.destroyEach();
        arrowGroup.destroyEach();

        gameOver = createSprite(650,230);
        gameOver.addImage(g_over);
        gameOver.scale = 0.4;
    }

    if(girl.isTouching(door))
    {
        gameState = 2;
        writeData(2);
    }

    if(gameState == 2 && c == 0)
    {
        background(255);

        heartGroup.destroyEach();
        stoneGroup.destroyEach();
        arrowGroup.destroyEach();
        spider.destroy();
        girl.destroy();
        girl2.destroy();
        girl3.destroy();
        evilCupid.destroy();
        door.destroy();
        back1.destroy();
        back2.destroy();
        heart.destroy();

        gback = createSprite(680,300);
        gback.addAnimation("gEnd",gback_anim);
        gback.scale = 0.6;

        c = 1;
    }

    if(gameState == 2)
    {
        console.log(e)
        e = e + 1;
    }

    if(e >= 360)
    {
        gameState = 3;
    }

    if(gameState == 3)
    {
        writeData(3);

        background(0);

        gback.destroy();

    }

    drawSprites();

    if(gameState == 1)
    {
        textFont("bembo");
        fill("white");
        textSize(15);
        text(girlname, girl.x, girl.y + 100);

        textFont("bembo");
        fill(255);
        textSize(20);
        text("Distance to the Door : " + Math.round(d), 1000,100);
         d = d - 0.3;
        console.log(d);
    }

    if(inv_block1.x <= 860 && inv_block1.x >= 750)
    {
        textFont("bembo");
        textSize(30);
        fill("white");
        text("Press Space!",680,250);
    }

    if(inv_block2.x >= 520 && inv_block2.x <= 630)
    {
        textFont("bembo");
        textSize(30);
        fill("white");
        text("Press Space!",680,250);
    }

    if(inv_block3.x <= 860 && inv_block3.x >= 750)
    {
        textFont("bembo");
        textSize(30);
        fill("white");
        text("Press Down Arrow!",680,250);
    }

    if(gameState == 3)
    {
        textSize(60);
        textFont("bembo");
        fill(255);
        text("THANKS FOR PLAYING!", 370, 250);
        textSize(20);
        text("Make sure to stick around for the next level...",500,310);
    }
}

function writeData(state)
{
    database.ref('/').update(
    {
        "gameState" : state
    })
}

function readData(data)
{
    gameState = data.val();
};

function showError()
{
    console.log("error");
}

//Group Functions

function arrows()
{
    if(frameCount % 250 == 0)
    {
        var arrow1 = createSprite(170,400,0,0);
        arrow1.addImage(arrowImg);
        arrow1.scale = 0.35;
        arrow1.velocityX = 7;
        arrow1.lifetime = 200;

        arrow1.setCollider("circle",0,0,10)
        
        arrowGroup.add(arrow1);
        
        if(gameState == 0)
        {
            arrow1.visible = false;
        }

        if(gameState == 1)
        {
            arrow1.visible = true;
        }
    }
} 

function obstacles()
{
  if(frameCount % 150 == 0)
  {
     var stone = createSprite(1500,470,0,0);
     stone.addImage(stoneImg);
     stone.scale = 0.2;
     stone.velocityX = -6;
     stone.lifetime = 300;

     stone.setCollider("circle",0,0,10)
     
     stoneGroup.add(stone);

     if(gameState == 0)
    {
        stone.visible = false;
    }

    if(gameState == 1)
    {
        stone.visible = true;
    }
  }
}

function hearts()
{
  if (frameCount % 220 === 0)
  {
    var heart1 = createSprite(1500,220,0,0);
    heart1.addAnimation("move",heartAnim);
    heart1.scale = 0.8;
    heart1.velocityX = -6;
    heart1.lifetime = 300;

    heart1.setCollider("circle",0,0,10)
   
    heartGroup.add(heart1);

    if(gameState == 0)
    {
        heart1.visible = false;
    }

    if(gameState == 1)
    {
        heart1.visible = true;
    }
  }
}

function skeletons()
{
  if(frameCount % 350 == 0)
  {
     var skeleton = createSprite(1500,430,0,0);
     skeleton.addAnimation("skeleton11", skelAnim);
     skeleton.scale = 0.9;
     skeleton.velocityX = -6;
     skeleton.lifetime = 300;

     skeleton.setCollider("circle",0,0,10)
     
     skeletonGroup.add(skeleton);
  }
}

function spiders()
{
  if(frameCount % 400 == 0)
  {
    spider = createSprite(1500,-400,0,0);
    spider.addImage("spider1", spiderImg);
    spider.scale = 0.5;
    spider.velocityX = -8;
    spider.velocityY = 6; 
    spider.lifetime = 500;

    spider.setCollider("rectangle",0,0,10,500);
    spider.debug = true;
     
    spiderGroup.add(spider);
  }

  if(spider.y >= 215)
  {
        spider.velocityY = -6;
  }
}



