import React, { useEffect, useState } from 'react';
import { socket } from '../../../socket';

/**
 * ChatWidget
 * - user có thể là null (guest) hoặc object có { id: 123 }
 * - Với user: roomName = 'user_<id>'
 * - Với guest: roomName = 'guest_<socket.id>'
 */
const ChatWidget = ({ user }) => { // // user có thể là { id: 123 } hoặc null
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    // // Xác định roomName
    const currentRoom = user ? `user_${user.id}` : `guest_${socket.id}`;
    setRoomName(currentRoom);

    // // Gửi sự kiện tham gia chat
    const userData = user ? { userId: user.id } : { guestId: socket.id };
    socket.emit('client_join_chat', userData);

    // // Lắng nghe tin nhắn
    socket.on('receive_message', (data) => {
      // // Chỉ hiển thị tin nhắn nếu nó thuộc phòng của mình
      if (data.roomName === currentRoom) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [user]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('client_send_message', { roomName, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-widget" style={styles.widget}>
      <div className="messages-container" style={styles.messages}>
        {messages.map((msg, index) => (
          <p key={index} style={styles.msgLine}>
            <strong>{msg.sender === 'Shop' ? 'Shop' : 'Bạn'}:</strong> {msg.message}
          </p>
        ))}
      </div>

      <form onSubmit={handleSendMessage} style={styles.form}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Gửi</button>
      </form>
    </div>
  );
};

const styles = {
  widget: { border: '1px solid #ddd', borderRadius: 8, padding: 12, maxWidth: 400 },
  messages: { height: 240, overflowY: 'auto', marginBottom: 8 },
  msgLine: { margin: '6px 0' },
  form: { display: 'flex', gap: 8 },
  input: { flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  button: { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' },
};

export default ChatWidget;
