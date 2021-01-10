/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* milstoneplanning
 1 speler naar links en rechts bewegen => gereed
 2 bewegen beperken tot 3 posities => gereed
 3 bvijand tekenen in middelste baan => gereed
 4 bvijand naar beneden komt => gereed
 5 als je geraakt bemt door de bijand dan ben je af
 */


/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

var spelerX = 1280/2; // x-positie van speler, halverwege scherm
var spelerY = 650; // y-positie van speler

var kogelX = 0;    // x-positie van kogel
var kogelY = 0;    // y-positie van kogel

var vijandX = 1280/2; // x-positie van vijand, halverwege scherm
var vijandYBoven = 50; // y-positie van vijand bij het begin
var vijandY = vijandYBoven;   // y-positie van vijand

var score = 0; // aantal behaalde punten

var laatstIngedruktLEFT_ARROW = false;
var laatstIngedruktRIGHT_ARROW = false;




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
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
   fill('brown');
   rect(x-25,y-25,50,50);
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
  fill("white");
  ellipse(x, y, 50, 50);
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    vijandY=vijandY+10;
    if (vijandY > spelerY) {
      vijandY = vijandYBoven;
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
  if (keyIsDown(LEFT_ARROW)) {
    if (laatstIngedruktLEFT_ARROW === false) {
      spelerX -= 200;
    }
    laatstIngedruktLEFT_ARROW = true;
  } else {
    laatstIngedruktLEFT_ARROW = false;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (laatstIngedruktRIGHT_ARROW === false) {
      spelerX += 200;
    }
    laatstIngedruktRIGHT_ARROW = true;
  } else {
    laatstIngedruktRIGHT_ARROW = false;
  }
  
  if ( spelerX > 1280/2+200) {
    spelerX = 1280/2+200;
  }
  
  if ( spelerX < 1280/2-200) {
    spelerX = 1280/2-200;
  }
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
  var resultaat = false;
    if (vijandY >= spelerY && vijandX === spelerX) {
      resultaat = true;
    }
  return resultaat;
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
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
      case GAMEOVER:
        text("game over", 100,100);
        break;
  }
}
