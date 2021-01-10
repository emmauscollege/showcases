let player;
let world;
let collision;
let lvl_16;
let health;
let main_delay = 0;
let coin;
let exitButton;

function setup() {
  createCanvas(960, 640);
  player = new Player();
  world = new World();
  collision = new Collision();
  lvl_16 = new Lvl_16();
  health = new Health();
  coin = new Coin();
  exitButton = createButton("Exit");
  exitButton.position(453, 7);
  exitButton.addClass("exit-button");
}

function draw() {
  if (main_delay > 0) {
    main_delay--;
  }

  image(world.day, 0, 0);
  world.load(lvl_16);
  lvl_16.enemies();
  lvl_16.updateScore();
  lvl_16.goal();
  player.move();
  player.update();
  collision.run(lvl_16);
  player.show();
  lvl_16.ui();
  exitButton.mousePressed(() => link('../level_selector.html'));
}

class Lvl_16 {
  constructor() {
                //Kolommen
                //0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26  27  28  29
    this.map = [[ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 0
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 1
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 2
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 3
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 4
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 5
                [ 0,  0,  0,  0,  0,  0,  0,  0, 20, 21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 6
                [ 0,  0,  0,  0,  0,  0,  0, 16, 17, 18, 19,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 7
                [ 0,  0,  0,  0,  0,  0,  0, 12, 13, 14, 15,  0,  0,  7,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 8
                [ 0,  0,  0,  0,  0,  0,  5,  5, 10, 11,  0,  5,  5,  6,  5,  0,  0,  5,  5,  6,  5,  0,  0,  0,  0,  0, 20, 21,  0,  0], //rij 9
                [ 0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  0,  1,  1,  1,  1,  0,  0,  0,  0, 16, 17, 18, 19,  0], //rij 10
                [ 0,  0,  0,  5,  5,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0, 12, 13, 14, 15,  0], //rij 11
                [ 0,  0,  0,  1,  1,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  5,  5,  6,  5,  5, 10, 11,  5,  0], //rij 12
                [ 0,  0,  0,  0,  0,  0,  5,  5,  5,  5,  5,  5,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0], //rij 13
                [ 0,  0,  0,  0,  0,  0,  1,  1,  1,  1,  1,  1,  0,  0,  0, 20, 21,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 14
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  5,  5, 16, 17, 18, 19,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 15
                [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1, 12, 13, 14, 15,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 16
                [ 0,  0,  0,  0,  0,  0,  0,  0,  5,  5,  5,  5,  5,  5,  5, 10, 11,  5,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //rij 17
                [ 5,  5,  5,  5,  5,  5,  5,  5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5], //rij 18
                [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1]];//rij 19


    this.score = 0;
    this.staticCoin = loadImage('https://live.staticflickr.com/65535/47993431406_ecc8aa7cb3_o.png');

    // Objecten in de game:
    this.ghosts = [];
    this.coins = [new Coin(12, 20), new Coin(9, 12), new Coin(13, 8), new Coin(15, 13), new Coin(9, 6)];
    this.finish = new Finish(12, 25, 16);
  }

  enemies() {
    for (let i = 0; i < this.ghosts.length; i++) {
      this.ghosts[i].show();
      this.ghosts[i].move();
      this.ghosts[i].update();
      health.collision(this.ghosts[i], 0);
    }
  }

  // Update de score en ook telens de frame waar de munt inzit (voor animatie doeleinden).
  updateScore() {
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].show();
      this.coins[i].move();
      this.coins[i].update(lvl_16);
    }
  }

  ui() {
    rectMode(CENTER);
    noStroke();
    fill(0,0,0 , 100)
    rect(480, 20, 400, 75, 0, 0, 15, 15);
    image(this.staticCoin, 340, 12);
    textSize(33);
    fill('#ffffff');
    textFont('Pixelar');
    text(this.score + "x", 380, 37);
    health.display();
  }

  goal() {
    this.finish.show();
    this.finish.collision();
  }
}

function link(url, winName, options) {
  winName && open(url, winName, options) || (location = url); // Link functie (overgenomen van de Processing library).
}
