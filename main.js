song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song_play = "";

function preload() {
    song1 = loadSound("music2.mp3");
    song2 = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(480, 360);
    canvas.position(400, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 480, 360);

    song_play = song1.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    }

    if(song_play == false) {
        song1.play();
        document.getElementById("song_name").innerHTML = "Song Name : Peter Pan Theme Song"
    }  
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY)
    }
}

    