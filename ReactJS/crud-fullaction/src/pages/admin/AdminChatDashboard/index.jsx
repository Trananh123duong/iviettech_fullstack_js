import React, { useEffect, useState } from 'react';
import { socket } from '../../../socket';

const AdminChatDashboard = () => {
  // { roomName1: [messages], roomName2: [messages] }
  const [chatSessions, setChatSessions] = useState({});
  const [activeRoom, setActiveRoom] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // // Thông báo cho server rằng admin đã online
    socket.emit('admin_join_dashboard');

    // // Lắng nghe khi có cuộc chat mới
    socket.on('new_chat_session', (data) => {
      setChatSessions((prev) => ({ ...prev, [data.roomName]: prev[data.roomName] || [] }));
      // tự chọn phòng đầu tiên nếu chưa chọn
      setActiveRoom((r) => r || data.roomName);
    });

    // // Lắng nghe tất cả tin nhắn
    socket.on('receive_message', (data) => {
      setChatSessions((prev) => ({
        ...prev,
        [data.roomName]: [...(prev[data.roomName] || []), data],
      }));
    });

    return () => {
      socket.off('new_chat_session');
      socket.off('receive_message');
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeRoom) {
      socket.emit('admin_send_message', { roomName: activeRoom, message: newMessage });
      setNewMessage('');
    }
  };

  const rooms = Object.keys(chatSessions);

  return (
    <div className="admin-dashboard" style={styles.wrap}>
      <div className="session-list" style={styles.left}>
        <h3>Các cuộc trò chuyện</h3>
        {rooms.length === 0 && <div>Chưa có phòng</div>}

        {rooms.map((room) => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            style={{
              ...styles.roomBtn,
              ...(activeRoom === room ? styles.roomBtnActive : {}),
            }}
          >
            {room}
          </button>
        ))}
      </div>

      <div className="chat-window" style={styles.right}>
        <h3>Phòng: {activeRoom || '—'}</h3>

        <div className="messages-container" style={styles.messages}>
          {(chatSessions[activeRoom] || []).map((msg, index) => (
            <p key={index} style={styles.msgLine}>
              <strong>{msg.sender === 'Shop' ? 'Shop' : msg.sender}:</strong> {msg.message}
            </p>
          ))}
        </div>

        <form onSubmit={handleSendMessage} style={styles.form}>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn gửi khách…"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Trả lời
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrap: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: 16, minHeight: 420 },
  left: { border: '1px solid #ddd', borderRadius: 8, padding: 12, overflowY: 'auto' },
  right: { border: '1px solid #ddd', borderRadius: 8, padding: 12, display: 'flex', flexDirection: 'column' },
  roomBtn: {
    width: '100%', textAlign: 'left', margin: '6px 0', padding: 8,
    borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer',
  },
  roomBtnActive: { background: '#eef' },
  messages: { flex: 1, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6, padding: 8, marginBottom: 8 },
  msgLine: { margin: '6px 0' },
  form: { display: 'flex', gap: 8 },
  input: { flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' },
  button: { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', cursor: 'pointer' },
};

export default AdminChatDashboard;
