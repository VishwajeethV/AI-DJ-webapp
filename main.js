
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
     rightwristscore=results[0].pose.keypoints[10].score;
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
    //left
    if(leftwristscore>0.2) {
    circle(leftwristX,leftwristY,20);
    numberleftwristY=Number(leftwristY);
    console.log(numberleftwristY);
    removedecimals=floor(numberleftwristY);
    console.log(removedecimals);
    volume=(removedecimals/300).toFixed(2);
    console.log(volume)
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume:" + volume;
    }
    //right
    if(rightwristscore>0.2) {
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0 && rightwristY<=60) {
        song.rate(0.5);
        document.getElementById("speed").innerHTML="Speed: 0.5";
    }
    else if(rightwristY>60 && rightwristY<=120) {
        song.rate(1);
        document.getElementById("speed").innerHTML="speed:1.0";
    }
    else if(rightwristY>120 && rightwristY<=180) {
        song.rate(1.5);
        document.getElementById("speed").innerHTML="speed:1.5";
    }
    else if(rightwristY>180 && rightwristY<=240) {
        song.rate(2);
        document.getElementById("speed").innerHTML="speed:2.0";
    }
    else if(rightwristY>240 && rightwristY<=300) {
        song.rate(2.5);
        document.getElementById("speed").innerHTML="speed:2.5";
    }
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