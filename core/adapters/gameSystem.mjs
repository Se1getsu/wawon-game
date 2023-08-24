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
            return PressedArray[idx];
    }
}
function isMomentPressed(key) {
    let idx = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'ArrowUp', 'ArrowDown'].indexOf(key);
    return PressedMomentArray[idx];
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
        nowplaying = 2;
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
let keyList;
let chordList;
function initGame(musicIndex) {
    musicUsecase = musicListUsecase.getMusicUsecaseByIndex(musicIndex);
    chartUsecase = musicUsecase.getChartUsecase();
    gameUsecase = usecaseFactory.createGameUsecase();
    gameUsecase.setChartUsecase(chartUsecase);
    keyBidns = gameUsecase.getKeyBind();
    keyList = Object.keys(keyBidns);
    chordList = keyList.map(k => keyBidns[k]);
}

function drawGameView() {
    let res = gameUsecase.nextFrame([]);

    context.strokeStyle = 'brack'
    drawLane(Object.keys(keyBidns).length)
    context.fillStyle = "#777700";
    context.fillRect(0, 0, 640, 35);
    context.fillStyle = "#eeeeff";
    context.font = "30px Arial";
    context.fillText("曲名: " + musicUsecase.getTitle(),10,30);
    context.fillStyle = "black";
    context.fillText("Score",500,100);
    context.fillText("Combo",500,250);
}

let lane_topTime = 2.5;
let lane_bottomTime = -0.5;
const lane_center = 270;
const lane_width = 360;
const lane_topY = 0;
const lane_bottomY = 480;
const note_height = 0.05;

function getPos(numOfLane, lineIndex, yRatio) {
    return {
        x: lane_center + lane_width * (lineIndex/numOfLane - 1/2),
        y: lane_topY * yRatio + lane_bottomY * (1-yRatio)
    }
}

function getRatio(time) {
    return (time - lane_bottomTime)/(lane_topTime - lane_bottomTime)
}

function drawLane(numOfLane) {
    let sp, ep;
    
    context.beginPath();

    // ベースレーン
    for (let i = 0; i <= numOfLane; i++) {
        sp = getPos(numOfLane, i, 1);
        ep = getPos(numOfLane, i, 0);
        context.moveTo(sp.x, sp.y);
        context.lineTo(ep.x, ep.y);
    }
    // 判定ライン
    sp = getPos(numOfLane, 0,         getRatio(0));
    ep = getPos(numOfLane, numOfLane, getRatio(0));
    context.moveTo(sp.x, sp.y);
    context.lineTo(ep.x, ep.y);
    sp = getPos(numOfLane, 0,         getRatio(0)-note_height);
    ep = getPos(numOfLane, numOfLane, getRatio(0)-note_height);
    context.moveTo(sp.x, sp.y);
    context.lineTo(ep.x, ep.y);

    // キー
    context.fillStyle = "#555555";
    context.font = "28px Arial";
    keyList.forEach((key, i) => {
        sp = getPos(numOfLane, i+0.5, 0.01);
        context.fillText(key, sp.x-10, sp.y);
    });

    // 小節線を表示
    let bars = gameUsecase.getBarLineWithin(lane_bottomTime, lane_topTime);
    bars.forEach(({timing}) => {
        sp = getPos(numOfLane, 0,         getRatio(timing)-note_height/2);
        ep = getPos(numOfLane, numOfLane, getRatio(timing)-note_height/2);
        context.moveTo(sp.x, sp.y);
        context.lineTo(ep.x, ep.y);
    });
    context.stroke();

    // ノーツを表示
    let notes = gameUsecase.getNotesWithin(lane_bottomTime, lane_topTime);
    context.fillStyle = "#882288";
    notes.forEach(({timing, chord}) => {
        let index = chordList.indexOf(chord);
        sp = getPos(numOfLane, index,   getRatio(timing));
        ep = getPos(numOfLane, index+1, getRatio(timing)-note_height);
        let args = [sp.x, sp.y, ep.x-sp.x, ep.y-sp.y]
        context.fillRect(...args);
    });
    context.stroke();

    
    keyList.forEach((key, index) => {
        if (isMomentPressed(key)) {
            context.fillStyle = "rgba(255,255,0,0.5)";
        } else if(isPressed(key)) {
            context.fillStyle = "rgba(255,255,0,0.2)";
        } else {
            context.fillStyle = "rgba(255,255,0,0)";
        }
        //console.log(key, index, context.fillStyle);
        sp = getPos(numOfLane, index,   getRatio(0));
        ep = getPos(numOfLane, index+1, getRatio(0) - note_height);
        console.log()
        let args = [sp.x, sp.y, ep.x-sp.x, ep.y-sp.y]
        context.fillRect(...args);
        context.fill();
    })
}

let debugFlg = true;
function update(callback){
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ループ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
if (debugFlg) { nowplaying=2; gameStart=true; initGame(0); debugFlg = false; }

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