import 'package:socket_io_client/socket_io_client.dart' as IO;

class RealTimeService {
  IO.Socket? socket;

  void connect() {
    // เชื่อมต่อกับเซิร์ฟเวอร์ที่ใช้งาน Socket.IO
    socket = IO.io('http://localhost:5000', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });
    socket!.connect();

    // ตรวจสอบสถานะการเชื่อมต่อ
    socket!.on('connect', (_) {
      print('Connected to Socket.IO');
    });

    socket!.on('disconnect', (_) {
      print('Disconnected from Socket.IO');
    });

    // รับข้อมูลการอัปเดตห้องแบบเรียลไทม์
    socket!.on('roomAdded', (data) {
      print('New room added: $data');
      // อัปเดต UI ของแอปเพื่อแสดงข้อมูลห้องใหม่
    });

    // รับข้อมูลการอัปเดตการจองแบบเรียลไทม์
    socket!.on('bookingUpdated', (data) {
      print('Booking updated: $data');
      // อัปเดต UI ของแอปเพื่อแสดงข้อมูลการจองที่อัปเดต
    });
  }

  void disconnect() {
    // ปิดการเชื่อมต่อ
    socket!.disconnect();
  }
}
