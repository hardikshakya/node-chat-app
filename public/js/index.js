var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');  
    
    // socket.emit('createMessage', {
    //     from: 'parse@gmail.com',
    //     text: 'kon bola re!!!'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected to server');            
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);  
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Harsh',
//     text: 'Chai pe charcha'
// }, function (data) {
//     console.log('Got it', data);    
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});