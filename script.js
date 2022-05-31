/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var spelerX = 400; // x-positie van speler
var spelerY = 400; // y-positie van speler

var vijandX = 900; // x-positie van vijand
var vijandY = 400; // y-positie van vijand
var vijandBeweegt = false;
var SnelheidVijand = 0.5;

var kogelX = 400; // x-positie van kogel
var kogelY = 400; // y-positie van kogel
var kogelVliegt = false;

var doelwitX = 0;
var doelwitY = 0;
var plaatsAfvurenX = 0;
var plaatsAfvurenY = 0;

var kogelSnelheid = 1;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function () {
  // speler
  if (keyIsDown(KEY_W)) {
    spelerY = spelerY - 1;
  }

  if (keyIsDown(KEY_S)) {
    spelerY = spelerY + 1;
  }

  if (keyIsDown(KEY_A)) {
    spelerX = spelerX - 1;
  }

  if (keyIsDown(KEY_D)) {
    spelerX = spelerX + 1;
  }

  // vijand
  
  if (vijandBeweegt === false ) {//beweeg
    vijandBeweegt = true;
  }

  var richtingVijandY = spelerY - vijandY;
  var richtingVijandX = spelerX - vijandX;

  var correctieSnelheidVijand = Math.sqrt(((richtingVijandX * richtingVijandX) + (richtingVijandY * richtingVijandY))) / 1.4142
  
  var snelheidVijandY = richtingVijandY / correctieSnelheidVijand;
  var snelheidVijandX = richtingVijandX / correctieSnelheidVijand;
  
  if (vijandBeweegt === true) { // kogel vliegt
    vijandY = vijandY + SnelheidVijand * snelheidVijandY;
  }

  if (vijandBeweegt === true) { // kogel vliegt
    vijandX = vijandX + SnelheidVijand * snelheidVijandX;
  }

  
  // kogel
  if (mouseIsPressed && kogelVliegt === false) {
    doelwitX = mouseX;
    doelwitY = mouseY;
    plaatsAfvurenX = spelerX;
    plaatsAfvurenY = spelerY;
  }
  
  if (kogelVliegt === false && mouseIsPressed) {//schiet
    kogelVliegt = true;
    kogelX = plaatsAfvurenX;
    kogelY = plaatsAfvurenY;
  }

  var richtingY = doelwitY - plaatsAfvurenY;
  var richtingX = doelwitX - plaatsAfvurenX;

  var correctieSnelheid = Math.sqrt(((richtingX * richtingX) + (richtingY * richtingY))) / 1.4142
  
  var snelheidY = richtingY / correctieSnelheid;
  var snelheidX = richtingX / correctieSnelheid;
  
  if (kogelVliegt === true) { // kogel vliegt
    kogelY = kogelY + kogelSnelheid * snelheidY;
  }

  if (kogelVliegt === true) { // kogel vliegt
    kogelX = kogelX + kogelSnelheid * snelheidX;
  }

  if (kogelVliegt === true && kogelY < 0 || 
      kogelVliegt === true && kogelY > 720 ||
      kogelVliegt === true && kogelX < 0 ||
      kogelVliegt === true && kogelX > 1280) { // kogel verdwijnt
    kogelVliegt = false;
  }
    
};

/** 
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function () {
  // botsing speler tegen vijand
  if (spelerX - vijandX < 50 &&
      spelerX - vijandX > -50 &&
      spelerY - vijandY < 50 &&
      spelerY - vijandY > -50) {
      console.log("Botsing");
      spelStatus = GAMEOVER;
     }
  
  // botsing kogel tegen vijand
  if (kogelX - vijandX < 50 &&
      kogelX - vijandX > -50 &&
      kogelY - vijandY < 50 &&
      kogelY - vijandY > -50) {
      console.log("kogel raak");
     }
  
  // update punten en health

};

/**
 * Tekent spelscherm
 */
