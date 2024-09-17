import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
        navigate('/login')
    }

    if (hasJoined && room) {
      // Create socket connection
      const newSocket = io('http://localhost:3000');
      setSocket(newSocket);

      // Join the room
      newSocket.emit('joinRoom', { room });

      // Handle receiving new messages
      newSocket.on('chatMessage', (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });


      return () => {
        newSocket.disconnect();
        newSocket.off('chatMessage');
      };
    }
  }, [hasJoined, room]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      const newMessage = {
        room,
        message,
        sender: localStorage.getItem('email'),
        timestamp: new Date(),
      };

      socket.emit('chatMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const joinRoom = () => {
    if (room) {
      setHasJoined(true);
    } else {
      alert('Please enter a room name!');
    }
  };

  return (
    <div>
      {!hasJoined ? (
        <div>
          <h2>Join a Chat Room</h2>
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>
      ) : (
        <>
          <div>
            <h2>Chat Room: {room}</h2>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index}>
                  <div>{msg.message}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
