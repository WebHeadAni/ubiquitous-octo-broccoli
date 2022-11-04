video = "";
Objects = [];
Status = "";
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if (Status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i< Objects.length; i++){
            document.getElementById("status").innerHTML = " Status: Objects Detected ";
            document.getElementById("numberOfObjects").innerHTML = " Number of Objects detected are:" + Objects.length;
            fill("cyan");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "% ", Objects[i].x + 15, Objects[i].y + 15);
            noFill();
            stroke("cyan");
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height); 
        }
    }
}
function gotResults(error, results){
 if(error){
    console.log(error);
 }
 console.log(results);
 Objects = results;
}
function Start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
