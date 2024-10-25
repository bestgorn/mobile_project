import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/booking_request.dart'; 
import '../models/room.dart';

//connect Api with backend
class ApiService {
  final String baseUrl = 'http://localhost:5000'; 

  
  //----------------------------------------------------------------------------//

  // ฟังก์ชันเพื่อดึงข้อมูลการจอง
  Future<List<Booking>> fetchBookings() async {
    final response = await http.get(Uri.parse('$baseUrl/api/bookings'));

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((booking) => Booking.fromJson(booking)).toList();
    } else {
      throw Exception('Failed to load bookings');
    }
  }
//----------------------------------------------------------------------------//
  // ฟังก์ชันเพื่อจองห้อง
  Future<void> bookRoom(String roomId, String date, String timeSlot) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/booking'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'roomId': roomId, 'date': date, 'timeSlot': timeSlot}),
    );
    if (response.statusCode != 200) {
      throw Exception('Failed to book room');
    }
  }

//----------------------------------------------------------------------------//

  // ฟังก์ชันเพื่อดึงข้อมูลห้อง
  Future<List<Room>> fetchRooms() async {
    final response = await http.get(Uri.parse('$baseUrl/api/rooms')); // แก้ไขเส้นทางให้ถูกต้อง

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((room) => Room.fromJson(room)).toList(); // แปลง JSON เป็น Room
    } else {
      throw Exception('Failed to load rooms');
    }
  }

  // ฟังก์ชันเพิ่มเติมสำหรับการลงทะเบียน, การเข้าสู่ระบบ, การอนุมัติการจอง ฯลฯ
}

//----------------------------------------------------------------------------//