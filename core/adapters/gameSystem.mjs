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

// 音楽のファイルを読み込む
const audios = []
const audioOffsets = []
for (let i = 0; i < musicListUsecase.getLength(); i++) {
    musicUsecase = musicListUsecase.getMusicUsecaseByIndex(i);
    let path = musicUsecase.getAudioFile();
    audios.push(new Audio(path));
    audioOffsets.push(musicUsecase.getOffset());
}
// 音楽のファイルを読み込む
const chordSEs = {
    Am: new Audio("resources/audios/chords/chord_Am.mp3"),
    C: new Audio("resources/audios/chords/chord_C.mp3"),
    D7: new Audio("resources/audios/chords/chord_D7.mp3"),
    Dm: new Audio("resources/audios/chords/chord_Dm.mp3"),
    F: new Audio("resources/audios/chords/chord_F.mp3"),
    G7: new Audio("resources/audios/chords/chord_G7.mp3")
};

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
let notesSpeed = 3;
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
var imgpresss = new Image();
imgMusicone.src = './resources/img/music1.png';
imgMusictwo.src = './resources/img/music2.png';
imgMusicthree.src = './resources/img/music3.png';
imgpresss.src = './resources/img/musicpress.png';
var Musicone = false;
var Musictwo = false;
var Musicthree = false;
var presss = false;
imgMusicone.onload = function(){
    Musicone = true;
}
imgMusictwo.onload = function(){
    Musictwo = true;
}
imgMusicthree.onload = function(){
    Musicthree = true;
}
imgpresss.onload = function(){
    presss = true;
}

var interval = 50;
var gamemode = 0;
//リザルト画面
var resultLogo = false;
var resultPicture = false;
var imgResultLogo = new Image();
var imgResultpicture = new Image();
imgResultLogo.src = './resources/img/resultLogo.png'
imgResultpicture.src = './resources/img/resultPicture.png'
imgResultLogo.onload = function () {
    resultLogo = true;
}
imgResultpicture.onload = function(){
    resultPicture = true;
}

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
        context.drawImage(imgTitleLogo,0,0,400,342,120,120,500,500);
        context.drawImage(imgTitleEnter,0,0,450,342,180,300,300,300);
    }
}


// 【曲選択画面】
function drawSelectMusicView() {
    if (Musicone&&Musictwo&&Musicthree&&gamemode==0){
        
        context.drawImage(imgMusicone,0,0,400,342,40,100,400,400);
        context.drawImage(imgMusictwo,0,0,400,342,40,220,400,400);
        context.drawImage(imgMusicthree,0,0,400,342,40,340,400,400);
        context.drawImage(imgpresss,20,10);
        context.fillStyle = "black";
        context.font = "26px Arial";
        context.fillText(musicListUsecase.getMusicUsecaseByIndex(0).getTitle(),310,180);
        context.fillText(musicListUsecase.getMusicUsecaseByIndex(1).getTitle(),310,300);
        context.fillText(musicListUsecase.getMusicUsecaseByIndex(2).getTitle(),310,420);
    }
    if(gamemode ==1&&interval >0){
        context.drawImage(imgMusicone,0,0,400,342,40,100,400,400);
        interval--;
    }else if(gamemode==2&&interval >0){
        context.drawImage(imgMusictwo,0,0,400,342,40,220,400,400);
        interval--;
    }else if(gamemode==3&&interval >0){
        context.drawImage(imgMusicthree,0,0,400,342,40,340,400,400);
        interval--;
    }
}


