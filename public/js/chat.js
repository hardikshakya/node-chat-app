document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  // Function to scroll to the bottom of the chat window
  const scrollToBottom = () => {
    const messages = document.getElementById('messages');
    const newMessage = messages.lastElementChild;

    // Checking if there is a new message
    if (newMessage) {
      const clientHeight = messages.clientHeight;
      const scrollTop = messages.scrollTop;
      const scrollHeight = messages.scrollHeight;
      const newMessageHeight = newMessage.offsetHeight;
      const lastMessageHeight = newMessage.previousElementSibling
        ? newMessage.previousElementSibling.offsetHeight
        : 0;

      // Checking if the user has scrolled to the bottom
      if (
        clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
        scrollHeight
      ) {
        messages.scrollTop = scrollHeight;
      }
    }
  };

  socket.on('connect', () => {
    const params = new URLSearchParams(window.location.search);

    // Emitting join event with user and room details
    socket.emit(
      'join',
      { name: params.get('name'), room: params.get('room') },
      (err) => {
        if (err) {
          alert(err);
          window.location.href = '/';
        } else {
          console.log('No error');
        }
      }
    );
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  // Event listener for updating user list
  socket.on('updateUserList', (users) => {
    const ol = document.createElement('ol');
    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = user;
      ol.appendChild(li);
    });

    // Updating the user list in the DOM
    document.getElementById('users').innerHTML = '';
    document.getElementById('users').appendChild(ol);
  });

  // Event listener for new message
  socket.on('newMessage', (message) => {
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const template = document.getElementById('message-template').innerHTML;
    const html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime,
    });

    // Adding the new message to the DOM and scrolling to the bottom
    document.getElementById('messages').innerHTML += html;
    scrollToBottom();
  });

  // Event listener for new location message
  socket.on('newLocationMessage', (message) => {
    const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const template = document.getElementById(
      'location-message-template'
    ).innerHTML;
    const html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime,
    });

    // Adding the new location message to the DOM and scrolling to the bottom
    document.getElementById('messages').innerHTML += html;
    scrollToBottom();
  });

  // Event listener for message form submission
  document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const messageTextbox = document.querySelector('[name=message]');
    // Emitting createMessage event with the message text
    socket.emit(
      'createMessage',
      {
        text: messageTextbox.value,
      },
      () => {
        messageTextbox.value = '';
      }
    );
  });

  // Getting the send location button
  const locationButton = document.getElementById('send-location');
  locationButton.addEventListener('click', () => {
    // Checking if geolocation is supported by the browser
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser.');
    }

    // Disabling the send location button while the location is being fetched
    locationButton.setAttribute('disabled', 'disabled');
    locationButton.textContent = 'Sending location ...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send Location';
        // Emitting createLocationMessage event with the location coordinates
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        locationButton.removeAttribute('disabled');
        locationButton.textContent = 'Send Location';
        alert('Unable to fetch location.');
      }
    );
  });
});
