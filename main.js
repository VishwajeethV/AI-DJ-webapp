
song="";
leftwristX=0
leftwristY=0
rightwristX=0
rightwristY=0

function preload() {
 song=loadSound("music.mp3");   
}

function setup() {
    canvas=createCanvas(400,300);
    canvas.position(650,300);
    video = createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);
}

function modelLoaded() {
    console.log("posenet is initialized");
}

function draw() {
    image(video,0,0,400,300);
}

function gotPoses(results) {
 if(results.length>0) {
     console.log(results);
     leftwristX=results[0].pose.leftWrist.x;
     leftwristY=results[0].pose.leftWrist.y;
     rightwristX=results[0].pose.rightWrist.x;
     rightwristY=results[0].pose.rightWrist.y;

     console.log("left wrist X =" + leftwristX);
     console.log("left wrist Y =" + leftwristY);
     console.log("right wrist X=" + rightwristX);
     console.log("right wrist Y=" + rightwristY);
 }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}