/* import InfrastructureFactory from "../infrastructures/factories/InfrastructureFactory.mjs";
import UsecaseFactory from "/usecases/factories/UsecaseFactory.mjs";

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
} */
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
var nootuSpeed = 3;
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
var nootuNumber = 0;
var nootuArray = new Array(nootuNumber).fill(true);
var nootuY = new Array(nootuNumber).fill(0);
var nootuKey = new Array(nootuNumber);
var judgement = new Array().fill(0);
var gameStart = false;
//今の位置を表す変数
//０がスタート画面、１がモード選択画面、２以降がゲーム画面を想定
var nowplaying = 0;
//ループ
function update(callback){
    context.fillStyle = 'silver'
context.fillRect(0, 0, 640, 480);
for(let q=0;q<=8;q++){
        if(PressedArray[q]&&!wasPressedArray[q]){
            PressedMomentArray[q]=true;
        }else{
            PressedMomentArray[q]=false;
        }
        wasPressedArray[q]=PressedArray[q];
    }
if(nowplaying==0){
    
    if(TitleEnter&&TitleLogo){//タイトル画面の表示
        context.drawImage(imgTitleLogo,0,0,400,342,150,100,500,500);
        context.drawImage(imgTitleEnter,0,0,450,342,160,300,300,300);
    }
    if(EnterPressed){
        nowplaying = 1;
    }
}
if(nowplaying==1){//曲選択画面
    if (Musicone&&Musictwo&&Musicthree&&gamemode==0){
        context.drawImage(imgMusicone,0,0,400,342,40,30,400,400);
        context.drawImage(imgMusictwo,0,0,400,342,40,160,400,400);
        context.drawImage(imgMusicthree,0,0,400,342,40,290,400,400);
    }
    if(onePressed&&gamemode==0){
        gamemode = 1;
    }else if(twoPressed&&gamemode==0){
        gamemode = 2;
    }else if(threePressed&&gamemode==0){
        gamemode = 3;
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
if(resetPressed){//スタートに戻る
    nowplaying = 0;
    gamemode = 0;
    interval = 50;
}
if(nowplaying>=2&&!gameStart){
    if(EnterPressed){
        gameStart = true;
        for (let index = 0; index < 100; index++) {
            nootuY[index] = 400-180*nootuSpeed;    
        }
    }
    /* var ctx = document.getElementById('canvas')
    
    context.fillStyle = 'brack';
    context.font = "50px serif";
    context.fillText("Speed",280,50);
    context.fill(); */
    //ここで文字を表示したい
    // テキストを表示するスタイルを設定
    context.fillStyle = "black";
    context.font = "50px Arial";
    context.fillText("Speed", 220, 100);
    context.fillText(nootuSpeed, 280, 200);
    if(PressedMomentArray[7]){
        nootuSpeed++;
    }
    if(PressedMomentArray[8]){
        nootuSpeed--;
    }
}
if(nowplaying == 2&&gameStart){
    context.strokeStyle = 'brack'
    context.beginPath();
    context.moveTo(270,0);
    context.lineTo(270,480);
    context.moveTo(370,0);
    context.lineTo(370,480);
    context.moveTo(170,0);
    context.lineTo(170,480);
    context.moveTo(470,0);
    context.lineTo(470,480);
    context.strokeRect(170, 400, 300, 40);
    context.stroke();
    context.fillStyle = "black";
    context.font = "30px Arial";
    context.fillText("曲名",10,50);
    context.fillText("Score",500,50);
    context.fillText("Conbo",500,300)    
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
    for (let w = 0; w < nootuArray.length; w++) {
        if(nootuArray[i]){
            context.beginPath();
            context.fillStyle = "red";
            context.fillRect(270, nootuY[i], 100, 40);  
            context.fill();
            nootuY+=nootuSpeed;
            if(nootuY[i]>500){
                nootuArray[i]=false;
            }
        }
    }
    if(nowplaying==5||PressedArray[0]){//リザルト画面、一旦zで出るようにする
        
        context.beginPath();
        context.fillStyle = "white"
        context.fillRect(0, 0, 640, 480);
        context.drawImage(imgResultLogo,10,10);
        context.drawImage(imgResultpicture,-70,200);
        context.fillStyle = "black"
        context.font = "30px Arial";
        context.fillText("just   "+judgement[5],400,50);
        context.fillText("great  "+judgement[4],380,100);
        context.fillText("good   "+judgement[3],360,150);
        context.fillText("but     "+judgement[2],340,200);
        context.fillText("miss    "+judgement[1],320,250);
        context.font = "50px Arial"
        context.fillText("score    "+score,400,400);
        context.fillText(musicUsecase.getTitle(),10,140);
 
    }
    
}
window.requestAnimationFrame(update);

}
window.requestAnimationFrame(update);