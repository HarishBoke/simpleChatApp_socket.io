const express = require('express');
const app = express();

// app engine
app.set('view engine','ejs');

//middleware
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
    //res.send('Hello World');
    res.render('index');
})

//listen on port: 3000
server = app.listen(3000);

// socket.io instancian
const io = require('socket.io')(server)

//listen on every connection
io.on('connection', (socket) => {
    console.log('New user connected!');

    //default userName
    socket.userName = "Anonymous";

    socket.on('change_username', (data) => {
        socket.userName = data.userName;
    })
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message',{message: data.message, userName: socket.userName});
    });

    //listen ontyping 
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {userName: socket.userName});
    })

})

