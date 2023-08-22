// ゲームを描画する領域の取得。2Dモードに設定。
var canvas = document.getElementById('screen');
context = canvas.getContext('2d');
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
//今の位置を表す変数
//０がスタート画面、１がモード選択画面、２以降がゲーム画面を想定
var nowplaying = 0;
//ループ
function update(callback){
    context.fillStyle = 'silver'
context.fillRect(0, 0, 640, 480);
if(nowplaying==0){
    if(TitleEnter&&TitleLogo){//タイトル画面の表示
        context.drawImage(imgTitleLogo,0,0,400,342,150,100,500,500);
        context.drawImage(imgTitleEnter,0,0,450,342,160,300,300,300);
        console.log("test");
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
window.requestAnimationFrame(update);

}
window.requestAnimationFrame(update);