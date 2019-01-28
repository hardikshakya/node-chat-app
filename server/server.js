const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
// console.log(publicPath);

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');
    // socket.emit('newMessage', {
    //     from: 'hardik@gmail.com',
    //     text: 'Bhagvan ko maante ho ??',
    //     createdAt: 123
    // });
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();    
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });         
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected'); 
    });
});

server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});