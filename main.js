status = "";
objects = [];
alarm = "";
function preload(){
    alarm = loadSound("alarm.wav");
}

function setup(){
    canvas = createCanvas(350, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(video, 0, 0, 350, 350);
    if (status != ""){
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            percentage = floor(objects[i].confidence * 100);
            fill("#f54842");
            text(objects[i].label + " " + percentage + " %", objects[i].x, objects[i].y);
            noFill();
            stroke("#f54842");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Status : Baby Detected";
                console.log("stop")
                alarm.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Status : Baby Not Detected";
                console.log("play");
                alarm.play();
                
            }
    }  
    
}
    
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        // console.log(results);
        objects = results;
    }
}
