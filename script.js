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

var spelerX = 600; // x-positie van speler
var spelerY = 600; // y-positie van speler

var vijandX = 800; // x-positie van vijand
var vijandY = 400; // y-positie van vijand

var kogelX = 400; // x-positie van kogel
var kogelY = 400; // y-positie van kogel
var kogelVliegt = false;

var doelwitX = 0;
var doelwitY = 0;

var kogelSnelheidX = 0;
var kogelSnelheidY = 0;

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

  // kogel
  if (mouseIsPressed && kogelVliegt === false) {
    doelwitX = mouseX;
    doelwitY = mouseY;
  }
  
  if (kogelVliegt === false && mouseIsPressed) {//schiet
    kogelVliegt = true;
    kogelX = spelerX;
    kogelY = spelerY;
  }

  if (kogelVliegt === true && doelwitY > spelerY) { // kogel vliegt
    kogelY = kogelY + 1;
  }

  if (kogelVliegt === true && doelwitY < spelerY) { // kogel vliegt
    kogelY = kogelY - 1;
  }

  if (kogelVliegt === true && doelwitX > spelerX) { // kogel vliegt
    kogelX = kogelX + 1;
  }

  if (kogelVliegt === true && doelwitX < spelerX) { // kogel vliegt
    kogelX = kogelX - 1;
  }

  if (kogelVliegt === true && 
      kogelY < 0) { // kogel verdwijnt
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
  fill("green");
  rect(vijandX - 25, vijandY - 25, 50, 50);
  fill("black");
  ellipse(vijandX, vijandY, 10, 10);
  
  // kogel
  fill("silver");
  ellipse(kogelX, kogelY, 20, 20);
  
  // speler
  fill("white");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("black");
  ellipse(spelerX, spelerY, 10, 10);

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
