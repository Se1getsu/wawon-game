import InfrastructureFactory from "../infrastructures/factories/InfrastructureFactory.mjs";
import UsecaseFactory from "../usecases/factories/UsecaseFactory.mjs";

// ファクトリークラスのインスタンスを生成
const infraFactory = new InfrastructureFactory();
const usecaseFactory = new UsecaseFactory();

// 曲リストを読み込む
const jsonReader = infraFactory.createLocalJsonReader();
let json = await jsonReader.load("resources/musiclist.json");
let musicListUsecase = usecaseFactory.createMusicListUsecase(json.length);
musicListUsecase.setMusicListByJson(json);

// 各曲の譜面を読み込む
for (let i = 0; i < musicListUsecase.getLength(); i++) {
    let musicUsecase = musicListUsecase.getMusicUsecaseByIndex(i);
    let chartFilePath = musicUsecase.getChartFile();
    json = await jsonReader.load(chartFilePath);
    musicUsecase.setChartByJson(json);
}

let gameUsecase;
let musicUsecase;
let chartUsecase;


// ゲームを描画する領域の取得。2Dモードに設定。
var canvas = document.getElementById('screen');
var context = canvas.getContext('2d');
// 画面の色(最初)
context.fillStyle = 'green'
context.fillRect(0, 0, 640, 480);
//ボタンがをされているかの変数
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var EnterPressed = false;
var onePressed = false;
var twoPressed = false;
var threePressed = false;
var resetPressed = false;
var PressedArray = new Array().fill(false);
var wasPressedArray = new Array().fill(false);
var PressedMomentArray = new Array().fill(false);
var notesSpeed = 3;
function keyUpHandler(e){
    if(e.key === "Enter"){
        EnterPressed = false;
    }
    if(e.key === "1"){
        onePressed = false;
    }else if(e.key === "2"){
        twoPressed = false;
    }else if(e.key === "3"){
        threePressed = false;
    }
    if(e.key ==="0"){
        resetPressed = false;
    }
    if(e.key ==="z"){
        PressedArray[0] = false;
    }
    if(e.key ==="x"){
        PressedArray[1] = false;
    }
    if(e.key ==="c"){
        PressedArray[2] = false;
    }
    if(e.key ==="v"){
        PressedArray[3] = false;
    }
    if(e.key ==="b"){
        PressedArray[4] = false;
    }
    if(e.key ==="n"){
        PressedArray[5] = false;
    }
    if(e.key ==="m"){
        PressedArray[6] = false;
    }
    if(e.key ==="ArrowUp"){
        PressedArray[7] = false;
    }
    if(e.key ==="ArrowDown"){
        PressedArray[8] = false;
    }
}
function keyDownHandler(e){
    if(e.key === "Enter"){
        EnterPressed = true;
    }
    if(e.key === "1"){
        onePressed = true;
    }else if(e.key === "2"){
        twoPressed = true;
    }else if(e.key === "3"){
        threePressed = true;
    }
    if(e.key ==="0"){
        resetPressed = true;
    }
    if(e.key ==="z"){
        PressedArray[0] = true;
    }
    if(e.key ==="x"){
        PressedArray[1] = true;
    }
    if(e.key ==="c"){
        PressedArray[2] = true;
    }
    if(e.key ==="v"){
        PressedArray[3] = true;
    }
    if(e.key ==="b"){
        PressedArray[4] = true;
    }
    if(e.key ==="n"){
        PressedArray[5] = true;
    }
    if(e.key ==="m"){
        PressedArray[6] = true;
    }
    if(e.key ==="ArrowUp"){
        PressedArray[7] = true;
    }
    if(e.key ==="ArrowDown"){
        PressedArray[8] = true;
    }
}
function isPressed(key) {
    switch (key) {
        case 'Enter':
            return EnterPressed;
        case '0':
            return resetPressed;
        case '1':
            return onePressed;
        case '2':
            return twoPressed;
        case '3':
            return threePressed;
        default:
            let idx = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ArrowUp', 'ArrowDown'].indexOf(key);
            return PressedMomentArray[idx];
    }
}
//画像の変数
//タイトル
var imgTitleLogo = new Image();
imgTitleLogo.src = './resources/img/titleLogo.png';
var TitleLogo = false;
var imgTitleEnter = new Image();
imgTitleEnter.src = './resources/img/titleEnter.png';
var TitleEnter = false;
imgTitleLogo.onload = function(){
    TitleLogo = true;
}
imgTitleEnter.onload = function(){
    TitleEnter = true;
}
//曲選択画面
var imgMusicone = new Image();
var imgMusictwo = new Image();
var imgMusicthree = new Image();
imgMusicone.src = './resources/img/music1.png';
imgMusictwo.src = './resources/img/music2.png';
imgMusicthree.src = './resources/img/music3.png';
var Musicone = false;
var Musictwo = false;
var Musicthree = false;
imgMusicone.onload = function(){
    Musicone = true;
}
imgMusictwo.onload = function(){
    Musictwo = true;
}
imgMusicthree.onload = function(){
    Musicthree = true;
}
var interval = 50;
var gamemode = 0;
//ゲーム画面内の変数
var score = 0;
var musicNumber = 3;
var hiScore = new Array(musicNumber).fill(0);
var keyCounter = new Array(musicNumber)
keyCounter[1]=3;
var notesNumber = 0;
var notesArray = new Array(notesNumber).fill(true);
var notesY = new Array(notesNumber).fill(0);
var notesKey = new Array(notesNumber);
var gameStart = false;
//今の位置を表す変数
//０がスタート画面、１がモード選択画面、２以降がゲーム画面を想定
var nowplaying = 0;