// 【速さ設定画面】
function drawSetSpeedView() {
    context.beginPath();
    context.fillStyle = 'silver';
    context.fillRect(0, 0, 640, 480);
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
let bgmStartInterval;
let finishInterval;
let lane_topTime = 2.5;
let lane_bottomTime = -0.5;
function initGame(musicIndex) {
    musicUsecase = musicListUsecase.getMusicUsecaseByIndex(musicIndex);
    chartUsecase = musicUsecase.getChartUsecase();
    gameUsecase = usecaseFactory.createGameUsecase();
    gameUsecase.setChartUsecase(chartUsecase);

    gameUsecase.setFps(120); // Chromeは 120FPS だった

    bgmStartInterval = gameUsecase.getFps() * 5;
    gameUsecase.setCurrentFrame(-bgmStartInterval);
    keyBidns = gameUsecase.getKeyBind();
    keyList = Object.keys(keyBidns);
    chordList = keyList.map(k => keyBidns[k]);
    bgmStartInterval++;
    bgmStartInterval += audioOffsets[musicIndex];
    finishInterval = 0;

    lane_topTime = 7.5 / notesSpeed;
    lane_bottomTime = -1.5 / notesSpeed;
}

let judgeAnimationText;
let judgeAnimationCount = 0;
function drawGameView() {
    let pressedChords = []
    keyList.forEach(key => {
        if (isMomentPressed(key)) pressedChords.push(keyBidns[key]);
    })
    let {finished, judges, passed} = gameUsecase.nextFrame(pressedChords);

    if (finishInterval > 0) {
        finishInterval--;
        if (finishInterval == 1) {
            nowplaying = 3;
            gameStart = false;
        }

    } else if (finished) {
        finishInterval = 120

    } else if (judges.length && judges[0] != "none") {
        judgeAnimationCount = 30;
        judgeAnimationText = judges[0];

    } else if (passed) {
        judgeAnimationCount = 30;
        judgeAnimationText = "miss";
    } else if (judgeAnimationCount > 0) {
        let y = 360
        if (judgeAnimationCount > 25) y += (judgeAnimationCount - 25) * 1.5

        switch (judgeAnimationText) {
            case "just":
                context.fillStyle = "#dd0000";
                context.font = "26px fantasy";
                context.fillText("Just", lane_center-26, y);
                break;
            case "great":
                context.fillStyle = "#e000e0";
                context.font = "26px fantasy";
                context.fillText("Great", lane_center-32, y);
                break;
            case "good":
                context.fillStyle = "#006000";
                context.font = "26px fantasy";
                context.fillText("Good", lane_center-38, y);
                break;
            case "bad":
                context.fillStyle = "#000080";
                context.font = "26px fantasy";
                context.fillText("Bad", lane_center-26, y);
                break;
            case "miss":
                context.fillStyle = "#555555";
                context.font = "26px fantasy";
                context.fillText("Miss", lane_center-26, y);
                break;
        }
        judgeAnimationCount--;

    }

    if (bgmStartInterval > 0) {
        bgmStartInterval--;
        if (bgmStartInterval == 0) startBgm();
    }

    if (pressedChords.length) {
        playSE(pressedChords[0]);
    }

    drawLane(Object.keys(keyBidns).length)

    context.beginPath();
    context.fillStyle = "#777700";
    context.fillRect(0, 0, 640, 35);
    context.fillStyle = "#eeeeff";
    context.font = "30px Arial";
    context.fillText("曲名: " + musicUsecase.getTitle(),10,30);

    let score = gameUsecase.getCurrentScore();
    let combo = gameUsecase.getCombo();

    context.fillStyle = "black";
    context.fillText("Score", 500, 100);
    context.font = "30px monospace"
    context.textAlign = "right"
    context.fillText(score,   590, 150);
    context.font = "30px Arial";
    context.textAlign = "left"
    context.fillText("Combo", 500, 250);
    context.font = "42px monospace"
    context.textAlign = "center"
    context.fillText(combo ? combo : "",   545, 305);
    context.textAlign = "left"
    context.stroke();
}

function startBgm() {
    console.log("BGM "+(gamemode-1))
    audios[gamemode-1].currentTime = 0;
    audios[gamemode-1].play();
}

function playSE(chord) {
    console.log("SE "+chord)
    chordSEs[chord].currentTime = 0;
    chordSEs[chord].play();
}

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
    
    context.strokeStyle = '#666600'
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
    context.beginPath();

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

// 【結果画面】
function drawResultView() {
    context.beginPath();
    context.fillStyle = "white"
    context.fillRect(0, 0, 640, 480);

    context.drawImage(imgResultLogo,10,10);
    context.drawImage(imgResultpicture,-70,200);

    let judges = gameUsecase.getJudges();

    let x = 400;
    context.font = "26px Arial";
    context.textAlign = "right"
    context.fillStyle = "#dd0000";
    context.fillText("Just", x, 200);

    context.textAlign = "right"
    context.fillStyle = "#e000e0";
    context.fillText("Great", x, 240);

    context.textAlign = "right"
    context.fillStyle = "#006000";
    context.fillText("Good", x, 280);
    
    context.textAlign = "right"
    context.fillStyle = "#000080";
    context.fillText("Bad", x, 320);

    context.textAlign = "right"
    context.fillStyle = "#555555";
    context.fillText("Miss", x, 360);

    x = 460;
    context.fillStyle = "black";
    context.font = "26px monospace"
    context.fillText(judges.just, x+20, 200);
    context.font = "26px monospace"
    context.fillText(judges.great, x+20, 240);
    context.font = "26px monospace"
    context.fillText(judges.good, x+20, 280);
    context.font = "26px monospace"
    context.fillText(judges.bad, x+20, 320);
    context.font = "26px monospace"
    context.fillText(judges.miss, x+20, 360);


    context.font = "42px Arial";
    context.textAlign = "left";
    context.fillText("score  "+ gameUsecase.getCurrentScore(),330,430);
    context.fillText(musicUsecase.getTitle(),20,140);

    context.font = "24px serif";
    context.fillStyle = "#aaaaaa";
    context.fillText("- Press 0 -",505,35);
}



let debugFlg = false;
function update(callback){
//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ループ ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
if (debugFlg) { nowplaying=3; gamemode=1; gameStart=true; initGame(0); debugFlg = false; }

context.fillStyle = 'silver'
context.fillRect(0, 0, 640, 480);
for(let q=0;q<=8;q++){
    PressedMomentArray[q] = PressedArray[q] && !wasPressedArray[q];
    wasPressedArray[q]=PressedArray[q];
}

if(nowplaying==0){
    drawTitleView();
    if (EnterPressed) {
        nowplaying = 1;
        interval = 50;
    }
}

if(nowplaying==1){
    if(onePressed&&gamemode==0){
        gamemode = 1; 
    }else if(twoPressed&&gamemode==0){
        gamemode = 2;
    }else if(threePressed&&gamemode==0){
        gamemode = 3;
    }
    drawSelectMusicView();
    if(interval<=0){
        nowplaying = 2;
    }
}

if(resetPressed){ //スタートに戻る
    nowplaying = 0;
    gamemode = 0;
    interval = 50;
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    gameStart = false;
}

if(nowplaying==2&&!gameStart){
    if(EnterPressed){
        gameStart = true;
        initGame(gamemode-1);
    }
    drawSetSpeedView();
    if(PressedMomentArray[7]){
        notesSpeed = Math.min(20, notesSpeed+1);
    }
    if(PressedMomentArray[8]){
        notesSpeed = Math.max(1, notesSpeed-1);
    }
}

if(nowplaying == 2&&gameStart){
    drawGameView();

}else if(nowplaying==3){
    drawResultView();
}

//＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝ ループ終了 ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);