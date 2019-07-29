$(function(){
    var socket = io.connect('http://localhost:3000');

    //buttons and input
    var message = $('#message');
    var userName = $('#userName');
    var sendMessage = $('#sendMessage');
    var sendUsername = $('#sendUsername');
    var chatroom = $('#chatroom');
    var feedback = $("#feedback")

 
    //send new message
    sendMessage.click(function(){
        console.log(sendMessage.val());
        socket.emit('new_message', { message: message.val()});
    });

   
    //Listen on new message
    socket.on('new_message', (data) => {
        feedback.html('');
		message.val('');
        chatroom.append('<p class="message"> '+ data.userName +':'+ data.message +'</p>');
    });
     //send username
     sendUsername.click(function(){
        console.log(userName.val());
        socket.emit('change_username', { userName: userName.val()});
    });

    message.bind('keypress', () => {
        socket.emit('typing')
    })
    socket.on('typing', (data) => {
        feedback.html('<p><i>'+ data.userName + ' is typing a message...'+'</i></p>')
    })


});