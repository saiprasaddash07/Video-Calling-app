const express = require('express');
const path = require('path');
const http = require('http');
const { v4: uuidv4 } = require('uuid');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 3000;

app.set('view engine','ejs');

app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.redirect(`/${uuidv4()}`);
});

app.get('/:room',(req,res)=>{
    res.render('room',{roomId : req.params.room});
});

io.on('connection',socket => {
    socket.on('join-room',()=>{
        console.log('Joined Room');
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});