// 【タイトル画面】
function drawTitleView() {
    if(TitleEnter&&TitleLogo){
        context.drawImage(imgTitleLogo,0,0,400,342,150,100,500,500);
        context.drawImage(imgTitleEnter,0,0,450,342,160,300,300,300);
    }
}


// 【曲選択画面】
function drawSelectMusicView() {
    if (Musicone&&Musictwo&&Musicthree&&gamemode==0){
        context.drawImage(imgMusicone,0,0,400,342,40,30,400,400);
        context.drawImage(imgMusictwo,0,0,400,342,40,160,400,400);
        context.drawImage(imgMusicthree,0,0,400,342,40,290,400,400);
    }
    if(gamemode ==1&&interval >0){
        context.drawImage(imgMusicone,0,0,400,342,40,30,400,400);
        interval--;
    }else if(gamemode==2&&interval >0){
        context.drawImage(imgMusictwo,0,0,400,342,40,160,400,400);
        interval--;
    }else if(gamemode==3&&interval >0){
        context.drawImage(imgMusicthree,0,0,400,342,40,290,400,400);
        interval--;
    }
    if(interval<=0){
        nowplaying = gamemode+1;
    }
}


// 【速さ設定画面】
function drawSetSpeedView() {
    context.fillStyle = "black";
    context.font = "50px Arial";
    context.fillText("速さを設定", 180, 100);
    context.fillText(notesSpeed, 280, 200);
    context.stroke();
    context.font = "36px Arial";
    context.fillText("↑ 速く  ↓ 遅く", 200, 300);
    context.fillText("Enter 演奏開始", 190, 360);
    context.stroke();
}

// 【ゲーム画面】
let keyBidns;
function initGame(musicIndex) {
    musicUsecase = musicListUsecase.getMusicUsecaseByIndex(musicIndex);
    chartUsecase = musicUsecase.getChartUsecase();
    gameUsecase = usecaseFactory.createGameUsecase();
    gameUsecase.setChartUsecase(chartUsecase);
    keyBidns = gameUsecase.getKeyBind();
}

function drawGameView() {
    context.strokeStyle = 'brack'
    drawLane(Object.keys(keyBidns).length)
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText("曲名",10,50);
    context.fillText("Score",500,50);
    context.fillText("Combo",500,300);
    for(let i=3;i<=5;i++){
        if(PressedMomentArray[i]){
            context.fillStyle = "rgba(255,255,0,0.4)";
            context.fillRect(i*100-130,400,100,40);
            context.fill();
            console.log(i);
        }else if(PressedArray[i]){
            context.fillStyle = "rgba(255,255,0,0.1)";
            context.fillRect(i*100-130,400,100,40);
            context.fill();
        }
    }
    for (let w = 0; w < notesArray.length; w++) {
        if(notesArray[i]){
            context.beginPath();
            context.fillStyle = "red";
            context.fillRect(270, notesY[i], 100, 40);  
            context.fill();
            notesY+=notesSpeed;
            notesArray[i] = notesY[i] > 500;
        }
    }
}

function drawLane(numOfLane) {
    numOfLane = 5
    let l = 120, r = 470;
    context.beginPath();
    context.moveTo(l,0);
    context.lineTo(l,480);
    for (let i = 1; i <= numOfLane; i++) {
        let x = l + (r-l)*(i/numOfLane);
        context.moveTo(x,0);
        context.lineTo(x,480);
    }
    context.strokeRect(l, 390, r-l, 30);
    context.stroke();
}


function update(callback){
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ループ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
context.fillStyle = 'silver'
context.fillRect(0, 0, 640, 480);
for(let q=0;q<=8;q++){
    PressedMomentArray[q] = PressedArray[q] && !wasPressedArray[q];
    wasPressedArray[q]=PressedArray[q];
}

if(nowplaying==0){
    drawTitleView();
    if (EnterPressed) nowplaying = 1;
}

if(nowplaying==1){
    if(onePressed&&gamemode==0){
        gamemode = 1; initGame(0);
    }else if(twoPressed&&gamemode==0){
        gamemode = 2; initGame(1);
    }else if(threePressed&&gamemode==0){
        gamemode = 3; initGame(2);
    }
    drawSelectMusicView();
}

if(resetPressed){ //スタートに戻る
    nowplaying = 0;
    gamemode = 0;
    interval = 50;
}

if(nowplaying>=2&&!gameStart){
    if(EnterPressed){
        gameStart = true;
        for (let index = 0; index < 100; index++) {
            notesY[index] = 400-180*notesSpeed;    
        }
    }
    drawSetSpeedView();
    if(PressedMomentArray[7]){
        notesSpeed = Math.min(10, notesSpeed+1);
    }
    if(PressedMomentArray[8]){
        notesSpeed = Math.max(1, notesSpeed-1);
    }
}

if(nowplaying == 2&&gameStart){
    drawGameView();
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ループ終了 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);