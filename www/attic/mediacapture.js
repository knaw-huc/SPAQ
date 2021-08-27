console.log('hèh, hèh');


const constraints = {
    audio: true,
    video: false
}


// console.log(errorElement);

const errorElement = document.querySelector("#errorMsg");
const feedbackElement = document.querySelector("#feedback");

function feedBack(message) {
    feedbackElement.innerHTML = message;
    // feedbackElement.innerHTML += message;

}

if (navigator.mediaDevices) {
    // feature detection instead of browser detection 
    init();
    // startMediaCapture();
    
    function init(){

        const button = document.getElementById("mediacapture");
        button.innerHTML ="Start MediaCapture";
        button.addEventListener("click", startMediaCapture);
        button.removeEventListener("click", stopMediaCapture);

    }



    function errorMsg(err) {
        // const errorElement = document.getElementById("errorMsg");
        if (err.name === 'NotAllowedError') {
            errorElement.innerHTML += '<p>' + "Computer says no.<br> NO ACCESS to microphone" + '</p>';

        } else {
            errorElement.innerHTML += '<p>' + "An error occured" + '</p>';

        }

        // if (typeof error !== 'undefined') {
        //   console.error(error);
        // }
    }

  
    function stopMediaCapture(){
        console.log('stoppen met die zooi');
        navigator.mediaDevices.stopMediaCapture; // property 
        feedBack("Stopped mediacapture");
        const button = document.getElementById("mediacapture");
        button.innerHTML = 'start MediaCapture';
        button.addEventListener("click", startMediaCapture);
        button.removeEventListener("click", stopMediaCapture);

    }

    function startMediaCapture(){
        // console.log('starten met die zooi');
        // navigator.mediaDevices.getUserMedia(constraints); // method but still you have to give permission
        // feedBack("Started with listening by Mike"); // 

        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            /* use the stream */
            console.log('access granted')
            feedBack('Access to microphone granted');
            var mediaRecorder = new MediaRecorder(stream);

            const button = document.getElementById("mediacapture");
            button.innerHTML ="Stop MediaCapture";
            button.addEventListener("click", stopMediaCapture);
            button.removeEventListener("click", startMediaCapture);

        })
        .catch(function (err) {
            /* handle the error */
            console.log(err);
            errorMsg(err);
        });

    }

  


} else {
    feedBack("No support for mediaDevices update you're browser, dinosaur!");

}