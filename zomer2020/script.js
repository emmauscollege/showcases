/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Zomerschool Programmeren
   Informatica - Emmauscollege Rotterdam
   Gebaseerd op het template voor de game-opdracht 4H-IN-PO2
   https://github.com/informatica-emmauscollege/1920-4HV-game-template
   
   Deelnemers:
   Aaron, Quinzel, Ryan
   Docent:
   Sander van Geest
   13 - 17 juli 2020
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const GALAXYAARON = 11;
const GALAXYQUINZEL = 12;
const GALAXYRYAN= 13;
const GAMEOVER = 2;
var spelStatus = GALAXYAARON;

/* maak variabalen */
var spelerX = 0; // x-positie van speler
var spelerY = 0; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 0;   // x-positie van vijand
var vijandY = 0;   // y-positie van vijand

var score = 0; // aantal behaalde punten


var vijandSpeed = 0;

var kogelVliegt = false;

var gameovertext = "";

var lengteX = 0;

// alleen voor Quinzel
var vijandspeed=0;


/* AARON */
var setupAaron = function() {
  spelerX = 200; // x-positie van speler
  spelerY = 100; // y-positie van speler

  kogelX = 100;    // x-positie van kogel
  kogelY = 100;    // y-positie van kogel

  vijandX = 300;   // x-positie van vijand
  vijandY = 75;   // y-positie van vijand

  vijandSpeed = 5;

  kogelVliegt = false;

  gameovertext = "GAMEOVER";

  lengteX = ["200", "100", "300"]
}

/* QUINZEL */
var setupQuinzel = function() {
  spelerX = 200; // x-positie van speler
  spelerY = 100; // y-positie van speler

  kogelX = 0;    // x-positie van kogel
  kogelY = 0;    // y-positie van kogel

  vijandX = 400;   // x-positie van vijand
  vijandY = 400;   // y-positie van vijand

  vijandspeed=5;

  lengteX =['50','100','150','200'];
}

/* RYAN */
var setupRyan = function() {
  spelerX = 600; // x-positie van speler
  spelerY = 100; // y-positie van speler

  kogelX = 0;    // x-positie van kogel
  kogelY = 0;    // y-positie van kogel

  vijandX = [200, 300, 400, 700, 900];   // x-positie van vijand en
  vijandY = 0;   // y-positie van vijand

// aantal vijanden = vijandX.length

}

/* ********************************************* */
/*      functies die AARON gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("purple");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
    
    /* GEE: ik heb een stukje ingewikkelder code toegevoegd
     * kijk eens of je het snapt
     * als je wilt, dan kun je het een beetje aanpassen
     * dan leer je er echt mee werken
     * de sin() en cos() functies horen officieel niet bij de stof voor informatica
     */

    angleMode(DEGREES); // stel p5js in op graden, onderaan is 0 graden, bovenaan 180 graden
    fill (255,0,0)
    for (var hoek = 180-60; hoek <= 180+60; hoek = hoek + 10) {
      stroke (0,0,0);
      line (x, y, x+sin(hoek)*35, y+cos(hoek)*35);
    }
    
    fill(180,0,0);
    ellipse(x,y,50,50); 
    fill(0,0,0);
    ellipse(x-10,y-5,5,5);
    ellipse(x+10,y-5,5,5);
    
    if ( y>0 && y < 100 ){
      rect(x-10,y+10,20,3);
    }
    if (y>100 && y < 200) {
      rect(x-10,y+10,20,3);
      rect(x-10,y+5,2,8)
      rect(x-10,y+10,2,8)
      rect(x+10,y+5,2,8)
      rect(x+10,y+10,2,8)
    }
    //1000000000000
    
        if ( y>200 && y < 300 ){
      rect(x-10,y+10,20,3);
    }
    if (y>300 && y < 400) {
      rect(x-10,y+10,20,3);
      rect(x-10,y+5,2,8)
      rect(x-10,y+10,2,8)
      rect(x+10,y+5,2,8)
      rect(x+10,y+10,2,8)
    }
    //10000000000000
        if ( y>400 && y < 500 ){
      rect(x-10,y+10,20,3);
    }
    if (y>500 && y < 600) {
      rect(x-10,y+10,20,3);
      rect(x-10,y+5,2,8)
      rect(x-10,y+10,2,8)
      rect(x+10,y+5,2,8)
      rect(x+10,y+10,2,8)
    }
    
        if ( y>600 && y < 700 ){
      rect(x-10,y+10,20,3);
    }

};



/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
 

