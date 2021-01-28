
song="";
leftwristX=0
leftwristY=0
rightwristX=0
rightwristY=0
rightwristscore=0
leftwristscore=0

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


function gotPoses(results) {
 if(results.length>0) {
     console.log(results);
     leftwristscore=results[0].pose.keypoints[9].score;
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

function draw() {
    image(video,0,0,400,300);

    fill("red");
    stroke("black");
    if(leftwristscore>0.2) {
    circle(leftwristX,leftwristY,20);
    numberleftwristY=Number(leftwristY);
    removedecimals=floor(numberleftwristY);
    volume=removedecimals/300;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume:" + volume;
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