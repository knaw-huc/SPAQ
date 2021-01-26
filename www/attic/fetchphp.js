


let root = 'http://localhost/server/testoutput.php';
// let id = Math.floor(Math.random() * 10) + 2;  //id 1 to 11 11 does not exist
let uri = root;
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
