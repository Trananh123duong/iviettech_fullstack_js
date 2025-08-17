// 1) Khởi tạo kết nối tới server Socket.IO
//    Dùng singleton để mọi nơi dùng chung một kết nối.
import { io } from 'socket.io-client';

// Lưu ý: đổi URL nếu backend không chạy ở 3000
export const socket = io('http://localhost:3000', {
  autoConnect: true,   // tự kết nối khi import
  transports: ['websocket'], // ưu tiên websocket
});
