// location: lib/views/student/booking_form_page.dart
import 'package:flutter/material.dart';
import 'package:mobile_mid/models/room.dart';
import 'package:mobile_mid/services/api_service.dart';

class BookingFormPage extends StatefulWidget {
  final Room room;

  BookingFormPage({required this.room}); // รับ room ผ่าน constructor

  @override
  _BookingFormPageState createState() => _BookingFormPageState();
}

class _BookingFormPageState extends State<BookingFormPage> {
  final ApiService _apiService = ApiService();
  final _dateController = TextEditingController();
  final _timeSlotController = TextEditingController();

  void _submitBooking() async {
    if (_dateController.text.isEmpty || _timeSlotController.text.isEmpty) {
      // แสดงการแจ้งเตือนเมื่อฟอร์มว่าง
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Please fill all fields')));
      return;
    }

    try {
      // ส่งคำขอการจองไปยัง API
      await _apiService.bookRoom(widget.room.id, _dateController.text, _timeSlotController.text);
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Booking successful!')));
      Navigator.pop(context); // กลับไปยังหน้า RoomListPage
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Error: $e')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Booking for ${widget.room.name}')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _dateController,
              decoration: InputDecoration(labelText: 'Date (e.g., 2024-10-25)'),
              keyboardType: TextInputType.datetime,
            ),
            TextField(
              controller: _timeSlotController,
              decoration: InputDecoration(labelText: 'Time Slot (e.g., 10:00 AM - 12:00 PM)'),
              keyboardType: TextInputType.text,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitBooking,
              child: Text('Submit Booking'),
            ),
          ],
        ),
      ),
    );
  }
}