var tekenAlles = function () {
  // achtergrond
  fill("brown");
  rect(0,0, 1280,720);
  
  // vijand
  //torso
  fill(3, 6, 84);
  rect(vijandX-65, vijandY+100, 30, 50); 
  
  //benen
  //linker been
  fill(255, 255, 255);
  rect(vijandX-65, vijandY+150, 10, 50); //broek links(voor kijker)
  fill(0, 0, 0);
  rect(vijandX-65, vijandY+180, 10, 20); //schoen links(voor kijker)
  
  //rechter been
  fill(252, 252, 255);
  rect(vijandX-45, vijandY+150, 10, 50); //broek rechts(voor kijker)
  fill(0, 0, 0);
  rect(vijandX-45, vijandY+180, 10, 20); //schoen rechts(voor kijker)
  
  //rechter arm (schouder achter geweer)
  fill(3, 6, 84);
  rect(vijandX-35, vijandY+100, 10, 20); //mouw boven stuk (bluaw)
  
  //geweer
  fill(117, 54, 54);
  rect(vijandX-65, vijandY+110, 85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(vijandX-40, vijandY+108, 75, 5); //loop
  
  fill(148, 138, 138);
  rect(vijandX+30, vijandY+105, 30, 3);
  
  //arm
  //linker arm (van kijker perspecftief)
  fill(3, 6, 84);
  rect(vijandX-75, vijandY+100, 10, 25); //mouw boven stuk (bluaw)
  
  fill(3, 6, 84);
  rect(vijandX-75, vijandY+115, 40, 10); //mouw boven stuk onderarm(bluaw)
  
  fill(145, 16, 16);
  rect(vijandX-45, vijandY+115, 10, 10); //mouw onderstuk (rood)
  
  fill(230, 200, 185);
  rect(vijandX-35, vijandY+115, 10, 10); //hand
  
  //hoofd 
  fill(230, 200, 185);
  rect(vijandX -60, vijandY+80, 20, 20); //head
  
  //kraag rood
  fill(145, 16, 16); 
  rect(vijandX-61, vijandY+98, 22, 5); 
  
  //hoed
  fill(0, 0, 0);
  rect(vijandX-62, vijandY+50, 25, 30); //hoed
  fill(201, 168, 0);
  rect(vijandX+-55, vijandY+73, 10, 7);// plaat op hoed
  fill(145, 16, 16);
  rect(vijandX-40, vijandY+40, 6, 15); //veer op hoed
  
  // kogel
  fill("silver");
  ellipse(kogelX, kogelY, 20, 20);
  
  // speler
  //torso
  fill(181, 9, 9);
  rect(spelerX, spelerY, 30, 50); //vest of torso
  
  //riem
  fill(255, 255, 255);
  rect(spelerX, spelerY+35, 30, 5 );
  fill(201, 168, 0);
  rect(spelerX+13, spelerY+35, 5, 5); //gesp
  
  //benen
  //linker been
  fill(12, 15, 138);
  rect(spelerX, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX, spelerY+90, 10, 10); //schoen
  
  //rechter been
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+50, 10, 50); //broek
  fill(0, 0, 0);
  rect(spelerX+20, spelerY+90, 10, 10); //schoen
  
  //rechter arm (schouder achter geweer)
  fill(181, 9, 9);
  rect(spelerX+30, spelerY, 10, 20); //mouw boven stuk (rood)
  
  //geweer
  fill(117, 54, 54);
  rect(spelerX, spelerY+10, 85, 8); //houten stuk
  
  fill(105, 101, 101);
  rect(spelerX+25, spelerY+8, 75, 5); //loop
  
  fill(148, 138, 138);
  rect(spelerX+95, spelerY+5, 30, 3);
  
  //arm
  //linker arm (van user perspecftief)
  fill(181, 9, 9);
  rect(spelerX-10, spelerY, 10, 25); //mouw boven stuk (rood)
  
  fill(181, 9, 9);
  rect(spelerX-10, spelerY+15, 40, 10); //mouw boven stuk onderarm(rood)
  
  fill(12, 15, 138);
  rect(spelerX+20, spelerY+15, 10, 10); //mouw onderstuk (blauw)
  
  fill(230, 200, 185);
  rect(spelerX+30, spelerY+15, 10, 10); //hand
  
  //hoofd
  fill(230, 200, 185);
  rect(spelerX +5, spelerY-20, 20, 20); //head
  
  //kraag blauw
  fill(12, 15, 138);
  rect(spelerX+4, spelerY-2, 22, 5);
  
  //hoed
  fill(0, 0, 0);
  rect(spelerX+3, spelerY-50, 25, 30); //hoed
  fill(192, 192, 192);
  rect(spelerX+10, spelerY-27, 10, 7);// plaat op hoed

  // punten en health

};

/**
 * return true als het gameover is
 * anders return false
 */
var checkGameOver = function () {
  // check of HP 0 is , of tijd op is, of ...
  return false;
};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

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
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
    }
  }
  if (spelStatus === GAMEOVER) {
    fill(0, 0, 0);// game-over scherm
    rect(0, 0, 1280, 720)
    textSize(100);
    fill("white");
    text("GAME OVER", 300, 350)
    text("Press ... for new game", 150, 450)
  }
}
