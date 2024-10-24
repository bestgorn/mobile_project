import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mobile_mid/models/room.dart';

class RoomService {
  final String baseUrl = 'http://localhost:5000'; // เปลี่ยนเป็น URL ของคุณ

  Future<List<Room>> fetchRooms() async {
    final response = await http.get(Uri.parse('$baseUrl/rooms'));
    if (response.statusCode == 200) {
      return (json.decode(response.body) as List).map((room) => Room.fromJson(room)).toList();
    } else {
      throw Exception('Failed to load rooms');
    }
  }

  Future<void> disableRoom(String roomId) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/rooms/$roomId'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'status': 'disabled'}),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to disable room');
    }
  }
}
