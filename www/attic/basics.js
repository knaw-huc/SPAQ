// console.log('hoi')

// long running function
function waitThreeSeconds() {
    let ms = 3000 + new Date().getTime();
    while (new Date() < ms){}
    console.log('finished function');
}


function waitSeconds(seconds) {
    let ms = seconds + new Date().getTime();
    while (new Date() < ms){}
    console.log('finished seconds function after ' + seconds + ' seconds');
}

function waitMaart(seconds, callback) {
    callback(seconds);
}
    




// async function waitM() {
//     let ms = 4000 + new Date().getTime();
//     while (new Date() < ms){}
//     let message = 'finished waitM'
//     return message;

// }

// let beloofMelding = new Promise(
//     function (resolve, reject) {
//         let ms = 4000 + new Date().getTime();
//         while (new Date() < ms){}
//         resolve(console.log("ready with promise"));

//     }

// );



const message = function() {  
    console.log("This message is shown after 3 seconds");
}

function groet() {
    console.log('Hey!');
}

function clickHandler() {
    console.log('click event!');   
}


waitMaart(100, waitSeconds);

// listen for the click event
document.addEventListener('click', clickHandler);
 
setTimeout(message, 50);
setTimeout(groet, 2000);
// setTimeout(waitThreeSeconds,100); // blocked

// console.log(waitM());

// waitM().then(console.log);
// beloofMelding;

// waitThreeSeconds();
console.log('finished execution');