let xBolinha = 100;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;


//Variaveis do caraio da raquete
let xRaquete = 1;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 80;
let raqueteBorda = 15;

let colidiu = false;

let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Raquete das inimigas 
let xRaqueteOponente = 590;
let yRaqueteOponente = 150;
let velocidadeYOponente;


//Finalmente jesus amado, os pontos
let meusPontos = 0;
let pontosDoOponente = 0;


//Ouçar musga
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada = loadSound("raquetada.mp3")
}

function setup(){
  createCanvas(600, 400)
  trilha.loop();

}
function draw (){
  background(0)
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha, yBolinha, diametro)
}
function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
  velocidadeXBolinha *= -1;
}
  if(yBolinha + raio > height || yBolinha - raio < 0){
  velocidadeYBolinha *= -1;
}
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura, raqueteBorda);
}

function movimentaMinhaRaquete(){
  if(keyIsDown (UP_ARROW)){
    yRaquete -= 10;
  }

  if(keyIsDown (DOWN_ARROW)){
    yRaquete += 10;
  }
}
function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}



function movimentaRaqueteOponente() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 83;
  yRaqueteOponente += velocidadeYOponente;
}


function incluiPlacar(){
    stroke(255)
    textAlign(CENTER);
    textSize(16);
    fill(color((0,0,0)));
    rect(150, 20, 50, 30, 8);
    fill(255);
    text(meusPontos, 174, 28, 2);
    fill(color((0,0,0)));
    rect(400, 20, 50, 30, 8);
    fill(255);
    text(pontosDoOponente, 425, 28, 2);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
   if(xBolinha < 13){
    pontosDoOponente += 1;
     ponto.play();
  }
  
}