var tekenKogel = function(x, y){
noStroke();
 fill(256,256,256);
 rect(kogelX, kogelY,5,5);
 ellipse(kogelX+5,kogelY+2.5,5,5);

};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  var kleur=0
  kleur=vijandY/6
  fill (209+kleur,115+kleur,0+kleur);

  ellipse(x, y, 50, 50);
};

/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */

var beweegVijand = function() {
    vijandY=vijandY+vijandSpeed;
    if (vijandY< 70) {vijandSpeed= 5;}
    if (vijandY > 670) {vijandY= 70;}
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

if (keyIsDown (32)) {}

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
  
  if (keyIsDown(LEFT_ARROW)) {
    spelerX=spelerX-10;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    spelerX=spelerX+10;
  }
  if (keyIsDown(UP_ARROW)) {
    spelerY=spelerY-10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    spelerY=spelerY+10;
  }

 if (spelerX < 45) {spelerX=45}
 if (spelerX > 1235) {spelerX=1235}
 if (spelerY < 45) {spelerY=45}
 if (spelerY > 675) {spelerY=675}
};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */

 var checkGameOver = function() {
   
for (var extraX = 0; extraX<1300; extraX += 200  ){
  if (vijandY-spelerY <50 && 
     vijandY-spelerY >-50 &&
     vijandX+extraX-spelerX <50    && 
     vijandX+extraX-spelerX >-50) {
  
      return true;
    }
  }
    
   return false;};


/* ********************************************* */
/*      functies die QUINZEL gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeldQ = function () {
  fill("grey");
  rect(20,20,width-2*20,height-2*20);
  var donkerheidArray = [50, 15, 10, 30, 20, 70, 90];
  var i=0;
  rect(20, 20, width - 2 * 20, height - 2 * 20);
  stroke(0,0,100);
  
  for (var baly=500; baly<1000; baly+=50 ){
     
      for (var balx=0; balx<1500; balx+=50){
        // bepaal kleur
        i = i + 1;
        if (i>= donkerheidArray.length) {
           i = 0;
        }
        var donkerheid = donkerheidArray[i];
        fill(102-donkerheid, 204-donkerheid, 255-donkerheid);
        // teken golf
        ellipse(balx,baly,100,100);
        }
    }
    
   
};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijandQ = function(x, y) {
  fill(255,150,50);
  triangle(x-56,y,x,y-25,x,y+25);
  fill(255,255,255);
  rect(x-25,y,50,50);
  fill(255,255,255);
  ellipse(x,y,50,50);

  // middenpunt
  fill(0,0,0);
  ellipse(x,y, 10, 10);
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogelQ = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpelerQ = function(x, y) {
  var kleur=0;
  kleur=vijandY/6;
  fill(51+kleur, 51+kleur, 255+kleur);
  ellipse(x, y, 50, 50);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijandQ = function() {
 vijandY=vijandY+vijandspeed;
 if (vijandY<60){vijandspeed=500;}
 if (vijandY>620){vijandY=60;}
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogelQ = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpelerQ = function() {
  if (keyIsDown(LEFT_ARROW))
  spelerX -=10
  if (keyIsDown(RIGHT_ARROW))
  spelerX +=10
  if (keyIsDown(DOWN_ARROW))
  spelerY +=10
  if (keyIsDown(UP_ARROW))
  spelerY -=10

 if (spelerX<45){spelerX=45};
  if (spelerX>1235){spelerX=1235};
  if (spelerY<45){spelerY=45};
  if (spelerY>675){spelerY=675};
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOverQ = function() {
     for(var XXX = 0; XXX<1400; XXX += 200){
      if (vijandY-spelerY<50 &&
        vijandY-spelerY>-50 &&
        vijandX+XXX-spelerX<50  &&
       vijandX+XXX-spelerX>-50 )
     
     {return true;} }

  return false;
  };



/* ********************************************* */
/*      functies die RYAN gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var offset = 0;
var tekenVeldR = function () {
  
  noStroke();
  var felheid = 0;
  var cirkelGrote = 0;
  for (var teller=8; teller>=0; teller = teller - 1){
    felheid = 200-(teller-round(offset))*10;
    if (felheid > 200) {
      felheid = felheid - 8*10;
    }  
    fill(felheid, felheid, felheid+50);
    cirkelGrote = teller*200;
    ellipse(width/2, height/2, cirkelGrote, cirkelGrote);
  }
  
  offset = offset + 0.1;
  if (offset > 8) {
    offset = 0;
  }
  
};

/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijandR = function(x, y) {
  fill (255,0,0);
  ellipse(x,y,50,50);
  fill (255,255,255);
  ellipse(x,y,40,40);
  fill (255,0,0);
  ellipse(x,y,30,30) ;
  fill (255,255,255);
  ellipse(x,y,20,20);
  fill (255,0,0);
  ellipse(x,y,10,10);
};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogelR = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpelerR = function(x, y) {
  fill("white");
  ellipse(x, y, 50, 50);
  
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijandR = function() {
    vijandY = vijandY + 5;
    
    // alsvijand onderaan scherm is, zet hem dan weer bovenaan
    if (vijandY > 720) {
      vijandY = 0;
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogelR = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpelerR = function() {
  if (keyIsDown(LEFT_ARROW)) {
    spelerX = spelerX - 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    spelerX = spelerX + 5;
  }

  if (keyIsDown(UP_ARROW)) {
    spelerY = spelerY - 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    spelerY = spelerY + 5;
   }
   
   if (spelerX<45){spelerX=45};
   if (spelerX>1235){spelerX=1235}
   if (spelerY<45){spelerY=45};
   if (spelerY>675){spelerY=675};
};




/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOverR = function() {

for(var vijandNummer = 0; vijandNummer<vijandX.length; vijandNummer += 1){

    if (vijandX[vijandNummer]-spelerX < 50 && 
      vijandX[vijandNummer]-spelerX> -50 &&
      vijandY-spelerY<50  &&
      vijandY-spelerY > -50) {

      return true;
    }
/*
for(var extraX = 0; extraX<1200; extraX += 200){

    if (vijandX+extraX-spelerX < 50 && 
      vijandX+extraX-spelerX> -50 &&
      vijandY-spelerY<50  &&
      vijandY-spelerY > -50) {

      return true;
    }
*/
  }
  
  return false;
      
};

