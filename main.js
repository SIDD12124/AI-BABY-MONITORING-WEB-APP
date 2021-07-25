status = false;
object = [];
alarm = "";

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    song = loadSound("danger_warning.mp3");
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);
    
    if(status != false){
        r = random(255);
        g = random(255);
        b = random(255);
    objectDetector.detect(video, gotResult);
        for (var i = 0; i<object.length; i++) {
            
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Numbers of objects detected are : " + object.length;
              if(object[i].label == "knife" || object[i].label == "scissors"){
                song.play();
                song.setVolume(1);
                song.rate(1);
              }
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}