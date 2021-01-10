/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* milestones
1. balletje in bootje aanpassen => gereed
2. bootje naar links en rechts => gereed, issue: hij kan nog van het scherm af
3. pakje aan de horizon
4. pakje laten vallen
5. pakje kunnen opvangen met boot
6. af als je een pakje niet vangt


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 200; // x-positie van speler
var spelerY = 720-100; // y-positie van speler, 720 is canvas height

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var pakjeX = 200;   // x-positie van het pakje dat je moet vangen
var pakjeY = 50;   // y-positie van het pakje dat je moet vangen

var score = 0; // aantal behaalde punten





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("purple");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent het pakje
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenPakje = function(x, y) {
 fill("pink");
 rect(x-25,y-25,50,50);
 fill("black");
 ellipse(x,y,10,10);

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  noStroke();
  fill("white");
  rect(x-25, y-25, 50, 75); // hut
  triangle(x-75, y, x-25, y, x-25, y+50); // links
  triangle(x+25, y, x+75, y, x+25, y+50); //rechts
  fill("black");
  ellipse(x,y,10,10);
  
};


/**
 * Updatet globale variabelen met positie van het pakje
 */
var beweegPakje = function() {
    pakjeY = pakjeY + 2;
    if (pakjeY > 700) {
      pakjeY= 20;
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
  if ( keyIsDown(65) ) { // 65='a'
      spelerX = spelerX - 5;
  }
    if ( keyIsDown(68) ) { // 68='d'
      spelerX = spelerX + 5;
  }
};


/**
 * Zoekt uit of het pakje is gevangen
 * @returns {boolean} true als pakje is geraakt
 */
var checkPakjeGevangen = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met pakje
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
    
  return false;
};


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
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegPakje();
      beweegKogel();
      beweegSpeler();
      
      if (checkPakjeGevangen()) {
        // punten erbij
        // nieuw pakje maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenPakje(pakjeX, pakjeY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
