let uri = '../server/testoutput.php';

// headers
let myHeaders = new Headers();
myHeaders.append('accept', 'application/json');
myHeaders.append('naam', 'Martino'); // 
// request
let req = new Request(uri, {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors'
});

console.log(req);
fetch(req)
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('BAD HTTP stuff');
        }
    })
    .then((textData) => {
        console.log('textData:', textData);
        // text can give more information sometimes

        console.log('jsonData:', JSON.parse(textData));
    })
    .catch((err) => {
        console.log('ERROR:', err.message);
    });
