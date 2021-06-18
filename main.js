prediction_1="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90,
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
     Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'; 
    }); 
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2s13bKYk2/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model Loaded !!!!!!!")
}

function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function speak(){ 
    var synth = window.speechSynthesis;
    speak_data_1 = "The prediction is " + prediction_1; 
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function gotResult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label
        prediction_1=result[0].label
        speak();

        if(result[0].label=="thumbs up"){
            document.getElementById("emoji").innerHTML= "&#128077;";
        }
        if(result[0].label=="thumbs down"){
            document.getElementById("emoji").innerHTML= "&#128078;";
        }
        if(result[0].label=="amazing"){
            document.getElementById("emoji").innerHTML= "&#128076;";
        }
        if(result[0].label=="cool"){
            document.getElementById("emoji").innerHTML= "&#129304;";
        }
        if(result[0].label=="peace"){
            document.getElementById("emoji").innerHTML= "&#9996;";
        }
    }
}