/* ********************************************* */
/*      functies voor alle GALAXIES.             */
/* ********************************************* */
var tekenSpelinfo = function () {
  
  // text instellen
  var rand = 20;
  var font = 40;
  textSize(font);
  fill(0,255,255); // geel
  
  // Level aangeven
  var galaxyText = "";
  switch (spelStatus) {
    case GALAXYAARON:
      galaxyText ="Galaxy: Aaron";
    break;
    case GALAXYQUINZEL:
      galaxyText ="Galaxy: Quinzel";
    break;
    case GALAXYRYAN:
      galaxyText ="Galaxy: Ryan";
    break;
  }
  textAlign(LEFT);
  text(galaxyText,rand,rand+font);

  // score aangeven
  textAlign(RIGHT);
  text("score "+round(score),width-rand,rand+font);
}

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
  
  setupAaron();
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case GALAXYAARON:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      tekenVeld();

      for (var extraX= 0 ;extraX<1000 ;extraX += 200) {
      tekenVijand(vijandX+extraX, vijandY);}

      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        /*
        spelStatus = GAMEOVER;
        textSize(50);
        textAlign(CENTER);
     text(gameovertext ,width/2,350);
     */
       spelStatus = GALAXYQUINZEL;
       setupQuinzel();
     }

      break;
    case GALAXYQUINZEL:
       beweegVijandQ();
      beweegKogelQ();
      beweegSpelerQ();
      

      tekenVeldQ();
      for (var XXX=0; XXX<1000; XXX+=200){
      tekenVijandQ(vijandX+XXX, vijandY);}
      tekenKogelQ(kogelX, kogelY);
      tekenSpelerQ(spelerX, spelerY);

      if (checkGameOverQ()) {
        /*
        spelStatus = GAMEOVER;
        textSize(32);
         textAlign(CENTER);
        text('GAME OVER',width/2,350);
        */
       spelStatus = GALAXYRYAN;
       setupRyan();
      }
      break;
      
      case GALAXYRYAN:
      beweegVijandR();
      beweegKogelR();
      beweegSpelerR();

      tekenVeldR();
      for (var vijandNummer=0; vijandNummer < vijandX.length; vijandNummer += 1) {
        tekenVijandR(vijandX[vijandNummer], vijandY);
      }
      tekenKogelR(kogelX, kogelY);
      tekenSpelerR(spelerX, spelerY);

      if (checkGameOverR()) {
        spelStatus = GAMEOVER;
      }
      break;
      case GAMEOVER:
        textSize(100);
        fill(219,11,46);
        textAlign(CENTER);
        text('GAME OVER', width/2,height/2);
      break;
  }
  // teken score
  if (spelStatus !== GAMEOVER) {
    score = score + 1/50;
  }
  tekenSpelinfo();
}
