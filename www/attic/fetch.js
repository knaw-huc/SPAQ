//basic fetch
//using jsonplaceholder for the data
//Remember that fetch returns a promise
//HTTP status codes - http://www.restapitutorial.com/httpstatuscodes.html
//to test with NODE we need to install the node-fetch package
//  npm install node-fetch
//let fetch = require('node-fetch');


//get the details for a random user
// const root = 'http://jsonplaceholder.typicode.com';
// let root = 'http://swapi.dev/api';
// let id = Math.floor(Math.random() * 10) + 2;  //id 1 to 11 11 does not exist
// let uri = root + '/people/' + id;

// console.log('FETCH: ', uri);
// //any user id higher than 10 will generate a 404 error

// fetch(uri)
//     .then(function (response) {
//         if (response.status == 200) {
//             return response.json();
//         } else {
//             throw new Error('Invalid user ID');
//         }
//     })
//     .then((data) => {
//         let jsonData = JSON.stringify(data);
//         console.log(data);

//         let output = document.getElementById('output');
//         // let current = output.textContent;
//         // console.log(current);
//         output.textContent = jsonData;
//     })
//     .catch((err) => {
//         console.log('ERROR: ', err.message);
//     });



let root = 'http://jsonplaceholder.typicode.com';
let id = Math.floor(Math.random() * 10) + 2;  //id 1 to 11 11 does not exist
let uri = root + '/users/' + id;
// headers
let h = new Headers();
h.append('Accept', 'application/json');
// request
let req = new Request(uri, {
    method: 'POST',
    headers: h,
    mode: 'cors'
});
console.log(req);
fetch(req)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('BAD HTTP stuff');
        }
    })
    .then((jsonData) => {
        console.log(jsonData);
    })
    .catch((err) => {
        console.log('ERROR:', err.message);
    });
