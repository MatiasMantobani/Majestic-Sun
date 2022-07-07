
let boat = {
  x1: 0,
  sp: 0,
}

let estrellas = [];

let sliders = []
let angle = 0

let fuego

function setup() {
  createCanvas(400, 400);
  print("Click barquito o luna ;)");
  luna = loadImage("luna.png");

  for (let i = 0; i < 100; i++) {
    estrellas[i] = new ESTRELLAS();
  }

  //sliders aguita isla
  for (let i = 0; i < 10; i++) {
    sliders[i] = createSlider(0, 100, 50)
    sliders[i].class("sliders")
    sliders[i].position(200 + i * 15, 343)
  }

  fuego = new FUEGO()
}

function draw() {
  noStroke();

  //sliders aguita isla
  angle += 0.012
  let offset = 0
  for (let i = 0; i < sliders.length; i++) {
    let x = map(sin(angle + offset), -1, 1, 0, 100);
    sliders[i].value(x);
    offset += 0.1
  }

  //todo el if(){}else{} es para noche-dia

  //                 DIA DIA DIA DIA
  if (dia) {

    let R = 0
    let G = 15
    let B = 148
    let offset = 0
    for (let i = 0; i < width / 2; i++) {
      fill(R, G, B)
      rect(0, 0 + offset, width, 1)
      offset += 1
      R += 1.5
      G += 0.1
      B += -0.7
    }

    fill(255, 106, 0, 230); //color sol
    ellipse(100, 75, 75); // forma sol

    // MOVIMIENTO BARQUITO
    noStroke()
    fill("saddlebrown"); //color mastil barquito
    rect(boat.x1 + 100, 165, 2, 25); //mastil barquito

    fill("saddlebrown"); //color casco
    triangle(boat.x1 + 100, 220, boat.x1 + 70, 190, boat.x1 + 130, 190); // barquito casco

    boat.x1 = boat.x1 + boat.sp

    // BARQUITO VUELTA BANDERITA
    if (boat.sp < 0) {
      fill(255); // color banderita
      triangle(boat.x1 + 102, 165, boat.x1 + 102, 180, boat.x1 + 120, 170);
    } else {

      // BARQUITO IDA BANDERITA 
      fill(255); // color banderita
      triangle(boat.x1 + 100, 165, boat.x1 + 100, 180, boat.x1 + 80, 170); // banderita
    }

    if (boat.x1 > width || boat.x1 < -160) {
      boat.sp = -boat.sp;
    }

    fill(9, 35, 181); // abajo color
    rect(0, 200, 400, 200); // abajo rectangulo

    fill(125, 42, 0); //color palmera
    rect(290, 150, 20, 180, 20); // tronco palmera

    fill(214, 200, 39); // color isla
    arc(300, 350, 180, 80, PI, 0, CHORD); //isla

    fill(15, 125, 0);

    triangle(300, 150, 280, 240, 280, 200); // hoja izquierda medio
    triangle(300, 150, 240, 240, 240, 200); //hoja izquierda
    triangle(300, 150, 320, 240, 320, 200); // hoja derecha medio
    triangle(300, 150, 360, 240, 360, 200); // hoja derecha


    fill(237, 242, 241, 150);
    stroke(255); // sin stroke no hay nada
    strokeWeight(0);
    curve(400, 100, 300, 130, 100, 130, 0, 400); //nube

  } else {

    //          NOCHE NOCHE NOCHE NOCHE
    fill(27, 27, 28); // arriba color
    rect(0, 0, 400, 200); // arriba rectangulo


    for (let i = 0; i < estrellas.length; i++) {
      estrellas[i].show();
    }

    noStroke();

    imageMode(CENTER);
    image(luna, 100, 75);

    fill(255); //color mastil barquito
    rect(100, 165, 2, 25); //mastil barquito

    fill(255, 48, 48);
    triangle(100, 165, 100, 180, 80, 170); // banderita

    fill(168, 42, 42); //color casco
    triangle(100, 220, 70, 190, 130, 190); // barquito casco

    fill(19, 15, 112); // abajo color
    rect(0, 200, 400, 200); // abajo rectangulo

    fill(125, 42, 0); //color palmera
    rect(290, 150, 20, 180, 20); // tronco palmera

    fill(214, 200, 39); // color isla
    arc(300, 350, 180, 80, PI, 0, CHORD); //isla

    fill(15, 125, 0);
    triangle(300, 150, 280, 240, 280, 200); // hoja izquierda medio
    triangle(300, 150, 240, 240, 240, 200); //hoja izquierda
    triangle(300, 150, 320, 240, 320, 200); // hoja derecha medio
    triangle(300, 150, 360, 240, 360, 200); // hoja derecha

    fuego.show()
    fuego.move()
  }
}

//boton noche-dia
var dia = true;

function mousePressed() {
  let d = dist(mouseX, mouseY, 100, 75)
  if (d < 75 / 2) {
    dia = !dia;
  }

  //VER COMO HACER QUE SIGA PARA EL LADO QUE VA CUANDO VUELVE
  let d1 = dist(mouseX, mouseY, 100, 200)
  if (d1 - boat.x1 < 20 && d1 - boat.x1 > 0 && boat.sp == 0) {
    boat.sp = 0.5;
  }
}

class ESTRELLAS {
  constructor() {
    this.x = random(width);
    this.y = random(height / 2);
  }

  show() {
    stroke(255, 200);
    strokeWeight(2);
    point(this.x, this.y);
  }
}

class FUEGO {
  constructor() {
    this.x = 0
    this.y = 0
    this.history = []
  }

  show() {
    noStroke()
    //fuego
    fill(255, 255, 0, 50)
    ellipse(this.x, this.y, 15)

    //lamas
    for (let i = 0; i < this.history.length; i++) {
      let pos = this.history[i]
      fill(255, 255 - random(254), 0, 150) //color 
      ellipse(pos.x, pos.y, i / 3)
    }
  }
  move() {
    //movimiento fuego
    this.x += random(-3, 3)
    this.y += random(-3, 3)
    this.x = constrain(this.x, 248, 250)
    this.y = constrain(this.y, 313, 315)

    //crear vector posicion en history
    let v = createVector(this.x, this.y)
    this.history.push(v)

    //splice array history fuego
    if (this.history.length > 50) {
      this.history.splice(0, 1)
    }

    //movimiento llamas
    for (let i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-3.5, 2)
      this.history[i].y += random(-4, 2)
    }
  }
}