// location: lib/views/student/room_list_page.dart
import 'package:flutter/material.dart';
import 'package:mobile_mid/services/api_service.dart';
import 'package:mobile_mid/models/room.dart';
import 'package:mobile_mid/services/real_time_service.dart';
import 'package:mobile_mid/views/student/booking_form_page.dart';

class RoomListPage extends StatefulWidget {
  @override
  _RoomListPageState createState() => _RoomListPageState();
}

class _RoomListPageState extends State<RoomListPage> {
  final ApiService _apiService = ApiService();
  late Future<List<Room>> _rooms;
  final RealTimeService realTimeService = RealTimeService(); // เพิ่ม RealTimeService

  @override
  void initState() {
    super.initState();
    _rooms = _apiService.fetchRooms();

    // เริ่มการเชื่อมต่อกับ Socket.IO
    realTimeService.connect();

    // รับข้อมูลการอัปเดตแบบเรียลไทม์เมื่อมีการเพิ่มห้องใหม่
    realTimeService.socket!.on('roomAdded', (data) {
      // อัปเดตรายชื่อห้องใน UI แบบเรียลไทม์
      setState(() {
        _rooms = _apiService.fetchRooms(); // อัปเดตรายชื่อห้อง
      });
    });
  }

  @override
  void dispose() {
    // ปิดการเชื่อมต่อ Socket.IO เมื่อหน้า RoomListPage ถูกปิด
    realTimeService.disconnect();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Room List')),
      body: FutureBuilder<List<Room>>(
        future: _rooms,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          final rooms = snapshot.data!;
          return ListView.builder(
            itemCount: rooms.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(rooms[index].name),
                subtitle: Text('Status: ${rooms[index].status}'),
                onTap: () {
                  // การนำทางไปยัง BookingFormPage และส่ง Room เป็น arguments
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => BookingFormPage(room: rooms[index]),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}
