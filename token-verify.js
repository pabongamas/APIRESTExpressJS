const jwt=require('jsonwebtoken');

const secret='myCatsss';
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY5NDIzNDM5OX0.oyHGCAF6hxbwKyTZB_gPrUrtg6a673dSkLqzLfU1ZlY";

function verifyToken(token,secret){
    return jwt.verify(token,secret);
}

const payload=verifyToken(token,secret);
console.log(payload);