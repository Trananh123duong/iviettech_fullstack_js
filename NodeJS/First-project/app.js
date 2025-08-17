// file: app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/product.route');
const brandRoutes = require('./routes/brand.route');
const categoryRoutes = require('./routes/category.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello world!!!');
});

/* =================== Socket.IO setup theo mẫu =================== */
// 1. Import module http có sẵn của Node
const http = require('http');
// 2. Import lớp Server từ socket.io
const { Server } = require('socket.io');

// 3. Tạo một HTTP server từ app Express.
// Điều này cho phép cả Express và Socket.IO cùng lắng nghe trên một cổng.
const server = http.createServer(app);

// 4. Gắn Socket.IO vào HTTP server
const io = new Server(server, {
  // Cấu hình CORS để cho phép client từ một nguồn khác kết nối
  cors: {
    origin: '*',          // hoặc đổi thành 'http://localhost:5173' nếu muốn chặt chẽ
    methods: ['GET', 'POST'],
  },
});

// Tên phòng dành cho admin (dashboard)
const ADMIN_ROOM = 'admin_room';

// 5. Lắng nghe các sự kiện của Socket.IO
io.on('connection', (socket) => {
  console.log('Một người dùng đã kết nối:', socket.id);

  // --- Lắng nghe sự kiện khi một khách hàng bắt đầu chat ---
  // userData có thể là { userId: 123 } hoặc { guestId: 'xyz' }
  socket.on('client_join_chat', (userData) => {
    const roomName = userData.userId
      ? `user_${userData.userId}`
      : `guest_${userData.guestId}`;

    socket.join(roomName);
    console.log(`Client ${socket.id} đã tham gia phòng ${roomName}`);

    // Thông báo cho admin có cuộc chat mới
    io.to(ADMIN_ROOM).emit('new_chat_session', {
      roomName,
      clientId: socket.id,
    });
  });

  // --- Lắng nghe sự kiện khi admin tham gia dashboard ---
  socket.on('admin_join_dashboard', () => {
    socket.join(ADMIN_ROOM);
    console.log(`Admin ${socket.id} đã tham gia dashboard`);
  });

  // --- Lắng nghe tin nhắn từ client (cả guest và user) ---
  // data: { roomName: 'user_123', message: 'Xin chào' }
  // Gửi tin nhắn này vào phòng của Client và phòng của admin
  socket.on('client_send_message', (data) => {
    io.to(data.roomName).to(ADMIN_ROOM).emit('receive_message', {
      roomName: data.roomName,
      sender: socket.id,
      message: data.message,
    });
  });

  // --- Lắng nghe tin nhắn từ admin ---
  // data: { roomName: 'user_123', message: 'Shop có thể giúp gì cho bạn?' }
  // Gửi tin nhắn vào phòng của Client và phòng của admin
  socket.on('admin_send_message', (data) => {
    io.to(data.roomName).to(ADMIN_ROOM).emit('receive_message', {
      roomName: data.roomName,
      sender: 'Shop',
      message: data.message,
    });
  });

  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối:', socket.id);
  });
});

/* =================== Kết thúc phần Socket.IO =================== */

// 6. Dùng server.listen thay vì app.listen để cả hai cùng chạy
server.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
